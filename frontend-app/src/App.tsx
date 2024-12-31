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
import ContactUs from "./components/ContactUs";
import Social from "./pages/Social";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RequestForm from "./components/RequestForm";
export default function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
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
              <Route path="/RequestForm" element={<RequestForm />} />

              <Route path="*" element={<h1>404</h1>} />
            </Routes>
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </>
  );
}
