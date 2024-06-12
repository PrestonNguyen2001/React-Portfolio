import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Resume from "./pages/Resume";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Preloader from "./components/Preloader";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      console.log("handleLoad called");
      // Optionally add a small delay to ensure visual transition
      setTimeout(() => {
        setIsLoaded(true);
        document.body.classList.add("loaded");
        console.log("Body class list:", document.body.classList);
      }, 1500); // 100ms delay
    };

    console.log("Adding event listeners for load");

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      console.log("Removing event listeners for load");
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  console.log("isLoaded state before render:", isLoaded);

  return (
    <>
      <Preloader isLoaded={isLoaded} />
      <div className={`app-content ${isLoaded ? "visible" : "hidden"}`}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}
