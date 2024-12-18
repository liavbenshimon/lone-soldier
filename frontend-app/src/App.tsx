import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SingUp from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/singup" element={<SingUp />} />
          {/* <Route path="/home" element={<HomePage />} />  */}
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
