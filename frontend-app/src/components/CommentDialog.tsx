import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Dialog, DialogPortal, DialogOverlay, DialogContent } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { uploadImage } from "./UploadPhoto";
import { api } from "@/api";

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
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [newCommentImage, setNewCommentImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { nickname, profileImage } = useSelector((state: any) => state.user);

  // Carrega os comentários com detalhes completos do usuário
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
    if (!newComment && !newCommentImage) return;

    try {
      setLoading(true);

      const response = await api.post(`/posts/${post._id}/comment`, {
        text: newComment,
        image: newCommentImage,
        userId: sessionStorage.getItem("id"),
      });

      // Atualiza os comentários com o novo
      const newCommentWithDetails = {
        ...response.data.comment,
        user: {
          nickname,
          profileImage,
        },
      };
      setComments([...comments, newCommentWithDetails]);
      setNewComment("");
      setNewCommentImage(null);
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      const imageUrl = await uploadImage(file);
      setNewCommentImage(imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay
          className="fixed inset-0 z-50 backdrop-blur-sm bg-black/50"
          onClick={onClose}
        />
        <DialogContent
          className="fixed left-1/2 top-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-h-screen max-w-full overflow-hidden md:max-w-4xl md:h-[85vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-gray-900 rounded-lg shadow-lg w-full h-full flex flex-col md:h-[85vh]">
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              
              
            {post.image && (
  <div className="hidden md:block w-full md:w-1/2 bg-black flex flex-col items-center justify-center overflow-hidden">
    <div className="bg-black w-full" style={{ height: "10%" }}></div>
    <div className="flex-grow flex items-center justify-center">
      <img
        src={post.image}
        alt="Post"
        className="max-h-full max-w-full object-contain"
      />
    </div>
    <div className="bg-black w-full" style={{ height: "10%" }}></div>
  </div>
)}


              <div
                className={`flex-1 flex flex-col overflow-hidden ${
                  post.image ? "md:w-1/2" : "w-full"
                }`}
              >
                <div
                  className="flex-1 overflow-y-auto p-4 space-y-4"
                  style={{
                    maxHeight: "calc(100vh - 130px)",
                  }}
                >
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
                {/* Adicionar Novo Comentário */}
                <div
                  className="bg-gray-800 p-4 border-t"
                  style={{
                    position: "sticky",
                    bottom: "0",
                    zIndex: 10,
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <Textarea
                      placeholder="Add a comment..." 
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="flex-1 resize-none"
                    />
                    <input
                      type="file"
                      onChange={(e) =>
                        e.target.files && e.target.files[0] && handleImageUpload(e.target.files[0])
                      }
                      className="hidden"
                      id="comment-image-upload"
                    />
                    <label htmlFor="comment-image-upload" className="cursor-pointer">
                      <Button variant="ghost">📷</Button>
                    </label>
                    <Button onClick={handleAddComment} disabled={loading}>
                      Post
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
