import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { api } from "../api.ts";
import { Donation } from "@/types/Donation";
import { Residence } from "@/types/Residence";
import { EditDialog } from "./EditDialog";
import { EatUp } from "@/types/EatUps.tsx";

export function ContributePostCard() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [residences, setResidences] = useState<Residence[]>([]);
  const [eatups, setEatUps] = useState<EatUp[]>([]);
  const userId =
    sessionStorage.getItem("id") || sessionStorage.getItem("userId");

  const fetchData = async () => {
    try {
      console.log("Starting fetchData with userId:", userId);

      const [donationsRes, residencesRes, eatupsRes] = await Promise.all([
        api.get("/donation"),
        api.get("/residences"),
        api.get("/eatups"),
      ]);

      console.log("Raw API responses:", {
        donations: donationsRes,
        residences: residencesRes,
        eatups: eatupsRes,
      });

      // Handle donations
      const donationsData = Array.isArray(donationsRes.data)
        ? donationsRes.data
        : donationsRes.data?.data || [];
      console.log("Processed donations data:", donationsData);

      const userDonations = donationsData.filter((item: Donation) => {
        console.log("Checking donation item:", {
          itemAuthorId: item.authorId,
          userId: userId,
          matches: item.authorId === userId,
        });
        return item.authorId === userId;
      });

      // Handle residences
      const residencesData = Array.isArray(residencesRes.data)
        ? residencesRes.data
        : residencesRes.data?.data || [];
      console.log("Processed residences data:", residencesData);

      const userResidences = residencesData.filter((item: Residence) => {
        console.log("Checking residence item:", {
          itemOwner: item.owner,
          userId: userId,
          matches: item.owner === userId,
        });
        return item.owner === userId;
      });

      // Handle eatups
      const eatupsData = Array.isArray(eatupsRes.data)
        ? eatupsRes.data
        : eatupsRes.data?.data || [];
      console.log("Processed eatups data:", eatupsData);

      const userEatups = eatupsData.filter((item: EatUp) => {
        console.log("Checking eatup item:", {
          itemOwner: item.owner,
          userId: userId,
          matches: item.owner === userId,
        });
        return item.owner === userId;
      });

      console.log("Final filtered data:", {
        userDonations,
        userResidences,
        userEatups,
        userId,
      });

      setDonations(userDonations);
      setResidences(userResidences);
      setEatUps(userEatups);

      // Debug render data
      console.log("Data after state updates:", {
        donations: userDonations,
        residences: userResidences,
        eatups: userEatups,
      });
    } catch (error) {
      console.error("Error in fetchData:", error);
      setDonations([]);
      setResidences([]);
      setEatUps([]);
    }
  };

  useEffect(() => {
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
      await fetchData(); // Reuse the fetchData function
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="flex-1 p-6 bg-background">
      {console.log("Rendering with data:", { donations, residences, eatups })}
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
          ...eatups.map((item: EatUp) => ({ ...item, type: "EatUp" })),
        ].map((item) => (
          <Card
            key={item._id}
            className="p-4 md:p-6 mb-12 max-w-4xl mx-auto drop-shadow-xl shadow-black/10 dark:shadow-white/10"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-2/3">
                {item.media && item.media.length > 0 ? (
                  <img
                    src={item.media[0]}
                    alt="Post"
                    className="object-contain rounded-md max-h-[250px] max-w-[250px]"
                  />
                ) : (
                  <div className="bg-muted h-[250px] w-[250px] rounded-md flex items-center justify-center">
                    No Image
                  </div>
                )}
              </div>
              <div className="w-full md:w-1/3 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg md:text-xl mb-2">
                    {item.description || item.title}
                  </h3>
                  <p className="text-muted-foreground">Type: {item.type}</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <EditDialog item={item} type={item.type} onEdit={fetchData} />
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
