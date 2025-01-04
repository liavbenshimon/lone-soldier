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

interface DetailsDialogProps {
  donation?: Donation | null;
  residence?: Residence | null;
  eatup?: EatUp | null;
  type: string;
}

export function DetailsDialog({
  donation,
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

      const response = await api.post(
        `/eatups/${eatup._id}/toggle-subscription`
      );
      console.log("Subscription response:", response.data);

      if (response.data) {
        setIsSubscribed(response.data.isSubscribed);
        setGuestCount(response.data.guestCount);

        // Invalidate and refetch channels after subscription change
        queryClient.invalidateQueries({ queryKey: ["channels"] });

        // Check if limit is reached after update
        if (eatup.limit && response.data.guestCount >= eatup.limit) {
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
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            {type === "EatUp"
              ? eatup?.title
              : type === "Donations"
              ? donation?.description
              : residence?.description}
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full h-[300px]">
            {(type === "Donations" && donation?.media?.length) ||
            (type === "Residences" && residence?.media?.length) ||
            (type === "EatUp" && eatup?.media?.length) ? (
              <img
                src={
                  type === "Donations"
                    ? donation?.media?.[0] || ""
                    : type === "Residences"
                    ? residence?.media?.[0] || ""
                    : eatup?.media?.[0] || ""
                }
                alt="Item"
                className="w-full h-full rounded-lg object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
                No Image Available
              </div>
            )}
          </div>
          <div className="space-y-4">
            {type === "Donations" && donation && (
              <>
                <DetailItem label="Category" value={donation.category} />
                <DetailItem label="Zone" value={donation.zone} />
                <DetailItem label="Description" value={donation.description} />
                <DetailItem
                  label="Created At"
                  value={
                    donation.createdAt
                      ? new Date(donation.createdAt).toLocaleDateString()
                      : ""
                  }
                />
                {donation.ownerPhone && (
                  <div className="mt-6 pt-6 border-t">
                    <DetailItem
                      label="Contact Phone"
                      value={donation.ownerPhone}
                    />
                  </div>
                )}
              </>
            )}
            {type === "Residences" && residence && (
              <>
                <DetailItem label="Type" value={residence.type} />
                <DetailItem label="Zone" value={residence.zone} />
                <DetailItem
                  label="Shelter"
                  value={residence.shalter ? "Yes" : "No"}
                />
                <DetailItem
                  label="Enter Date"
                  value={new Date(residence.enterDate).toLocaleDateString()}
                />
                <DetailItem label="Description" value={residence.description} />
                {residence.phone && (
                  <div className="mt-6 pt-6 border-t">
                    <DetailItem label="Contact Phone" value={residence.phone} />
                  </div>
                )}
              </>
            )}
            {type === "EatUp" && eatup && (
              <>
                <DetailItem label="Zone" value={eatup.zone} />
                <DetailItem
                  label="Date"
                  value={new Date(eatup.date).toLocaleDateString()}
                />
                <DetailItem
                  label="Kosher"
                  value={eatup.kosher ? "Yes" : "No"}
                />
                <DetailItem
                  label="Hosting"
                  value={eatup.hosting || "Not specified"}
                />
                <DetailItem label="Description" value={eatup.title} />
                {eatup.limit && (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-muted-foreground">
                      Guest Limit:{" "}
                    </span>
                    <span
                      className={`font-medium ${
                        guestCount >= eatup.limit
                          ? "text-destructive"
                          : "text-primary"
                      }`}
                    >
                      {guestCount}/{eatup.limit}
                    </span>
                    {guestCount >= eatup.limit && !isSubscribed && (
                      <span className="text-sm text-destructive">
                        (Fully Booked)
                      </span>
                    )}
                  </div>
                )}
                <div className="mt-6 pt-6 border-t space-y-4">
                  {eatup.phone && (
                    <DetailItem label="Contact Phone" value={eatup.phone} />
                  )}
                  <Button
                    onClick={handleSubscribe}
                    variant={isSubscribed ? "destructive" : "default"}
                    className="w-full"
                    disabled={isLoading || (!isSubscribed && isLimitReached)}
                  >
                    {isLoading
                      ? "Processing..."
                      : isSubscribed
                      ? "Unsubscribe"
                      : isLimitReached
                      ? "Fully Booked"
                      : "Subscribe"}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="font-semibold text-muted-foreground">{label}: </span>
      <span>{value}</span>
    </div>
  );
}
