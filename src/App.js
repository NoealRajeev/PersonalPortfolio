import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<>
            <Banner />
            <Skills />
            <Projects />
            <Contact />
          </>} />
        </Routes>
        {/* <Routes>
          <Route path="/reset-password" element={<> <h1>Reset password</h1> </> } />
        </Routes> */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
