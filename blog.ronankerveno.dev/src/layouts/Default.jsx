import Header from "../components/Header";
import Footer from "../components/Footer";

export default function DefaultLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="w-[94%] xl:w-[1230px] mx-auto flex-grow mb-14">
        {children}
      </main>
      <Footer />
    </div>
  );
};