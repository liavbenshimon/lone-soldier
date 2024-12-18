import HomePage from "./pages/HomePage";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Tos from "./pages/Tos";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />

          <Route path="/home" element={<HomePage mode="Donations" />} />
          <Route
            path="/home/donations"
            element={<HomePage mode="Donations" />}
          />
          <Route
            path="/home/residences"
            element={<HomePage mode="Residences" />}
          />
          <Route path="/home/eatup" element={<HomePage mode="EatUp" />} />

          <Route path="/Login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/termofservice" element={<Tos />} />

          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
