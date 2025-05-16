


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const GFormResponses = () => {
//   const [responses, setResponses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchResponses = async () => {
//       try {
//         const result = await axios.get('http://localhost:8080/api/gform-responses');
//         setResponses(result.data);
//       } catch (error) {
//         setError('Error fetching responses');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResponses();
//   }, []);

//   if (loading) {
//     return <div className="text-center py-4">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center py-4 text-red-500">{error}</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Google Form Responses</h2>
//       <table className="min-w-full table-auto border-collapse">
//         <thead>
//           <tr className="bg-gray-100">
//             {responses[0] && Object.keys(responses[0]).map((key) => (
//               <th key={key} className="px-4 py-2 text-left border-b">{key}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {responses.map((response, index) => (
//             <tr key={index} className="hover:bg-gray-50">
//               {Object.values(response).map((value, i) => (
//                 <td key={i} className="px-4 py-2 border-b">{value}</td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default GFormResponses;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GFormResponses = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookedApplicant, setBookedApplicant] = useState(null);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const result = await axios.get('http://localhost:8080/api/gform-responses');
        // Initialize all as available
        const responsesWithStatus = result.data.map(response => ({
          ...response,
          bookingStatus: 'available'
        }));
        setResponses(responsesWithStatus);
      } catch (error) {
        setError('Failed to load applicant data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, []);

  const handleBooking = async (applicantId) => {
    // Check if there's already a booked applicant
    if (bookedApplicant) {
      toast.warning('You can only book one laborer at a time.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    try {
      // Update local state optimistically
      setResponses(prevResponses => 
        prevResponses.map(response => 
          response.id === applicantId 
            ? { ...response, bookingStatus: 'pending' } 
            : response
        )
      );

      // Simulate API call to book labor
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update status after "successful" booking
      setResponses(prevResponses => 
        prevResponses.map(response => 
          response.id === applicantId 
            ? { ...response, bookingStatus: 'booked' } 
            : response
        )
      );
      
      // Set the booked applicant
      const bookedNow = responses.find(r => r.id === applicantId) || { id: applicantId, name: 'Applicant' };
setBookedApplicant(bookedNow);

toast.success(`${bookedNow.name} booked successfully!`, {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

    } catch (error) {
      // Revert on error
      setResponses(prevResponses => 
        prevResponses.map(response => 
          response.id === applicantId 
            ? { ...response, bookingStatus: 'available' } 
            : response
        )
      );
      toast.error('Failed to book labor. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleCancelBooking = async (applicantId) => {
    try {
      // Update local state optimistically
      setResponses(prevResponses => 
        prevResponses.map(response => 
          response.id === applicantId 
            ? { ...response, bookingStatus: 'pending' } 
            : response
        )
      );

      // Simulate API call to cancel booking
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update status after "successful" cancellation
      setResponses(prevResponses => 
        prevResponses.map(response => 
          response.id === applicantId 
            ? { ...response, bookingStatus: 'available' } 
            : response
        )
      );
      
      // Clear the booked applicant
      setBookedApplicant(null);

      toast.info('Booking cancelled. You can now book another laborer.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      // Revert on error
      setResponses(prevResponses => 
        prevResponses.map(response => 
          response.id === applicantId 
            ? { ...response, bookingStatus: 'booked' } 
            : response
        )
      );
      toast.error('Failed to cancel booking. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-4xl mx-auto mt-8">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <ToastContainer />
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-green-700 px-6 py-4 border-b border-green-800">
          <h2 className="text-2xl font-semibold text-white">Agricultural Labor Applicant Dashboard</h2>
          <p className="text-green-100 mt-1">
            {responses.length} applicants found • 
            <span className="ml-2">
              <span className="inline-block w-3 h-3 rounded-full bg-green-400 mr-1"></span>
              {responses.filter(r => r.bookingStatus === 'available').length} Available • 
              <span className="inline-block w-3 h-3 rounded-full bg-gray-400 ml-1"></span>
              {bookedApplicant ? '1 Booked' : '0 Booked'}
            </span>
          </p>
          {bookedApplicant && (
            <div className="mt-2 p-2 bg-green-800 rounded text-green-100 text-sm">
              Currently booked: <span className="font-medium">{bookedApplicant.name}</span> • 
              Phone: <span className="font-medium">{bookedApplicant.phone}</span> • 
              <button 
                onClick={() => handleCancelBooking(bookedApplicant.id)}
                className="ml-2 text-green-200 hover:text-white underline"
              >
                Cancel Booking
              </button>
            </div>
          )}
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {responses[0] && Object.keys(responses[0])
                  .filter(key => key !== 'bookingStatus')
                  .map((key) => (
                    <th 
                      key={key} 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                    >
                      {key.replace(/_/g, ' ')}
                    </th>
                  ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {responses.map((response, index) => (
                <tr 
                  key={index} 
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-green-50'}
                >
                  {Object.entries(response)
                    .filter(([key]) => key !== 'bookingStatus' && key !== 'id')
                    .map(([key, value], i) => (
                      <td 
                        key={i} 
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                      >
                        {typeof value === 'string' && value.startsWith('http') ? (
                          <a href={value} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                            View Document
                          </a>
                        ) : (
                          value
                        )}
                      </td>
                    ))}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {response.bookingStatus === 'available' ? (
                      <button
                        onClick={() => handleBooking(response.id)}
                        disabled={!!bookedApplicant}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          bookedApplicant 
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                            : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                      >
                        {bookedApplicant ? 'Book Another' : 'Book Now'}
                      </button>
                    ) : response.bookingStatus === 'pending' ? (
                      <span className="text-blue-600 font-medium">Processing...</span>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600 font-medium">Booked</span>
                        <a 
                          href={`tel:${response.phone || ''}`} 
                          className="text-green-600 hover:text-green-800 p-1"
                          title="Contact labor"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                        </a>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{responses.length}</span> of{' '}
              <span className="font-medium">{responses.length}</span> applicants
            </p>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GFormResponses;