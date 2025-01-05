import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { uploadImage } from "@/components/UploadPhoto";
import { api } from "@/api";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";

// Import constants
const zones = ["North", "Center", "South"];
const EatUpsHosting = ["Family", "Organization"];

interface Errors {
  location?: boolean;
  zone?: boolean;
  date?: boolean;
  kosher?: boolean;
  hosting?: boolean;
  description?: boolean;
  image?: boolean;
}

export default function NewPost() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Form fields
  const [location, setLocation] = useState<string>("");
  const [zone, setZone] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [kosher, setKosher] = useState<boolean>(false);
  const [hosting, setHosting] = useState<string>("");
  const [limit, setLimit] = useState<string>("");

  const [errors, setErrors] = useState<Errors>({});
  const [showAlert, setShowAlert] = useState(false);

  const validateFields = () => {
    const newErrors: Errors = {};

    if (!location) newErrors.location = true;
    if (!zone) newErrors.zone = true;
    if (!description) newErrors.description = true;
    if (!image) newErrors.image = true;
    if (!date) newErrors.date = true;
    if (!hosting) newErrors.hosting = true;

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setShowAlert(true);
      return false;
    }
    return true;
  };

  const handleCreatePost = async () => {
    if (!validateFields()) return;

    try {
      const postData = {
        location,
        zone,
        date: new Date(date).toISOString(),
        kosher,
        hosting,
        description,
        media: [image],
        authorId: sessionStorage.getItem("id"),
        title: description,
        owner: sessionStorage.getItem("id"),
        language: "Hebrew",
        limit: limit ? parseInt(limit) : undefined,
      };

      const eatupResponse = await api.post("/eatups", postData);
      console.log(
        "EatUp and channel created successfully:",
        eatupResponse.data
      );

      // Invalidate and refetch channels
      queryClient.invalidateQueries({ queryKey: ["channels"] });

      alert("EatUp created successfully!");
      // Navigate to the new channel
      navigate(`/channel/${eatupResponse.data.data.channel._id}`);
    } catch (error) {
      console.error("Error creating EatUp:", error);
      alert("Error creating EatUp.");
    }
  };

  return (
    <div className="flex h-screen">
      <Navbar isVertical isAccordion modes="home" />

      <div className="flex-1 overflow-auto">
        <div className="flex-1 p-6 pl-20 md:pl-6 bg-background">
          <Card className="max-w-2xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text">
                Create New EatUp
              </span>
            </h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">
                  Location *
                </label>
                <Input
                  id="location"
                  placeholder="Enter location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={errors.location ? "border-red-500" : ""}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Zone *</label>
                <Select value={zone} onValueChange={setZone}>
                  <SelectTrigger
                    className={errors.zone ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select zone" />
                  </SelectTrigger>
                  <SelectContent>
                    {zones.map((zone) => (
                      <SelectItem key={zone} value={zone}>
                        {zone}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium">
                  Date and Time *
                </label>
                <Input
                  id="date"
                  type="datetime-local"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={errors.date ? "border-red-500" : ""}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Hosting Type *</label>
                <Select value={hosting} onValueChange={setHosting}>
                  <SelectTrigger
                    className={errors.hosting ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select hosting type" />
                  </SelectTrigger>
                  <SelectContent>
                    {EatUpsHosting.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Kosher</label>
                <Select
                  value={kosher ? "yes" : "no"}
                  onValueChange={(value) => setKosher(value === "yes")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Is it kosher?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="limit" className="text-sm font-medium">
                  Guest Limit (Optional)
                </label>
                <Input
                  id="limit"
                  type="number"
                  placeholder="Enter guest limit"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description *
                </label>
                <Textarea
                  id="description"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={errors.description ? "border-red-500" : ""}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Image *</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const imageUrl = await uploadImage(file);
                      setImage(imageUrl);
                    }
                  }}
                  className={errors.image ? "border-red-500" : ""}
                />
              </div>

              {showAlert && Object.keys(errors).length > 0 && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Please fill in all required fields marked with *
                  </AlertDescription>
                </Alert>
              )}

              <Button onClick={handleCreatePost} className="w-full">
                Create EatUp
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
