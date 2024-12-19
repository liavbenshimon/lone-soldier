import ContributePage from "./pages/Contribute";
import HomePage from "./pages/HomePage";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import NewPost from "./pages/NewPost";
import SignUp from "./pages/Signup";
import Tos from "./pages/Tos";
import YourRights from "./pages/YourRights";
import Terms from "./components/Terms";
import ContactUs from "./components/ContactUs"
import Social from "./pages/Social";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/contribute" element={<ContributePage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/new-post" element={<NewPost />} />
          {/* <Route path="/test" element={<ImageUpload />} /> */}
          <Route path="/rights" element={<YourRights />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<ContactUs />} />

          <Route path="/home/social" element={<Social />} />

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
