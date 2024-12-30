import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import para navegação
import { rightsData } from "@/data/rightsData";
import RightsFilter from "@/components/RightsFilter";
import RightsList from "@/components/RightsList";
import { filterRights } from "@/data/filterRights";
import { Filters } from '@/types/filters';

const YourRights: React.FC = () => {
  const [filteredRights, setFilteredRights] = useState<typeof rightsData>([]);
  const navigate = useNavigate(); // Hook para navegação

  const handleApplyFilters = (filters: Partial<Filters>) => {
    const cleanedFilters = Object.fromEntries(
      Object.entries(filters).map(([key, value]) => [
        key,
        // Convert null to undefined for loneSoldier
        key === 'loneSoldier' ? (value === null ? undefined : value) : value ?? null
      ])
    ) as Partial<Filters>;

    const results = filterRights(rightsData, cleanedFilters);
    setFilteredRights(results);
  };

  return (
    <div className="p-20 min-h-screen bg-20 14.3% 4.1% relative">
      {/* Botão de Retorno */}
      <button
        onClick={() => navigate("/home")} // Navega para a página principal
        className="absolute top-5 right-5 p-3 rounded-full bg-gray-800 text-gray-100 hover:bg-gray-700 transition-all shadow-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7" // Corrigido para a seta apontar para a direita
            />
        </svg>
      </button>

      <h1 className="text-3xl font-bold mb-4 text-gray-100">Your Rights</h1>
      <RightsFilter onApplyFilters={handleApplyFilters} />
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm space-y-6 p-4 shadow-black/10 dark:shadow-white/10 w-full max-w-[90%] md:max-w-[60%] mx-auto">
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
