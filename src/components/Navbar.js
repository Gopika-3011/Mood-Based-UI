import { NavLink } from "react-router-dom";

<nav className="flex justify-center gap-6 p-4 bg-black/30 text-white font-bold relative z-10">
  <NavLink 
    to="/" 
    className={({ isActive }) => isActive ? "underline text-yellow-300" : ""}
  >
    Home
  </NavLink>
</nav>