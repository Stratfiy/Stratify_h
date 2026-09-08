import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Industries from "@/pages/Industries";
import IndustryDetail from "@/pages/IndustryDetail";
import Services from "@/pages/Services";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Dashboard from "@/pages/Dashboard";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import AIMarketLanding from "@/pages/AIMarketLanding";
import SiteShell from "@/components/SiteShell";
import ErrorBoundary from "@/components/ErrorBoundary";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider } from "@/lib/AuthContext";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Pages WITH Nav + Footer */}
              <Route element={<SiteShell />}>
                <Route path="/" element={<Home />} />
                <Route path="/industries" element={<Industries />} />
                <Route path="/industries/:slug" element={<IndustryDetail />} />
                <Route path="/services" element={<Services />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:slug" element={<ProjectDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />

                {/* Search-intent landing pages */}
                <Route path="/ai-agency-india" element={<AIMarketLanding pageKey="ai-agency-india" />} />
                <Route path="/ai-product-studio-india" element={<AIMarketLanding pageKey="ai-product-studio-india" />} />
                <Route path="/industrial-ai-company-india" element={<AIMarketLanding pageKey="industrial-ai-company-india" />} />
                <Route path="/ai-automation-company-india" element={<AIMarketLanding pageKey="ai-automation-company-india" />} />
                <Route path="/ai-development-company-india" element={<AIMarketLanding pageKey="ai-development-company-india" />} />
              </Route>

              {/* Standalone — no Nav/Footer */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ErrorBoundary>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
