import AsideLayout from "../layouts/Aside";
import { Helmet } from 'react-helmet';

export default function PrivacyPolicy() {

  return (
    <>
      <Helmet>
        <title>Politique de confidentialité</title>
      </Helmet>
      <AsideLayout>
        <section className="lg:w-2/3 mx-auto mt-5">
          <h1 className="text-2xl font-bold mb-4">Politique de confidentialité</h1>
          <p>
            La présente politique de confidentialité décrit la manière dont l'auteur collecte, utilise et
            protège les données personnelles des visiteurs de ce site. Cette politique s'applique au site
            personnel de Ronan Kerveno, qui partage des expériences personnelles sur le développement web et
            Linux.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">Collecte des données</h2>
          <p>
            Ce site collecte des données personnelles via un formulaire de contact. Les visiteurs peuvent
            fournir leur adresse e-mail pour poser des questions ou faire des demandes. Les données collectées
            sont utilisées uniquement dans le but de répondre aux questions et sollicitations des visiteurs.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">Utilisation des données</h2>
          <p>
            Les adresses e-mail collectées ne sont pas transmises à des tiers. Cependant, pour des raisons
            techniques, ce site utilise le service EmailJS pour traiter les messages envoyés via le formulaire
            de contact. Vous pouvez consulter la politique de confidentialité d'EmailJS{' '}
            <a
              href="https://www.emailjs.com/legal/privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium"
            >
              ici
            </a>
            .
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">Droits des utilisateurs</h2>
          <p>
            Conformément à la législation en vigueur, notamment le Règlement général sur la protection des
            données (RGPD) de l'Union européenne, les utilisateurs disposent de droits concernant leurs
            données personnelles. Ces droits incluent l'accès à leurs données, la modification ou la
            suppression de celles-ci. Si vous souhaitez exercer ces droits, veuillez utiliser le formulaire
            de contact présent sur ce site pour soumettre votre demande.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
          <p>
            Si vous avez des questions ou des préoccupations concernant cette politique de confidentialité,
            veuillez utiliser le formulaire de contact présent sur ce site pour contacter Ronan Kerveno.
          </p>
        </section>
      </AsideLayout>
    </>
  );

}
