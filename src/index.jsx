import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import './styles/index.css';
import DefaultLayout from "./layouts/Default";
import Home from "./routes/Home";
import Article from "./routes/Article";
import NotFound from "./routes/NotFound";
import Search from "./routes/Search";
import Contact from "./routes/Contact";
import PrivacyPolicy from "./routes/privacyPolicy";

// Structure et routage du site
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <DefaultLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:slug" element={<Article />} />
            <Route path="/search/:query" element={<Search />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/politique-confidentialite" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DefaultLayout>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);
