//TODO: to add social feed of the user's posts 
//TODO: to add route to this component
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { api } from "@/api";

const StrangeProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState({
    nickname: "",
    bio: "",
    profileImage: "",
    type: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get(`/users/${id}/public`);
        const { nickname, bio, profileImage, type } = response.data;

        setUser({ nickname, bio, profileImage, type });
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load profile. Please try again later.");
      }
    };

    fetchUserProfile();
  }, [id]);

  const userTypeMessage = user.type === "Soldier" 
    ? `- ${user.nickname}, Lone ${user.type}` 
    : `- ${user.nickname}, ${user.type}`;
  const userNameColor =
    user.type === "Contributer" ? "text-pink-500" : "text-green-500";

  if (error) {
    return (
      <div className="flex bg-gray-900 text-foreground min-h-screen items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-900 text-foreground min-h-screen">
      <Navbar modes="home" isVertical={true} isAccordion={true} />

      <div className="flex-1 flex flex-col items-center py-10 px-4">
        {/* Dynamic title */}
        <h1 className="text-3xl font-bold mb-6">
          <span className={userNameColor}>{user.nickname || "User"}</span>'s Profile
        </h1>

        <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="relative">
            {/* Profile image with float */}
            <img
              src={user.profileImage}
              alt="Profile"
              className="float-left rounded-lg border-2 hover:border-green-500 w-[100px] h-[100px] mr-4 mb-6 lg:w-[175px] lg:h-[175px]"
            />

            {/* Bio content */}
            <p className="text-gray-400">
              {user.bio ||
                `Hey there! I'm Forrest and I’m a lone soldier serving in the IDF as a combat fighter in the Nahal brigade. I grew up in this small town in the US where no one really talked much about Israel except my family. Like every Friday night, my parents would go on and on about how Israel was built from nothing and how it’s this crazy story of people fighting for a place to call home.`}
            </p>
            <p className="text-green-500 text-sm mt-4">{userTypeMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrangeProfile;

