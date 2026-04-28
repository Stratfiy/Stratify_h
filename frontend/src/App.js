import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Ecommerce from "@/pages/Ecommerce";
import Healthcare from "@/pages/Healthcare";
import Pricing from "@/pages/Pricing";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import SiteShell from "@/components/SiteShell";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<SiteShell />}>
            <Route path="/" element={<Home />} />
            <Route path="/e-commerce" element={<Ecommerce />} />
            <Route path="/healthcare" element={<Healthcare />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
