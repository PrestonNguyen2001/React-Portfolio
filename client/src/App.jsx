import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  SignIn,
  SignUp,
  CreatePost,
  UpdatePost,
  Post,
  Header,
  FooterCom as Footer,
  PrivateRoute,
  OnlyAdminPrivateRoute,
  Preloader,
  ScrollToTop,
} from "./components";

import {
  About,
  Portfolio,
  Home,
  Timeline,
  Blog,
  Contact,
  Resume,
  Dashboard,
} from "./pages";

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
        "blogs",
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
              <Route path="/dashboard/*" element={<Dashboard />} />
            </Route>
            <Route element={<OnlyAdminPrivateRoute />}>
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/update-post/:postId" element={<UpdatePost />} />
            </Route>
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/posts/:slug" element={<Post />} />
          </Routes>
          {isLoaded && <Footer />}
        </BrowserRouter>
      </div>
    </>
  );
}
