import ContactForm from '../components/ContactForm';
import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { TbWorldWww } from 'react-icons/tb';

export default function Contact() {


  return (
    <>
      <h1 className="text-4xl font-bold mb-5">Me contacter</h1>
      <p className="mb-4">
        Si vous avez des questions, des remarques ou souhaitez me contacter, veuillez utiliser le formulaire ci-dessous.
      </p>
      <ContactForm />
      <section className="flex gap-7 items-center justify-center mt-10">
        <a
          href="https://github.com/RonanKerveno"
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:text-slate-500"
        >
          <FaGithub className="inline text-2xl" /> <span className="text-sm">GitHub</span>
        </a>
        <a
          href="https://www.linkedin.com/in/ronankerveno"
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:text-slate-500"
        >
          <FaLinkedin className="inline text-2xl" /> <span className="text-sm">LinkedIn</span>
        </a>
        <a
          href="https://ronankerveno.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:text-slate-500"
        >
          <TbWorldWww className="inline text-2xl" /> <span className="text-sm">ronankerveno.dev</span>
        </a>
      </section>
    </>
  );

};
