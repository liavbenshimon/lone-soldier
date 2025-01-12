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
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state: RootState) => state.user);
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: async (postData: any) => {
      const response = await api.post("/posts", postData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onPostCreated();
    },
    onError: () => {
      setError("Failed to create post. Please try again.");
    },
  });

  const handleSubmit = async () => {
    setError(null);

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
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
      
      <Card className="max-w-2xl w-full p-6 bg-card text-card-foreground rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Create a New Post</h2>
        <div className="space-y-4">
          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="resize-none h-28 bg-muted text-muted-foreground border border-border focus:ring-primary focus:border-primary rounded-lg"
          />
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="bg-muted text-muted-foreground border border-border focus:ring-primary focus:border-primary rounded-lg"
          />
          {error && (
            <Alert variant="destructive" className="bg-destructive text-destructive-foreground rounded-lg">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button
            onClick={handleSubmit}
            disabled={loading || uploading}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            {loading ? "Creating..." : "Create Post"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
