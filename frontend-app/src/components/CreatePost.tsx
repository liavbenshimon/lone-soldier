import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { uploadImage } from "@/components/UploadPhoto";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { api } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CreatePost({ onPostCreated }: { onPostCreated: () => void }) {
  const [content, setContent] = useState(""); // Conteúdo do post
  const [image, setImage] = useState<File | null>(null); // Arquivo de imagem
  const [uploading, setUploading] = useState(false); // Status do upload
  const [error, setError] = useState<string | null>(null); // Mensagem de erro
  const [loading, setLoading] = useState(false); // Status de carregamento

  const user = useSelector((state: RootState) => state.user); // Usuário logado
  const queryClient = useQueryClient(); // TanStack Query Client

  // Função de criação do post com TanStack Mutation
  const createPostMutation = useMutation({
    mutationFn: async (postData: any) => {
      const response = await api.post("/posts", postData);
      return response.data;
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        onPostCreated(); // Callback adicional, caso necessário
    },
    onError: () => {
      setError("Failed to create post. Please try again.");
    },
  });

  const handleSubmit = async () => {
    setError(null); // Limpa erros antigos

    if (!content && !image) {
      setError("You must provide content or an image.");
      return;
    }

    setLoading(true);
    let imageUrl = "";

    try {
      if (image) {
        setUploading(true);
        imageUrl = await uploadImage(image);
        setUploading(false);
      }

      const postData = {
        content,
        image: imageUrl,
        author: user._id,
        visibility: user.type,
      };

      createPostMutation.mutate(postData);

      setContent("");
      setImage(null);
    } catch (error: any) {
      setError("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Create Post</h2>
      <div className="space-y-4">
        <Textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Button
          onClick={handleSubmit}
          disabled={loading || uploading}
          className="w-full bg-blue-500 text-white"
        >
          {loading ? "Creating..." : "Create Post"}
        </Button>
      </div>
    </Card>
  );
}
