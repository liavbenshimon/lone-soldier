import React from "react";

interface ProfileImageDialogProps {
  profileImages: string[];
  onSelectImage: (image: string) => void;
  onClose: () => void;
}

const ProfileImageDialog: React.FC<ProfileImageDialogProps> = ({
  profileImages,
  onSelectImage,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 text-gray-100 p-6 rounded-lg shadow-md w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">Select a Profile Picture</h2>
        <div className="grid grid-cols-6 gap-4">
          {profileImages.map((img, index) => (
            <img
              key={index}
              src={`/src/assets/profilePictures/${img}`}
              alt={img}
              onClick={() => {
                onSelectImage(`/src/assets/profilePictures/${img}`); // Atualiza com o caminho correto
                onClose(); // Fecha o diálogo
              }}
              className="w-16 h-16 rounded-full cursor-pointer border-2 hover:border-green-500"
            />
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-400"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProfileImageDialog;
