// "use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import "@/styles/globals.css";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import clsx from "clsx";
// import { appWithTranslation } from "next-i18next";
import { appWithTranslation } from "next-i18next";
import { Provider } from 'react-redux';
import store from '../store/store';
// import '../i18n';

function App({ Component, pageProps }) {
  const pathname = usePathname();
  const checkDashbord = () => {
    let checker = false;
    let dashboard = "";
    if (pathname) {
      if (pathname.length > 9) {
        for (let i = 1; i < 10; i++) {
          dashboard += pathname[i];
        }
        if (dashboard === "dashboard") {
          checker = true;
        }
      }
    }
    return checker;
  };
  // console.log(checkDashbord());

  return (
    <Provider store={store} >
      <Header />
      <Component {...pageProps} />
      <div className={clsx({ hidden: checkDashbord() })}>
        <Footer />
      </div>
      </Provider>
  );
}


export default appWithTranslation(App);