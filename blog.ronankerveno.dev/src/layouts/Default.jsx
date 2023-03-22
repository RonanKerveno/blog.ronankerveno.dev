import Header from "../components/Header";
import Footer from "../components/Footer";

export default function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <main className="w-2/3 mx-auto">
        {children}
      </main>
      <Footer />
    </>
  );
};