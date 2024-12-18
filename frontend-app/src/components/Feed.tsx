import { PostCard } from "./PostCard";

export function Feed() {
  return (
    <div className="flex-1 p-6 bg-background">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold mb-8">
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Donations
          </span>{" "}
        </h2>
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </div>
  );
}
