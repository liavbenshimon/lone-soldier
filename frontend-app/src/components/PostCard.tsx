import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export function PostCard() {
  return (
    <Card className="p-4 md:p-6 mb-12 max-w-4xl mx-auto drop-shadow-xl shadow-black/10 dark:shadow-white/10">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3 flex justify-center items-center">
          <img
            src="https://via.placeholder.com/600x400"
            alt="Post"
            className="w-full md:w-full h-auto object-contain rounded-md"
          />
        </div>

        <div className="w-full md:w-1/3 flex flex-col justify-between"></div>
        <div>
          <div className="flex items-center mb-4">
            <div>
              <h3 className="font-bold text-lg md:text-xl">David Cohen</h3>
              <p className="text-muted-foreground text-sm md:text-base">
                2 hours ago
              </p>
            </div>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Looking for a small refrigerator for my apartment. Any help would be
            greatly appreciated!
          </p>
        </div>
      </div>
    </Card>
  );
}
