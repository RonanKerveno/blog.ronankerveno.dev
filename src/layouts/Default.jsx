import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { scrollToTop } from "../utils/scrollToTop";

export default function DefaultLayout({ children }) {
  const location = useLocation();

  useEffect(() => {
    // Quand ma location change (changement de page)
    // Je scroll en haut de la page
    scrollToTop();
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* flex-grow permet à l'élement d'occuper toute la hauteur de page même si peu de contenu */}
      <main className="w-[94%] xl:w-[1230px] mx-auto flex-grow mb-14">
        {children}
      </main>
      <Footer />
    </div>
  );
};