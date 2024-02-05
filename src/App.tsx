import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Main from "./components/Main";

export default function App() {
  return (
    <div className="bg-[#191D26] font-[Inter] text-white">
      <Header />
      <Hero />
      <Main />
      <Footer />
    </div>
  );
}
