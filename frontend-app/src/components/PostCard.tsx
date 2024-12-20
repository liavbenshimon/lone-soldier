import { Residence } from "@/types/Residence";
import { Card } from "./ui/card";
import { Donation } from "@/types/Donation";
import { EatUp } from "@/types/EatUps";

export function PostCard({
  donation,
  residences,
  eatup,
  type,
}: {
  donation: Donation | null;
  residences: Residence | null;
  eatup: EatUp | null;
  type: string;
}) {
  return (
    <Card className="p-4 md:p-6 mb-12 max-w-4xl mx-auto drop-shadow-xl shadow-black/10 dark:shadow-white/10">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3 flex justify-center items-center">
          {type === "Donations" && (
            <img
            src={donation?.media?.[0] || ''}
              alt="Post"
              className="object-contain rounded-md max-h-[250px] max-w-[250px]"
            />
          )}
          {type === "Residences" && (
            <img
              src={residences?.media?.[0] || ''}
              alt="Post"
              className="object-contain rounded-md max-h-[250px] max-w-[250px]"
            />
          )}
          {type === "EatUp" && (
            <img
              src={eatup?.media?.[0] || ''}
              alt="Post"
              className="object-contain rounded-md max-h-[250px] max-w-[250px]"
            />
          )}
        </div>
        <div className="w-full md:w-1/3 flex flex-col justify-between">
          <div>
            {type === "EatUp" && (
              <>
                <h3 className="font-bold text-lg md:text-xl">{eatup?.title}</h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  {eatup?.date && new Date(eatup.date).toLocaleDateString()}
                </p>
                <p className="mb-4 text-muted-foreground leading-relaxed">
                  Kosher: {eatup?.kosher ? "Yes" : "No"}
                </p>
                <p className="mb-4 text-muted-foreground leading-relaxed">
                  Hosting: {eatup?.hosting}
                </p>
              </>
            )}
            {type === "Donations" && (
              <>
                <h3 className="font-bold text-lg md:text-xl">
                  {donation?.description}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  {donation?.createdAt}
                </p>
                <p className="mb-4 text-muted-foreground leading-relaxed">
                  {donation?.category}
                </p>
              </>
            )}
            {type === "Residences" && (
              <>
                <h3 className="font-bold text-lg md:text-xl">
                  {residences?.description}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  {residences?.enterDate}
                </p>
                <p className="mb-4 text-muted-foreground leading-relaxed">
                  {residences?.type}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
