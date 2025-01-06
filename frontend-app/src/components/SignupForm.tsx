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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const roleDescriptions = {
  Soldier: "For lone soldiers who need support and access to services",
  Municipality: "For city representatives who can help coordinate support",
  Donor: "For individuals who want to contribute and support soldiers",
  Organization: "For organizations that can provide events and support",
  Business: "For businesses offering discounts and services to soldiers",
};

export function SignupForm() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    passport: "",
    email: "",
    password: "",
    phone: "",
    personalIdentificationNumber: "",
    type: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await api.post("/signup-requests", formData);
      navigate("/pending", {
        state: {
          token: response.data.token,
          request: response.data.request,
        },
      });
    } catch (error: any) {
      setError(
        error.response?.data?.error || "Failed to submit signup request"
      );
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

  const handleTypeChange = (value: string) => {
    setFormData({
      ...formData,
      type: value,
    });
  };

  return (
    <div className="container mx-auto max-w-lg py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="passport">Passport Number</Label>
                <Input
                  id="passport"
                  required
                  value={formData.passport}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="personalIdentificationNumber">
                  Personal ID Number (Optional)
                </Label>
                <Input
                  id="personalIdentificationNumber"
                  value={formData.personalIdentificationNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <Label>Account Type</Label>
                <Tabs defaultValue="individual" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="individual">Individual</TabsTrigger>
                    <TabsTrigger value="organization">Organization</TabsTrigger>
                  </TabsList>
                  <TabsContent value="individual">
                    <Select
                      required
                      value={formData.type}
                      onValueChange={handleTypeChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Soldier">Soldier</SelectItem>
                        <SelectItem value="Donor">Donor</SelectItem>
                      </SelectContent>
                    </Select>
                  </TabsContent>
                  <TabsContent value="organization">
                    <Select
                      required
                      value={formData.type}
                      onValueChange={handleTypeChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select organization type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Municipality">
                          Municipality
                        </SelectItem>
                        <SelectItem value="Organization">
                          Organization
                        </SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                      </SelectContent>
                    </Select>
                  </TabsContent>
                </Tabs>
                {formData.type && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {
                      roleDescriptions[
                        formData.type as keyof typeof roleDescriptions
                      ]
                    }
                  </p>
                )}
              </div>

              {error && (
                <div className="text-sm text-red-500 mt-2">{error}</div>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating account..." : "Create account"}
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
  );
}
