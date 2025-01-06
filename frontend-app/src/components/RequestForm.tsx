import { AxiosError } from "axios";
import { api } from "@/api";
import { useState, ChangeEvent, FormEvent } from "react";

// Define the shape of the formData
type FormDataType = {
  // name: string;
  // age: string;
  // phone: string;
  // email: string;
  service: string;
  itemType: string;
  itemDescription: string;
  quantity: string;
  urgency: string;
  geographicArea: string;
  notes: string;
  agreeToShareDetails: boolean;
};

function RequestForm() {
  const [formData, setFormData] = useState<FormDataType>({
    // name: "",
    // age: "",
    // phone: "",
    // email: "",
    service: "",
    itemType: "",
    itemDescription: "",
    quantity: "",
    urgency: "Immediate",
    geographicArea: "",
    notes: "",
    agreeToShareDetails: false,
  });

  // ChangeEvent for input fields
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // FormEvent for form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post("/requests", formData);
      alert("Request submitted successfully!");
      console.log(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          "Error submitting the request:",
          error.response?.data || error.message
        );
        alert("Failed to submit the request. Please try again.");
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-[hsl(var(--background))] p-6 rounded-lg shadow-md">
      <style>
        {`
      input::placeholder,
      textarea::placeholder {
        color: #A9A9A9; /* צבע אפור עבור ה-placeholder */
      }

      input,
      textarea {
        color: black; /* צבע שחור עבור הטקסט שהמשתמש מקליד */
      }
    `}
      </style>
      <h2 className="text-3xl font-extrabold mb-6 text-center text-[hsl(var(--primary-foreground))] shadow-lg text-[hsl(var(--primary))]">
        Donation Request
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Service */}
        <div className="mb-4">
          <label className="block text-[hsl(var(--secondary-foreground))] mb-2">
            Service
          </label>
          <div className="flex gap-4">
            <label className="flex items-center text-[hsl(var(--secondary-foreground))]">
              <input
                type="radio"
                name="service"
                value="Regular"
                checked={formData.service === "Regular"}
                onChange={handleChange}
                className="mr-2"
              />
              Regular
            </label>
            <label className="flex items-center text-[hsl(var(--secondary-foreground))]">
              <input
                type="radio"
                name="service"
                value="Reserves"
                checked={formData.service === "Reserves"}
                onChange={handleChange}
                className="mr-2"
              />
              Reserves
            </label>
          </div>
        </div>

        {/* Request Details */}
        <div className="mb-4">
          <label className="block text-[hsl(var(--secondary-foreground))] mb-2">
            Item Type
          </label>
          <input
            type="text"
            name="itemType"
            value={formData.itemType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-opacity-50"
            placeholder="Enter item type"
          />
        </div>

        <div className="mb-4">
          <label className="block text-[hsl(var(--secondary-foreground))] mb-2">
            Item Description
          </label>
          <textarea
            name="itemDescription"
            value={formData.itemDescription}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-opacity-50"
            placeholder="Details like size, color, desired condition"
          />
        </div>

        <div className="mb-4">
          <label className="block text-[hsl(var(--secondary-foreground))] mb-2">
            Required Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-opacity-50"
            placeholder="Enter quantity"
          />
        </div>

        {/* Additional Details */}
        <div className="mb-4">
          <label className="block text-[hsl(var(--secondary-foreground))] mb-2">
            Urgency
          </label>
          <select
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-opacity-50"
          >
            <option value="Immediate">Immediate</option>
            <option value="Specific Date">Specific Date</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-[hsl(var(--secondary-foreground))] mb-2">
            Preferred Geographic Area
          </label>
          <input
            type="text"
            name="geographicArea"
            value={formData.geographicArea}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-opacity-50"
            placeholder="Enter geographic area"
          />
        </div>

        <div className="mb-4">
          <label className="block text-[hsl(var(--secondary-foreground))] mb-2">
            Additional Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-opacity-50"
            placeholder="Additional comments"
          />
        </div>

        {/* Agreement */}
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="agreeToShareDetails"
            checked={formData.agreeToShareDetails}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-[hsl(var(--secondary-foreground))]">
            I agree to the terms and conditions
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[hsl(var(--primary))] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[hsl(var(--primary-dark))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
}

export default RequestForm;
