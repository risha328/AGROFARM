import React, { useState, useEffect } from 'react';
import { 
  FiSettings, 
  FiPackage, 
  FiTag, 
  FiSave,
  FiBell,
  FiTrash2,
  FiPlus,
  FiChevronDown,
  FiChevronUp,
  FiEdit2,
  FiCheck,
  FiX
} from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InventorySettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [categories, setCategories] = useState([
    { id: 1, name: 'Electronics', items: 42, expanded: false, editing: false },
    { id: 2, name: 'Clothing', items: 36, expanded: false, editing: false },
    { id: 3, name: 'Home & Kitchen', items: 28, expanded: false, editing: false },
  ]);
  const [newCategory, setNewCategory] = useState('');
  const [inventorySettings, setInventorySettings] = useState({
    lowStockThreshold: 10,
    enableBarcode: true,
    autoReorder: false,
    reorderQuantity: 5,
    enableExpiryTracking: true,
    expiryAlertDays: 7,
  });
  const [notificationSettings, setNotificationSettings] = useState({
    lowStock: true,
    stockOut: true,
    expiryAlert: true,
    dailySummary: false,
    emailNotifications: true,
    pushNotifications: false,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [editCategoryName, setEditCategoryName] = useState('');

  // Load saved settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('inventorySettings');
    if (savedSettings) {
      setInventorySettings(JSON.parse(savedSettings));
    }

    const savedNotifications = localStorage.getItem('notificationSettings');
    if (savedNotifications) {
      setNotificationSettings(JSON.parse(savedNotifications));
    }

    const savedCategories = localStorage.getItem('inventoryCategories');
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  const handleCategoryToggle = (id) => {
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, expanded: !cat.expanded } : cat
    ));
  };

  const startEditingCategory = (id) => {
    setCategories(categories.map(cat => 
      cat.id === id 
        ? { ...cat, editing: true, prevName: cat.name } 
        : cat
    ));
    const category = categories.find(cat => cat.id === id);
    setEditCategoryName(category?.name || '');
  };

  const cancelEditingCategory = (id) => {
    setCategories(categories.map(cat => 
      cat.id === id 
        ? { ...cat, editing: false, name: cat.prevName } 
        : cat
    ));
  };

  const saveEditedCategory = (id) => {
    if (!editCategoryName.trim()) {
      toast.error('Category name cannot be empty');
      return;
    }

    setCategories(categories.map(cat => 
      cat.id === id 
        ? { ...cat, name: editCategoryName, editing: false } 
        : cat
    ));
    toast.success('Category updated successfully');
  };

  const addCategory = () => {
    if (!newCategory.trim()) {
      toast.error('Category name cannot be empty');
      return;
    }

    const newCat = { 
      id: Date.now(), 
      name: newCategory, 
      items: 0, 
      expanded: false,
      editing: false
    };
    
    setCategories([...categories, newCat]);
    setNewCategory('');
    toast.success('Category added successfully');
  };

  const deleteCategory = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== id));
      toast.success('Category deleted successfully');
    }
  };

  const handleInventorySettingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInventorySettings({
      ...inventorySettings,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value
    });
  };

  const handleNotificationSettingChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked
    });
  };

  const saveSettings = async () => {
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save to localStorage (replace with actual API calls in production)
      localStorage.setItem('inventorySettings', JSON.stringify(inventorySettings));
      localStorage.setItem('notificationSettings', JSON.stringify(notificationSettings));
      localStorage.setItem('inventoryCategories', JSON.stringify(categories));
      
      toast.success('Settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <FiSettings className="mr-3 h-6 w-6 text-indigo-600" />
              Inventory Settings
            </h1>
            <button
              onClick={saveSettings}
              disabled={isSaving}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSaving ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <FiSave className="mr-2" />
                  Save Settings
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('general')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === 'general' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              <FiPackage className="mr-2" />
              General Settings
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === 'categories' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              <FiTag className="mr-2" />
              Categories
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === 'notifications' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              <FiBell className="mr-2" />
              Notifications
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="p-6 space-y-8">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Inventory Management</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label htmlFor="lowStockThreshold" className="block text-sm font-medium text-gray-700 mb-2">
                      Low Stock Threshold
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="number"
                        name="lowStockThreshold"
                        id="lowStockThreshold"
                        min="1"
                        value={inventorySettings.lowStockThreshold}
                        onChange={handleInventorySettingChange}
                        className="block w-full pl-4 pr-12 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">items</span>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      Items will be marked as low stock when quantity falls below this number.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label htmlFor="reorderQuantity" className="block text-sm font-medium text-gray-700 mb-2">
                      Default Reorder Quantity
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="number"
                        name="reorderQuantity"
                        id="reorderQuantity"
                        min="1"
                        value={inventorySettings.reorderQuantity}
                        onChange={handleInventorySettingChange}
                        className="block w-full pl-4 pr-12 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">items</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-md font-semibold text-gray-900">Advanced Settings</h3>
                
                <div className="space-y-4">
                  <div className="relative flex items-start bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center h-5">
                      <input
                        id="enableBarcode"
                        name="enableBarcode"
                        type="checkbox"
                        checked={inventorySettings.enableBarcode}
                        onChange={handleInventorySettingChange}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="enableBarcode" className="font-medium text-gray-700">
                        Enable Barcode Scanning
                      </label>
                      <p className="text-gray-500">
                        Allow scanning barcodes for inventory management.
                      </p>
                    </div>
                  </div>

                  <div className="relative flex items-start bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center h-5">
                      <input
                        id="autoReorder"
                        name="autoReorder"
                        type="checkbox"
                        checked={inventorySettings.autoReorder}
                        onChange={handleInventorySettingChange}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="autoReorder" className="font-medium text-gray-700">
                        Auto Reorder Items
                      </label>
                      <p className="text-gray-500">
                        Automatically create purchase orders when stock is low.
                      </p>
                    </div>
                  </div>

                  <div className="relative flex items-start bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center h-5">
                      <input
                        id="enableExpiryTracking"
                        name="enableExpiryTracking"
                        type="checkbox"
                        checked={inventorySettings.enableExpiryTracking}
                        onChange={handleInventorySettingChange}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="enableExpiryTracking" className="font-medium text-gray-700">
                        Enable Expiry Date Tracking
                      </label>
                      <p className="text-gray-500">
                        Track expiration dates for perishable items.
                      </p>
                    </div>
                  </div>

                  {inventorySettings.enableExpiryTracking && (
                    <div className="ml-7 pl-6 border-l-2 border-gray-200 bg-gray-50 p-4 rounded-lg">
                      <label htmlFor="expiryAlertDays" className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Alert Days
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <input
                          type="number"
                          name="expiryAlertDays"
                          id="expiryAlertDays"
                          min="1"
                          value={inventorySettings.expiryAlertDays}
                          onChange={handleInventorySettingChange}
                          className="block w-full pl-4 pr-12 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">days</span>
                        </div>
                      </div>
                      <p className="mt-2 text-xs text-gray-500">
                        Receive alerts this many days before items expire.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Categories Settings */}
          {activeTab === 'categories' && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Product Categories</h2>
                <p className="text-sm text-gray-500 mb-6">Manage your product categories and organization</p>
              </div>
              
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between p-4 bg-gray-50">
                      <div className="flex items-center">
                        <button 
                          onClick={() => handleCategoryToggle(category.id)}
                          className="mr-3 text-gray-500 hover:text-gray-700"
                        >
                          {category.expanded ? <FiChevronUp /> : <FiChevronDown />}
                        </button>
                        
                        {category.editing ? (
                          <input
                            type="text"
                            value={editCategoryName}
                            onChange={(e) => setEditCategoryName(e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 text-sm w-64"
                            autoFocus
                          />
                        ) : (
                          <span className="font-medium">{category.name}</span>
                        )}
                        
                        <span className="ml-2 text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                          {category.items} items
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {category.editing ? (
                          <>
                            <button
                              onClick={() => saveEditedCategory(category.id)}
                              className="text-green-600 hover:text-green-800 p-1"
                              title="Save"
                            >
                              <FiCheck />
                            </button>
                            <button
                              onClick={() => cancelEditingCategory(category.id)}
                              className="text-red-600 hover:text-red-800 p-1"
                              title="Cancel"
                            >
                              <FiX />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEditingCategory(category.id)}
                              className="text-indigo-600 hover:text-indigo-800 p-1"
                              title="Edit"
                            >
                              <FiEdit2 />
                            </button>
                            <button
                              onClick={() => deleteCategory(category.id)}
                              className="text-red-600 hover:text-red-800 p-1"
                              title="Delete"
                            >
                              <FiTrash2 />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {category.expanded && (
                      <div className="p-4 border-t bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Category Details</h4>
                            <p className="text-xs text-gray-500">Created: {new Date().toLocaleDateString()}</p>
                            <p className="text-xs text-gray-500">Last Updated: {new Date().toLocaleDateString()}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Statistics</h4>
                            <div className="flex space-x-4">
                              <div>
                                <p className="text-xs text-gray-500">Total Items</p>
                                <p className="text-sm font-medium">{category.items}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Low Stock</p>
                                <p className="text-sm font-medium">3</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-md font-medium text-gray-900 mb-4">Add New Category</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Enter category name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 border"
                    onKeyPress={(e) => e.key === 'Enter' && addCategory()}
                  />
                  <button
                    onClick={addCategory}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <FiPlus className="mr-2" />
                    Add Category
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="p-6 space-y-8">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Notification Preferences</h2>
                <p className="text-sm text-gray-500">Configure how you receive inventory alerts and updates</p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-4">Alert Types</h3>
                  
                  <div className="space-y-4">
                    <div className="relative flex items-start bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center h-5">
                        <input
                          id="lowStock"
                          name="lowStock"
                          type="checkbox"
                          checked={notificationSettings.lowStock}
                          onChange={handleNotificationSettingChange}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="lowStock" className="font-medium text-gray-700">
                          Low Stock Alerts
                        </label>
                        <p className="text-gray-500">
                          Receive notifications when items reach low stock levels.
                        </p>
                      </div>
                    </div>

                    <div className="relative flex items-start bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center h-5">
                        <input
                          id="stockOut"
                          name="stockOut"
                          type="checkbox"
                          checked={notificationSettings.stockOut}
                          onChange={handleNotificationSettingChange}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="stockOut" className="font-medium text-gray-700">
                          Out of Stock Alerts
                        </label>
                        <p className="text-gray-500">
                          Receive notifications when items are completely out of stock.
                        </p>
                      </div>
                    </div>

                    <div className="relative flex items-start bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center h-5">
                        <input
                          id="expiryAlert"
                          name="expiryAlert"
                          type="checkbox"
                          checked={notificationSettings.expiryAlert}
                          onChange={handleNotificationSettingChange}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="expiryAlert" className="font-medium text-gray-700">
                          Expiry Date Alerts
                        </label>
                        <p className="text-gray-500">
                          Receive notifications when items are nearing their expiration date.
                        </p>
                      </div>
                    </div>

                    <div className="relative flex items-start bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center h-5">
                        <input
                          id="dailySummary"
                          name="dailySummary"
                          type="checkbox"
                          checked={notificationSettings.dailySummary}
                          onChange={handleNotificationSettingChange}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="dailySummary" className="font-medium text-gray-700">
                          Daily Inventory Summary
                        </label>
                        <p className="text-gray-500">
                          Receive a daily summary of inventory status.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-md font-medium text-gray-900 mb-4">Notification Methods</h3>
                  
                  <div className="space-y-4">
                    <div className="relative flex items-start bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center h-5">
                        <input
                          id="emailNotifications"
                          name="emailNotifications"
                          type="checkbox"
                          checked={notificationSettings.emailNotifications}
                          onChange={handleNotificationSettingChange}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="emailNotifications" className="font-medium text-gray-700">
                          Email Notifications
                        </label>
                        <p className="text-gray-500">
                          Receive notifications via email.
                        </p>
                        {notificationSettings.emailNotifications && (
                          <div className="mt-2">
                            <label htmlFor="emailAddress" className="block text-xs font-medium text-gray-700 mb-1">
                              Email Address
                            </label>
                            <input
                              type="email"
                              id="emailAddress"
                              placeholder="your@email.com"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-1 border"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="relative flex items-start bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center h-5">
                        <input
                          id="pushNotifications"
                          name="pushNotifications"
                          type="checkbox"
                          checked={notificationSettings.pushNotifications}
                          onChange={handleNotificationSettingChange}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="pushNotifications" className="font-medium text-gray-700">
                          Push Notifications
                        </label>
                        <p className="text-gray-500">
                          Receive notifications on your mobile device.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InventorySettings;
