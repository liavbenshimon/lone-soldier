import { api } from "./api";
import { Donation } from "./types/Donation";
import { Residence } from "./types/Residence";
import { EatUp } from "./types/EatUps";

/**
 * Mock function that mimics fetching todos from a database.
 */
export const fetchDonations = async (): Promise<Donation[]> => {
  try {
    const res = await api.get("/donations");
    return res.data;
  } catch (error) {
    console.error("Error fetching donations:", error);
    return [];
  }
};

export const fetchResidences = async (): Promise<Residence[]> => {
  try {
    const res = await api.get("/residences");
    if (Array.isArray(res.data)) {
      return res.data;
    } else if (res.data && Array.isArray(res.data.data)) {
      return res.data.data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching residences:", error);
    return [];
  }
};

export const fetchEatUps = async (): Promise<EatUp[]> => {
  try {
    const res = await api.get("/eatups");
    return res.data.data;
  } catch (error) {
    console.error("Error fetching eatups:", error);
    return [];
  }
};
