import { useRef } from "react";
import { Outlet } from "react-router-dom";
import BackToTopBtn from "../popup/BackToTopBtn";
import Footer from "./Footer";
import Header from "./Header";

const RootLayout = () => {
  const windowEle = useRef<Window>(window);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BackToTopBtn targetEle={windowEle} id="backToTopBtn" />
    </>
  );
};

export default RootLayout;
