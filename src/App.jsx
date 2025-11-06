import { Link } from "react-router";
import AppLogic from "./Logic";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-12 py-8 bg-gray-900 text-white text-lg">
        <h1 className="text-3xl font-extrabold text-purple-400 w-3.5">THE STORE PROJECT</h1>
        <nav className="flex-1 flex justify-center items-center">
          <ul className="flex flex-row items-center border border-gray-400 rounded-full py-5 px-0 text-2xl font-semibold">
            <li><Link className="px-10 py-5 rounded-full hover:bg-gray-800 hover:text-white transition" to="/">Home</Link></li>
            <li><Link className="px-10 py-5 rounded-full hover:bg-gray-800 hover:text-white transition" to="/shop">Shop</Link></li>
            <li><Link className="px-10 py-5 rounded-full hover:bg-gray-800 hover:text-white transition" to="/cart">Cart</Link></li>
          </ul>
        </nav>
      </header>
        <AppLogic />
    </div>
  )
}
