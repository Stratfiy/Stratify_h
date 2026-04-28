import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRight, Check, Mail, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { FadeUp } from "@/components/Motion";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const REVENUE_OPTIONS = ["< $100K", "$100K – $1M", "$1M – $10M", "$10M+"];
const INDUSTRY_OPTIONS = ["E-commerce", "Healthcare", "B2B Services", "Other"];
const SOURCE_OPTIONS = ["LinkedIn", "X / Twitter", "Referral", "Search", "Other"];

const inputCls =
  "w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-[14px] text-[#0A0A0A] " +
  "placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-transparent transition";

const initial = {
  full_name: "",
  work_email: "",
  company_name: "",
  company_website: "",
  industry: "E-commerce",
  monthly_revenue: "$1M – $10M",
  challenge: "",
  referral_source: "",
};

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [formEnabled, setFormEnabled] = useState(true);

  useEffect(() => {
    let alive = true;
    axios
      .get(`${API}/config`)
      .then((r) => { if (alive) setFormEnabled(!!r.data?.lead_form_enabled); })
      .catch(() => { /* network failure: keep form open, server will gate on submit */ });
    return () => { alive = false; };
  }, []);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    if (!form.full_name || !form.work_email || !form.company_name || !form.challenge) {
      toast.error("Please fill in name, work email, company, and what you're trying to fix.");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(`${API}/leads`, form);
      setDone(true);
      toast.success("Got it. We'll be in touch within 4 hours.");
    } catch (err) {
      handleSubmitError(err, setFormEnabled);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative pt-20 md:pt-28 pb-28" data-testid="contact-page">
      <div className="absolute inset-0 bg-grid-soft opacity-40 pointer-events-none" />
      <div className="container-x relative grid lg:grid-cols-12 gap-12">
        <ContactSidebar />
        <div className="lg:col-span-7">
          <FadeUp delay={0.05}>
            <div className="card-base p-7 md:p-10">
              <FormPanel
                disabled={!formEnabled}
                done={done}
                form={form}
                update={update}
                submit={submit}
                submitting={submitting}
              />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ------------------------- Sub-components ------------------------- */

function handleSubmitError(err, setFormEnabled) {
  const status = err?.response?.status;
  if (status === 429) {
    toast.error("Too many requests from this network. Try again in a bit, or email hello@stratifyai.com.");
    return;
  }
  if (status === 503) {
    toast.error("The form is paused right now. Please email hello@stratifyai.com.");
    setFormEnabled(false);
    return;
  }
  const msg = err?.response?.data?.detail;
  toast.error(typeof msg === "string" ? msg : "Could not submit form");
}

function ContactSidebar() {
  return (
    <div className="lg:col-span-5">
      <FadeUp>
        <div className="eyebrow mb-5">Contact</div>
        <h1 className="text-[40px] md:text-[60px] tracking-[-0.025em] leading-[1.05] font-medium">
          Let's talk.
        </h1>
        <p className="mt-5 text-[17px] md:text-[19px] text-[#4B5563] leading-[1.6] max-w-[440px]">
          Tell us about your business. We'll show you which agents apply and what they'd do in your first 30 days.
        </p>

        <div className="mt-10 space-y-3 text-[14px]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FBFBFD] border border-[#E5E7EB] flex items-center justify-center">
              <Mail className="w-4 h-4 text-[#0066FF]" />
            </div>
            <div>
              <div className="font-mono text-[11px] tracking-wider uppercase text-[#9CA3AF]">Or email directly</div>
              <a href="mailto:hello@stratifyai.com" className="text-[#0A0A0A] font-medium">hello@stratifyai.com</a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FBFBFD] border border-[#E5E7EB] flex items-center justify-center">
              <span className="agent-dot" />
            </div>
            <div>
              <div className="font-mono text-[11px] tracking-wider uppercase text-[#9CA3AF]">Response time</div>
              <div className="text-[#0A0A0A] font-medium">Under 4 hours · India business hours</div>
            </div>
          </div>
        </div>
      </FadeUp>
    </div>
  );
}

function FormPanel({ disabled, done, form, update, submit, submitting }) {
  if (disabled) return <PausedCard />;
  if (done) return <SuccessCard />;
  return <DemoForm form={form} update={update} submit={submit} submitting={submitting} />;
}

function PausedCard() {
  return (
    <div className="text-center py-12" data-testid="contact-disabled">
      <div className="mx-auto w-14 h-14 rounded-full bg-[#0066FF]/10 flex items-center justify-center">
        <ShieldAlert className="w-6 h-6 text-[#0066FF]" />
      </div>
      <h2 className="mt-6 text-[26px] md:text-[30px] tracking-[-0.02em] font-medium">
        The demo form is paused.
      </h2>
      <p className="mt-3 text-[15px] text-[#4B5563] max-w-[440px] mx-auto">
        We've temporarily disabled the form for maintenance. Email{" "}
        <a href="mailto:hello@stratifyai.com" className="text-[#0066FF]">hello@stratifyai.com</a>{" "}
        and we'll reply within 4 hours.
      </p>
    </div>
  );
}

function SuccessCard() {
  return (
    <div className="text-center py-12" data-testid="contact-success">
      <div className="mx-auto w-14 h-14 rounded-full bg-[#00D4AA]/15 flex items-center justify-center">
        <Check className="w-6 h-6 text-[#00A37D]" />
      </div>
      <h2 className="mt-6 text-[28px] md:text-[34px] tracking-[-0.02em] font-medium">
        Got it. We'll be in touch.
      </h2>
      <p className="mt-3 text-[15px] text-[#4B5563] max-w-[440px] mx-auto">
        Your demo request is in the queue. Expect a personal note from Nithish within 4 hours.
        Meanwhile, you can read the manifesto.
      </p>
      <div className="mt-8">
        <a href="/about" className="btn-ghost">
          Read the manifesto <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

function DemoForm({ form, update, submit, submitting }) {
  return (
    <form onSubmit={submit} className="space-y-5" data-testid="contact-form">
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Full name *">
          <input
            type="text"
            required
            value={form.full_name}
            onChange={update("full_name")}
            className={inputCls}
            data-testid="contact-input-name"
            placeholder="Jane Founder"
          />
        </Field>
        <Field label="Work email *">
          <input
            type="email"
            required
            value={form.work_email}
            onChange={update("work_email")}
            className={inputCls}
            data-testid="contact-input-email"
            placeholder="jane@yourbrand.com"
          />
        </Field>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Company name *">
          <input
            type="text"
            required
            value={form.company_name}
            onChange={update("company_name")}
            className={inputCls}
            data-testid="contact-input-company"
            placeholder="Your Brand Co."
          />
        </Field>
        <Field label="Company website">
          <input
            type="text"
            value={form.company_website}
            onChange={update("company_website")}
            className={inputCls}
            data-testid="contact-input-website"
            placeholder="yourbrand.com"
          />
        </Field>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Industry">
          <Select
            value={form.industry}
            onChange={update("industry")}
            options={INDUSTRY_OPTIONS}
            testId="contact-select-industry"
          />
        </Field>
        <Field label="Approx. monthly revenue">
          <Select
            value={form.monthly_revenue}
            onChange={update("monthly_revenue")}
            options={REVENUE_OPTIONS}
            testId="contact-select-revenue"
          />
        </Field>
      </div>

      <Field label="What are you trying to fix? *">
        <textarea
          required
          rows={4}
          value={form.challenge}
          onChange={update("challenge")}
          className={inputCls + " resize-none"}
          data-testid="contact-input-challenge"
          placeholder="We're spending $14K/mo on tools but our CAC keeps climbing..."
        />
      </Field>

      <Field label="How did you hear about us?">
        <Select
          value={form.referral_source}
          onChange={update("referral_source")}
          options={SOURCE_OPTIONS}
          testId="contact-select-source"
          includeBlank
        />
      </Field>

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full justify-center text-base py-4 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
        data-testid="contact-submit-button"
      >
        {submitting ? "Submitting..." : "Book my demo"} <ArrowRight className="w-4 h-4" />
      </button>
      <div className="text-[12px] font-mono tracking-wider uppercase text-[#9CA3AF] text-center">
        No spam · We'll reply within 4 hours
      </div>
    </form>
  );
}

function Select({ value, onChange, options, testId, includeBlank }) {
  return (
    <select value={value} onChange={onChange} className={inputCls} data-testid={testId}>
      {includeBlank && <option value="">— Select —</option>}
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#6B7280]">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
