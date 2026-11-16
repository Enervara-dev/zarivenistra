import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Vision } from "./components/Vision";
import { Ecosystem } from "./components/Ecosystem";
import { Philosophy } from "./components/Philosophy";
import { Future } from "./components/Future";
import { Closing } from "./components/Closing";
import { useScrollEffects } from "./hooks/useScrollEffects";

export default function App() {
  useScrollEffects();
  return (
    <>
      <a className="skip" href="#about">
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <Vision />
        <Ecosystem />
        <Philosophy />
        <Future />
        <Closing />
      </main>
    </>
  );
}
