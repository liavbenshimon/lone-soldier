import { api } from "./api";
import { Donation } from "./types/Donation";
import { Residence } from "./types/Residence";
import { EatUp } from "./types/EatUps";
import store from "./Redux/store";
import { logout } from "./Redux/authSlice";
import { AxiosError } from "axios";

const handleUnauthorized = () => {
  sessionStorage.clear();
  store.dispatch(logout());
  window.location.href = "/";
};

export const fetchDonations = async (): Promise<Donation[]> => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      handleUnauthorized();
      return [];
    }
    const res = await api.get("/donation");
    return res.data;
  } catch (error) {
    console.error("Error fetching donations:", error);
    if (
      (error as AxiosError)?.response?.status === 401 ||
      (error as AxiosError)?.response?.status === 403
    ) {
      handleUnauthorized();
    }
    return [];
  }
};

export const fetchResidences = async (): Promise<Residence[]> => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      handleUnauthorized();
      return [];
    }
    const res = await api.get("/residences");
    if (Array.isArray(res.data)) {
      return res.data;
    } else if (res.data && Array.isArray(res.data.data)) {
      return res.data.data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching residences:", error);
    if (
      (error as AxiosError)?.response?.status === 401 ||
      (error as AxiosError)?.response?.status === 403
    ) {
      handleUnauthorized();
    }
    return [];
  }
};

export const fetchEatUps = async (): Promise<EatUp[]> => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      handleUnauthorized();
      return [];
    }
    const res = await api.get("/eatups");
    if (Array.isArray(res.data)) {
      return res.data;
    } else if (res.data && Array.isArray(res.data.data)) {
      return res.data.data;
    }
    console.warn("Unexpected EatUps response format:", res.data);
    return [];
  } catch (error) {
    console.error("Error fetching eatups:", error);
    if (
      (error as AxiosError)?.response?.status === 401 ||
      (error as AxiosError)?.response?.status === 403
    ) {
      handleUnauthorized();
    }
    return [];
  }
};
