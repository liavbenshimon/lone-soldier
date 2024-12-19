import React from "react";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

interface RightsCardProps {
  title: string;
  description: string;
  contact: string;
}

const RightsCard: React.FC<RightsCardProps> = ({ title, description, contact }) => {
  return (
    // useless
    <Card className="p-2 shadow-md bg-gray-200 text-white">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <h2 className="text-lg font-semibold">{title}</h2>
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-2">{description}</p>
            <p className="text-sm text-gray-400">Contact: {contact}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default RightsCard;
