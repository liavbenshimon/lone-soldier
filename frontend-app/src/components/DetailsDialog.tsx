import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "./ui/card";
import { Donation } from "@/types/Donation";
import { Residence } from "@/types/Residence";
import { EatUp } from "@/types/EatUps";
import { api } from "@/api";
import { Button } from "./ui/button";

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
                  {new Date(donation?.createdAt).toLocaleDateString()}
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
                  {new Date(residence?.enterDate).toLocaleDateString()}
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
              <div>
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
                    ? donation?.media[0]
                    : type === "Residences"
                    ? residence?.media[0]
                    : eatup?.media[0]
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
                  value={new Date(donation.createdAt).toLocaleDateString()}
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
                <DetailItem label="Shelter" value={residence.shelter} />
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
                <DetailItem label="Hosting" value={eatup.hosting} />
                <DetailItem label="Description" value={eatup.title} />
                {eatup.phone && (
                  <div className="mt-6 pt-6 border-t">
                    <DetailItem label="Contact Phone" value={eatup.phone} />
                  </div>
                )}
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
