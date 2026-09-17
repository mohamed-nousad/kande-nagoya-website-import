import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="not-found d-flex flex-column align-items-center justify-content-center text-center">
      <h1 className="not-found__code">404</h1>
      <h2 className="not-found__title">Page Not Found</h2>
      <p className="not-found__text">
        The page you are looking for does not exist.
      </p>

      <Link to="/" className="not-found__btn">
        Back to Home
      </Link>
    </section>
  );
}