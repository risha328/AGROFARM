import { useState, useRef } from 'react';

const ProfilePage = () => {
  // User data state
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St, City, Country',
    phone: '+1 (555) 123-4567',
  });

  // Image states
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('https://via.placeholder.com/150');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Handle image selection
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate image type and size
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, profileImage: 'Please select an image file' }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB
        setErrors(prev => ({ ...prev, profileImage: 'Image size should be less than 5MB' }));
        return;
      }

      setProfileImage(file);
      setErrors(prev => ({ ...prev, profileImage: null }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!userData.name.trim()) newErrors.name = 'Name is required';
    if (!userData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!userData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!userData.address.trim()) newErrors.address = 'Address is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Profile updated:', { 
        ...userData, 
        profileImage: profileImage ? profileImage.name : 'No change' 
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrors(prev => ({ ...prev, form: 'Failed to update profile. Please try again.' }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Profile header */}
          <div className="bg-indigo-700 px-6 py-8 sm:px-10 sm:py-12">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="relative group">
                <img
                  className="h-32 w-32 rounded-full border-4 border-white object-cover"
                  src={previewImage}
                  alt="Profile"
                />
                {isEditing && (
                  <>
                    <div 
                      className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      onClick={handleImageClick}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      ref={fileInputRef}
                    />
                  </>
                )}
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-white">
                  {isEditing ? (
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        className={`bg-indigo-600 border-b ${errors.name ? 'border-red-400' : 'border-indigo-300'} text-white focus:outline-none focus:border-white w-full`}
                        placeholder="Full Name"
                      />
                      {errors.name && <p className="text-red-200 text-sm mt-1">{errors.name}</p>}
                    </div>
                  ) : (
                    userData.name
                  )}
                </h1>
                <p className="text-indigo-200 mt-1">
                  {isEditing ? (
                    <div>
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        className={`bg-indigo-600 border-b ${errors.email ? 'border-red-400' : 'border-indigo-300'} text-indigo-200 focus:outline-none focus:border-white w-full`}
                        placeholder="Email Address"
                      />
                      {errors.email && <p className="text-red-200 text-sm mt-1">{errors.email}</p>}
                    </div>
                  ) : (
                    userData.email
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Profile details */}
          <div className="px-6 py-8 sm:px-10">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Contact Information</h2>
              
              {errors.form && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                  {errors.form}
                </div>
              )}
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
                  {isEditing ? (
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full border-b ${errors.phone ? 'border-red-400' : 'border-gray-300'} focus:border-indigo-500 focus:outline-none py-2`}
                        placeholder="Phone Number"
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                  ) : (
                    <p className="mt-1 text-gray-800">{userData.phone}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
                  {isEditing ? (
                    <div>
                      <textarea
                        name="address"
                        value={userData.address}
                        onChange={handleInputChange}
                        rows="2"
                        className={`mt-1 block w-full border-b ${errors.address ? 'border-red-400' : 'border-gray-300'} focus:border-indigo-500 focus:outline-none py-2`}
                        placeholder="Full Address"
                      />
                      {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>
                  ) : (
                    <p className="mt-1 text-gray-800 whitespace-pre-line">{userData.address}</p>
                  )}
                </div>
                
                {errors.profileImage && isEditing && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.profileImage}
                  </div>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setErrors({});
                    }}
                    disabled={isLoading}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="px-4 py-2 bg-indigo-600 rounded-md text-white hover:bg-indigo-700 disabled:opacity-50 flex items-center"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : 'Save Changes'}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-indigo-600 rounded-md text-white hover:bg-indigo-700"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;