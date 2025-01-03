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

// Import constants
const zones = ["North", "Center", "South"];
const DonationsCategories = [
  "Furniture",
  "Clothes",
  "Electricity",
  "Army Equipments",
];
const residencesType = ["Rent", "Roommates"];
const EatUpsHosting = ["Family", "Organization"];

interface Errors {
  location?: boolean;
  zone?: boolean;
  category?: boolean;
  date?: boolean;
  kosher?: boolean;
  hosting?: boolean;
  rooms?: boolean;
  price?: boolean;
  type?: boolean;
  floor?: boolean;
  image?: boolean;
  description?: boolean;
  ownerPhone?: boolean;
  contractDuration?: boolean;
  propertyTax?: boolean;
  phone?: boolean;
  enterDate?: boolean;
}

export default function NewPost() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [step, setStep] = useState<number>(1);

  // Common fields
  const [location, setLocation] = useState<string>("");
  const [zone, setZone] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");

  // Donation fields
  const [category, setCategory] = useState<string>("");
  const [ownerPhone, setOwnerPhone] = useState<string>("");

  // EatUp fields
  const [date, setDate] = useState<string>("");
  const [kosher, setKosher] = useState<boolean>(false);
  const [hosting, setHosting] = useState<string>("");

  // Residence fields
  const [rooms, setRooms] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [floor, setFloor] = useState<string>("");
  const [roommates, setRoommates] = useState<string>("0");
  const [size, setSize] = useState<string>("");
  const [furniture, setFurniture] = useState<string>("no");
  const [storage, setStorage] = useState<string>("no");
  const [balcony, setBalcony] = useState<string>("no");
  const [shelter, setShelter] = useState<string>("no");
  const [contractDuration, setContractDuration] = useState<string>("");
  const [propertyTax, setPropertyTax] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [enterDate, setEnterDate] = useState<string>("");
  const [limit, setLimit] = useState<string>("");

  const [errors, setErrors] = useState<Errors>({});
  const [showAlert, setShowAlert] = useState(false);

  const validateFields = () => {
    const newErrors: Errors = {};

    // Common validations
    if (!location) newErrors.location = true;
    if (!zone) newErrors.zone = true;
    if (!description) newErrors.description = true;
    if (!image) newErrors.image = true;

    // Type-specific validations
    switch (selectedOption) {
      case "donation":
        if (!category) newErrors.category = true;
        if (!ownerPhone) newErrors.ownerPhone = true;
        break;
      case "host":
        if (!date) newErrors.date = true;
        if (!hosting) newErrors.hosting = true;
        if (!description) newErrors.description = true;
        break;
      case "residence":
        if (!rooms) newErrors.rooms = true;
        if (!price) newErrors.price = true;
        if (!type) newErrors.type = true;
        if (!floor) newErrors.floor = true;
        if (!contractDuration) newErrors.contractDuration = true;
        if (!propertyTax) newErrors.propertyTax = true;
        if (!phone) newErrors.phone = true;
        if (!enterDate) newErrors.enterDate = true;
        break;
    }

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
      let endpoint = "";
      let postData = {};

      switch (selectedOption) {
        case "donation":
          endpoint = "/donation";
          postData = {
            location,
            zone,
            category,
            description,
            media: [image],
            authorId: sessionStorage.getItem("id"),
            ownerPhone,
          };
          // Make API call for donation
          const donationResponse = await api.post(endpoint, postData);
          console.log("Donation created successfully:", donationResponse.data);
          alert("Donation created successfully!");
          navigate("/contribute");
          break;

        case "host":
          endpoint = "/eatups";
          postData = {
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
          // Make API call for EatUp
          const eatupResponse = await api.post(endpoint, postData);
          console.log("EatUp and channel created successfully:", eatupResponse.data);
          alert("EatUp created successfully!");
          // Navigate to the new channel
          navigate(`/channel/${eatupResponse.data.data.channel._id}`);
          break;

        case "residence":
          endpoint = "/residences";
          postData = {
            location,
            zone,
            rooms: parseInt(rooms),
            price: parseFloat(price),
            type,
            floor: parseInt(floor),
            roommates: parseInt(roommates),
            size: parseFloat(size),
            furniture: furniture === "yes",
            storage: storage === "yes",
            balcony: balcony === "yes",
            shelter: shelter === "yes",
            description,
            media: [image],
            authorId: sessionStorage.getItem("id"),
            contractDuration: parseInt(contractDuration),
            propertyTax: parseFloat(propertyTax),
            phone,
            owner: sessionStorage.getItem("id"),
            meter: parseFloat(size),
            enterDate: new Date(enterDate).toISOString(),
            shalter: shelter === "yes",
          };
          // Make API call for residence
          const residenceResponse = await api.post(endpoint, postData);
          console.log("Residence created successfully:", residenceResponse.data);
          alert("Residence created successfully!");
          navigate("/contribute");
          break;
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Error creating post.");
    }
  };

  return (
    <div className="flex-1 p-6 bg-background">
      <Card className="max-w-2xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-8 text-center">
          <span className="bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text">
            Create New Post
          </span>
        </h2>

        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Select Post Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant={selectedOption === "donation" ? "default" : "outline"}
                onClick={() => {
                  setSelectedOption("donation");
                  setStep(2);
                }}
              >
                Donation
              </Button>
              <Button
                variant={selectedOption === "host" ? "default" : "outline"}
                onClick={() => {
                  setSelectedOption("host");
                  setStep(2);
                }}
              >
                Host
              </Button>
              <Button
                variant={selectedOption === "residence" ? "default" : "outline"}
                onClick={() => {
                  setSelectedOption("residence");
                  setStep(2);
                }}
              >
                Residence
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            {/* Common Fields */}
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
                <label htmlFor="zone" className="text-sm font-medium">
                  Zone *
                </label>
                <Select onValueChange={setZone}>
                  <SelectTrigger
                    id="zone"
                    className={errors.zone ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select Zone" />
                  </SelectTrigger>
                  <SelectContent>
                    {zones.map((z) => (
                      <SelectItem key={z} value={z}>
                        {z}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                <label htmlFor="image" className="text-sm font-medium">
                  Image *
                </label>
                <Input
                  id="image"
                  type="file"
                  onChange={async (e) => {
                    if (e.target.files?.[0]) {
                      const imageUrl = await uploadImage(e.target.files[0]);
                      setImage(imageUrl);
                    }
                  }}
                  className={errors.image ? "border-red-500" : ""}
                />
              </div>
            </div>

            {/* Type-specific Fields */}
            {selectedOption === "donation" && (
              <>
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">
                    Category *
                  </label>
                  <Select onValueChange={setCategory}>
                    <SelectTrigger
                      id="category"
                      className={errors.category ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {DonationsCategories.filter((c) => c !== "all").map(
                        (c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="ownerPhone" className="text-sm font-medium">
                    Phone Number *
                  </label>
                  <Input
                    id="ownerPhone"
                    placeholder="Enter phone number"
                    value={ownerPhone}
                    onChange={(e) => setOwnerPhone(e.target.value)}
                    className={errors.ownerPhone ? "border-red-500" : ""}
                    type="tel"
                  />
                </div>
              </>
            )}

            {selectedOption === "host" && (
              <div className="space-y-4">
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
                  <label htmlFor="hosting" className="text-sm font-medium">
                    Hosting Type *
                  </label>
                  <Select onValueChange={setHosting}>
                    <SelectTrigger
                      id="hosting"
                      className={errors.hosting ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select Hosting Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {EatUpsHosting.filter((h) => h !== "all").map((h) => (
                        <SelectItem key={h} value={h}>
                          {h}
                        </SelectItem>
                      ))}
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
                    placeholder="Enter maximum number of guests"
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                    min="1"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    id="kosher"
                    type="checkbox"
                    checked={kosher}
                    onChange={(e) => setKosher(e.target.checked)}
                  />
                  <label htmlFor="kosher" className="text-sm font-medium">
                    Kosher
                  </label>
                </div>
              </div>
            )}

            {selectedOption === "residence" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="enterDate" className="text-sm font-medium">
                    Enter Date *
                  </label>
                  <Input
                    id="enterDate"
                    type="date"
                    placeholder="Enter Date"
                    value={enterDate}
                    onChange={(e) => setEnterDate(e.target.value)}
                    className={errors.enterDate ? "border-red-500" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contractDuration"
                    className="text-sm font-medium"
                  >
                    Contract Duration (months) *
                  </label>
                  <Input
                    id="contractDuration"
                    type="number"
                    placeholder="Enter duration in months"
                    value={contractDuration}
                    onChange={(e) => setContractDuration(e.target.value)}
                    className={errors.contractDuration ? "border-red-500" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="propertyTax" className="text-sm font-medium">
                    Property Tax *
                  </label>
                  <Input
                    id="propertyTax"
                    type="number"
                    placeholder="Enter property tax"
                    value={propertyTax}
                    onChange={(e) => setPropertyTax(e.target.value)}
                    className={errors.propertyTax ? "border-red-500" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone Number *
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={errors.phone ? "border-red-500" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="rooms" className="text-sm font-medium">
                    Number of Rooms *
                  </label>
                  <Input
                    id="rooms"
                    type="number"
                    placeholder="Enter number of rooms"
                    value={rooms}
                    onChange={(e) => setRooms(e.target.value)}
                    className={errors.rooms ? "border-red-500" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="price" className="text-sm font-medium">
                    Price *
                  </label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className={errors.price ? "border-red-500" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="type" className="text-sm font-medium">
                    Type *
                  </label>
                  <Select onValueChange={setType}>
                    <SelectTrigger
                      id="type"
                      className={errors.type ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {residencesType
                        .filter((t) => t !== "all")
                        .map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="floor" className="text-sm font-medium">
                    Floor *
                  </label>
                  <Input
                    id="floor"
                    type="number"
                    placeholder="Enter floor number"
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                    className={errors.floor ? "border-red-500" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="size" className="text-sm font-medium">
                    Size (m²)
                  </label>
                  <Input
                    id="size"
                    type="number"
                    placeholder="Enter size in square meters"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="roommates" className="text-sm font-medium">
                    Number of Roommates
                  </label>
                  <Input
                    id="roommates"
                    type="number"
                    placeholder="Enter number of roommates"
                    value={roommates}
                    onChange={(e) => setRoommates(e.target.value)}
                  />
                </div>

                {["furniture", "storage", "balcony", "shelter"].map(
                  (feature) => {
                    const setterMap = {
                      furniture: setFurniture,
                      storage: setStorage,
                      balcony: setBalcony,
                      shelter: setShelter,
                    };

                    const valueMap = {
                      furniture,
                      storage,
                      balcony,
                      shelter,
                    };

                    return (
                      <div key={feature} className="flex items-center gap-2">
                        <input
                          id={feature}
                          type="checkbox"
                          checked={
                            valueMap[feature as keyof typeof valueMap] === "yes"
                          }
                          onChange={(e) =>
                            setterMap[feature as keyof typeof setterMap](
                              e.target.checked ? "yes" : "no"
                            )
                          }
                        />
                        <label
                          htmlFor={feature}
                          className="text-sm font-medium capitalize"
                        >
                          {feature}
                        </label>
                      </div>
                    );
                  }
                )}
              </div>
            )}

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={handleCreatePost}>Create Post</Button>
            </div>
          </div>
        )}

        {showAlert && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Please fill in all required fields correctly.
            </AlertDescription>
          </Alert>
        )}
      </Card>
    </div>
  );
}
