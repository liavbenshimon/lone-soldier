import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/Redux/store";
import { updateUser } from "@/Redux/userSlice";
import ProfileImageDialog from "@/components/ProfileImageDialog";
import Checkbox from "../components/Checkbox";
import { Navbar } from "@/components/Navbar";
import { Filter } from "bad-words";
import { api } from "@/api";

const nicknames = ["Bob", "Sweet", "Jon", "Juan", "Min", "Laila", "Pedro", "Jess", "Igor", "Cat"];
const profileImages = ["boy_1.svg", "boy_2.svg", "girl_1.svg", "girl_2.svg"];

const getRandomItem = <T,>(array: T[]): T => array[Math.floor(Math.random() * array.length)];

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
console.log(user.bio);


  const defaultNickname = user.nickname || getRandomItem(nicknames);
  const [nickname, setNickname] = useState(defaultNickname);
  const [profileImage, setProfileImage] = useState(
    user.profileImage || `/src/assets/profilePictures/${getRandomItem(profileImages)}`
  );
  const [email, setEmail] = useState(user.email || "");
  console.log(email);
  
  const [phone, setPhone] = useState(user.phone || "");
  const [bio, setBio] = useState(user.bio || "");
  console.log(bio);
  
  const [receiveNotifications, setReceiveNotifications] = useState<boolean>(
    user.receiveNotifications ?? false
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState("");

  const filter = new Filter();

  const handleNicknameChange = (value: string) => {
    if (value === "") {
      setError("");
      setNickname(value);
      return;
    }

    const regex = /^[a-zA-Z0-9]{1,20}$/;

    if (filter.isProfane(value)) {
      setError("Inappropriate nickname! Please choose a different one.");
    } else if (!regex.test(value)) {
      setError("Nickname must be alphanumeric and 1-20 characters long.");
    } else {
      setError("");
      setNickname(value);
    }
  };

  const handleNicknameBlur = () => {
    if (!nickname) {
      setNickname(defaultNickname);
    }
  };

  const handleSubmit = async () => {
    if (!nickname) {
      setError("Nickname cannot be empty.");
      return;
    }

    if (error) {
      alert("Please fix the errors before saving!");
      return;
    }

    try {
      const updatedUser = {
        nickname,
        email,
        phone,
        bio,
        profileImage,
        receiveNotifications,
      };

      const response = await api.put(`/users/${user._id}`, updatedUser); 

      dispatch(updateUser(response.data));
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/users/${user._id}`);
        console.log(response.data);
        setNickname(response.data.nickname) 
        setProfileImage(response.data.profileImage) 
        setEmail(response.data.email) 
        setPhone(response.data.phone) 
        setBio(response.data.bio) 
        setReceiveNotifications(response.data.receiveNotifications) 

        console.log(user._id);
        
        
        dispatch(updateUser(response.data));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex bg-gray-900 text-foreground min-h-screen">
      <Navbar modes="home" isVertical={true} isAccordion={true} />

      <div className="flex-1 flex flex-col items-center py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">
          <span className="text-pink-500">Profile</span> Settings
        </h1>

        <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex flex-row items-start space-x-4">
            <div className="flex-1 space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">Nickname</label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => handleNicknameChange(e.target.value)}
                  onBlur={handleNicknameBlur}
                  placeholder="Enter a unique nickname"
                  className="w-full p-2 rounded bg-gray-700 text-gray-100 border border-gray-600"
                />
                <button
                  onClick={() => setNickname(getRandomItem(nicknames))}
                  className="mt-2 text-sm text-blue-500 hover:underline"
                >
                  Suggest a Nickname
                </button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>
              <div className="w-full lg:w-auto mt-4 lg:mt-0">
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
                className="w-full p-2 rounded bg-gray-700 text-gray-100 border border-gray-600"
              />
            </div>
            </div>

            <div className="flex-none lg:w-1/2 flex flex-col items-center justify-center mt-4 lg:mt-0">
  <img
    src={profileImage}
    alt="Profile"
    onClick={() => setIsDialogOpen(true)}
    className="rounded-full cursor-pointer border-2 hover:border-green-500 w-[100px] h-[100px] lg:w-[200px] lg:h-[200px]"
  />
  <p className="text-xs mt-5 text-center">
    Change <br /> profile picture
  </p>
</div>


          </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  disabled
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  className="w-full p-2 rounded bg-gray-700 text-gray-100 border border-gray-600"
                />
              </div>

          <div className="space-y-4">
            {/* <div className="lg:pr-[52%] mb-6">
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
                className="w-full p-2 rounded bg-gray-700 text-gray-100 border border-gray-600"
              />
            </div> */}
            <div>
              <label className="block text-sm font-medium mt-3 mb-1">Biography</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Write a short bio"
                className="w-full p-2 rounded bg-gray-700 text-gray-100 border border-gray-600 resize-none overflow-y-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-700"
                rows={4}
              />
            </div>
          </div>

          <div className="flex items-center mt-4">
            <Checkbox
              checked={receiveNotifications}
              onCheckedChange={(checked: boolean) =>
                setReceiveNotifications(checked)
              }
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 text-gray-900 font-bold py-2 rounded hover:bg-green-400 mt-4"
          >
            Save Changes
          </button>
        </div>

        {isDialogOpen && (
          <ProfileImageDialog
            profileImages={profileImages}
            onSelectImage={(img) => setProfileImage(img)}
            onClose={() => setIsDialogOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
