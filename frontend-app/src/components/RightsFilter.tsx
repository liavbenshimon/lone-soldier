import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface RightsFilterProps {
  onApplyFilters: (filters: {
    loneSoldier: boolean | null;
    newImmigrant: string | null;
    parentalStatus: string | null;
    housingStatus: string | null;
    financialNeed: boolean | null;
    educationStatus: string | null;
    militaryStatus: string | null;
  }) => void;
}

const RightsFilter: React.FC<RightsFilterProps> = ({ onApplyFilters }) => {
  const [loneSoldier, setLoneSoldier] = useState<boolean | null>(null);
  const [newImmigrant, setNewImmigrant] = useState<string | null>(null);
  const [parentalStatus, setParentalStatus] = useState<string | null>(null);
  const [housingStatus, setHousingStatus] = useState<string | null>(null);
  const [financialNeed, setFinancialNeed] = useState<boolean | null>(null);
  const [educationStatus, setEducationStatus] = useState<string | null>(null);
  const [militaryStatus, setMilitaryStatus] = useState<string | null>(null);

  const handleApply = () => {
    onApplyFilters({
      loneSoldier,
      newImmigrant,
      parentalStatus,
      housingStatus,
      financialNeed,
      educationStatus,
      militaryStatus,
    });
    console.log("Filters applied:", activeFilters);

  };

  return (
    <div className="space-y-4 p-4 bg-gray-600 rounded-md">
      {/* Lone Soldier */}
      <Select onValueChange={(value) => setLoneSoldier(value === "true" ? true : value === "false" ? false : null)}>
        <SelectTrigger>
          <SelectValue placeholder="Lone Soldier?" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="true">Yes</SelectItem>
          <SelectItem value="false">No</SelectItem>
        </SelectContent>
      </Select>

      {/* New Immigrant Duration */}
      <Select onValueChange={(value) => setNewImmigrant(value)}>
        <SelectTrigger>
          <SelectValue placeholder="New Immigrant Duration" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="LessThan1Year">Less than 1 year</SelectItem>
          <SelectItem value="1to5Years">1 to 5 years</SelectItem>
          <SelectItem value="MoreThan5Years">More than 5 years</SelectItem>
        </SelectContent>
      </Select>

      {/* Parental Contact Status */}
      <Select onValueChange={(value) => setParentalStatus(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Parental Contact Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="NoContact">No Contact</SelectItem>
          <SelectItem value="ParentsAbroad">Parents Living Abroad</SelectItem>
          <SelectItem value="NoSupport">No Support</SelectItem>
        </SelectContent>
      </Select>

      {/* Housing Status */}
      <Select onValueChange={(value) => setHousingStatus(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Housing Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="OnBase">On Base</SelectItem>
          <SelectItem value="Rental">Rental Housing</SelectItem>
          <SelectItem value="Kibbutz">Kibbutz Program</SelectItem>
        </SelectContent>
      </Select>

      {/* Financial Need */}
      <Select onValueChange={(value) => setFinancialNeed(value === "true" ? true : value === "false" ? false : null)}>
        <SelectTrigger>
          <SelectValue placeholder="Financial Need?" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="true">Yes</SelectItem>
          <SelectItem value="false">No</SelectItem>
        </SelectContent>
      </Select>

      {/* Education Status */}
      <Select onValueChange={(value) => setEducationStatus(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Education Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Student">Student</SelectItem>
          <SelectItem value="NonStudent">Non-Student</SelectItem>
        </SelectContent>
      </Select>

      {/* Military Status */}
      <Select onValueChange={(value) => setMilitaryStatus(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Military Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Combatant">Combatant</SelectItem>
          <SelectItem value="NonCombatant">Non-Combatant</SelectItem>
        </SelectContent>
      </Select>

      {/* Apply Filters Button */}
      <button
        onClick={handleApply}
        className="w-full p-2 bg-black text-white rounded-md hover:bg-gray-800"
      >
        Apply Filters
      </button>
    </div>
  );
};


export default RightsFilter;
