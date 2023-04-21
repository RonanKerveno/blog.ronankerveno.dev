// Paramètres de configuration 
const config = {
    API_URL: process.env.REACT_APP_DIRECTUS_URL,
    ASSETS_URL: `${process.env.REACT_APP_DIRECTUS_URL}/assets`,
    EMAILJS_SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
    EMAILJS_PUBLIC_KEY: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
  };
  
  export default config;