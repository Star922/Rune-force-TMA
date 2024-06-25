import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./page/Home";
import Tap from "./page/Tap";
import Fail from "./page/Fail"
import { ToastContainer } from "react-toastify";
import Layout from "./Layout";

function App() {
  return (
    <Router>
      <div
        className="App h-screen flex flex-coljustify-between overflow-hidden overflow-y-hidden relative"
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="Tap" element={<Tap />} />
            <Route path="Fail" element={<Fail />} />
          </Route>
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
