import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles/index.css';

import DefaultLayout from "./layouts/Default";
import Home from "./routes/Home";
import Article from "./routes/Article";
import NotFound from "./routes/NotFound";
import Search from "./routes/Search";
import ContactForm from "./routes/Contact";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:slug" element={<Article />} />
          <Route path="/search/:query" element={<Search />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </DefaultLayout>
    </BrowserRouter>
  </React.StrictMode>
);
