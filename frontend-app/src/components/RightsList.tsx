import React from "react";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

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
        <Card key={right.id} className="p-4 shadow-md bg-gray-100">
          <Accordion type="single" collapsible>
            <AccordionItem value={`item-${right.id}`}>
              <AccordionTrigger>
                <h2 className="text-lg font-semibold">{right.title}</h2>
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">{right.description}</p>
                <p className="text-sm text-gray-600">
                  Organization: {right.organization} <br />
                  Contact: {right.contact}
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      ))}
    </div>
  );
};

export default RightsList;
