import React from "react";
import RightsCard from "@/components/RightsCard";

interface RightsListProps {
  rights: {
    id: number;
    title: string;
    description: string;
    organization: string;
    contact: string;
  }[];
}

const RightsList: React.FC<RightsListProps> = ({ rights }) => {
  return (
    <div className="space-y-4">
      {rights.map((right) => (
        <RightsCard
          key={right.id}
          title={right.title}
          description={right.description}
          contact={right.contact}
        />
      ))}
    </div>
  );
};

export default RightsList;
