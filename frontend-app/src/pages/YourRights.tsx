import React, { useState } from "react";
import RightsFilter from "@/components/RightsFilter";
import RightsList from "@/components/RightsList";
import { rightsData } from "@/data/rightsData";

const YourRights: React.FC = () => {
    const [filteredRights, setFilteredRights] = useState<typeof rightsData>([]);
    const [activeFilters, setActiveFilters] = useState<any>({});
  
    const handleApplyFilters = (filters: any) => {
      console.log("Filters received:", filters);
      setActiveFilters(filters);
    };
  
    const applyFiltersToData = () => {
        const filtered = rightsData.filter((right) => {
          return (
            (activeFilters.loneSoldier === null || right.filters.loneSoldier === activeFilters.loneSoldier) &&
            (activeFilters.newImmigrant === null || right.filters.newImmigrant === activeFilters.newImmigrant) &&
            (activeFilters.parentalStatus === null || right.filters.parentalStatus === activeFilters.parentalStatus) &&
            (activeFilters.housingStatus === null || right.filters.housingStatus === activeFilters.housingStatus) &&
            (activeFilters.financialNeed === null || right.filters.financialNeed === activeFilters.financialNeed) &&
            (activeFilters.educationStatus === null || right.filters.educationStatus === activeFilters.educationStatus) &&
            (activeFilters.militaryStatus === null || right.filters.militaryStatus === activeFilters.militaryStatus)
          );
        });
      
        console.log("Filtered Results:", filtered);
        setFilteredRights(filtered);
      };
      
  
    return (
      <div className="p-6 min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Your Rights</h1>
        <RightsFilter onApplyFilters={handleApplyFilters} />
        <div className="mt-4">
          <button
            onClick={applyFiltersToData}
            className="w-full p-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Show Filtered Rights
          </button>
        </div>
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
