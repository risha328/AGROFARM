import { useState, useRef } from 'react';

const AgriculturalProfilePage = () => {
  // User data state
  const [userData, setUserData] = useState({
    name: 'Farm Manager',
    email: 'manager@greenvalleyfarms.com',
    address: '456 Harvest Lane, Ruralville, Country',
    phone: '+1 (555) 987-6543',
    specialization: 'Organic Crop Production',
    experience: '15 years',
    farmSize: '500 acres'
  });

  // Image states
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80');
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
      if (file.size > 5 * 1024 * 1024) {
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
    if (!userData.specialization.trim()) newErrors.specialization = 'Specialization is required';
    
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
    <div className="min-h-screen bg-amber-50">
      {/* Full-width header */}
      <div className="w-full bg-green-700 px-6 py-8 sm:px-10 sm:py-12 relative">
        <div className="absolute inset-0 bg-opacity-20 bg-green-700 bg-cover bg-center"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center">
            <div className="relative group">
              <img
                className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-md"
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
                      className={`bg-green-600 border-b ${errors.name ? 'border-red-400' : 'border-green-300'} text-white focus:outline-none focus:border-white w-full placeholder-green-200`}
                      placeholder="Full Name"
                    />
                    {errors.name && <p className="text-red-200 text-sm mt-1">{errors.name}</p>}
                  </div>
                ) : (
                  userData.name
                )}
              </h1>
              <p className="text-green-200 mt-1">
                {isEditing ? (
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      className={`bg-green-600 border-b ${errors.email ? 'border-red-400' : 'border-green-300'} text-green-200 focus:outline-none focus:border-white w-full placeholder-green-200`}
                      placeholder="Email Address"
                    />
                    {errors.email && <p className="text-red-200 text-sm mt-1">{errors.email}</p>}
                  </div>
                ) : (
                  userData.email
                )}
              </p>
              {!isEditing && (
                <div className="mt-2">
                  <span className="inline-block bg-green-800 text-green-100 text-xs px-2 py-1 rounded-full">
                    {userData.specialization}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Full-width content */}
      <div className="w-full px-6 py-8 sm:px-10 max-w-7xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-green-100">
          {/* Profile details */}
          <div className="px-6 py-8 sm:px-10">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
                Profile
              </h2>
              
              {errors.form && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md border border-red-200">
                  {errors.form}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-1 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Farm Address
                  </label>
                  {isEditing ? (
                    <div>
                      <textarea
                        name="address"
                        value={userData.address}
                        onChange={handleInputChange}
                        rows="2"
                        className={`mt-1 block w-full border-b ${errors.address ? 'border-red-400' : 'border-gray-300'} focus:border-green-500 focus:outline-none py-2`}
                        placeholder="Farm Location"
                      />
                      {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>
                  ) : (
                    <p className="mt-1 text-gray-800 whitespace-pre-line">{userData.address}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 mb-1 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Contact Number
                  </label>
                  {isEditing ? (
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full border-b ${errors.phone ? 'border-red-400' : 'border-gray-300'} focus:border-green-500 focus:outline-none py-2`}
                        placeholder="Phone Number"
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                  ) : (
                    <p className="mt-1 text-gray-800">{userData.phone}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 mb-1 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Specialization
                  </label>
                  {isEditing ? (
                    <div>
                      <input
                        type="text"
                        name="specialization"
                        value={userData.specialization}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full border-b ${errors.specialization ? 'border-red-400' : 'border-gray-300'} focus:border-green-500 focus:outline-none py-2`}
                        placeholder="Agricultural Specialization"
                      />
                      {errors.specialization && <p className="text-red-500 text-sm mt-1">{errors.specialization}</p>}
                    </div>
                  ) : (
                    <p className="mt-1 text-gray-800">{userData.specialization}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 mb-1 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Years of Experience
                  </label>
                  {isEditing ? (
                    <div>
                      <input
                        type="text"
                        name="experience"
                        value={userData.experience}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-b border-gray-300 focus:border-green-500 focus:outline-none py-2"
                        placeholder="Experience in years"
                      />
                    </div>
                  ) : (
                    <p className="mt-1 text-gray-800">{userData.experience}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                    </svg>
                    Farm Size
                  </label>
                  {isEditing ? (
                    <div>
                      <input
                        type="text"
                        name="farmSize"
                        value={userData.farmSize}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-b border-gray-300 focus:border-green-500 focus:outline-none py-2"
                        placeholder="Total farm area"
                      />
                    </div>
                  ) : (
                    <p className="mt-1 text-gray-800">{userData.farmSize}</p>
                  )}
                </div>
              </div>
              
              {errors.profileImage && isEditing && (
                <div className="text-red-500 text-sm mt-4">
                  {errors.profileImage}
                </div>
              )}
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
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="px-4 py-2 bg-green-600 rounded-md text-white hover:bg-green-700 disabled:opacity-50 flex items-center"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Save Changes
                      </>
                    )}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-green-600 rounded-md text-white hover:bg-green-700 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
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

export default AgriculturalProfilePage;