import ContactForm from '../components/ContactForm';
import AsideLayout from "../layouts/Aside";
import { Helmet } from 'react-helmet';

export default function Contact() {

  return (
    <>
      <Helmet>
        <title>Contact</title>
      </Helmet>
      <AsideLayout>
        <section className="lg:w-2/3 xl:w-auto xl:pr-7">
          <h1 className="text-4xl font-bold mb-5">Me contacter</h1>
          <p className="mb-6">
            Si vous avez des questions, des remarques ou souhaitez me contacter, veuillez utiliser le formulaire ci-dessous.
          </p>
          <ContactForm />
        </section>
      </AsideLayout>
    </>
  );

};
