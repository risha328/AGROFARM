// import React, { useEffect, useState } from 'react'
// import SummaryApi from '../../common'  // Fixed path
// import { toast } from 'react-toastify'
// import moment from 'moment'
// import { MdModeEdit } from "react-icons/md";
// import ChangeUserRole from '../../components/ChangeUserRole';  // Fixed path

// const AllUsers = () => {
//     const [allUser,setAllUsers] = useState([])
//     const [openUpdateRole,setOpenUpdateRole] = useState(false)
//     const [updateUserDetails,setUpdateUserDetails] = useState({
//         email : "",
//         name : "",
//         role : "",
//         _id  : ""
//     })

//     const fetchAllUsers = async() =>{
//         const fetchData = await fetch(SummaryApi.allUser.url,{
//             method : SummaryApi.allUser.method,
//             credentials : 'include'
//         })

//         const dataResponse = await fetchData.json()

//         if(dataResponse.success){
//             setAllUsers(dataResponse.data)
//         }

//         if(dataResponse.error){
//             toast.error(dataResponse.message)
//         }
//     }

//     useEffect(()=>{
//         fetchAllUsers()
//     },[])

//   return (
//     <div className='bg-white pb-4'>
//         <table className='w-full userTable'>
//             <thead>
//                 <tr className='bg-black text-white'>
//                     <th>Sr.</th>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Role</th>
//                     <th>Created Date</th>
//                     <th>Action</th>
//                 </tr>
//             </thead>
//             <tbody className=''>
//                 {
//                     allUser.map((el,index) => {
//                         return(
//                             <tr key={el._id}>  {/* Added key prop */}
//                                 <td>{index+1}</td>
//                                 <td>{el?.name}</td>
//                                 <td>{el?.email}</td>
//                                 <td>{el?.role}</td>
//                                 <td>{moment(el?.createdAt).format('LL')}</td>
//                                 <td>
//                                     <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white' 
//                                     onClick={()=>{
//                                         setUpdateUserDetails(el)
//                                         setOpenUpdateRole(true)
//                                     }}
//                                     >
//                                         <MdModeEdit/>
//                                     </button>
//                                 </td>
//                             </tr>
//                         )
//                     })
//                 }
//             </tbody>
//         </table>

//         {
//             openUpdateRole && (
//                 <ChangeUserRole 
//                     onClose={()=>setOpenUpdateRole(false)} 
//                     name={updateUserDetails.name}
//                     email={updateUserDetails.email}
//                     role={updateUserDetails.role}
//                     userId={updateUserDetails._id}
//                     callFunc={fetchAllUsers}
//                 />
//             )      
//         }
//     </div>
//   )
// }

// export default AllUsers


import React, { useEffect, useState } from 'react';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit, MdSearch, MdRefresh } from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import ChangeUserRole from '../../components/ChangeUserRole';

const AllUsers = () => {
    const [allUser, setAllUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [openUpdateRole, setOpenUpdateRole] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('all');
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: "",
        name: "",
        role: "",
        _id: ""
    });

    const fetchAllUsers = async() => {
        try {
            setLoading(true);
            const fetchData = await fetch(SummaryApi.allUser.url, {
                method: SummaryApi.allUser.method,
                credentials: 'include'
            });

            const dataResponse = await fetchData.json();

            if(dataResponse.success) {
                setAllUsers(dataResponse.data);
                setFilteredUsers(dataResponse.data);
            } else {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            toast.error("Failed to fetch users");
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    useEffect(() => {
        // Filter users based on search term and role
        const filtered = allUser.filter(user => {
            const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                user.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesRole = selectedRole === 'all' || user.role === selectedRole;
            return matchesSearch && matchesRole;
        });
        setFilteredUsers(filtered);
    }, [searchTerm, selectedRole, allUser]);

    const roles = ['all', ...new Set(allUser.map(user => user.role))];

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
                    <p className="text-gray-600">
                        Showing {filteredUsers.length} of {allUser.length} users
                    </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto mt-4 md:mt-0">
                    <div className="relative flex-grow">
                        <MdSearch className="absolute left-3 top-3 text-gray-400 text-lg" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <div className="relative flex items-center">
                        <FiFilter className="absolute left-3 text-gray-400" />
                        <select
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                        >
                            {roles.map(role => (
                                <option key={role} value={role}>
                                    {role.charAt(0).toUpperCase() + role.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={fetchAllUsers}
                        className="flex items-center gap-2 text-gray-700 hover:text-blue-600 px-4 py-2 border border-gray-300 rounded-lg"
                        disabled={loading}
                    >
                        <MdRefresh className={`${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className="p-8 text-center">
                        <h3 className="text-lg font-medium text-gray-700 mb-2">No users found</h3>
                        <p className="text-gray-500 mb-4">
                            {searchTerm ? 'Try a different search term' : 'No users available'}
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedRole('all');
                            }}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined Date</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredUsers.map((user, index) => (
                                <tr key={user._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                            user.role === 'manager' ? 'bg-blue-100 text-blue-800' :
                                            'bg-green-100 text-green-800'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {moment(user.createdAt).format('MMM D, YYYY')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50 transition-colors"
                                            onClick={() => {
                                                setUpdateUserDetails(user);
                                                setOpenUpdateRole(true);
                                            }}
                                            title="Edit Role"
                                        >
                                            <MdModeEdit size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Update Role Modal */}
            {openUpdateRole && (
                <ChangeUserRole 
                    onClose={() => setOpenUpdateRole(false)} 
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllUsers}
                />
            )}
        </div>
    );
};

export default AllUsers;