import "./Header.css";

function Header() {
  return (
    <header className="header">
      <span>
        <a href="/">Gerencimento de Mercadorias</a>
      </span>
      <nav>
        <a href="/">Mercadorias</a>
        <a href="/Stock">Estoques</a>
        <a href="/Graphics">Gráficos</a>
      </nav>
    </header>
  );
}
export default Header;
