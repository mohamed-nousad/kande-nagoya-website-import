import "rc-slider/assets/index.css";
import "./styles/style.scss";
import "swiper/css/effect-fade";
import "swiper/css/grid";
import "photoswipe/style.css";
import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import Login from "@/components/modals/Login";
import SignUp from "@/components/modals/SignUp";
import { useLocation } from "react-router-dom";
import WOW from "./utils/wow";
import ScrollTopBehaviour from "./components/common/ScrollToTopBehaviour";
import BackToTop from "@/components/common/BacktoTop";
import AppRouter from "./routes/AppRouter";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.esm").then((bs) => {
        window.bootstrap = bs;
      });
    }
  }, []);

  useEffect(() => {
    const nav = document.querySelector(".header-lower");
    if (nav) {
      const headerHeight = nav.offsetHeight;
      const injectSpace = document.createElement("div");
      injectSpace.style.height = `${headerHeight}px`;
      injectSpace.classList.add("header-lower-after-div");
      nav.after(injectSpace);
      injectSpace.style.display = "none";
    }
    const handleScroll = () => {
      const nav = document.querySelector(".header-lower");
      if (document.querySelector(".header-fixed")) {
        const afterDiv = document.querySelector(".header-lower-after-div");
        if (nav && afterDiv) {
          if (window.scrollY > 200) {
            nav.classList.add("is-fixed");
            afterDiv.style.display = "block";
          } else {
            nav.classList.remove("is-fixed");
            afterDiv.style.display = "none";
          }
          if (window.scrollY > 300) {
            nav.classList.add("is-small");
          } else {
            nav.classList.remove("is-small");
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    const wow = new WOW({ mobile: false, live: false });
    wow.init();
  }, [pathname]);

  return (
    <>
      <div id="wrapper">
        <div id="pagee" className="clearfix">
          <Provider store={store}>
            <AppRouter />
            <Login />
            <SignUp />
          </Provider>
        </div>
      </div>
      <ScrollTopBehaviour />
      <BackToTop />
    </>
  );
}

export default App;
