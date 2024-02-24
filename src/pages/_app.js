import { useEffect } from "react";
import { store } from "@/store/store";
import "@/styles/globals.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Noto_Serif } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const notoserif = Noto_Serif({ subsets: ["latin"] });

const DarkModeWrapper = ({ children }) => {
  const darkMode = useSelector((state) => state.darkMode.value);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return children;
};

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <DarkModeWrapper>
        <main
          className={`container max-w-6xl mx-auto px-4 md:px-4 ${notoserif.className}`}
        >
          <Header />
          <Component {...pageProps} />
          <Footer />
        </main>
      </DarkModeWrapper>
    </Provider>
  );
}
