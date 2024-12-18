import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";


export default function NewPost() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [step, setStep] = useState<number>(1); // Controla os passos
  const [description, setDescription] = useState<string>(""); // Texto grande
  const [image, setImage] = useState<File | null>(null); // Upload de imagem
  // Lida com o evento de arrastar sobre a área de upload
const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Evita o comportamento padrão
  };
  
  // Lida com o evento de soltar a imagem na área de upload
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      setImage(droppedFile); // Define a imagem no estado
      e.dataTransfer.clearData();
    }
  };
  

  // Lida com o upload de imagem
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-yellow-50 to-yellow-200">
      <Card className="w-full max-w-md p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-extrabold text-gray-800 mb-6">
          {step === 1 ? "NEW POST" : "POST DETAILS"}
        </h2>

        {/* Passo 1: Escolha de Opção */}
        {step === 1 && !selectedOption && (
          <>
            <div className="text-center text-lg font-semibold text-gray-700 mb-8">
              How would you like to contribute?
            </div>
            <div className="flex flex-col items-center space-y-4">
              <Button
                variant="outline"
                className="w-full text-gray-800 hover:bg-gray-100 font-bold"
                onClick={() => setSelectedOption("donation")}
              >
                DONATION
              </Button>
              <Button
                variant="outline"
                className="w-full text-gray-800 hover:bg-gray-100 font-bold"
                onClick={() => setSelectedOption("host")}
              >
                HOST EAT UP!
              </Button>
              <Button
                variant="outline"
                className="w-full text-gray-800 hover:bg-gray-100 font-bold"
                onClick={() => setSelectedOption("residence")}
              >
                RESIDENCE
              </Button>
            </div>
          </>
        )}

        {/* Passo 2: Campos para a Opção Selecionada */}
        {step === 1 && selectedOption && (
          <>
            <div className="text-center text-lg font-semibold text-gray-700 mb-4">
              {`Fill in the details for your ${selectedOption}:`}
            </div>

            <div className="space-y-4">
              <Input placeholder="Location" className="w-full" />

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="north">North</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="south">South</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="furniture">Furniture</SelectItem>
                  <SelectItem value="clothes">Clothes</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="army">Army Equipment</SelectItem>
                </SelectContent>
              </Select>

              {/* Botão Next e Back */}
              <Button
                variant="outline"
                className="w-full text-gray-800 hover:bg-gray-100"
                onClick={() => setStep(2)} // Avança para o passo 3
                >
                NEXT
              </Button>
              <Button
                variant="outline"
                className="w-full text-gray-800 hover:bg-gray-100"
                onClick={() => setSelectedOption(null)} // Volta para o passo inicial
                >
                BACK
              </Button>
            </div>
          </>
        )}

        {/* Passo 3: Adicionar Texto e Upload de Imagem */}
        {step === 2 && (
          <>
            <div className="text-center text-lg font-semibold text-gray-700 mb-4">
              Add details for your post:
            </div>

            {/* Campo de Texto */}
            <Textarea
              placeholder="Write a description for your post..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-32 resize-none"
            />

             {/* Upload de Imagem */}
             <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-4 mt-4 rounded-lg"
            >
              <p className="text-gray-500 mb-2">
                Drag and drop an image, or click below to upload.
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                id="camera-upload"
                className="hidden"
                onChange={handleImageUpload}
              />

              {image && (
                <p className="mt-2 text-sm text-gray-600">
                  Uploaded: {image.name}
                </p>
              )}
            </div>

            {/* Botão Create Post e Back */}
            <div className="flex flex-col space-y-4 mt-6">
              <Button className="w-full font-bold">Create Post</Button>
              <Button
                variant="outline"
                className="w-full text-gray-800 hover:bg-gray-100"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}