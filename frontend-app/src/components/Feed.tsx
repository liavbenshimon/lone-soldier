"use strict"
import * as React from "react";
import { addDays } from "date-fns";
import { useState } from "react";
import { DetailsDialog } from "./DetailsDialog";
import { Input } from "./ui/input";
import { Skeleton } from "./ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import { Search } from "lucide-react";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "./DatePickerWithRange";
import { Donation } from "@/types/Donation";
import { Residence } from "@/types/Residence";
import { EatUp } from "@/types/EatUps.tsx";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchDonations, fetchResidences, fetchEatUps, fetchPosts, posts } from "@/query.ts";
import { PostCard } from "./PostCard";
import { Post } from "../components/PostCard";

const zones = ["North", "Center", "South", "all"];
const DonationsCategories = ["Furniture", "Electronics", "Clothes", "all"];
const residencesType = ["Rent", "Roommates", "all"];
const residencesShelter = ["Sheltered", "Unsheltered", "all"];
const EatUpsKosher = ["Kosher", "Not Kosher", "all"];
const EatUpsHosting = ["Family", "Organization", "all"];

const DonationSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-6 bg-muted/50 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="h-4 w-3/4" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
};

const PostSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-6 bg-muted/50 rounded-lg space-y-3">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-8 w-28" />
        </div>
      ))}
    </div>
  );
};

const ResidenceSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-6 bg-muted/50 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-6 w-24" />
          </div>
          <Skeleton className="h-4 w-full" />
          <div className="flex gap-3">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
};

const EatUpSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-6 bg-muted/50 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-7 w-1/3" />
            <Skeleton className="h-7 w-32" />
          </div>
          <Skeleton className="h-4 w-full" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-28" />
            <Skeleton className="h-8 w-28" />
            <Skeleton className="h-8 w-32" />
          </div>
        </div>
      ))}
    </div>
  );
};

export function Feed({ mode }: { mode: string }) {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [zone, setZone] = useState("all");
  const [category, setCategory] = useState("all");
  const [type, setType] = useState("all");
  const [shelter, setShelter] = useState("all");
  const [kosher, setKosher] = useState("all");
  const [hosting, setHosting] = useState("all");
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), -365),
    to: addDays(new Date(), 365),
  });
  
  const { data: postsData, isLoading: isPostsLoading } = useQuery({
    queryKey: ["posts"], 
    queryFn: fetchPosts, 
    staleTime: 1000 * 60 * 5, 
    enabled: mode === "post",
  });
  
  // const createPostMutation = useMutation({
  //   mutationFn: (postData) => api.post("/posts", postData), 
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["posts"]);
  //   },
  // });

  const { data: donationsData, isLoading: isDonationsLoading } = useQuery({
    queryKey: ["donations"],
    queryFn: fetchDonations,
    staleTime: 1000 * 60 * 5,
    enabled: mode === "Donations",
  });

  const { data: residencesData, isLoading: isResidencesLoading } = useQuery({
    queryKey: ["residences"],
    queryFn: fetchResidences,
    staleTime: 1000 * 60 * 5,
    enabled: mode === "Residences",
  });

  const { data: eatupsData, isLoading: isEatUpsLoading } = useQuery({
    queryKey: ["eatups"],
    queryFn: fetchEatUps,
    staleTime: 1000 * 60 * 5,
    enabled: mode === "EatUp",
  });

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
      const matchesShelter =
        shelter === "all" ||
        (shelter === "Sheltered" ? residence.shalter : !residence.shalter);

      return matchesSearch && matchesZone && matchesType && matchesShelter;
    });
  };


  const filterEatUps = (eatupsData: EatUp[]) => {
    return eatupsData.filter((eatup) => {
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

      return result;
    });
  };

  return (
    <div className="flex-1 p-6 bg-background text-foreground">
      <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-primary">
      <span className="bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text">
            Active
          </span>{" "}
          <span className="bg-green-500 text-transparent bg-clip-text">
            {mode}
          </span>
        </h2>

      {mode === 'post' ? ('') : (
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
        )}

        {/* Search and Filters Header */}
        
        {mode === "post" && isPostsLoading ? (
  <PostSkeleton />
) : mode === "post" && postsData && Array.isArray(postsData)? (
  // TODO: FIX SINTAX
  postsData.map((post: Post) => (<PostCard key={post._id} post={post} />))
) : (
  <div className="text-center py-4">No posts found</div>
)}


        {mode === "Donations" && isDonationsLoading ? (
          <DonationSkeleton />
        ) : (
          mode === "Donations" &&
          donationsData &&
          filterDonations(donationsData).map((donation: Donation) => (
            <DetailsDialog key={donation._id} donation={donation} type={mode} />
          ))
        )}

        {mode === "Residences" && isResidencesLoading ? (
          <ResidenceSkeleton />
        ) : mode === "Residences" &&
          residencesData &&
          residencesData.length > 0 ? (
          filterResidences(residencesData).map((residence: Residence) => (
            <DetailsDialog
              key={residence._id}
              residence={residence}
              type={mode}
            />
          ))
        ) : mode === "Residences" ? (
          <div className="text-center py-4">No residences found</div>
        ) : null}

        {mode === "EatUp" && isEatUpsLoading ? (
  <EatUpSkeleton />
) : mode === "EatUp" && eatupsData && Array.isArray(eatupsData) ? ( 
  filterEatUps(eatupsData).map((eatup: EatUp) => (
    <DetailsDialog key={eatup._id} eatup={eatup} type={mode} />
  ))
) : mode === "EatUp"?(
  <div className="text-center py-4">No eatups found</div> 
): null}

{/* {mode === "post" && isPostsLoading ? (
  <PostSkeleton />
) : mode === "post" && postsData && Array.isArray(postsData) ? ( 
  postsData.map((post: posts) => (
    <DetailsDialog key={post._id} post={post} type={mode} />
  ))
) : mode === "post" ? (
  <div className="text-center py-4">No posts found</div> 
) : null} */}

      </div>  
    </div>
  );
}
