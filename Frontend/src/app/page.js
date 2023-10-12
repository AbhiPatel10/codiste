import Dashboard from "./components/dashboard";
import "../styles/global.css"
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <main>
      <Navbar/>
      <Dashboard />
    </main>
  );
}