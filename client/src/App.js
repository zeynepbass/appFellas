import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Flights from "./pages/Flights";
import Section from "./pages/Section";
import PostContext from "./Context/PostContext";
import Error from "./pages/ErrorLight";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
function App() {
  const storedData = JSON.parse(localStorage.getItem("form"));
  return (
    <>
      <ToastContainer />
      <PostContext>
        <Routes>
          <Route path="/" element={<Home content={<Section />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />


          {storedData ? (
            <Route path="/flights" element={<Home content={<Flights />} />} />
          ) : (
            <Route path="*" element={<Error />} />
          )}

          <Route />
        </Routes>
      </PostContext>
    </>
  );
}

export default App;
