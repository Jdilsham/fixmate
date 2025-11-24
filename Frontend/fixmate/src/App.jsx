import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./Pages/Loginpage";
import { Toaster } from "react-hot-toast";
import SignupPage from "./Pages/SignupPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="w-screen h-[100vh] bg-gray-800">
          <Toaster position="top-center" />
          <Routes path="/">
            <Route path="/" element={<h1>Homepage</h1>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
