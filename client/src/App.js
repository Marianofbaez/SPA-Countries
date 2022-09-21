import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import CreateActivity from "./components/CreateActivity/CreateActivity";
import Detail from "./components/Detail/Detail";
import styles from "./components/LandingPage/LandingPage.module.css"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <h1 className={styles.text}>Countries and activities in the world</h1>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/activities" element={<CreateActivity />} /> 
          <Route exact path="/home/:id" element={<Detail />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
