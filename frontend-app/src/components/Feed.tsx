import React from "react";
import { useQuery } from "@tanstack/react-query";
import { PostCard } from "./PostCard";
import { Skeleton } from "./ui/skeleton";
import { api } from "@/api";
import CreatePost from "@/components/CreatePost";

interface Post {
  _id: string;
  content: string;
  image?: string;
  author: {
    firstName: string;
    lastName: string;
    profileImage?: string;
    type: string;
  };
  likes: string[];
  comments: Array<{
    user: string;
    text: string;
    createdAt: string;
  }>;
}

const fetchPosts = async (): Promise<Post[]> => {
  const response = await api.get("/posts");
  return response.data;
};

export function Feed() {
  const { data: posts, isLoading, isError } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 1,
  });

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">
        Failed to load posts. Please try again.
      </p>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <CreatePost onPostCreated={() => console.log("Post created")} />
      {posts?.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
