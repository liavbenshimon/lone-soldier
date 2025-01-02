import { AxiosError } from "axios";
import { api } from "@/api";
import { useState, ChangeEvent, FormEvent } from "react";

// Define the shape of the formData
type FormDataType = {
  name: string;
  age: string;
  phone: string;
  email: string;
  service: string;
  itemType: string;
  itemDescription: string;
  quantity: string;
  urgency: string;
  geographicArea: string;
  notes: string;
  agreement: boolean;
};

function RequestForm() {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    age: "",
    phone: "",
    email: "",
    service: "",
    itemType: "",
    itemDescription: "",
    quantity: "",
    urgency: "Immediate",
    geographicArea: "",
    notes: "",
    agreement: false,
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
            color: #A9A9A9;
          }
        `}
      </style>
      <h2 className="text-3xl font-extrabold mb-6 text-center text-[hsl(var(--primary))]">
        Donation Request
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-[hsl(var(--secondary-foreground))] mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
            placeholder="Enter your name"
          />
        </div>

        {/* Age Field */}
        <div className="mb-4">
          <label className="block text-[hsl(var(--secondary-foreground))] mb-2">
            Age
          </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
            placeholder="Enter your age"
          />
        </div>

        {/* Other Fields */}
        {/* Add the remaining fields in the same format */}

        {/* Agreement */}
        <div className="mb-6">
          <label className="flex items-center text-[hsl(var(--secondary-foreground))]">
            <input
              type="checkbox"
              name="agreement"
              checked={formData.agreement}
              onChange={handleChange}
              className="mr-2"
            />
            I agree to share my details with the donor
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] py-2 px-4 rounded-lg hover:bg-[hsl(var(--primary))] hover:opacity-80"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}

export default RequestForm;
