import { api } from "@/api";
import React, { useState } from "react";
import { useNavigate } from "react-router";

// הגדרת סוג נתונים של הטופס
interface FormData {
  firstName: string;
  lastName: string;
  passport: string;
  email: string;
  password: string;
  phone: string;
  personalIdentificationNumber?: string; // שדה אופציונלי
  type: "Contributer" | "Soldier";
}

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const navigate = useNavigate();
  // הגדרת useState עם סוג נתונים
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    passport: "",
    email: "",
    password: "",
    phone: "",
    personalIdentificationNumber: "",
    type: "Contributer", // ברירת מחדל
  });

  // הגדרת פונקציה שתטפל בשינויי שדות
  //shalev38@gmail.com
  //12345678
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // הגדרת פונקציה לשליחת הטופס
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/users", formData);
      console.log(res);
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("user", JSON.stringify(res.data.user));
      if (formData.type === "Contributer") {
        navigate("/contribute");
      } else {
        navigate("/Home");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`flex flex-col gap-6 ${className}`} {...props}>
      <div className="card">
        <div className="card-header">
          <h2 className="text-2xl">Sign Up</h2>
          <p>Enter your details below to create an account</p>
        </div>
        <div className="card-content">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {/* First Name */}
              <div className="grid gap-2">
                <label htmlFor="firstName" className="text-primary">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="border-2 border-border dark:border-border dark:bg-muted dark:text-muted-foreground p-2 rounded focus:border-ring focus:ring-2 dark:focus:ring-primary text-black"
                />
              </div>

              {/* Last Name */}
              <div className="grid gap-2">
                <label htmlFor="lastName" className="text-primary">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="border-2 border-border dark:border-border dark:bg-muted dark:text-muted-foreground p-2 rounded focus:border-ring focus:ring-2 dark:focus:ring-primary text-black"
                />
              </div>

              {/* Passport */}
              <div className="grid gap-2">
                <label htmlFor="passport" className="text-primary">
                  Passport Number
                </label>
                <input
                  id="passport"
                  type="text"
                  placeholder="Passport Number"
                  value={formData.passport}
                  onChange={handleInputChange}
                  required
                  className="border-2 border-border dark:border-border dark:bg-muted dark:text-muted-foreground p-2 rounded focus:border-ring focus:ring-2 dark:focus:ring-primary text-black"
                />
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <label htmlFor="email" className="text-primary">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="border-2 border-border dark:border-border dark:bg-muted dark:text-muted-foreground p-2 rounded focus:border-ring focus:ring-2 dark:focus:ring-primary text-black"
                />
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <label htmlFor="password" className="text-primary">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="border-2 border-border dark:border-border dark:bg-muted dark:text-muted-foreground p-2 rounded focus:border-ring focus:ring-2 dark:focus:ring-primary text-black"
                />
              </div>

              {/* Phone */}
              <div className="grid gap-2">
                <label htmlFor="phone" className="text-primary">
                  Phone
                </label>
                <input
                  id="phone"
                  type="text"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="border-2 border-border dark:border-border dark:bg-muted dark:text-muted-foreground p-2 rounded focus:border-ring focus:ring-2 dark:focus:ring-primary text-black"
                />
              </div>

              {/* Personal Identification Number (Optional) */}
              <div className="grid gap-2">
                <label
                  htmlFor="personalIdentificationNumber"
                  className="text-primary"
                >
                  Personal ID
                </label>
                <input
                  id="personalIdentificationNumber"
                  type="text"
                  value={formData.personalIdentificationNumber || ""}
                  onChange={handleInputChange}
                  className="border-2 border-border dark:border-border dark:bg-muted dark:text-muted-foreground p-2 rounded focus:border-ring focus:ring-2 dark:focus:ring-primary text-black"
                />
              </div>

              {/* User Type (Contributer or Soldier) */}
              <div className="grid gap-2">
                <label htmlFor="type" className="text-primary">
                  User Type
                </label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  className="border-2 border-border dark:border-border dark:bg-muted dark:text-muted-foreground p-2 rounded focus:border-ring focus:ring-2 dark:focus:ring-primary text-black"
                >
                  <option value="Contributer">Contributer</option>
                  <option value="Soldier">Soldier</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground p-2 rounded"
              >
                Sign Up
              </button>
            </div>

            {/* Link to Login */}
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a href="#" className="underline underline-offset-4 text-primary">
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
