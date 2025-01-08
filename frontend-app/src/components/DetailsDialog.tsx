import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Donation } from "@/types/Donation";
import { Residence } from "@/types/Residence";
import { EatUp } from "@/types/EatUps";
import { useState, useEffect } from "react";
import { api } from "@/api";
import { useQueryClient } from "@tanstack/react-query";
import { posts } from "@/query";

interface DetailsDialogProps {
  donation?: Donation | null;
  residence?: Residence | null;
  eatup?: EatUp | null;
  type: string,
  post?: posts | null;
}

export function DetailsDialog({
  donation,
  post,
  residence,
  eatup,
  type,
}: DetailsDialogProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [guestCount, setGuestCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const queryClient = useQueryClient();

  const handleSubscribe = async () => {
    if (!eatup?._id) return;

    setIsLoading(true);
    try {
      // Log for debugging
      console.log("Attempting to subscribe to EatUp:", eatup._id);

      const response = await api.post(`/eatups/${eatup._id}/subscribe`);
      console.log("Subscription response:", response.data);

      if (response.data) {
        setIsSubscribed(!isSubscribed);
        setGuestCount(response.data.eatup.guests?.length || 0);

        // Invalidate and refetch channels after subscription change
        queryClient.invalidateQueries({ queryKey: ["channels"] });

        // Check if limit is reached after update
        if (eatup.limit && response.data.eatup.guests?.length >= eatup.limit) {
          setIsLimitReached(true);
        } else {
          setIsLimitReached(false);
        }

        // Show success message
        alert(response.data.message);
      }
    } catch (error: any) {
      console.error("Subscription error:", error);
      console.error("Error response:", error.response);

      if (error.response?.status === 404) {
        alert(error.response.data.message || "Channel not found");
      } else if (error.response?.status === 400) {
        alert(error.response.data.message);
        if (error.response.data.message === "Guest limit reached") {
          setIsLimitReached(true);
        }
      } else {
        alert("Error toggling subscription. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Update local state when eatup prop changes
  useEffect(() => {
    if (eatup) {
      const currentUserId = sessionStorage.getItem("id");
      console.log("Current user ID:", currentUserId);
      console.log("EatUp guests:", eatup.guests);

      const subscribed = eatup.guests?.includes(currentUserId || "") || false;
      console.log("Is subscribed:", subscribed);

      setIsSubscribed(subscribed);
      setGuestCount(eatup.guests?.length || 0);

      // Check if limit is reached on initial load
      if (eatup.limit && (eatup.guests?.length || 0) >= eatup.limit) {
        setIsLimitReached(true);
      } else {
        setIsLimitReached(false);
      }
    }
  }, [eatup]);
  console.log(post);
  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          {type === "Donations" && (
            <div className="p-4 flex gap-4">
              <div className="w-[150px] h-[150px]">
                {donation?.media && donation.media.length > 0 ? (
                  <img
                    src={donation.media[0]}
                    alt="Donation"
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <div className="w-full h-full bg-muted rounded-md flex items-center justify-center">
                    No Image
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-lg md:text-xl">
                  {donation?.description}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  {donation?.createdAt &&
                    new Date(donation.createdAt).toLocaleDateString()}
                </p>
                <p className="mb-4 text-muted-foreground leading-relaxed">
                  {donation?.category}
                </p>
              </div>
            </div>
          )}
          {type === "post" && (
            <div className="p-4 flex gap-4">
              <div className="w-[150px] h-[150px]">
                {post?.image? (
                  <img
                    src={post.image}
                    alt="post"
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <div className="w-full h-full bg-muted rounded-md flex items-center justify-center">
                    No Image
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-lg md:text-xl">
                  {post?.content}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  {post?.createdAt &&
                    new Date(post.createdAt).toLocaleDateString()}
                </p>
                <p className="mb-4 text-muted-foreground leading-relaxed">
                  {post?.likes.length}
                </p>
              </div>
            </div>
          )}
          {type === "Residences" && (
            <div className="p-4 flex gap-4">
              <div className="w-[150px] h-[150px]">
                {residence?.media && residence.media.length > 0 ? (
                  <img
                    src={residence.media[0]}
                    alt="Residence"
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <div className="w-full h-full bg-muted rounded-md flex items-center justify-center">
                    No Image
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-lg md:text-xl">
                  {residence?.description}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  {residence?.enterDate &&
                    new Date(residence.enterDate).toLocaleDateString()}
                </p>
                <p className="mb-4 text-muted-foreground leading-relaxed">
                  {residence?.type}
                </p>
              </div>
            </div>
          )}
          {type === "EatUp" && (
            <div className="p-4 flex gap-4">
              <div className="w-[150px] h-[150px]">
                {eatup?.media && eatup.media.length > 0 ? (
                  <img
                    src={eatup.media[0]}
                    alt="EatUp"
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <div className="w-full h-full bg-muted rounded-md flex items-center justify-center">
                    No Image
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg md:text-xl">{eatup?.title}</h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  {eatup?.date && new Date(eatup.date).toLocaleDateString()}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Kosher: {eatup?.kosher ? "Yes" : "No"}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Hosting: {eatup?.hosting || "Not specified"}
                </p>
                {eatup?.limit && (
                  <p className="text-muted-foreground leading-relaxed">
                    Guests:{" "}
                    <span
                      className={
                        guestCount >= (eatup.limit || 0)
                          ? "text-destructive"
                          : "text-primary"
                      }
                    >
                      {guestCount}/{eatup.limit}
                    </span>
                  </p>
                )}
              </div>
            </div>
          )}
        </Card>
        </DialogTrigger>
      {/* DialogContent para post removido */}
      {(type === "Donations" || type === "Residences" || type === "EatUp") && (
        <DialogContent className="max-w-[800px]">
          {/* Conteúdo detalhado apenas para os tipos especificados */}
        </DialogContent>
      )}
    </Dialog>
  );
}