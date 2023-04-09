import { Link } from "react-router-dom";
import AsideLayout from "../layouts/Aside";

export default function NotFound() {
  return (
    <AsideLayout>
      <section className="lg:w-2/3 mx-auto mt-5">
        <h1>Uh-oh, we can't seem to find the page you're looking for.</h1>
        <p>
          <Link to="/">Click here</Link> to head back to the safety of the
          homepage.
        </p>
      </section>
    </AsideLayout>
  );
}
