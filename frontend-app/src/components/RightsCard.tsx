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
    <Card className="p-4 shadow-md bg-gray-900 text-black">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <h2 className="text-lg font-semibold text-black hover:text-gray-300">{title}</h2>
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-2 text-gray-300">{description}</p>
            <p className="text-sm text-gray-400">Contact: {contact}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default RightsCard;
