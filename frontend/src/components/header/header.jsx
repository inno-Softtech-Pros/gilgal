// frontend/src/components/header/header.jsx
import { Home } from "lucide-react";
import "./header.css";

export default function Header() {
  return(
    <header>
      <Home size={24} />
      <h1>Hello World!</h1>
    </header>
  );
}
