import { z } from "zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Navbar } from "./Navbar";

// Zod schema for signup validation
const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  passport: z
    .string()
    .min(8, "Passport number must be at least 8 characters")
    .min(1, "Passport number is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^\+?\d+$/,
      "Phone number can only contain numbers with an optional + at the start"
    )
    .refine((val) => {
      // Remove the + if it exists to check the actual number length
      const numberOnly = val.startsWith("+") ? val.slice(1) : val;
      return numberOnly.length >= 9 && numberOnly.length <= 14;
    }, "Phone number must be between 9 and 14 digits"),
  personalIdentificationNumber: z
    .string()
    .refine(
      (val) => !val || /^[0-9]+$/.test(val),
      "Personal ID must contain only numbers"
    )
    .refine(
      (val) => !val || val.length === 9,
      "Personal ID must be exactly 9 digits"
    )
    .optional(),
  type: z.enum(["Soldier", "Contributor"], {
    required_error: "Please select an account type",
  }),
});

type FormData = {
  firstName: string;
  lastName: string;
  passport: string;
  email: string;
  password: string;
  phone: string;
  personalIdentificationNumber: string;
  type: "Soldier" | "Contributor" | "";
};

type SignupFormData = z.infer<typeof signupSchema>;

export function SignupForm() {
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    passport: "",
    email: "",
    password: "",
    phone: "",
    personalIdentificationNumber: "",
    type: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  const validateForm = () => {
    try {
      if (!formData.type) {
        setErrors({ type: "Please select an account type" });
        return false;
      }

      const validationResult = signupSchema.safeParse({
        ...formData,
        type: formData.type as "Soldier" | "Contributor",
      });

      if (!validationResult.success) {
        const newErrors: Partial<Record<keyof FormData, string>> = {};
        validationResult.error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof FormData] = err.message;
          }
        });
        setErrors(newErrors);
        return false;
      }

      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ type: error.message });
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setErrors({});

    if (!validateForm()) {
      return;
    }

    if (!formData.type) {
      setErrors({ type: "Please select an account type" });
      return;
    }

    setLoading(true);

    try {
      const submitData = {
        ...formData,
        type: formData.type,
      };
      const response = await api.post("/signup-requests", submitData);

      // Navigate to pending page with request data
      navigate("/pending", {
        state: {
          token: response.data.token,
          request: response.data.request,
        },
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || "Failed to submit signup request";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleTypeChange = (value: "Soldier" | "Contributor") => {
    setFormData({
      ...formData,
      type: value,
    });
  };

  return (
    <div className="flex bg-background text-foreground min-h-screen">
      <Navbar modes="landing" />

      <div className="flex-1 mx-10">
        <div className="py-6">
          <Card className="max-w-2xl mx-auto p-6">
            <CardHeader>
              <CardTitle className="text-2xl">Create an account</CardTitle>
              <CardDescription>
                Enter your details below to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} noValidate>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className={errors.firstName ? "border-red-500" : ""}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-red-500">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className={errors.lastName ? "border-red-500" : ""}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-red-500">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="passport">Passport Number</Label>
                    <Input
                      id="passport"
                      required
                      value={formData.passport}
                      onChange={handleChange}
                      className={errors.passport ? "border-red-500" : ""}
                    />
                    {errors.passport && (
                      <p className="text-sm text-red-500">{errors.passport}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className={errors.password ? "border-red-500" : ""}
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500">{errors.password}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="personalIdentificationNumber">
                      Personal ID Number (Optional)
                    </Label>
                    <Input
                      id="personalIdentificationNumber"
                      value={formData.personalIdentificationNumber}
                      onChange={handleChange}
                      className={
                        errors.personalIdentificationNumber
                          ? "border-red-500"
                          : ""
                      }
                    />
                    {errors.personalIdentificationNumber && (
                      <p className="text-sm text-red-500">
                        {errors.personalIdentificationNumber}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label>Account Type</Label>
                    <Select
                      required
                      value={formData.type || undefined}
                      onValueChange={handleTypeChange}
                    >
                      <SelectTrigger
                        className={errors.type ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Soldier">Soldier</SelectItem>
                        <SelectItem value="Contributor">Contributor</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.type && (
                      <p className="text-sm text-red-500">{errors.type}</p>
                    )}
                  </div>
                  {error && (
                    <div className="text-sm text-red-500 p-2 bg-red-50 dark:bg-red-950/50 rounded-md">
                      {error}
                    </div>
                  )}
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Submitting..." : "Sign Up"}
                  </Button>
                  <div className="text-center text-sm">
                    Already have an account?{" "}
                    <button
                      onClick={() => navigate("/login")}
                      className="underline underline-offset-4"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
