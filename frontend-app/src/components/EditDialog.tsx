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
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface FormData {
  [key: string]: string | number | boolean | string[] | undefined;
}

interface Field {
  name: string;
  label: string;
  hint?: string;
  type?: "text" | "number" | "date";
}

type FieldConfig = {
  [key: string]: Field[];
};

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
  const [error, setError] = useState<string | null>(null);

  const handleDateChange = (date: Date | undefined, fieldName: string) => {
    if (date) {
      setFormData({ ...formData, [fieldName]: date.toISOString() });
    }
  };

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
    setError(null);

    // Validate EatUp limit
    if (type === "EatUp" && formData.limit) {
      const currentGuestCount = formData.guests?.length || 0;
      const newLimit = parseInt(formData.limit as string);

      if (newLimit < currentGuestCount) {
        setError(
          `Cannot set limit lower than current guest count (${currentGuestCount})`
        );
        return;
      }
    }

    try {
      const endpoint = getEndpoint(type);
      const fieldsToUpdate: FormData = {};
      const commonFields = [
        { name: "description", label: "Description", type: "text" },
        { name: "location", label: "Location", type: "text" },
        { name: "zone", label: "Zone", type: "text" },
      ];

      const typeSpecificFields: FieldConfig = {
        Donation: [
          { name: "category", label: "Category", type: "text" },
          { name: "ownerPhone", label: "Phone", type: "text" },
        ],
        Residence: [
          { name: "type", label: "Type", type: "text" },
          { name: "price", label: "Price", type: "number" },
          { name: "rooms", label: "Rooms", type: "number" },
          { name: "floor", label: "Floor", type: "number" },
          { name: "meter", label: "Size (m²)", type: "number" },
          {
            name: "contractDuration",
            label: "Contract Duration",
            type: "number",
          },
          { name: "propertyTax", label: "Property Tax", type: "number" },
          { name: "partners", label: "Partners", type: "text" },
          { name: "enterDate", label: "Enter Date", type: "date" },
        ],
        EatUp: [
          { name: "kosher", label: "Kosher", type: "text" },
          { name: "hosting", label: "Hosting Type", type: "text" },
          { name: "date", label: "Date", type: "date" },
          {
            name: "limit",
            label: "Guest Limit",
            type: "number",
            hint: formData.guests?.length
              ? `Current guests: ${formData.guests.length}`
              : undefined,
          },
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
      setError("Failed to update. Please try again.");
    }
  };

  const renderFields = () => {
    const commonFields: Field[] = [
      { name: "description", label: "Description", type: "text" },
      { name: "location", label: "Location", type: "text" },
      { name: "zone", label: "Zone", type: "text" },
    ];

    const typeSpecificFields: FieldConfig = {
      Donation: [
        { name: "category", label: "Category", type: "text" },
        { name: "ownerPhone", label: "Phone", type: "text" },
      ],
      Residence: [
        { name: "type", label: "Type", type: "text" },
        { name: "price", label: "Price", type: "number" },
        { name: "rooms", label: "Rooms", type: "number" },
        { name: "floor", label: "Floor", type: "number" },
        { name: "meter", label: "Size (m²)", type: "number" },
        {
          name: "contractDuration",
          label: "Contract Duration",
          type: "number",
        },
        { name: "propertyTax", label: "Property Tax", type: "number" },
        { name: "partners", label: "Partners", type: "text" },
        { name: "enterDate", label: "Enter Date", type: "date" },
      ],
      EatUp: [
        { name: "kosher", label: "Kosher", type: "text" },
        { name: "hosting", label: "Hosting Type", type: "text" },
        { name: "date", label: "Date", type: "date" },
        {
          name: "limit",
          label: "Guest Limit",
          type: "number",
          hint: formData.guests?.length
            ? `Current guests: ${formData.guests.length}`
            : undefined,
        },
      ],
    };

    const fields = [
      ...commonFields,
      ...(typeSpecificFields[type as keyof typeof typeSpecificFields] || []),
    ];

    return fields.map((field) => (
      <div key={field.name} className="grid gap-2 mb-4">
        <Label htmlFor={field.name}>
          {field.label}
          {field.hint && (
            <span className="ml-2 text-sm text-muted-foreground">
              ({field.hint})
            </span>
          )}
        </Label>
        {field.type === "date" ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData[field.name] && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData[field.name] ? (
                  format(new Date(formData[field.name] as string), "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={
                  formData[field.name]
                    ? new Date(formData[field.name] as string)
                    : undefined
                }
                onSelect={(date) => handleDateChange(date, field.name)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        ) : (
          <Input
            id={field.name}
            value={formData[field.name] || ""}
            onChange={(e) =>
              setFormData({ ...formData, [field.name]: e.target.value })
            }
            type={field.type === "number" ? "number" : "text"}
            min={
              field.name === "limit" ? formData.guests?.length || 0 : undefined
            }
          />
        )}
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
            {error && <p className="text-sm text-destructive mb-2">{error}</p>}
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
