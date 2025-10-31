import { Link } from "react-router";

export default function App(){
  return (
    <div>
      <header id="header">
        <h1 id="header-title">SHOPPING CART PROJECT</h1>
        <nav>
          <ul id="navbar">
            <li><Link className="nav-links" to="/">HOME</Link></li>
            <li><Link className="nav-links" to="/shop">SHOP</Link></li>
            <li><Link className="nav-links" to="/cart">CART</Link></li>
          </ul>
        </nav>
      </header>
    </div>
  )
}