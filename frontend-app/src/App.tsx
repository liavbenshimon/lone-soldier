import ContributePage from "./pages/Contribute";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";

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

import PendingPage from "./pages/PendingPage";
import AdminQueue from "./pages/AdminQueue";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { api } from "./api";
import ChannelPage from "./pages/ChannelPage";
import MyEatUps from "./pages/MyEatUps";

function AppRoutes() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      // Set token in API headers
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // Fetch user data
      const fetchUser = async () => {
        try {
          const response = await api.get("/users/me");
          console.log(response.data);
          dispatch({ type: "user/setUser", payload: response.data });
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          localStorage.removeItem("token");
        }
      };
      fetchUser();
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/contribute" element={<ContributePage />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/new-post" element={<NewPost />} />
      <Route path="/rights" element={<YourRights />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/pending" element={<PendingPage />} />
      <Route path="/social" element={<Social />} />
      <Route path="/admin/queue" element={<AdminQueue />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/my-eatups" element={<MyEatUps />} />

      <Route path="/home" element={<HomePage mode="Donations" />} />
      <Route path="/home/donations" element={<HomePage mode="Donations" />} />
      <Route path="/home/residences" element={<HomePage mode="Residences" />} />
      <Route path="/home/eatup" element={<HomePage mode="EatUp" />} />

      <Route path="/Login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/termofservice" element={<Tos />} />

      <Route path="/channel/:channelId" element={<ChannelPage />} />
      <Route path="/RequestForm" element={<RequestForm />} />

      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}
//

export default function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </>
  );
}
