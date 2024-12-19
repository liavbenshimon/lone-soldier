import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { api } from "../api.ts";
import { Donation } from "@/types/Donation";
import { Residence } from "@/types/Residence";
import { EditDialog } from "./EditDialog";
import { EatUp } from "@/types/EatUps.tsx";

export function ContributePostCard() {
  const [donations, setDonations] = useState([]);
  const [residences, setResidences] = useState([]);
  const [eatups, setEatUps] = useState([]);
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [donationsRes, residencesRes, eatupsRes] = await Promise.all([
          api.get("/donation"),
          api.get("/residences"),
          api.get("/eatups"),
        ]);

        // Filter items by userId
        const userDonations = donationsRes.data.filter(
          (item: Donation) => item.authorId === userId
        );
        const userResidences = residencesRes.data.filter(
          (item: Residence) => item.authorId === userId
        );
        const userEatups = eatupsRes.data.filter(
          (item: EatUp) => item.authorId === userId
        );

        setDonations(userDonations);
        setResidences(userResidences);
        setEatUps(userEatups);
      } catch (error) {
        console.error(error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const handleEdit = (id: string, type: string) => {
    // Implement edit logic
    console.log(`Editing ${type} with id: ${id}`);
  };

  const handleDelete = async (id: string, type: string) => {
    try {
      const endpoint =
        type === "Donation"
          ? "donation"
          : type === "Residence"
          ? "residences"
          : "eatups";

      await api.delete(`/${endpoint}/${id}`);
      const fetchData = async () => {
        const [donationsRes, residencesRes, eatupsRes] = await Promise.all([
          api.get("/donation"),
          api.get("/residences"),
          api.get("/eatups"),
        ]);

        setDonations(donationsRes.data);
        setResidences(residencesRes.data);
        setEatUps(eatupsRes.data);
      };
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex-1 p-6 bg-background">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold mb-8 text-center">
          <span className="bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text">
            My Active
          </span>{" "}
          <span className="bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
            Listings
          </span>
        </h2>

        {[
          ...donations.map((item: Donation) => ({ ...item, type: "Donation" })),
          ...residences.map((item: Residence) => ({
            ...item,
            type: "Residence",
          })),
          // ...eatups.map((item: EatUp) => ({ ...item, type: "EatUp" })),
        ].map((item) => (
          <Card
            key={item._id}
            className="p-4 md:p-6 mb-12 max-w-4xl mx-auto drop-shadow-xl shadow-black/10 dark:shadow-white/10"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-2/3">
                <img
                  src={item.media[0]}
                  alt="Post"
                  className="object-contain rounded-md max-h-[250px] max-w-[250px]"
                />
              </div>
              <div className="w-full md:w-1/3 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg md:text-xl mb-2">
                    {item.description}
                  </h3>
                  <p className="text-muted-foreground">Type: {item.type}</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <EditDialog
                    item={item}
                    type={item.type}
                    onEdit={() => {
                      const fetchData = async () => {
                        const [donationsRes, residencesRes, eatupsRes] =
                          await Promise.all([
                            api.get("/donation"),
                            api.get("/residences"),
                            api.get("/eatups"),
                          ]);

                        setDonations(donationsRes.data);
                        setResidences(residencesRes.data);
                        setEatUps(eatupsRes.data);
                      };
                      fetchData();
                    }}
                  />
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(item._id, item.type)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
