import * as React from "react";
import { addDays } from "date-fns";
import { useState, useEffect } from "react";
import { PostCard } from "./PostCard";
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
  const [donations, setDonations] = useState([]);
  const [residences, setResidences] = useState([]);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        new Date().getDate()
      ),
      20
    ),
  });
  const [eatups, setEatUps] = useState<EatUp[]>([]);
  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const res = await api.get("/donation");
        setDonations(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchResidences = async () => {
      try {
        const res = await api.get("/residences");
        setResidences(res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchEatUps = async () => {
      try {
        const res = await api.get("/eatups");
        setEatUps(res.data);
      } catch (error) {
        console.error(error);
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
  }, []);
  console.log(mode);

  const filterDonations = (donations: Donation[]) => {
    return donations.filter((donation) => {
      const matchesSearch = donation.description
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesZone = zone === "all" || donation.zone === zone;
      const matchesCategory =
        category === "all" || donation.category === category;

      return matchesSearch && matchesZone && matchesCategory;
    });
  };

  const filterResidences = (residences: any[]) => {
    return residences.filter((residence) => {
      const matchesSearch = residence.description
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesZone = zone === "all" || residence.zone === zone;
      const matchesType = type === "all" || residence.type === type;
      const matchesShelter = shelter === "all" || residence.shelter === shelter;

      return matchesSearch && matchesZone && matchesType && matchesShelter;
    });
  };

  const filterEatUps = (eatups: EatUp[]) => {
    if (!Array.isArray(eatups)) return [];

    return eatups.filter((eatup) => {
      const matchesSearch = eatup.description
        ? eatup.description.toLowerCase().includes(search.toLowerCase())
        : true;
      const matchesZone = zone === "all" || eatup.zone === zone;
      const matchesKosher = kosher === "all" || String(eatup.kosher) === kosher;
      const matchesHosting = hosting === "all" || eatup.hosting === hosting;
      const matchesDate =
        !date?.from ||
        (new Date(eatup.date) >= date.from &&
          new Date(eatup.date) <= (date.to || date.from));

      return (
        matchesSearch &&
        matchesZone &&
        matchesKosher &&
        matchesHosting &&
        matchesDate
      );
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
              <Select>
                <SelectTrigger className="w-full md:w-[180px] bg-background">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>

                <SelectContent>
                  {DonationsCategories.map((category) => (
                    <SelectItem
                      key={category}
                      value={category}
                      onClick={() => setCategory(category)}
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {mode === "Residences" && (
              <>
                <Select>
                  <SelectTrigger className="w-full md:w-[180px] bg-background">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {residencesType.map((type) => (
                      <SelectItem
                        key={type}
                        value={type}
                        onClick={() => setType(type)}
                      >
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full md:w-[180px] bg-background">
                    <SelectValue placeholder="Shelter" />
                  </SelectTrigger>
                  <SelectContent>
                    {residencesShelter.map((shelter) => (
                      <SelectItem
                        key={shelter}
                        value={shelter}
                        onClick={() => setShelter(shelter)}
                      >
                        {shelter}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            )}
            {mode === "EatUp" && (
              <>
                <Select>
                  <SelectTrigger className="w-full md:w-[180px] bg-background">
                    <SelectValue placeholder="Kosher" />
                  </SelectTrigger>
                  <SelectContent>
                    {EatUpsKosher.map((kosher) => (
                      <SelectItem
                        key={kosher}
                        value={kosher}
                        onClick={() => setKosher(kosher)}
                      >
                        {kosher}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full md:w-[180px] bg-background">
                    <SelectValue placeholder="Hosting" />
                  </SelectTrigger>
                  <SelectContent>
                    {EatUpsHosting.map((hosting) => (
                      <SelectItem
                        key={hosting}
                        value={hosting}
                        onClick={() => setHosting(hosting)}
                      >
                        {hosting}
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
            <PostCard
              key={donation._id}
              residences={null}
              donation={donation}
              type={mode}
            />
          ))}
        {mode === "Residences" &&
          filterResidences(residences).map((residence: Residence) => (
            <PostCard
              key={residence._id}
              residences={residence}
              donation={null}
              type={mode}
            />
          ))}
        {mode === "EatUp" &&
          filterEatUps(eatups).map((eatup: EatUp) => (
            <PostCard
              key={eatup._id}
              residences={null}
              donation={null}
              eatup={eatup}
              type={mode}
            />
          ))}
      </div>
    </div>
  );
}
