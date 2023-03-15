
export default function Header() {
  return (
    <header>
      <nav className="container">
        <a href="/">
          home
        </a>
        <span className="header__description">
          An example site powered by <span className="accent">React</span> and{" "}
          <span className="accent">Directus</span>.
        </span>
      </nav>
    </header>
  );
}
