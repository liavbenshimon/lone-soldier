import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NewPost() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-yellow-50 to-yellow-200">
      <Card className="w-full max-w-md p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-extrabold text-gray-200 mb-6">
          NEW POST
        </h2>

        <div className="text-center text-lg font-semibold text-gray-200 mb-8">
          How would you like to contribute?
        </div>

        <div className="flex flex-col items-center space-y-4">
          <Button
            variant="outline"
            className="w-full text-gray-200 hover:bg-gray-100 font-bold"
          >
            DONATION
          </Button>
          <Button
            variant="outline"
            className="w-full text-gray-200 hover:bg-gray-100 font-bold"
          >
            HOST EAT UP!
          </Button>
          <Button
            variant="outline"
            className="w-full text-gray-200 hover:bg-gray-100 font-bold"
          >
            RESIDENCE
          </Button>
        </div>
      </Card>
    </div>
  );
}
