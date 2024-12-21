import * as React from "react";
import { addDays } from "date-fns";
import { useState, useEffect } from "react";
import { DetailsDialog } from "./DetailsDialog";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "./DatePickerWithRange";
import { api } from "../api.ts";
import { Donation } from "@/types/Donation";
import { Residence } from "@/types/Residence";
import { EatUp } from "@/types/EatUps.tsx";

const zones = ["North", "Center", "South", "all"];
//donations
const DonationsCategories = ["Furniture", "Electronics", "Clothes", "all"];
//residences
const residencesType = ["Rent", "Roommates", "all"];
const residencesShelter = ["Sheltered", "Unsheltered", "all"];
//eatup
const EatUpsKosher = ["Kosher", "Not Kosher", "all"];
const EatUpsHosting = ["Family", "Organization", "all"];

export function Feed({ mode }: { mode: string }) {
  const [search, setSearch] = useState("");
  const [zone, setZone] = useState("all");
  //donations
  const [category, setCategory] = useState("all");
  //residences
  const [type, setType] = useState("all");
  const [shelter, setShelter] = useState("all");
  //eatup
  const [kosher, setKosher] = useState("all");
  const [hosting, setHosting] = useState("all");
  const [donations, setDonations] = useState<Donation[]>([]);
  const [residences, setResidences] = useState<Residence[]>([]);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), -365),
    to: addDays(new Date(), 365),
  });
  const [eatups, setEatUps] = useState<EatUp[]>([]);

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const res = await api.get("/donation");
        console.log("Raw donations response:", res.data);
        if (Array.isArray(res.data)) {
          setDonations(res.data);
          console.log("Processed donations:", res.data);
        } else if (res.data && Array.isArray(res.data.data)) {
          setDonations(res.data.data);
          console.log("Processed donations:", res.data.data);
        } else {
          console.error("Invalid donations response structure:", res.data);
          setDonations([]);
        }
      } catch (error) {
        console.error("Error fetching donations:", error);
        setDonations([]);
      }
    };
    const fetchResidences = async () => {
      try {
        const res = await api.get("/residences");
        console.log("Raw residences response:", res.data);
        if (Array.isArray(res.data)) {
          setResidences(res.data);
          console.log("Processed residences:", res.data);
        } else if (res.data && Array.isArray(res.data.data)) {
          setResidences(res.data.data);
          console.log("Processed residences:", res.data.data);
        } else {
          console.error("Invalid residences response structure:", res.data);
          setResidences([]);
        }
      } catch (error) {
        console.error("Error fetching residences:", error);
        setResidences([]);
      }
    };
    const fetchEatUps = async () => {
      try {
        const res = await api.get("/eatups");
        console.log("EatUps response:", res.data);
        setEatUps(res.data.data);
      } catch (error) {
        console.error("Error fetching EatUps:", error);
      }
    };
    if (mode === "Donations") {
      fetchDonation();
    }
    if (mode === "Residences") {
      fetchResidences();
    }
    if (mode === "EatUp") {
      fetchEatUps();
    }
  }, [mode]);
  console.log(mode);

  const filterDonations = (donations: Donation[]) => {
    if (!donations) return [];

    return donations.filter((donation) => {
      if (!donation) return false;

      const matchesSearch = donation.description
        ? donation.description.toLowerCase().includes(search.toLowerCase())
        : true;
      const matchesZone = zone === "all" || donation.zone === zone;
      const matchesCategory =
        category === "all" || donation.category === category;

      return matchesSearch && matchesZone && matchesCategory;
    });
  };

  const filterResidences = (residences: Residence[]) => {
    if (!residences) return [];

    return residences.filter((residence) => {
      if (!residence) return false;

      const matchesSearch = residence.description
        ? residence.description.toLowerCase().includes(search.toLowerCase())
        : true;
      const matchesZone = zone === "all" || residence.zone === zone;
      const matchesType = type === "all" || residence.type === type;
      const matchesShelter = shelter === "all" || residence.shelter === shelter;

      return matchesSearch && matchesZone && matchesType && matchesShelter;
    });
  };

  const filterEatUps = (eatups: EatUp[]) => {
    console.log("Filtering eatups:", eatups);
    return eatups.filter((eatup) => {
      console.log("Processing eatup:", eatup);
      const matchesSearch = eatup.title
        ? eatup.title.toLowerCase().includes(search.toLowerCase())
        : true;
      const matchesZone = zone === "all" || eatup.zone === zone;
      const matchesKosher =
        kosher === "all" ||
        (kosher === "Kosher" ? eatup.kosher : !eatup.kosher);
      const matchesHosting = hosting === "all" || eatup.hosting === hosting;

      const eatupDate = new Date(eatup.date);
      const matchesDate =
        !date?.from ||
        !date?.to ||
        (eatupDate.getTime() >= date.from.getTime() &&
          eatupDate.getTime() <= date.to.getTime());

      const result =
        matchesSearch &&
        matchesZone &&
        matchesKosher &&
        matchesHosting &&
        matchesDate;

      console.log("Filter result:", {
        matchesSearch,
        matchesZone,
        matchesKosher,
        matchesHosting,
        matchesDate,
        eatupDate,
        fromDate: date?.from,
        toDate: date?.to,
      });
      return result;
    });
  };

  return (
    <div className="flex-1 p-6 bg-background">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold mb-8 text-center">
          <span className="bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text">
            Active
          </span>{" "}
          <span className="bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
            {mode}
          </span>
        </h2>

        {/* Search and Filters Header */}
        <div className="bg-muted/50 p-4 rounded-lg space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search requests..."
              className="pl-10 bg-background"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <Select onValueChange={setZone}>
              <SelectTrigger className="w-full md:w-[180px] bg-background">
                <SelectValue placeholder="Zone" />
              </SelectTrigger>
              <SelectContent>
                {zones.map((zone) => (
                  <SelectItem key={zone} value={zone}>
                    {zone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {mode === "Donations" && (
              <Select onValueChange={setCategory}>
                <SelectTrigger className="w-full md:w-[180px] bg-background">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {DonationsCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {mode === "Residences" && (
              <>
                <Select onValueChange={setType}>
                  <SelectTrigger className="w-full md:w-[180px] bg-background">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {residencesType.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select onValueChange={setShelter}>
                  <SelectTrigger className="w-full md:w-[180px] bg-background">
                    <SelectValue placeholder="Shelter" />
                  </SelectTrigger>
                  <SelectContent>
                    {residencesShelter.map((shelter) => (
                      <SelectItem key={shelter} value={shelter}>
                        {shelter}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            )}
            {mode === "EatUp" && (
              <>
                <Select onValueChange={setKosher}>
                  <SelectTrigger className="w-full md:w-[180px] bg-background">
                    <SelectValue placeholder="Kosher" />
                  </SelectTrigger>
                  <SelectContent>
                    {EatUpsKosher.map((k) => (
                      <SelectItem key={k} value={k}>
                        {k}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select onValueChange={setHosting}>
                  <SelectTrigger className="w-full md:w-[180px] bg-background">
                    <SelectValue placeholder="Hosting" />
                  </SelectTrigger>
                  <SelectContent>
                    {EatUpsHosting.map((h) => (
                      <SelectItem key={h} value={h}>
                        {h}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <DatePickerWithRange date={date} setDate={setDate} />
              </>
            )}
          </div>
        </div>
        {mode === "Donations" &&
          filterDonations(donations).map((donation: Donation) => (
            <DetailsDialog key={donation._id} donation={donation} type={mode} />
          ))}
        {mode === "Residences" && residences && residences.length > 0 ? (
          filterResidences(residences).map((residence: Residence) => (
            <DetailsDialog
              key={residence._id}
              residence={residence}
              type={mode}
            />
          ))
        ) : mode === "Residences" ? (
          <div className="text-center py-4">No residences found</div>
        ) : null}
        {mode === "EatUp" &&
          filterEatUps(eatups).map((eatup: EatUp) => (
            <DetailsDialog key={eatup._id} eatup={eatup} type={mode} />
          ))}
      </div>
    </div>
  );
}
