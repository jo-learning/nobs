import { useState } from 'react';
import UpdateProfileModal from './updateprofilemodal';

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'I am a web developer with a passion for creating beautiful and functional web applications.',
    avatar: '/avatar.png', // Example avatar image
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
    handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-6">
        <div className="text-center">
          <img
            className="w-32 h-32 rounded-full mx-auto mb-4"
            src={user.avatar}
            alt="User Avatar"
          />
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="mt-4 text-gray-500">{user.bio}</p>
        </div>
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={handleOpenModal}
        >
          Update Profile
        </button>
      </div>

      {/* Update Profile Modal */}
      {isModalOpen && (
        <UpdateProfileModal
          user={user}
          onClose={handleCloseModal}
          onUpdate={handleUpdateUser}
        />
      )}
    </div>
  );
};

export default ProfilePage;
