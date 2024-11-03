// import React, { useState, useEffect } from 'react';
// import { apiClient } from '../../common/Axios/auth';
// import SellerForm from './SellerForm';
// import SellerProductDetails from './SellerProductDetails';

// const SellerList = () => {
//     const [sellers, setSellers] = useState([]);
//     const [sellerToEdit, setSellerToEdit] = useState(undefined);
//     const [expandedProductID, setExpandedProductID] = useState(null);
//     const [isFormVisible, setIsFormVisible] = useState(false);

//     useEffect(() => {
//         fetchSellers();
//     }, []);

//     const fetchSellers = async () => {
//         try {
//             const response = await apiClient.get('/Seller/list');
//             setSellers(response.data.$values);
//         } catch (error) {
//             console.error('Error fetching sellers:', error);
//         }
//     };

//     const onDelete = async (id) => {
//         try {
//             await apiClient.delete(`/Seller/${id}`);
//             fetchSellers();
//         } catch (error) {
//             console.error('Error deleting seller:', error);
//         }
//     };

//     const onEdit = (seller) => {
//         setSellerToEdit(seller);
//         setIsFormVisible(true);
//     };

//     const onAddOrUpdate = () => {
//         fetchSellers();
//         setSellerToEdit(undefined);
//         setIsFormVisible(false);
//         setExpandedProductID(null);
//     };

//     const toggleProductDetails = (productID) => {
//         setExpandedProductID(expandedProductID === productID ? null : productID);
//     };

//     const onAddNewSeller = () => {
//         setSellerToEdit(undefined);
//         setIsFormVisible(true);
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h2 className="text-3xl font-bold mb-6 text-center">Seller List</h2>

//             {/*<button*/}
//             {/*    onClick={onAddNewSeller}*/}
//             {/*    className="bg-green-600 text-white px-4 py-2 rounded mb-4 transition-all hover:bg-green-700 shadow-md"*/}
//             {/*>*/}
//             {/*    Add New Seller*/}
//             {/*</button>*/}

//             <table className="w-full max-w-6xl mx-auto border border-gray-200 my-8">
//                 <thead>
//                     <tr className="bg-gray-100 border-b">
//                         <th className="py-4 px-6 text-left">Seller ID</th>
//                         <th className="py-4 px-6 text-left">Company Name</th>
//                         <th className="py-4 px-6 text-left">Contact Person</th>
//                         <th className="py-4 px-6 text-left">Contact Number</th>
//                         <th className="py-4 px-6 text-left">Address</th>
//                         <th className="py-4 px-6 text-left">Store Description</th>
//                         <th className="py-4 px-6 text-center">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {sellers.map((seller) => (
//                         <React.Fragment key={seller.sellerID}>
//                             <tr className="border-b hover:bg-gray-50">
//                                 <td className="py-2 px-4">{seller.sellerID}</td>
//                                 <td className="py-2 px-4">{seller.companyName}</td>
//                                 <td className="py-2 px-4">{seller.contactPerson}</td>
//                                 <td className="py-2 px-4">{seller.contactNumber}</td>
//                                 <td className="py-2 px-4">{seller.address}</td>
//                                 <td className="py-2 px-4">{seller.storeDescription}</td>
//                                 <td className="py-2 px-4 flex space-x-2">
//                                     <button
//                                         onClick={() => onEdit(seller)}
//                                         className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 shadow-md transition-all"
//                                     >
//                                         Edit
//                                     </button>
//                                     <button
//                                         onClick={() => onDelete(seller.sellerID)}
//                                         className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 shadow-md transition-all"
//                                     >
//                                         Delete
//                                     </button>
//                                     <button
//                                         onClick={() => toggleProductDetails(seller.sellerID)}
//                                         className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 shadow-md transition-all flex items-center"
//                                     >
//                                         {expandedProductID === seller.sellerID ? '▲' : '▼'}
//                                         <span className="ml-2">Product Details</span>
//                                     </button>
//                                 </td>
//                             </tr>
//                             {expandedProductID === seller.sellerID && (
//                                 <tr className="bg-gray-50">
//                                     <td colSpan="7">
//                                         <SellerProductDetails sellerID={seller.sellerID} />
//                                     </td>
//                                 </tr>
//                             )}
//                         </React.Fragment>
//                     ))}
//                 </tbody>
//             </table>

//             {/* Render SellerForm for Add/Edit in Modal */}
//             {isFormVisible && (
//                 <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-y-auto">
//                     <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full h-auto">
//                         <h3 className="text-xl font-bold mb-4">{sellerToEdit ? 'Edit Seller' : 'Add New Seller'}</h3>
//                         <div className="overflow-y-auto max-h-85"> {/* Make this scrollable */}
//                             <SellerForm onAddOrUpdate={onAddOrUpdate} sellerToEdit={sellerToEdit} />
//                         </div>
//                         <button
//                             onClick={() => setIsFormVisible(false)}
//                             className="bg-red-600 text-white px-4 py-2 rounded mt-4 hover:bg-red-700 transition-all"
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default SellerList;
// import React, { useState, useEffect } from 'react';
// import { apiClient } from '../../common/Axios/auth';
// import SellerForm from './SellerForm';
// // import AddSellerForm from './AddSellerForm';
// import SellerProductDetails from './SellerProductDetails';

// const SellerList = () => {
//     const [sellers, setSellers] = useState([]);
//     const [sellerToEdit, setSellerToEdit] = useState(undefined);
//     const [expandedProductID, setExpandedProductID] = useState(null);
//     const [isFormVisible, setIsFormVisible] = useState(false);

//     useEffect(() => {
//         fetchSellers();
//     }, []);

//     const fetchSellers = async () => {
//         try {
//             const response = await apiClient.get('/Seller/list');
//             setSellers(response.data.$values);
//         } catch (error) {
//             console.error('Error fetching sellers:', error);
//         }
//     };

//     const onDelete = async (id) => {
//         try {
//             await apiClient.delete(`/Seller/${id}`);
//             fetchSellers();
//         } catch (error) {
//             console.error('Error deleting seller:', error);
//         }
//     };

//     const onEdit = (seller) => {
//         setSellerToEdit(seller);
//         setIsFormVisible(true);
//     };

//     const onAddOrUpdate = () => {
//         fetchSellers();
//         setSellerToEdit(undefined);
//         setIsFormVisible(false);
//         setExpandedProductID(null);
//     };

//     const toggleProductDetails = (productID) => {
//         setExpandedProductID(expandedProductID === productID ? null : productID);
//     };

//     const toggleStatus = async (sellerID, currentStatus) => {
//         try {
//             // Optimistically update the state to reflect the change immediately
//             setSellers((prevSellers) =>
//                 prevSellers.map((seller) =>
//                     seller.sellerID === sellerID ? { ...seller, isActive: !currentStatus } : seller
//                 )
//             );

//             // Send the update request to the API
//             const newStatus = !currentStatus; // Calculate the new status
//             await apiClient.put(`/Seller/${sellerID}/status`, { isActive: newStatus });

//             // Optionally fetch the sellers again to ensure we have the latest data
//             // fetchSellers();
//         } catch (error) {
//             console.error('Error updating seller status:', error);
//             // Rollback the optimistic update if the request fails
//             setSellers((prevSellers) =>
//                 prevSellers.map((seller) =>
//                     seller.sellerID === sellerID ? { ...seller, isActive: currentStatus } : seller
//                 )
//             );
//         }
//     };

//     const onAddNewSeller = () => {
//         setSellerToEdit(undefined);
//         setIsFormVisible(true);
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h2 className="text-3xl font-bold mb-6 text-center">Seller List</h2>

//             <button
//                 onClick={onAddNewSeller}
//                 className="bg-green-600 text-white px-4 py-2 rounded mb-4 transition-all hover:bg-green-700 shadow-md"
//             >
//                 Add New Seller
//             </button>

//             <table className="w-full max-w-6xl mx-auto border border-gray-200 shadow-lg my-8 rounded-lg">
//                 <thead>
//                     <tr className="bg-gray-100 border-b text-gray-700">
//                         <th className="py-4 px-6 text-left">Seller ID</th>
//                         <th className="py-4 px-6 text-left">Company Name</th>
//                         <th className="py-4 px-6 text-left">Contact Person</th>
//                         <th className="py-4 px-6 text-left">Contact Number</th>
//                         <th className="py-4 px-6 text-left">Address</th>
//                         <th className="py-4 px-6 text-left">Store Description</th>
//                         <th className="py-4 px-6 text-center">Actions</th>
//                         <th className="py-4 px-6 text-center">Status</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {sellers.map((seller) => (
//                         <React.Fragment key={seller.sellerID}>
//                             <tr
//                                 className={`border-b transition-colors duration-300 ${
//                                     expandedProductID === seller.sellerID ? 'bg-blue-50' : 'hover:bg-gray-50'
//                                 }`}
//                             >
//                                 <td className="py-2 px-4">{seller.sellerID}</td>
//                                 <td className="py-2 px-4">{seller.companyName}</td>
//                                 <td className="py-2 px-4">{seller.contactPerson}</td>
//                                 <td className="py-2 px-4">{seller.contactNumber}</td>
//                                 <td className="py-2 px-4">{seller.address}</td>
//                                 <td className="py-2 px-4">{seller.storeDescription}</td>
//                                 <td className="py-2 px-4 flex space-x-2 justify-center">
//                                     <button
//                                         onClick={() => onEdit(seller)}
//                                         className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 shadow-md transition-all"
//                                     >
//                                         Edit
//                                     </button>
//                                     <button
//                                         onClick={() => onDelete(seller.sellerID)}
//                                         className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 shadow-md transition-all"
//                                     >
//                                         Delete
//                                     </button>
//                                     <button
//                                         onClick={() => toggleProductDetails(seller.sellerID)}
//                                         className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 shadow-md transition-all flex items-center"
//                                     >
//                                         <span className="mr-2">{expandedProductID === seller.sellerID ? 'Hide Details' : 'View Details'}</span>
//                                         {expandedProductID === seller.sellerID ? '▲' : '▼'}
//                                     </button>
//                                 </td>
//                                 <td className="py-2 px-4 text-center">
//                                     <div className="flex items-center justify-center space-x-2">
//                                         <span
//                                             className={`text-sm font-semibold ${seller.isActive ? 'text-green-600' : 'text-red-600'}`}
//                                         >
//                                             {seller.isActive ? 'Active' : 'Inactive'}
//                                         </span>
//                                         <label className="relative inline-flex items-center cursor-pointer">
//                                             <input
//                                                 type="checkbox"
//                                                 checked={seller.isActive}
//                                                 onChange={() => toggleStatus(seller.sellerID, seller.isActive)}
//                                                 className="sr-only peer"
//                                             />
//                                             <div
//                                                 className={`w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 transition-all ${
//                                                     seller.isActive ? 'bg-green-500' : 'bg-red-500'
//                                                 }`}
//                                             ></div>
//                                             <span
//                                                 className={`absolute w-5 h-5 bg-white rounded-full shadow-md transform transition-all ${
//                                                     seller.isActive ? 'translate-x-6' : 'translate-x-1'
//                                                 }`}
//                                             ></span>
//                                         </label>
//                                     </div>
//                                 </td>
//                             </tr>
//                             {expandedProductID === seller.sellerID && (
//                                 <tr className="bg-gray-50">
//                                     <td colSpan="8">
//                                         <SellerProductDetails sellerID={seller.sellerID} />
//                                     </td>
//                                 </tr>
//                             )}
//                         </React.Fragment>
//                     ))}
//                 </tbody>
//             </table>

//             {/* Render SellerForm for Add/Edit in Modal */}
//             {isFormVisible && (
//                 <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-y-auto">
//                     <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full h-auto">
//                         <h3 className="text-xl font-bold mb-4">{sellerToEdit ? 'Edit Seller' : 'Add New Seller'}</h3>
//                         <div className="overflow-y-auto max-h-85"> {/* Make this scrollable */}
//                             <SellerForm onAddOrUpdate={onAddOrUpdate} sellerToEdit={sellerToEdit} />
//                         </div>
//                         <button
//                             onClick={() => setIsFormVisible(false)}
//                             className="bg-red-600 text-white px-4 py-2 rounded mt-4 hover:bg-red-700 transition-all"
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default SellerList;


// import React, { useState, useEffect } from 'react';
// import { apiClient } from '../../common/Axios/auth';
// import SellerForm from './SellerForm';
// import SellerProductDetails from './SellerProductDetails';

// const SellerList = () => {
//     const [sellers, setSellers] = useState([]);
//     const [sellerToEdit, setSellerToEdit] = useState(undefined);
//     const [expandedProductID, setExpandedProductID] = useState(null);
//     const [isFormVisible, setIsFormVisible] = useState(false);

//     useEffect(() => {
//         fetchSellers();
//     }, []);

//     const fetchSellers = async () => {
//         try {
//             const response = await apiClient.get('/Seller/list');
//             setSellers(response.data.$values);
//         } catch (error) {
//             console.error('Error fetching sellers:', error);
//         }
//     };

//     const onDelete = async (id) => {
//         try {
//             await apiClient.delete(`/Seller/${id}`);
//             fetchSellers();
//         } catch (error) {
//             console.error('Error deleting seller:', error);
//         }
//     };

//     const onEdit = (seller) => {
//         setSellerToEdit(seller);
//         setIsFormVisible(true);
//     };

//     const onAddOrUpdate = () => {
//         fetchSellers();
//         setSellerToEdit(undefined);
//         setIsFormVisible(false);
//         setExpandedProductID(null);
//     };

//     const toggleProductDetails = (productID) => {
//         setExpandedProductID(expandedProductID === productID ? null : productID);
//     };

//     const toggleStatus = async (sellerID, currentStatus) => {
//         try {
//             setSellers((prevSellers) =>
//                 prevSellers.map((seller) =>
//                     seller.sellerID === sellerID ? { ...seller, isActive: !currentStatus } : seller
//                 )
//             );

//             const newStatus = !currentStatus;
//             await apiClient.put(`/Seller/${sellerID}/status`, { isActive: newStatus });
//         } catch (error) {
//             console.error('Error updating seller status:', error);
//             setSellers((prevSellers) =>
//                 prevSellers.map((seller) =>
//                     seller.sellerID === sellerID ? { ...seller, isActive: currentStatus } : seller
//                 )
//             );
//         }
//     };

//     const onAddNewSeller = () => {
//         setSellerToEdit(undefined);
//         setIsFormVisible(true);
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h2 className="text-3xl font-bold mb-6 text-center">Seller List</h2>

//             {/* Removed Add New Seller Button */}
//             {/* <button
//                 onClick={onAddNewSeller}
//                 className="bg-green-600 text-white px-4 py-2 rounded mb-4 transition-all hover:bg-green-700 shadow-md"
//             >
//                 Add New Seller
//             </button> */}

//             <table className="w-full max-w-6xl mx-auto border border-gray-200 shadow-lg my-8 rounded-lg">
//                 <thead>
//                     <tr className="bg-gray-100 border-b text-gray-700">
//                         <th className="py-4 px-6 text-left">Seller ID</th>
//                         <th className="py-4 px-6 text-left">Company Name</th>
//                         <th className="py-4 px-6 text-left">Contact Person</th>
//                         <th className="py-4 px-6 text-left">Contact Number</th>
//                         <th className="py-4 px-6 text-left">Address</th>
//                         <th className="py-4 px-6 text-left">Store Description</th>
//                         <th className="py-4 px-6 text-center">Actions</th>
//                         <th className="py-4 px-6 text-center">Status</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {sellers.map((seller) => (
//                         <React.Fragment key={seller.sellerID}>
//                             <tr
//                                 className={`border-b transition-colors duration-300 ${
//                                     expandedProductID === seller.sellerID ? 'bg-blue-50' : 'hover:bg-gray-50'
//                                 }`}
//                             >
//                                 <td className="py-2 px-4">{seller.sellerID}</td>
//                                 <td className="py-2 px-4">{seller.companyName}</td>
//                                 <td className="py-2 px-4">{seller.contactPerson}</td>
//                                 <td className="py-2 px-4">{seller.contactNumber}</td>
//                                 <td className="py-2 px-4">{seller.address}</td>
//                                 <td className="py-2 px-4">{seller.storeDescription}</td>
//                                 <td className="py-2 px-4 flex space-x-2 justify-center">
//                                     <button
//                                         onClick={() => onEdit(seller)}
//                                         className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 shadow-md transition-all"
//                                     >
//                                         Edit
//                                     </button>
//                                     <button
//                                         onClick={() => onDelete(seller.sellerID)}
//                                         className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 shadow-md transition-all"
//                                     >
//                                         Delete
//                                     </button>
//                                     <button
//                                         onClick={() => toggleProductDetails(seller.sellerID)}
//                                         className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 shadow-md transition-all flex items-center"
//                                     >
//                                         <span className="mr-2">{expandedProductID === seller.sellerID ? 'Hide Details' : 'View Details'}</span>
//                                         {expandedProductID === seller.sellerID ? '▲' : '▼'}
//                                     </button>
//                                 </td>
//                                 <td className="py-2 px-4 text-center">
//                                     <div className="flex items-center justify-center space-x-2">
//                                         <span
//                                             className={`text-sm font-semibold ${seller.isActive ? 'text-green-600' : 'text-red-600'}`}
//                                         >
//                                             {seller.isActive ? 'Active' : 'Inactive'}
//                                         </span>
//                                         <label className="relative inline-flex items-center cursor-pointer">
//                                             <input
//                                                 type="checkbox"
//                                                 checked={seller.isActive}
//                                                 onChange={() => toggleStatus(seller.sellerID, seller.isActive)}
//                                                 className="sr-only peer"
//                                             />
//                                             <div
//                                                 className={`w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 transition-all ${
//                                                     seller.isActive ? 'bg-green-500' : 'bg-red-500'
//                                                 }`}
//                                             ></div>
//                                             <span
//                                                 className={`absolute w-5 h-5 bg-white rounded-full shadow-md transform transition-all ${
//                                                     seller.isActive ? 'translate-x-6' : 'translate-x-1'
//                                                 }`}
//                                             ></span>
//                                         </label>
//                                     </div>
//                                 </td>
//                             </tr>
//                             {expandedProductID === seller.sellerID && (
//                                 <tr className="bg-gray-50">
//                                     <td colSpan="8">
//                                         <SellerProductDetails sellerID={seller.sellerID} />
//                                     </td>
//                                 </tr>
//                             )}
//                         </React.Fragment>
//                     ))}
//                 </tbody>
//             </table>

//             {/* Render SellerForm for Add/Edit in Modal */}
//             {isFormVisible && (
//                 <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-y-auto">
//                     <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full h-auto">
//                         <h3 className="text-xl font-bold mb-4">{sellerToEdit ? 'Edit Seller' : 'Add New Seller'}</h3>
//                         <div className="overflow-y-auto max-h-85"> {/* Make this scrollable */}
//                             <SellerForm onAddOrUpdate={onAddOrUpdate} sellerToEdit={sellerToEdit} />
//                         </div>
//                         <button
//                             onClick={() => setIsFormVisible(false)}
//                             className="bg-red-600 text-white px-4 py-2 rounded mt-4 hover:bg-red-700 transition-all"
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default SellerList;



// import React, { useState, useEffect } from 'react';
// import { apiClient } from '../../common/Axios/auth';
// import SellerForm from './SellerForm';
// import SellerProductDetails from './SellerProductDetails';
// import { Switch } from '@mui/material';

// const SellerList = () => {
//     const [sellers, setSellers] = useState([]);
//     const [sellerToEdit, setSellerToEdit] = useState(undefined);
//     const [expandedProductID, setExpandedProductID] = useState(null);
//     const [isFormVisible, setIsFormVisible] = useState(false);

//     useEffect(() => {
//         fetchSellers();
//     }, []);

//     const fetchSellers = async () => {
//         try {
//             const response = await apiClient.get('/Seller/list');
//             setSellers(response.data.$values);
//         } catch (error) {
//             console.error('Error fetching sellers:', error);
//         }
//     };

//     const onDelete = async (id) => {
//         try {
//             await apiClient.delete(`/Seller/${id}`);
//             fetchSellers();
//         } catch (error) {
//             console.error('Error deleting seller:', error);
//         }
//     };

//     const onEdit = (seller) => {
//         setSellerToEdit(seller);
//         setIsFormVisible(true);
//     };

//     const onAddOrUpdate = () => {
//         fetchSellers();
//         setSellerToEdit(undefined);
//         setIsFormVisible(false);
//         setExpandedProductID(null);
//     };

//     const toggleProductDetails = (productID) => {
//         setExpandedProductID(expandedProductID === productID ? null : productID);
//     };

//     const toggleStatus = async (sellerID, currentStatus) => {
//         try {
//             setSellers((prevSellers) =>
//                 prevSellers.map((seller) =>
//                     seller.sellerID === sellerID ? { ...seller, isActive: !currentStatus } : seller
//                 )
//             );

//             const newStatus = !currentStatus;
//             await apiClient.put(`/Seller/${sellerID}/status`, { isActive: newStatus });
//         } catch (error) {
//             console.error('Error updating seller status:', error);
//             setSellers((prevSellers) =>
//                 prevSellers.map((seller) =>
//                     seller.sellerID === sellerID ? { ...seller, isActive: currentStatus } : seller
//                 )
//             );
//         }
//     };

//     const onAddNewSeller = () => {
//         setSellerToEdit(undefined);
//         setIsFormVisible(true);
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h2 className="text-3xl font-bold mb-6 text-center">Seller List</h2>

//             <table className="w-full max-w-6xl mx-auto border border-gray-200 shadow-lg my-8 rounded-lg">
//                 <thead>
//                     <tr className="bg-gray-100 border-b text-gray-700">
//                         <th className="py-4 px-6 text-left">Seller ID</th>
//                         <th className="py-4 px-6 text-left">Company Name</th>
//                         <th className="py-4 px-6 text-left">Contact Person</th>
//                         <th className="py-4 px-6 text-left">Contact Number</th>
//                         <th className="py-4 px-6 text-left">Address</th>
//                         <th className="py-4 px-6 text-left">Store Description</th>
//                         <th className="py-4 px-6 text-center">Actions</th>
//                         <th className="py-4 px-6 text-center">Status</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {sellers.map((seller) => (
//                         <React.Fragment key={seller.sellerID}>
//                             <tr
//                                 className={`border-b transition-colors duration-300 ${
//                                     expandedProductID === seller.sellerID ? 'bg-blue-50' : 'hover:bg-gray-50'
//                                 }`}
//                             >
//                                 <td className="py-2 px-4">{seller.sellerID}</td>
//                                 <td className="py-2 px-4">{seller.companyName}</td>
//                                 <td className="py-2 px-4">{seller.contactPerson}</td>
//                                 <td className="py-2 px-4">{seller.contactNumber}</td>
//                                 <td className="py-2 px-4">{seller.address}</td>
//                                 <td className="py-2 px-4">{seller.storeDescription}</td>
//                                 <td className="py-2 px-4 flex space-x-2 justify-center">
//                                     <button
//                                         onClick={() => onEdit(seller)}
//                                         className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 shadow-md transition-all"
//                                     >
//                                         Edit
//                                     </button>
//                                     <button
//                                         onClick={() => onDelete(seller.sellerID)}
//                                         className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 shadow-md transition-all"
//                                     >
//                                         Delete
//                                     </button>
//                                     <button
//                                         onClick={() => toggleProductDetails(seller.sellerID)}
//                                         className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 shadow-md transition-all flex items-center"
//                                     >
//                                         <span className="mr-2">{expandedProductID === seller.sellerID ? 'Hide Details' : 'View Details'}</span>
//                                         {expandedProductID === seller.sellerID ? '▲' : '▼'}
//                                     </button>
//                                 </td>
//                                 <td className="py-2 px-4 text-center">
//                                     <div className="flex items-center justify-center space-x-2">
//                                         <Switch
//                                             checked={seller.isActive}
//                                             onChange={() => toggleStatus(seller.sellerID, seller.isActive)}
//                                             color="primary"
//                                         />
//                                     </div>
//                                 </td>
//                             </tr>
//                             {expandedProductID === seller.sellerID && (
//                                 <tr className="bg-gray-50">
//                                     <td colSpan="8">
//                                         <SellerProductDetails sellerID={seller.sellerID} />
//                                     </td>
//                                 </tr>
//                             )}
//                         </React.Fragment>
//                     ))}
//                 </tbody>
//             </table>

//             {/* Render SellerForm for Add/Edit in Modal */}
//             {isFormVisible && (
//                 <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-y-auto">
//                     <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full h-auto">
//                         <h3 className="text-xl font-bold mb-4">{sellerToEdit ? 'Edit Seller' : 'Add New Seller'}</h3>
//                         <div className="overflow-y-auto max-h-85"> {/* Make this scrollable */}
//                             <SellerForm onAddOrUpdate={onAddOrUpdate} sellerToEdit={sellerToEdit} />
//                         </div>
//                         <button
//                             onClick={() => setIsFormVisible(false)}
//                             className="bg-red-600 text-white px-4 py-2 rounded mt-4 hover:bg-red-700 transition-all"
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default SellerList;


// import React, { useState, useEffect } from 'react';
// import { apiClient } from '../../common/Axios/auth';
// import SellerForm from './SellerForm';
// import SellerProductDetails from './SellerProductDetails';
// import { Switch } from '@mui/material';

// const SellerList = () => {
//     const [sellers, setSellers] = useState([]);
//     const [sellerToEdit, setSellerToEdit] = useState(undefined);
//     const [expandedProductID, setExpandedProductID] = useState(null);
//     const [isFormVisible, setIsFormVisible] = useState(false);

//     useEffect(() => {
//         fetchSellers();
//     }, []);

//     const fetchSellers = async () => {
//         try {
//             const response = await apiClient.get('/Seller/list');
//             setSellers(response.data.$values);
//         } catch (error) {
//             console.error('Error fetching sellers:', error);
//         }
//     };

//     const onDelete = async (id) => {
//         try {
//             await apiClient.delete(`/Seller/${id}`);
//             fetchSellers();
//         } catch (error) {
//             console.error('Error deleting seller:', error);
//         }
//     };

//     const onEdit = (seller) => {
//         setSellerToEdit(seller);
//         setIsFormVisible(true);
//     };

//     const onAddOrUpdate = () => {
//         fetchSellers();
//         setSellerToEdit(undefined);
//         setIsFormVisible(false);
//         setExpandedProductID(null);
//     };

//     const toggleProductDetails = (productID) => {
//         setExpandedProductID(expandedProductID === productID ? null : productID);
//     };

//     const toggleStatus = async (sellerID, currentStatus) => {
//         try {
//             setSellers((prevSellers) =>
//                 prevSellers.map((seller) =>
//                     seller.sellerID === sellerID ? { ...seller, isActive: !currentStatus } : seller
//                 )
//             );

//             const newStatus = !currentStatus;
//             await apiClient.put(`/Seller/${sellerID}/status`, { isActive: newStatus });
//         } catch (error) {
//             console.error('Error updating seller status:', error);
//             setSellers((prevSellers) =>
//                 prevSellers.map((seller) =>
//                     seller.sellerID === sellerID ? { ...seller, isActive: currentStatus } : seller
//                 )
//             );
//         }
//     };

//     const onAddNewSeller = () => {
//         setSellerToEdit(undefined);
//         setIsFormVisible(true);
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h2 className="text-3xl font-bold mb-6 text-center">Seller List</h2>

//             <table className="w-full max-w-6xl mx-auto border border-gray-200 shadow-lg my-8 rounded-lg">
//                 <thead>
//                     <tr className="bg-gray-100 border-b text-gray-700">
//                         <th className="py-4 px-6 text-left">Seller ID</th>
//                         <th className="py-4 px-6 text-left">Company Name</th>
//                         <th className="py-4 px-6 text-left">Contact Person</th>
//                         <th className="py-4 px-6 text-left">Contact Number</th>
//                         <th className="py-4 px-6 text-left">Address</th>
//                         <th className="py-4 px-6 text-left">Store Description</th>
//                         <th className="py-4 px-6 text-center">Actions</th>
//                         <th className="py-4 px-6 text-center">Status</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {sellers.map((seller) => (
//                         <React.Fragment key={seller.sellerID}>
//                             <tr
//                                 className={`border-b transition-colors duration-300 ${
//                                     expandedProductID === seller.sellerID ? 'bg-blue-50' : 'hover:bg-gray-50'
//                                 }`}
//                             >
//                                 <td className="py-2 px-4">{seller.sellerID}</td>
//                                 <td className="py-2 px-4">{seller.companyName}</td>
//                                 <td className="py-2 px-4">{seller.contactPerson}</td>
//                                 <td className="py-2 px-4">{seller.contactNumber}</td>
//                                 <td className="py-2 px-4">{seller.address}</td>
//                                 <td className="py-2 px-4">{seller.storeDescription}</td>
//                                 <td className="py-2 px-4 flex space-x-2 justify-center">
//                                     <button
//                                         onClick={() => onEdit(seller)}
//                                         className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 shadow-md transition-all"
//                                     >
//                                         Edit
//                                     </button>
//                                     <button
//                                         onClick={() => onDelete(seller.sellerID)}
//                                         className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 shadow-md transition-all"
//                                     >
//                                         Delete
//                                     </button>
//                                     <button
//                                         onClick={() => toggleProductDetails(seller.sellerID)}
//                                         className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 shadow-md transition-all flex items-center"
//                                     >
//                                         <span className="mr-2">{expandedProductID === seller.sellerID ? 'Hide Details' : 'View Details'}</span>
//                                         {expandedProductID === seller.sellerID ? '▲' : '▼'}
//                                     </button>
//                                 </td>
//                                 <td className="py-2 px-4 text-center">
//                                     <div className="flex items-center justify-center space-x-2">
//                                         <Switch
//                                             checked={seller.isActive}
//                                             onChange={() => toggleStatus(seller.sellerID, seller.isActive)}
//                                             color="primary"
//                                         />
//                                     </div>
//                                 </td>
//                             </tr>
//                             {expandedProductID === seller.sellerID && (
//                                 <tr className="bg-gray-50">
//                                     <td colSpan="8">
//                                         <SellerProductDetails sellerID={seller.sellerID} />
//                                     </td>
//                                 </tr>
//                             )}
//                         </React.Fragment>
//                     ))}
//                 </tbody>
//             </table>

//             {/* Render SellerForm for Add/Edit in Modal */}
//             {isFormVisible && (
//                 <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-y-auto">
//                     <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full h-auto">
//                         <h3 className="text-xl font-bold mb-4">{sellerToEdit ? 'Edit Seller' : 'Add New Seller'}</h3>
//                         <div className="overflow-y-auto max-h-85"> {/* Make this scrollable */}
//                             <SellerForm onAddOrUpdate={onAddOrUpdate} sellerToEdit={sellerToEdit} />
//                         </div>
//                         <button
//                             onClick={() => setIsFormVisible(false)}
//                             className="bg-red-600 text-white px-4 py-2 rounded mt-4 hover:bg-red-700 transition-all"
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default SellerList;



import React, { useState, useEffect } from 'react';
import { apiClient } from '../../common/Axios/auth';
import SellerForm from './SellerForm';
import SellerProductDetails from './SellerProductDetails';
import { Switch, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const SellerList = () => {
    const [sellers, setSellers] = useState([]);
    const [sellerToEdit, setSellerToEdit] = useState(undefined);
    const [expandedProductID, setExpandedProductID] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [productDialogOpen, setProductDialogOpen] = useState(false);
    const [selectedSellerID, setSelectedSellerID] = useState(null);

    useEffect(() => {
        fetchSellers();
    }, []);

    const fetchSellers = async () => {
        try {
            const response = await apiClient.get('/Seller/list');
            setSellers(response.data.$values);
        } catch (error) {
            console.error('Error fetching sellers:', error);
        }
    };

    const onDelete = async (id) => {
        try {
            await apiClient.delete(`/Seller/${id}`);
            fetchSellers();
        } catch (error) {
            console.error('Error deleting seller:', error);
        }
    };

    const onEdit = (seller) => {
        setSellerToEdit(seller);
        setEditDialogOpen(true);
    };

    const onAddOrUpdate = () => {
        fetchSellers();
        setSellerToEdit(undefined);
        setEditDialogOpen(false);
    };

    const handleOpenProductDialog = (sellerID) => {
        setSelectedSellerID(sellerID);
        setProductDialogOpen(true);
    };

    const handleCloseProductDialog = () => {
        setSelectedSellerID(null);
        setProductDialogOpen(false);
    };

    const handleCloseEditDialog = () => {
        setSellerToEdit(undefined);
        setEditDialogOpen(false);
    };

    const toggleStatus = async (sellerID, currentStatus) => {
        try {
            setSellers((prevSellers) =>
                prevSellers.map((seller) =>
                    seller.sellerID === sellerID ? { ...seller, isActive: !currentStatus } : seller
                )
            );

            const newStatus = !currentStatus;
            await apiClient.put(`/Seller/${sellerID}/status`, { isActive: newStatus });
        } catch (error) {
            console.error('Error updating seller status:', error);
            setSellers((prevSellers) =>
                prevSellers.map((seller) =>
                    seller.sellerID === sellerID ? { ...seller, isActive: currentStatus } : seller
                )
            );
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Seller List</h2>

            <div className="table-auto max-w-screen-xl mx-auto rounded-lg shadow-lg">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="py-3 px-4 text-left font-medium">Company Name</th>
                            <th className="py-3 px-4 text-left font-medium">Contact Person</th>
                            <th className="py-3 px-4 text-left font-medium">Contact Number</th>
                            <th className="py-3 px-4 text-left font-medium">Address</th>
                            <th className="py-3 px-4 text-left font-medium">Store Description</th>
                            <th className="py-3 px-4 text-center font-medium">Actions</th>
                            <th className="py-3 px-4 text-center font-medium" style={{ width: '120px' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sellers.map((seller) => (
                            <tr key={seller.sellerID} className={`border-b hover:bg-gray-50 transition-colors duration-300 ${seller.isActive ? 'bg-green-50' : 'bg-red-50'}`}>
                                <td className="py-2 px-4">{seller.companyName}</td>
                                <td className="py-2 px-4">{seller.contactPerson}</td>
                                <td className="py-2 px-4">{seller.contactNumber}</td>
                                <td className="py-2 px-4">{seller.address}</td>
                                <td className="py-2 px-4">{seller.storeDescription}</td>
                                <td className="py-2 px-4 flex space-x-2 justify-center">
                                    <button onClick={() => onEdit(seller)} className="bg-blue-500 text-white px-3 py-0.5 rounded hover:bg-blue-600 transition duration-200">Edit</button>
                                    <button onClick={() => onDelete(seller.sellerID)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200">Delete</button>
                                    <button onClick={() => handleOpenProductDialog(seller.sellerID)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-200">View Products</button>
                                </td>
                                <td className="py-2 px-4 text-center" style={{ width: '120px' }}>
                                    <div className="flex items-center justify-center space-x-2">
                                        <span className={seller.isActive ? "text-green-600" : "text-red-600"} style={{ width: '60px', textAlign: 'center' }}>
                                            {seller.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                        <Switch checked={seller.isActive} onChange={() => toggleStatus(seller.sellerID, seller.isActive)} color="primary" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Dialog for Seller Product Details */}
            <Dialog open={productDialogOpen} onClose={handleCloseProductDialog} fullWidth maxWidth="lg">
                <DialogContent>
                    {selectedSellerID && <SellerProductDetails sellerID={selectedSellerID} />}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseProductDialog} color="primary">Close</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog for Editing Seller */}
            <Dialog open={editDialogOpen} onClose={handleCloseEditDialog} fullWidth maxWidth="sm">
                
                <DialogContent>
                    {sellerToEdit && (
                        <SellerForm onAddOrUpdate={onAddOrUpdate} sellerToEdit={sellerToEdit} />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog} color="secondary">Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default SellerList;
