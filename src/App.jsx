import { Link } from "react-router";
import styles from "./App.module.css";

export default function App() {
  return (
    <header id={styles.header}>
      <h1 id={styles.headerTitle}>SHOPPING CART PROJECT</h1>
      <nav>
        <ul id={styles.navbar}>
          <li><Link className="nav-links" to="/">HOME</Link></li>
          <li><Link className="nav-links" to="/shop">SHOP</Link></li>
          <li><Link className="nav-links" to="/cart">CART</Link></li>
        </ul>
      </nav>
    </header>
  )
}