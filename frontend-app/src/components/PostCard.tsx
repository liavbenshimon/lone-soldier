import { Residence } from "@/types/Residence";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Donation } from "@/types/Donation";

export function PostCard({
  donation,
  residences,
  type,
}: {
  donation: Donation | null;
  residences: Residence | null;
  type: string;
}) {
  return (
    <Card className="p-4 md:p-6 mb-12 max-w-4xl mx-auto drop-shadow-xl shadow-black/10 dark:shadow-white/10">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3 flex justify-center items-center">
          {type === "Donations" && (
            <img
              src={donation?.media[0]}
              alt="Post"
              className=" object-contain rounded-md max-h-[250px] max-w-[250px]"
            />
          )}
          {type === "Residences" && (
            <img
              src={residences?.media[0]}
              alt="Post"
              className=" object-contain rounded-md max-h-[250px] max-w-[250px]"
            />
          )}
        </div>

        <div className="w-full md:w-1/3 flex flex-col justify-between"></div>
        <div>
          <div className="flex items-center mb-4">
            <div>
              {type === "Donations" && (
                <h3 className="font-bold text-lg md:text-xl">
                  {donation?.description}
                </h3>
              )}
              {type === "Residences" && (
                <h3 className="font-bold text-lg md:text-xl">
                  {residences?.description}
                </h3>
              )}
              {type === "Residences" && (
                <p className="text-muted-foreground text-sm md:text-base">
                  {residences?.enterDate}
                </p>
              )}
              {type === "Donations" && (
                <p className="text-muted-foreground text-sm md:text-base">
                  {donation?.createdAt}
                </p>
              )}
            </div>
          </div>
          {type === "Donations" && (
            <p className="mb-4 text-muted-foreground leading-relaxed">
              {donation?.category}
            </p>
          )}
          {type === "Residences" && (
            <p className="mb-4 text-muted-foreground leading-relaxed">
              {residences?.type}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
