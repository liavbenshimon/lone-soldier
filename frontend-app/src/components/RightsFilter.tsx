import React, { useState } from "react";

interface RightsFilterProps {
  onApplyFilters: (filters: Partial<Filters>) => void;
}

type Filters = {
  loneSoldier: boolean | null;
  newImmigrant: string | null;
  parentalStatus: string | null;
  housingStatus: string | null;
  financialNeed: boolean | null;
  educationStatus: string | null;
  militaryStatus: string | null;
};

const RightsFilter: React.FC<RightsFilterProps> = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState<Filters>({
    loneSoldier: null,
    newImmigrant: null,
    parentalStatus: null,
    housingStatus: null,
    financialNeed: null,
    educationStatus: null,
    militaryStatus: null,
  });

  const handleApply = () => onApplyFilters(filters);

  const updateFilter = (key: keyof Filters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
<div className="rounded-lg border bg-card text-card-foreground shadow-sm space-y-6 p-6 shadow-black/10 dark:shadow-white/10 w-full mx-auto">
{/* space-y-4 p-4 bg-gray-800 rounded-md */}
      {/* Lone Soldier */}
      <select
        onChange={(e) =>
          updateFilter("loneSoldier", e.target.value === "true" ? true : e.target.value === "false" ? false : null)
        }
        className="w-full p-2 rounded-md bg-black text-white rounded-md hover:bg-gray-800"
      >
        <option value="">Lone Soldier?</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>

      {/* New Immigrant Duration */}
      <select onChange={(e) => updateFilter("newImmigrant", e.target.value)} 
      className="w-full p-2 rounded-md bg-black text-white rounded-md hover:bg-gray-800">
        <option value="">New Immigrant Duration</option>
        <option value="LessThan1Year">Less than 1 year</option>
        <option value="1to5Years">1 to 5 years</option>
        <option value="MoreThan5Years">More than 5 years</option>
      </select>

      {/* Parental Contact Status */}
      <select onChange={(e) => updateFilter("parentalStatus", e.target.value)} 
      className="w-full p-2 rounded-md bg-black text-white rounded-md hover:bg-gray-800">
        <option value="">Parental Contact Status</option>
        <option value="NoContact">No Contact</option>
        <option value="ParentsAbroad">Parents Living Abroad</option>
        <option value="NoSupport">No Support</option>
      </select>

      {/* Housing Status */}
      <select onChange={(e) => updateFilter("housingStatus", e.target.value)} 
      className="w-full p-2 rounded-md bg-black text-white rounded-md hover:bg-gray-800">
        <option value="">Housing Status</option>
        <option value="OnBase">On Base</option>
        <option value="Rental">Rental Housing</option>
        <option value="Kibbutz">Kibbutz Program</option>
      </select>

      {/* Financial Need */}
      <select
        onChange={(e) =>
          updateFilter("financialNeed", e.target.value === "true" ? true : e.target.value === "false" ? false : null)
        }
        className="w-full p-2 rounded-md bg-black text-white rounded-md hover:bg-gray-800"
      >
        <option value="">Financial Need?</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>

      {/* Education Status */}
      <select onChange={(e) => updateFilter("educationStatus", e.target.value)} 
      className="w-full p-2 rounded-md bg-black text-white rounded-md hover:bg-gray-800">
        <option value="">Education Status</option>
        <option value="Student">Student</option>
        <option value="NonStudent">Non-Student</option>
      </select>

      {/* Military Status */}
      <select onChange={(e) => updateFilter("militaryStatus", e.target.value)} 
      className="w-full p-2 rounded-md bg-black text-white rounded-md hover:bg-gray-800">
        <option value="">Military Status</option>
        <option value="Combatant">Combatant</option>
        <option value="NonCombatant">Non-Combatant</option>
      </select>

      {/* Apply Filters Button */}
      <button
        onClick={handleApply}
        className="w-full p-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
        // className="\w-full p-2 bg-black text-white rounded-md hover:bg-gray-800"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default RightsFilter;
