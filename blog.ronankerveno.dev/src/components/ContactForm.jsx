import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import config from '../config';

export default function ContactForm() {
  const form = useRef();
  const [emailError, setEmailError] = useState(false);
  const [formStatus, setFormStatus] = useState(null);
  const [privacyPolicyChecked, setPrivacyPolicyChecked] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);


  const sendEmail = (e) => {
    e.preventDefault();

    if (!form.current.reportValidity() || !privacyPolicyChecked) {
      return;
    }

    emailjs.sendForm(
      config.EMAILJS_SERVICE_ID,
      config.EMAILJS_TEMPLATE_ID,
      form.current,
      config.EMAILJS_PUBLIC_KEY
    )
      .then((result) => {
        console.log(result.text);
        setFormStatus('success');
        resetForm(7000); // Ajoutez un délai de 7 secondes avant de réinitialiser le formulaire
      }, (error) => {
        console.log(error.text);
        setFormStatus('error');
      });
  };

  const handleEmailChange = (e) => {
    setEmailError(!e.target.validity.valid);
  };

  const resetForm = (delay = 0) => {
    setSubmitDisabled(true); // Désactive le bouton d'envoi

    setTimeout(() => {
      setEmailError(false);
      setFormStatus(null);
      setPrivacyPolicyChecked(false);
      form.current.reset();
      setSubmitDisabled(false); // Réactive le bouton d'envoi
    }, delay);
  };

  return (
    <>
      <form ref={form} onSubmit={sendEmail} className="bg-slate-300 text-slate-700 p-8 rounded-md">
        {formStatus === 'success' && (
          <div className="bg-green-500 p-4 rounded-md mb-4">
            Votre message a été envoyé avec succès.
          </div>
        )}
        {formStatus === 'error' && (
          <div className="bg-red-500 p-4 rounded-md mb-4">
            Une erreur est survenue lors de l'envoi de votre message.
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="user_name" className="block mb-2">Nom (obligatoire)</label>
          <input type="text" name="user_name" id="user_name" required className="w-full p-2 bg-white text-black rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="user_email" className="block mb-2">Email (obligatoire)</label>
          <input
            type="email"
            name="user_email"
            id="user_email"
            required
            className={`w-full p-2 bg-white text-black rounded-md ${emailError ? 'border border-red-500' : ''}`}
            onChange={handleEmailChange}
          />
          {emailError && <div className="text-red-500 text-sm">Veuillez saisir un email valide.</div>}
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block mb-2">Message (obligatoire)</label>
          <textarea name="message" id="message" rows="4" required className="w-full p-2 bg-white text-black rounded-md" />
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox text-slate-900"
              checked={privacyPolicyChecked}
              onChange={() => setPrivacyPolicyChecked(!privacyPolicyChecked)}
            />
            <span className="ml-2">
              J'ai lu et accepté la{' '}
              <Link to="/politique-confidentialite" className="text-slate-900 underline">
                politique de confidentialité
              </Link>
            </span>
          </label>
        </div>
        <div className="text-right">
          <input
            type="submit"
            value="Envoi"
            className={`py-1 px-4 rounded-md cursor-pointer transition ease-in-out duration-150 ${!submitDisabled && privacyPolicyChecked ? 'bg-white text-slate-900 hover:bg-slate-300 hover:text-white active:bg-slate-700' : 'bg-slate-300 text-slate-600 cursor-not-allowed'}`}
            disabled={!privacyPolicyChecked || submitDisabled}
          />

        </div>

      </form>
    </>
  );

};
