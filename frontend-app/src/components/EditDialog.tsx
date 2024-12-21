import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";
import { useState } from "react";
import { api } from "@/api";

interface FormData {
  [key: string]: string;
}

export function EditDialog({
  item,
  onEdit,
  type,
}: {
  item: any;
  onEdit: () => void;
  type: string;
}) {
  const [formData, setFormData] = useState(item);
  const [open, setOpen] = useState(false);

  const getEndpoint = (type: string) => {
    switch (type) {
      case "Donation":
        return "donation";
      case "Residence":
        return "residences";
      case "EatUp":
        return "eatups";
      default:
        return "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = getEndpoint(type);
      // Create a new object with only the fields that exist in the form
      const fieldsToUpdate: FormData = {};
      const commonFields = [
        { name: "description", label: "Description" },
        { name: "location", label: "Location" },
        { name: "zone", label: "Zone" },
      ];

      const typeSpecificFields = {
        Donation: [
          { name: "category", label: "Category" },
          { name: "ownerPhone", label: "Phone" },
        ],
        Residence: [
          { name: "type", label: "Type" },
          { name: "price", label: "Price" },
          { name: "rooms", label: "Rooms" },
          { name: "floor", label: "Floor" },
          { name: "meter", label: "Size (m²)" },
          { name: "contractDuration", label: "Contract Duration" },
          { name: "propertyTax", label: "Property Tax" },
          { name: "partners", label: "Partners" },
          { name: "enterDate", label: "Enter Date" },
        ],
        EatUp: [
          { name: "kosher", label: "Kosher" },
          { name: "hosting", label: "Hosting Type" },
          { name: "date", label: "Date" },
        ],
      };

      const fields = [
        ...commonFields,
        ...(typeSpecificFields[type as keyof typeof typeSpecificFields] || []),
      ];

      fields.forEach((field) => {
        if (formData[field.name] !== undefined) {
          fieldsToUpdate[field.name] = formData[field.name];
        }
      });

      await api.put(`/${endpoint}/${item._id}`, fieldsToUpdate);
      onEdit();
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const renderFields = () => {
    const commonFields = [
      { name: "description", label: "Description" },
      { name: "location", label: "Location" },
      { name: "zone", label: "Zone" },
    ];

    const typeSpecificFields = {
      Donation: [
        { name: "category", label: "Category" },
        { name: "ownerPhone", label: "Phone" },
      ],
      Residence: [
        { name: "type", label: "Type" },
        { name: "price", label: "Price" },
        { name: "rooms", label: "Rooms" },
        { name: "floor", label: "Floor" },
        { name: "meter", label: "Size (m²)" },
        { name: "contractDuration", label: "Contract Duration" },
        { name: "propertyTax", label: "Property Tax" },
        { name: "partners", label: "Partners" },
        { name: "enterDate", label: "Enter Date" },
      ],
      EatUp: [
        { name: "kosher", label: "Kosher" },
        { name: "hosting", label: "Hosting Type" },
        { name: "date", label: "Date" },
      ],
    };

    const fields = [
      ...commonFields,
      ...(typeSpecificFields[type as keyof typeof typeSpecificFields] || []),
    ];

    return fields.map((field) => (
      <div key={field.name} className="grid gap-2 mb-4">
        <Label htmlFor={field.name}>{field.label}</Label>
        <Input
          id={field.name}
          value={formData[field.name] || ""}
          onChange={(e) =>
            setFormData({ ...formData, [field.name]: e.target.value })
          }
        />
      </div>
    ));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] w-[90vw] max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit {type}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {renderFields()}
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
