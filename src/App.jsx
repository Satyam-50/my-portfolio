import { ThemeProvider } from "./ThemeContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <div className="app-shell">
          <div className="app-noise"></div>
          <div className="ambient-orb a"></div>
          <div className="ambient-orb b"></div>
          <div className="ambient-orb c"></div>
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;