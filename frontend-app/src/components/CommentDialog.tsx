import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { uploadImage } from "@/components/UploadPhoto";
import { api } from "@/api";
import { useSelector } from "react-redux";

interface Comment {
  user: {
    nickname: string;
    profileImage?: string;
  };
  text: string;
  image?: string;
  createdAt?: string;
}

export function CommentDialog({
  post,
  isOpen,
  onClose,
}: {
  post: any;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [comments, setComments] = useState<Comment[]>([]); // Lista de comentários
  const [newComment, setNewComment] = useState(""); // Novo texto do comentário
  const [newCommentImage, setNewCommentImage] = useState<File | null>(null); // Arquivo de imagem do comentário
  const [loading, setLoading] = useState(false); // Status de envio
  const [uploading, setUploading] = useState(false); // Status de upload de imagem
  const [error, setError] = useState<string | null>(null); // Mensagem de erro

  const { nickname, profileImage } = useSelector((state: any) => state.user);

  useEffect(() => {
    const fetchCommentsWithDetails = async () => {
      try {
        const detailedComments = await Promise.all(
          post.comments.map(async (comment: any) => {
            const userResponse = await api.get(`/users/${comment.user}`);
            return {
              ...comment,
              user: {
                nickname: userResponse.data.nickname,
                profileImage: userResponse.data.profileImage,
              },
            };
          })
        );
        setComments(detailedComments);
      } catch (error) {
        console.error("Error fetching user details for comments:", error);
      }
    };

    fetchCommentsWithDetails();
  }, [post.comments]);

  const handleAddComment = async () => {
    setError(null);

    if (!newComment && !newCommentImage) {
      setError("You must provide text or an image.");
      return;
    }

    setLoading(true);

    try {
      let imageUrl = "";

      // Faz upload da imagem se houver
      if (newCommentImage) {
        setUploading(true);
        imageUrl = await uploadImage(newCommentImage);
        setUploading(false);
      }

      // Envia o comentário para o backend
      const response = await api.post(`/posts/${post._id}/comment`, {
        text: newComment,
        image: imageUrl,
        userId: sessionStorage.getItem("id"),
      });

      // Adiciona o novo comentário localmente
      const newCommentWithDetails = {
        text: newComment,
        image: imageUrl,
        createdAt: new Date().toISOString(), // Atualiza data local
        user: {
          nickname,
          profileImage,
        },
      };

      setComments((prevComments) => [...prevComments, newCommentWithDetails]); // Atualiza a lista local
      setNewComment(""); // Limpa o campo de texto
      setNewCommentImage(null); // Limpa o arquivo
    } catch (error) {
      console.error("Error adding comment:", error);
      setError("Failed to add comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewCommentImage(e.target.files[0]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-50 backdrop-blur-sm bg-black/50" />
        <DialogContent className="fixed left-1/2 top-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-h-screen max-w-full overflow-hidden md:max-w-4xl md:h-[85vh]">
          <DialogTitle className="sr-only">Comment on Post</DialogTitle>
          <div className="bg-gray-900 rounded-lg shadow-lg w-full h-full flex flex-col md:h-[85vh]">
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {post.image && (
                <div className="hidden md:block w-full md:w-1/2 bg-black flex flex-col items-center justify-center overflow-hidden">
                  <img
                    src={post.image}
                    alt="Post"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              )}

              <div
                className={`flex-1 flex flex-col overflow-hidden ${
                  post.image ? "md:w-1/2" : "w-full"
                }`}
              >
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {comments.map((comment, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <img
                          src={
                            comment.user.profileImage || "/default-avatar.png"
                          }
                          alt={comment.user.nickname}
                          className="w-10 h-10 rounded-full bg-gray-800"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-semibold text-primary">
                            {comment.user.nickname || "Anonymous"}
                          </span>{" "}
                          <span
                            className="break-words"
                            style={{
                              overflowWrap: "break-word",
                              wordBreak: "break-word",
                            }}
                          >
                            {comment.text}
                          </span>
                        </p>
                        {comment.image && (
                          <img
                            src={comment.image}
                            alt="Comment media"
                            className="mt-2 rounded-md max-w-[300px] max-h-[200px] object-cover"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-800 p-4 border-t">
                  {error && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <div className="flex items-center space-x-2">
                    <Textarea
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="flex-1 resize-none bg-gray-700 text-gray-200 border border-gray-600 focus:ring-primary focus:border-primary rounded-lg"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="comment-image-upload"
                    />
                    <label htmlFor="comment-image-upload">
                      <Button variant="ghost" className="flex items-center">
                        📷
                      </Button>
                    </label>
                    <Button
                      onClick={handleAddComment}
                      disabled={loading || uploading}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
                    >
                      {loading ? "Posting..." : "Post"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
