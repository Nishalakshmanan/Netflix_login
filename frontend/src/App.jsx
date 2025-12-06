import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="relative h-screen w-full">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<SignUp />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/landing" element={<Landing/>}></Route>
        </Routes>
         <ToastContainer 
          position="top-right"
          autoClose={1300}
          hideProgressBar={true}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
