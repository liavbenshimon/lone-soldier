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
import ProtectedRoute from "./components/ProtectedRoute";
import VouchersGrid from "./components/VouchersGrid";

// Public routes that don't need protection
const publicRoutes = [
  "/",
  "/login",
  "/signup",
  "/pending",
  "/termofservice",
  "/terms",
  "/contact",
];

function AppRoutes() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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

  const isPublicRoute = (path: string) => {
    return publicRoutes.includes(path) || path.startsWith("/termofservice");
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/pending" element={<PendingPage />} />
      <Route path="/termofservice" element={<Tos />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/contact" element={<ContactUs />} />

      {/* Protected Routes */}
      <Route
        path="/contribute"
        element={
          <ProtectedRoute>
            <ContributePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/logout"
        element={
          <ProtectedRoute>
            <Logout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/new-post"
        element={
          <ProtectedRoute>
            <NewPost />
          </ProtectedRoute>
        }
      />
      <Route
        path="/rights"
        element={
          <ProtectedRoute>
            <YourRights />
          </ProtectedRoute>
        }
      />
      <Route
        path="/social"
        element={
          <ProtectedRoute>
            <Social />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/queue"
        element={
          <ProtectedRoute>
            <AdminQueue />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-eatups"
        element={
          <ProtectedRoute>
            <MyEatUps />
          </ProtectedRoute>
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage mode="Donations" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/home/donations"
        element={
          <ProtectedRoute>
            <HomePage mode="Donations" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/home/residences"
        element={
          <ProtectedRoute>
            <HomePage mode="Residences" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/home/eatup"
        element={
          <ProtectedRoute>
            <HomePage mode="EatUp" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/channel/:channelId"
        element={
          <ProtectedRoute>
            <ChannelPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/RequestForm"
        element={
          <ProtectedRoute>
            <RequestForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Vouchers"
        element={
          <ProtectedRoute>
            <VouchersGrid />
          </ProtectedRoute>
        }
      />

      {/* 404 Route */}
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}

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
