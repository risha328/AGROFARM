import React from 'react';
import { FaUserEdit, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';

const ProfilePage = () => {
  // Sample user data - replace with actual user data from your state/API
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Farm Lane, Agricultural District, NY 10001",
    joinDate: "Joined January 2023",
    role: "Premium Member",
    verified: true,
    profilePic: null, // Set to null to show placeholder
    bio: "Passionate farmer with 10+ years of experience in organic agriculture. Specializing in sustainable farming practices and crop rotation techniques."
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-green-50">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
        <div className="relative">
          {user.profilePic ? (
            <img 
              src={user.profilePic} 
              className="w-32 h-32 rounded-full object-cover border-4 border-green-100 shadow-lg"
              alt={user.name}
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <FaUserEdit size={48} />
            </div>
          )}
          {user.verified && (
            <div className="absolute bottom-0 right-0 bg-green-500 text-white p-1 rounded-full">
              <MdVerified size={20} />
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{user.name}</h1>
            {user.verified && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center gap-1">
                <MdVerified size={12} />
                Verified
              </span>
            )}
          </div>
          <p className="text-gray-600 mb-3">{user.bio}</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-sm bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
              {user.role}
            </span>
            <span className="text-sm bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
              Organic Farmer
            </span>
            <span className="text-sm bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
              Sustainable Practices
            </span>
          </div>
        </div>

        <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg transition-all self-start md:self-center">
          Edit Profile
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-6"></div>

      {/* Profile Details */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaUserEdit className="text-green-500" />
            Personal Information
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Full Name</label>
              <p className="text-gray-800">{user.name}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-gray-800 flex items-center gap-2">
                <FaEnvelope className="text-gray-400" />
                {user.email}
              </p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500">Phone</label>
              <p className="text-gray-800 flex items-center gap-2">
                <FaPhone className="text-gray-400" />
                {user.phone}
              </p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500">Address</label>
              <p className="text-gray-800 flex items-center gap-2">
                <FaMapMarkerAlt className="text-gray-400" />
                {user.address}
              </p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500">Member Since</label>
              <p className="text-gray-800 flex items-center gap-2">
                <FaCalendarAlt className="text-gray-400" />
                {user.joinDate}
              </p>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Settings</h2>
          
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-all">
              <h3 className="font-medium text-gray-800 mb-1">Change Password</h3>
              <p className="text-sm text-gray-500">Update your account password</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-all">
              <h3 className="font-medium text-gray-800 mb-1">Notification Preferences</h3>
              <p className="text-sm text-gray-500">Manage your email and notification settings</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-all">
              <h3 className="font-medium text-gray-800 mb-1">Privacy Settings</h3>
              <p className="text-sm text-gray-500">Control what information is visible to others</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-all">
              <h3 className="font-medium text-gray-800 mb-1">Connected Accounts</h3>
              <p className="text-sm text-gray-500">Manage your social media connections</p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-6"></div>

      {/* Additional Sections */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Farming Preferences</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">Crop Types</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Organic Vegetables</li>
              <li>• Fruits</li>
              <li>• Grains</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">Farming Methods</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Sustainable</li>
              <li>• Organic</li>
              <li>• Crop Rotation</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">Certifications</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• USDA Organic</li>
              <li>• Fair Trade</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-100 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-red-800 mb-2">Danger Zone</h2>
        <p className="text-red-600 mb-4">These actions are irreversible. Please proceed with caution.</p>
        
        <div className="flex flex-wrap gap-4">
          <button className="text-red-600 hover:text-red-800 font-medium px-4 py-2 border border-red-200 rounded-lg hover:bg-red-100 transition-all">
            Deactivate Account
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-all">
            Delete Account Permanently
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;











        