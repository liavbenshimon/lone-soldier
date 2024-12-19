import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { uploadImage } from "@/components/UploadPhoto"; // Caminho do seu arquivo
import { api } from "@/api"; // Use o api.ts já configurado

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Errors {
  location?: boolean;
  zone?: boolean;
  category?: boolean;
  date?: boolean;
  isKosher?: boolean;
  rooms?: boolean;
  price?: boolean;
  type?: boolean;
  floor?: boolean;
  image?: boolean;
}
  

export default function NewPost() {
  const handleCreatePost = async () => {
    if (!validateFields()) return;

    const residenceData = {
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
      media: [image], // Inclua a URL da imagem
    };
  
    try {
      const response = await api.post("/residences", residenceData); // Usando diretamente o 'api' configurado
      console.log("Residence created successfully:", response.data);
      alert("Residence created successfully!");
    } catch (error) {
      console.error("Error creating residence:", error);
      alert("Error creating residence.");
    }
  };
  
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [step, setStep] = useState<number>(1);

  // Campos compartilhados
  const [location, setLocation] = useState<string>("");
  const [zone, setZone] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  // Campos específicos do RESIDENCE
  const [rooms, setRooms] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [floor, setFloor] = useState<string>("");
  const [roommates, setRoommates] = useState<string>("0");
  const [size, setSize] = useState<string>("");
  const [furniture, setFurniture] = useState<string>("");
  const [storage, setStorage] = useState<string>("");
  const [balcony, setBalcony] = useState<string>("");
  const [shelter, setShelter] = useState<string>("");


  const [description, setDescription] = useState<string>(""); // Texto grande
  const [image, setImage] = useState<string>(""); // Altere para armazenar a URL

  const [errors, setErrors] = useState<Errors>({});
  const [showAlert, setShowAlert] = useState(false);

  const validateFields = () => {
    const newErrors: any = {};

    if (!location) newErrors.location = true;
    if (!zone) newErrors.zone = true;

    if (selectedOption === "residence") {
      if (!rooms) newErrors.rooms = true;
      if (!price) newErrors.price = true;
      if (!type) newErrors.type = true;
      if (!floor) newErrors.floor = true;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setShowAlert(true);
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateFields()) {
      setStep(2); // Avança para o passo 3
      setShowAlert(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const uploadedUrl = await uploadImage(e.target.files[0]);
        setImage(uploadedUrl); // Salva a URL no estado
        setErrors((prev) => ({ ...prev, image: false })); // Reseta erros, se houver
      } catch (error) {
        console.error("Image upload failed:", error);
        setErrors((prev) => ({ ...prev, image: true }));
      }
    }
  };
  

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        setErrors((prev) => ({ ...prev, image: true }));
        e.dataTransfer.clearData();
    }
    
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <Card className="w-full max-w-md p-8 rounded-lg shadow-lg">
          <h2 className="text-center text-2xl font-extrabold text-gray-800 mb-6">
            {step === 1 ? "NEW POST" : "POST DETAILS"}
          </h2>

        {showAlert && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Attention</AlertTitle>
            <AlertDescription>
              All required fields must be filled to proceed.
            </AlertDescription>
          </Alert>
        )}

        {/* Passo 1: Escolha de Opção */}
        {step === 1 && !selectedOption && (
          <>
            <div className="text-center text-lg font-semibold text-gray-700 mb-8">
              How would you like to contribute?
            </div>
            <div className="flex flex-col items-center space-y-4">
              <Button
                variant="outline"
                onClick={() => setSelectedOption("donation")}
                className="w-full"
                >
                DONATION
              </Button>
              <Button
                variant="outline"
                onClick={() => setSelectedOption("host")}
                className="w-full"
              >
                HOST EAT UP!
              </Button>
              <Button
                variant="outline"
                onClick={() => setSelectedOption("residence")}
                className="w-full"
                >
                RESIDENCE
              </Button>
            </div>
          </>
        )}

        {/* Passo 2: Formulários */}
{step === 1 && selectedOption && (
  <>
    <div className="text-center text-lg font-semibold mb-4">
      {`Fill in the details for your ${selectedOption}:`}
    </div>

    <Input
      placeholder="Location"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      className={`${errors.location ? "border-red-500" : ""} mb-4`}
    />

    <Select onValueChange={setZone}>
      <SelectTrigger className={`${errors.zone ? "border-red-500" : ""} mb-4`}>
        <SelectValue placeholder="Select Zone" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="north">North</SelectItem>
        <SelectItem value="center">Center</SelectItem>
        <SelectItem value="south">South</SelectItem>
      </SelectContent>
    </Select>

    {/* Campos Específicos */}
    {selectedOption === "donation" && (
      <Select onValueChange={setCategory}>
        <SelectTrigger
          className={`${errors.category ? "border-red-500" : ""} mb-4`}
          >
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="furniture">Furniture</SelectItem>
          <SelectItem value="clothes">Clothes</SelectItem>
          <SelectItem value="electronics">Electronics</SelectItem>
          <SelectItem value="army">Army Equipment</SelectItem>
        </SelectContent>
      </Select>
    )}
    {selectedOption === "residence" && (
      <>
        <Input
          placeholder="Rooms"
          value={rooms}
          onChange={(e) => setRooms(e.target.value)}
          className={`${errors.rooms ? "border-red-500" : ""} mb-4`}
          />
        <Input
          placeholder="Price (₪)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className={`${errors.price ? "border-red-500" : ""} mb-4`}
        />
        <Select onValueChange={setType}>
          <SelectTrigger className={`${errors.type ? "border-red-500" : ""} mb-4`}>
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="house">House</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Floor"
          value={floor}
          onChange={(e) => setFloor(e.target.value)}
          className={`${errors.floor ? "border-red-500" : ""} mb-4`}
          />
        <Input
          placeholder="Roommates (default 0)"
          value={roommates}
          onChange={(e) => setRoommates(e.target.value)}
          className="mb-4"
          />
        <Input
          placeholder="Size (m²)"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="mb-4"
          />
        <Select onValueChange={setFurniture}>
          <SelectTrigger className="mb-4">
            <SelectValue placeholder="Furniture?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setStorage}>
          <SelectTrigger className="mb-4">
            <SelectValue placeholder="Storage?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setBalcony}>
          <SelectTrigger className="mb-4">
            <SelectValue placeholder="Balcony?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setShelter}>
          <SelectTrigger className="mb-4">
            <SelectValue placeholder="Shelter?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>
      </>
    )}
    {selectedOption === "host" && (
      <>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={`${errors.date ? "border-red-500" : ""} mb-4`}
          />
        <Select onValueChange={setIsKosher}>
          <SelectTrigger
            className={`${errors.isKosher ? "border-red-500" : ""} mb-4`}
            >
            <SelectValue placeholder="Is Kosher?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>
      </>
    )}


<Button
  variant="outline"
  className="w-full text-gray-800 hover:bg-gray-100"
  onClick={handleNext} // Chama a função que valida os campos e avança
>
  NEXT
</Button>

            <Button
              variant="outline"
              onClick={() => setSelectedOption(null)}
              className="w-full"
              >
              BACK
            </Button>
          </>
        )}

        {/* Passo 3: Descrição e Upload */}
        {step === 2 && (
          <>
            <Textarea
              placeholder="Write a description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="border-2 border-dashed p-4 mt-4"
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="upload"
              />
              <label htmlFor="upload" className="cursor-pointer">
                Upload or Drag Image
              </label>
            </div>
            <Button onClick={()=>handleCreatePost} className="w-full mt-4">
              CREATE POST
            </Button>

            <Button
                variant="outline"
                onClick={() => setStep(1)} // Atualiza para o passo anterior
                className="w-full mt-4"
            >
            BACK
            </Button>
        </>
        )}
      </Card>
    </div>
  );
};
};