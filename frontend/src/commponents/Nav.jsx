import { Link } from "react-router-dom";
import "../styles/Nav.css";

export default function NavBar() {
  return (
    <nav className="nav">
      <div className="nav-logo">Iskolai Könyvtár</div>
      <ul className="nav-links">
        <li>
          <Link to="/">Főoldal</Link>
        </li>
        <li>
          <Link to="/kolcsonzes">Könyv kölcsönzés</Link>
        </li>
        <li>
          <Link to="/torles">Könyv törlése</Link>
        </li>
      </ul>
    </nav>
  );
}
