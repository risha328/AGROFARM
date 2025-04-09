import React, { useState } from 'react';
import { 
  FaTractor, FaSeedling, FaChartLine, FaCalendarAlt, 
  FaPhoneVolume, FaBook, FaUser, FaBell, 
  FaMapMarkedAlt, FaCloudSunRain, FaDollarSign,
  FaClipboardList, FaTools, FaShieldAlt,FaSun,FaLeaf
} from 'react-icons/fa';
import { IoMdAnalytics } from 'react-icons/io';
import { BsFillPatchCheckFill } from 'react-icons/bs';

const FarmerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Your soil analysis report is ready', read: false, time: '2 hours ago' },
    { id: 2, message: 'Market prices for wheat have increased by 5%', read: false, time: '1 day ago' },
    { id: 3, message: 'Upcoming consultation with agronomist tomorrow', read: true, time: '3 days ago' },
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? {...n, read: true} : n
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-green-800 text-white shadow-lg">
        <div className="p-4 flex items-center space-x-2 border-b border-green-700">
          <FaSeedling className="text-2xl text-yellow-300" />
          <h1 className="text-xl font-bold">AgroPrime Pro</h1>
        </div>
        
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
              <FaUser className="text-xl" />
            </div>
            <div>
              <p className="font-medium">John Farmer</p>
              <p className="text-sm text-green-200">Premium Member</p>
            </div>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition ${activeTab === 'dashboard' ? 'bg-green-700 text-white' : 'text-green-200 hover:bg-green-700/50'}`}
            >
              <FaChartLine className="mr-3" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('fields')}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition ${activeTab === 'fields' ? 'bg-green-700 text-white' : 'text-green-200 hover:bg-green-700/50'}`}
            >
              <FaMapMarkedAlt className="mr-3" />
              My Fields
            </button>
            <button
              onClick={() => setActiveTab('weather')}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition ${activeTab === 'weather' ? 'bg-green-700 text-white' : 'text-green-200 hover:bg-green-700/50'}`}
            >
              <FaCloudSunRain className="mr-3" />
              Weather Insights
            </button>
            <button
              onClick={() => setActiveTab('market')}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition ${activeTab === 'market' ? 'bg-green-700 text-white' : 'text-green-200 hover:bg-green-700/50'}`}
            >
              <FaDollarSign className="mr-3" />
              Market Prices
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition ${activeTab === 'tasks' ? 'bg-green-700 text-white' : 'text-green-200 hover:bg-green-700/50'}`}
            >
              <FaClipboardList className="mr-3" />
              Tasks & Calendar
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition ${activeTab === 'analytics' ? 'bg-green-700 text-white' : 'text-green-200 hover:bg-green-700/50'}`}
            >
              <IoMdAnalytics className="mr-3" />
              Farm Analytics
            </button>
            <button
              onClick={() => setActiveTab('equipment')}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition ${activeTab === 'equipment' ? 'bg-green-700 text-white' : 'text-green-200 hover:bg-green-700/50'}`}
            >
              <FaTools className="mr-3" />
              Equipment
            </button>
            <button
              onClick={() => setActiveTab('support')}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition ${activeTab === 'support' ? 'bg-green-700 text-white' : 'text-green-200 hover:bg-green-700/50'}`}
            >
              <FaPhoneVolume className="mr-3" />
              Expert Support
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-green-700">
          <button className="flex items-center w-full px-4 py-3 rounded-lg text-green-200 hover:bg-green-700/50 transition">
            <FaShieldAlt className="mr-3" />
            Account Settings
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {activeTab === 'dashboard' && 'Farm Dashboard'}
              {activeTab === 'fields' && 'My Fields'}
              {activeTab === 'weather' && 'Weather Insights'}
              {activeTab === 'market' && 'Market Prices'}
              {activeTab === 'tasks' && 'Tasks & Calendar'}
              {activeTab === 'analytics' && 'Farm Analytics'}
              {activeTab === 'equipment' && 'Equipment Management'}
              {activeTab === 'support' && 'Expert Support'}
            </h2>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-2 rounded-full hover:bg-gray-100 relative">
                  <FaBell className="text-gray-600" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>
              <button className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                  <FaUser className="text-white" />
                </div>
                <span className="hidden md:inline text-sm font-medium">John Farmer</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-xl p-6 text-white shadow-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-bold mb-2">Welcome back, John!</h1>
                    <p className="max-w-2xl">
                      Your AgroPrime Pro subscription gives you access to premium farming insights, 
                      expert consultations, and advanced analytics to maximize your yields.
                    </p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-lg">
                    <BsFillPatchCheckFill className="text-3xl" />
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500">Active Fields</p>
                      <p className="text-2xl font-bold mt-1">4</p>
                    </div>
                    <div className="p-3 rounded-lg bg-green-100 text-green-600">
                      <FaMapMarkedAlt className="text-xl" />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500">Current Yield</p>
                      <p className="text-2xl font-bold mt-1">82%</p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                      <FaChartLine className="text-xl" />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500">Tasks Due</p>
                      <p className="text-2xl font-bold mt-1">3</p>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
                      <FaClipboardList className="text-xl" />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500">Consultations</p>
                      <p className="text-2xl font-bold mt-1">1</p>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                      <FaPhoneVolume className="text-xl" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Field Health */}
                <div className="bg-white p-6 rounded-xl shadow lg:col-span-2">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg">Field Health Status</h3>
                    <button className="text-sm text-green-600 hover:underline">
                      View All Fields
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center p-3 border rounded-lg">
                      <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mr-4">
                        <FaLeaf className="text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">North Wheat Field</h4>
                        <p className="text-sm text-gray-500">Soil moisture: Optimal</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">Healthy</p>
                        <p className="text-xs text-gray-500">Last checked: Today</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 border rounded-lg">
                      <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center mr-4">
                        <FaSun className="text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">South Corn Field</h4>
                        <p className="text-sm text-gray-500">Needs irrigation</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-yellow-600">Needs Attention</p>
                        <p className="text-xs text-gray-500">Last checked: Today</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Weather Widget */}
                <div className="bg-white p-6 rounded-xl shadow">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg">Weather Forecast</h3>
                    <button className="text-sm text-green-600 hover:underline">
                      Detailed View
                    </button>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <FaCloudSunRain className="text-4xl text-blue-400" />
                    </div>
                    <p className="text-3xl font-bold">24°C</p>
                    <p className="text-gray-500 mb-4">Partly Cloudy</p>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="p-2 bg-gray-50 rounded">
                        <p>Tomorrow</p>
                        <p className="font-medium">26°C</p>
                      </div>
                      <div className="p-2 bg-gray-50 rounded">
                        <p>Wed</p>
                        <p className="font-medium">22°C</p>
                      </div>
                      <div className="p-2 bg-gray-50 rounded">
                        <p>Thu</p>
                        <p className="font-medium">20°C</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Market Prices */}
                <div className="bg-white p-6 rounded-xl shadow lg:col-span-2">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg">Market Prices</h3>
                    <button className="text-sm text-green-600 hover:underline">
                      View All Crops
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="text-left text-gray-500 text-sm border-b">
                          <th className="pb-2">Commodity</th>
                          <th className="pb-2">Current Price</th>
                          <th className="pb-2">7-Day Trend</th>
                          <th className="pb-2">Local Average</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 font-medium">Wheat</td>
                          <td className="py-3">$210/ton</td>
                          <td className="py-3 text-green-600">↑ 2.3%</td>
                          <td className="py-3">$205/ton</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 font-medium">Corn</td>
                          <td className="py-3">$185/ton</td>
                          <td className="py-3 text-red-600">↓ 1.1%</td>
                          <td className="py-3">$188/ton</td>
                        </tr>
                        <tr>
                          <td className="py-3 font-medium">Soybeans</td>
                          <td className="py-3">$320/ton</td>
                          <td className="py-3 text-green-600">↑ 3.7%</td>
                          <td className="py-3">$310/ton</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Upcoming Tasks */}
                <div className="bg-white p-6 rounded-xl shadow">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg">Upcoming Tasks</h3>
                    <button className="text-sm text-green-600 hover:underline">
                      View Calendar
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div>
                        <h4 className="font-medium">Irrigation Check</h4>
                        <p className="text-sm text-gray-500">North Field</p>
                        <p className="text-xs text-gray-400">Tomorrow 8:00 AM</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      </div>
                      <div>
                        <h4 className="font-medium">Soil Testing</h4>
                        <p className="text-sm text-gray-500">South Field</p>
                        <p className="text-xs text-gray-400">In 2 days</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      </div>
                      <div>
                        <h4 className="font-medium">Agronomist Consultation</h4>
                        <p className="text-sm text-gray-500">Video Call</p>
                        <p className="text-xs text-gray-400">Friday 10:30 AM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other Tabs Content */}
          {activeTab !== 'dashboard' && (
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">
                {activeTab === 'fields' && 'My Fields Management'}
                {activeTab === 'weather' && 'Weather Insights'}
                {activeTab === 'market' && 'Market Prices Analysis'}
                {activeTab === 'tasks' && 'Tasks & Calendar'}
                {activeTab === 'analytics' && 'Farm Analytics'}
                {activeTab === 'equipment' && 'Equipment Management'}
                {activeTab === 'support' && 'Expert Support'}
              </h2>
              <p className="text-gray-600">
                This section is under development. As a Pro member, you'll have full access to all 
                premium features including detailed analytics, equipment tracking, and direct 
                expert support.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Notifications Panel */}
      {notifications.some(n => !n.read) && (
        <div className="fixed right-6 bottom-6">
          <div className="bg-white rounded-xl shadow-xl w-80 overflow-hidden">
            <div className="bg-green-600 text-white p-4 flex justify-between items-center">
              <h3 className="font-medium">Notifications ({unreadCount})</h3>
              <button 
                onClick={() => setNotifications(notifications.map(n => ({...n, read: true})))}
                className="text-sm hover:underline"
              >
                Mark all as read
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.filter(n => !n.read).map(notification => (
                <div 
                  key={notification.id} 
                  className="p-4 border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => markAsRead(notification.id)}
                >
                  <p className="font-medium">{notification.message}</p>
                  <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerDashboard;
