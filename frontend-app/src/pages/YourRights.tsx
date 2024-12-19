import React, { useState } from "react";
import { rightsData } from "@/data/rightsData";
import RightsFilter from "@/components/RightsFilter";
import RightsList from "@/components/RightsList";
import { filterRights } from "@/data/filterRights";

const YourRights: React.FC = () => {
  const [filteredRights, setFilteredRights] = useState<typeof rightsData>([]);

  const handleApplyFilters = (filters: Partial<typeof rightsData[0]["filters"]>) => {
    const cleanedFilters = Object.fromEntries(
      Object.entries(filters).map(([key, value]) => [key, value ?? null])
    ) as Partial<typeof rightsData[0]["filters"]>;

    const results = filterRights(rightsData, cleanedFilters);
    setFilteredRights(results);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Your Rights</h1>
      <RightsFilter onApplyFilters={handleApplyFilters} />
      <div className="mt-6">
        {filteredRights.length === 0 ? (
          <p className="text-gray-500">No rights to display. Please apply filters.</p>
        ) : (
          <RightsList rights={filteredRights} />
        )}
      </div>
    </div>
  );
};

export default YourRights;
