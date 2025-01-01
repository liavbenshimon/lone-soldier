import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"; // Certifique-se de usar o componente de acordo com a documentação do Shadcn.
import { rightsData, Right } from "@/data/rightsData";
import { Navbar } from "@/components/Navbar";

const RightsPage: React.FC = () => {
  // Agrupar direitos por categoria
  const groupedRights = rightsData.reduce<Record<string, Right[]>>((acc, right) => {
    if (!acc[right.category]) {
      acc[right.category] = [];
    }
    acc[right.category].push(right);
    return acc;
  }, {});

  return (
    <div className="flex bg-gray-900 text-gray-100 min-h-screen">
      <Navbar modes="home" isVertical={true} isAccordion={true} />
      <div className="flex-1 flex flex-col items-center py-10 px-4">
        <h1 className="text-4xl font-bold mb-8">
          Your <span className="text-green-500">Rights</span>
        </h1>
        {Object.keys(groupedRights).length > 0 ? (
          <Accordion type="multiple" className="w-full max-w-4xl space-y-4">
            {Object.entries(groupedRights).map(([category, rights]) => (
              <AccordionItem
                key={category}
                value={`category-${category}`}
                className="border rounded-lg shadow-md overflow-hidden"
              >
                <AccordionTrigger className="bg-gray-800 p-4 flex justify-between items-center cursor-pointer hover:bg-gray-700 transition-colors">
                  <span className="font-medium text-lg text-left">{category}</span>
                </AccordionTrigger>
                <AccordionContent
                  className="bg-gray-700 p-4 text-gray-300 space-y-4"
                  style={{
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  {rights.map((right) => (
                    <div key={right.id} className="border-b pb-2 mb-2 last:border-none last:pb-0 last:mb-0">
                      <h3 className="font-medium text-lg text-gray-100 mb-1">{right.title}</h3>
                      <p className="text-gray-300 text-sm">{right.description}</p>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="flex flex-col items-center">
            <Accordion type="single" collapsible className="w-full max-w-md">
              <AccordionItem value="no-rights" className="border rounded-lg overflow-hidden">
                <AccordionTrigger className="bg-gray-800 p-4 text-center">
                  <span className="font-medium text-lg">No Rights Available</span>
                </AccordionTrigger>
                <AccordionContent className="bg-gray-700 p-4 text-gray-300 text-center">
                  No rights have been registered yet. <br />😔
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
        <div className="mt-12 text-center text-sm text-gray-500 max-w-2xl border-t border-gray-700 pt-4">
          <p>
            <strong>Disclaimer:</strong> While we strive to provide accurate and updated information, we cannot guarantee the rights listed here are the most current. Please refer to the official IDF website for the latest information:{" "}
            <a
              href="https://www.idf.il/%D7%94%D7%A9%D7%99%D7%A8%D7%95%D7%AA-%D7%A9%D7%9C%D7%99/%D7%AA%D7%A0%D7%90%D7%99-%D7%94%D7%A9%D7%99%D7%A8%D7%95%D7%AA-%D7%91%D7%A6%D7%94-%D7%9C/%D7%AA-%D7%A9/rights-of-lone-soldiers-in-mandatory-service/"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              IDF Official Lone Soldier Rights
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RightsPage;
