import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Timeline from "./pages/Timeline";
import Contact from "./pages/Contact";
import Resume from "./pages/Resume";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Preloader from "./components/Preloader";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./buttons/ScrollToTopButton"; // Import the ScrollToTopButton

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoaded(true);
        document.body.classList.add("loaded");
      }, 1500);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "about",
        "portfolio",
        "timeline",
        "resume",
        "contact",
      ];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const sectionTop = element.offsetTop;
          const sectionHeight = element.offsetHeight;

          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            setActiveTab(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Preloader isLoaded={isLoaded} />
      <div className={`app-content ${isLoaded ? "visible" : "hidden"}`}>
        <BrowserRouter>
          <ScrollToTop />
          {isLoaded && (
            <Header activeTab={activeTab} setActiveTab={setActiveTab} />
          )}
          <Routes>
            <Route
              path="/"
              element={
                <Home setHeroLoaded={setHeroLoaded} heroLoaded={heroLoaded} />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          {isLoaded && heroLoaded && <Footer />}
          <ScrollToTopButton /> {/* Add the ScrollToTopButton here */}
        </BrowserRouter>
      </div>
    </>
  );
}
