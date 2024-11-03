
// import React, { useState, useEffect } from 'react';
// import { apiClient, getToken } from '../../common/Axios/auth';
// import CustomerForm from './CustomerForm';
// import CustomerOrderDetails from './CustomerOrderDetails';
// import { Switch } from '@mui/material';

// const CustomerList = () => {
//     const [customers, setCustomers] = useState([]);
//     const [customerToEdit, setCustomerToEdit] = useState(undefined);
//     const [customerID, setCustomerID] = useState(undefined);
//     const [loading, setLoading] = useState(false); // Added loading state
//     const [error, setError] = useState(null); // Added error state

//     useEffect(() => {
//         fetchCustomers();
//     }, []);

//     const fetchCustomers = async () => {
//         setLoading(true); // Start loading
//         setError(null); // Reset error state
//         try {
//             const response = await apiClient.get('/CustomerDetail/list');
//             setCustomers(response.data.$values);
//         } catch (error) {
//             console.error('Error fetching customers:', error);
//             setError('Failed to fetch customers.'); // Set error message
//         } finally {
//             setLoading(false); // End loading
//         }
//     };

//     const handleToggleActive = async (customerID, isActive) => {
//         const originalStatus = isActive; // Save the original status for rollback
//         setCustomers((prevCustomers) =>
//             prevCustomers.map(customer =>
//                 customer.customerID === customerID ? { ...customer, isActive: !isActive } : customer
//             )
//         );

//         try {
//             const token = getToken();
//             await apiClient.put(`/CustomerDetail/${customerID}/status`, {}, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//         } catch (error) {
//             console.error('Error toggling active status:', error);
//             setCustomers((prevCustomers) =>
//                 prevCustomers.map(customer =>
//                     customer.customerID === customerID ? { ...customer, isActive: originalStatus } : customer
//                 )
//             );
//             setError('Failed to update active status.'); // Set error message
//         }
//     };

//     const onDelete = async (id) => {
//         try {
//             await apiClient.delete(`/CustomerDetail/${id}`);
//             fetchCustomers();
//         } catch (error) {
//             console.error('Error deleting customer:', error);
//             setError('Failed to delete customer.'); // Set error message
//         }
//     };

//     const onEdit = (customer) => {
//         setCustomerToEdit(customer);
//     };

//     const onAddOrUpdate = () => {
//         fetchCustomers(); // Refresh the list after add or update
//         setCustomerToEdit(undefined); // Clear the form
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h2 className="text-3xl font-bold mb-6 text-center">Customer List</h2>

//             {/* Display error message if any */}
//             {error && <div className="text-red-500">{error}</div>}

//             {/* Display loading indicator */}
//             {loading && <div>Loading...</div>}

//             <table className="min-w-full bg-white border border-gray-200">
//                 <thead>
//                     <tr className="bg-gray-100 border-b">
//                         <th className="py-2 px-4 text-left">First Name</th>
//                         <th className="py-2 px-4 text-left">Last Name</th>
//                         <th className="py-2 px-4 text-left">Phone Number</th>
//                         <th className="py-2 px-4 text-center">Actions</th>
//                         <th className="py-2 px-4 text-center" style={{ width: '120px' }}>Status</th> {/* Fixed width */}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {customers.map((customer) => (
//                         <tr 
//                             key={customer.customerID} 
//                             className={`border-b hover:bg-opacity-80 transition-colors duration-300 ${
//                                 customer.isActive ? 'bg-green-50' : 'bg-red-50'
//                             }`}
//                         >
//                             <td className="py-2 px-4">{customer.firstName}</td>
//                             <td className="py-2 px-4">{customer.lastName}</td>
//                             <td className="py-2 px-4">{customer.phoneNumber}</td>
//                             <td className="py-2 px-4 flex space-x-2 justify-between">
//                                 <button
//                                     onClick={() => onEdit(customer)}
//                                     className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                                 >
//                                     Edit
//                                 </button>
//                                 <button
//                                     onClick={() => onDelete(customer.customerID)}
//                                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                                 >
//                                     Delete
//                                 </button>
//                                 <button
//                                     onClick={() => setCustomerID(customer.customerID)}
//                                     className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
//                                 >
//                                     Orders
//                                 </button>
//                             </td>
//                             <td className="py-2 px-4 text-center" style={{ width: '120px' }}>
//                                 <div className="flex items-center justify-center space-x-2">
//                                     <span 
//                                         className={customer.isActive ? "text-green-600" : "text-red-600"}
//                                         style={{ width: '60px', textAlign: 'center' }}
//                                     >
//                                         {customer.isActive ? 'Active' : 'Inactive'}
//                                     </span>
//                                     <Switch
//                                         checked={customer.isActive}
//                                         onChange={() => handleToggleActive(customer.customerID, customer.isActive)}
//                                         color="primary"
//                                     />
//                                 </div>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {/* Render CustomerForm for Add/Edit */}
//             {customerToEdit !== undefined && (
//                 <div className="mt-8">
//                     <CustomerForm onAddOrUpdate={onAddOrUpdate} customerToEdit={customerToEdit} />
//                 </div>
//             )}

//             {/* Render CustomerOrderDetails if a customer is selected */}
//             {customerID !== undefined && (
//                 <div className="mt-8">
//                     <CustomerOrderDetails customerID={customerID} />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CustomerList;

// import React, { useState, useEffect } from 'react';
// import { apiClient, getToken } from '../../common/Axios/auth';
// import CustomerForm from './CustomerForm';
// import CustomerOrderDetails from './CustomerOrderDetails';
// import { Switch } from '@mui/material';

// const CustomerList = () => {
//     const [customers, setCustomers] = useState([]);
//     const [customerToEdit, setCustomerToEdit] = useState(undefined);
//     const [customerID, setCustomerID] = useState(undefined);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         fetchCustomers();
//     }, []);

//     const fetchCustomers = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await apiClient.get('/CustomerDetail/list');
//             setCustomers(response.data.$values);
//         } catch (error) {
//             console.error('Error fetching customers:', error);
//             setError('Failed to fetch customers.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleToggleActive = async (customerID, isActive) => {
//         const originalStatus = isActive;
//         setCustomers((prevCustomers) =>
//             prevCustomers.map(customer =>
//                 customer.customerID === customerID ? { ...customer, isActive: !isActive } : customer
//             )
//         );

//         try {
//             const token = getToken();
//             await apiClient.put(`/CustomerDetail/${customerID}/status`, {}, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//         } catch (error) {
//             console.error('Error toggling active status:', error);
//             setCustomers((prevCustomers) =>
//                 prevCustomers.map(customer =>
//                     customer.customerID === customerID ? { ...customer, isActive: originalStatus } : customer
//                 )
//             );
//             setError('Failed to update active status.');
//         }
//     };

//     const onDelete = async (id) => {
//         try {
//             await apiClient.delete(`/CustomerDetail/${id}`);
//             fetchCustomers();
//         } catch (error) {
//             console.error('Error deleting customer:', error);
//             setError('Failed to delete customer.');
//         }
//     };

//     const onEdit = (customer) => {
//         setCustomerToEdit(customer);
//     };

//     const onAddOrUpdate = () => {
//         fetchCustomers();
//         setCustomerToEdit(undefined);
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h2 className="text-3xl font-bold mb-6 text-center">Customer List</h2>

//             {/* Display error message if any */}
//             {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

//             {/* Display loading indicator */}
//             {loading && <div className="text-center">Loading...</div>}

//             <div className="overflow-x-auto rounded-lg shadow-lg">
//                 <table className="min-w-full bg-white border border-gray-200">
//                     <thead>
//                         <tr className="bg-gray-100 border-b">
//                             <th className="py-3 px-4 text-left font-medium">First Name</th>
//                             <th className="py-3 px-4 text-left font-medium">Last Name</th>
//                             <th className="py-3 px-4 text-left font-medium">Phone Number</th>
//                             <th className="py-3 px-4 text-center font-medium">Actions</th>
//                             <th className="py-3 px-4 text-center font-medium" style={{ width: '120px' }}>Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {customers.map((customer) => (
//                             <tr 
//                                 key={customer.customerID} 
//                                 className={`border-b hover:bg-gray-50 transition-colors duration-300 ${
//                                     customer.isActive ? 'bg-green-50' : 'bg-red-50'
//                                 }`}
//                             >
//                                 <td className="py-2 px-4">{customer.firstName}</td>
//                                 <td className="py-2 px-4">{customer.lastName}</td>
//                                 <td className="py-2 px-4">{customer.phoneNumber}</td>
//                                 <td className="py-2 px-4 flex space-x-2 justify-center">
//                                     <button
//                                         onClick={() => onEdit(customer)}
//                                         className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
//                                     >
//                                         Edit
//                                     </button>
//                                     <button
//                                         onClick={() => onDelete(customer.customerID)}
//                                         className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
//                                     >
//                                         Delete
//                                     </button>
//                                     <button
//                                         onClick={() => setCustomerID(customer.customerID)}
//                                         className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-200"
//                                     >
//                                         Orders
//                                     </button>
//                                 </td>
//                                 <td className="py-2 px-4 text-center" style={{ width: '120px' }}>
//                                     <div className="flex items-center justify-center space-x-2">
//                                         <span 
//                                             className={customer.isActive ? "text-green-600" : "text-red-600"}
//                                             style={{ width: '60px', textAlign: 'center' }}
//                                         >
//                                             {customer.isActive ? 'Active' : 'Inactive'}
//                                         </span>
//                                         <Switch
//                                             checked={customer.isActive}
//                                             onChange={() => handleToggleActive(customer.customerID, customer.isActive)}
//                                             color="primary"
//                                         />
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Render CustomerForm for Add/Edit */}
//             {customerToEdit !== undefined && (
//                 <div className="mt-8">
//                     <CustomerForm onAddOrUpdate={onAddOrUpdate} customerToEdit={customerToEdit} />
//                 </div>
//             )}

//             {/* Render CustomerOrderDetails if a customer is selected */}
//             {customerID !== undefined && (
//                 <div className="mt-8">
//                     <CustomerOrderDetails customerID={customerID} />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CustomerList;


// import React, { useState, useEffect } from 'react';
// import { apiClient, getToken } from '../../common/Axios/auth';
// import CustomerForm from './CustomerForm';
// import CustomerOrderDetails from './CustomerOrderDetails';
// import { Switch } from '@mui/material';

// const CustomerList = () => {
//     const [customers, setCustomers] = useState([]);
//     const [customerToEdit, setCustomerToEdit] = useState(undefined);
//     const [customerID, setCustomerID] = useState(undefined);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         fetchCustomers();
//     }, []);

//     const fetchCustomers = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await apiClient.get('/CustomerDetail/list');
//             // Ensure we access the correct structure of the response
//             if (response.data && response.data.$values) {
//                 setCustomers(response.data.$values);
//             } else {
//                 throw new Error('Invalid response structure');
//             }
//         } catch (error) {
//             console.error('Error fetching customers:', error);
//             setError('Failed to fetch customers.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleToggleActive = async (customerID, isActive) => {
//         const originalStatus = isActive;
//         setCustomers((prevCustomers) =>
//             prevCustomers.map(customer =>
//                 customer.customerID === customerID ? { ...customer, isActive: !isActive } : customer
//             )
//         );

//         try {
//             const token = getToken();
//             await apiClient.put(`/CustomerDetail/${customerID}/status`, {}, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//         } catch (error) {
//             console.error('Error toggling active status:', error);
//             setCustomers((prevCustomers) =>
//                 prevCustomers.map(customer =>
//                     customer.customerID === customerID ? { ...customer, isActive: originalStatus } : customer
//                 )
//             );
//             setError('Failed to update active status.');
//         }
//     };

//     const onDelete = async (id) => {
//         try {
//             await apiClient.delete(`/CustomerDetail/${id}`);
//             fetchCustomers();
//         } catch (error) {
//             console.error('Error deleting customer:', error);
//             setError('Failed to delete customer.');
//         }
//     };

//     const onEdit = (customer) => {
//         setCustomerToEdit(customer);
//     };

//     const onAddOrUpdate = () => {
//         fetchCustomers();
//         setCustomerToEdit(undefined);
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h2 className="text-3xl font-bold mb-6 text-center">Customer List</h2>

//             {/* Display error message if any */}
//             {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

//             {/* Display loading indicator */}
//             {loading && <div className="text-center">Loading...</div>}

//             <div className="overflow-x-auto rounded-lg shadow-lg">
//                 <table className="min-w-full bg-white border border-gray-200">
//                     <thead>
//                         <tr className="bg-gray-100 border-b">
//                             <th className="py-3 px-4 text-left font-medium">First Name</th>
//                             <th className="py-3 px-4 text-left font-medium">Last Name</th>
//                             <th className="py-3 px-4 text-left font-medium">Phone Number</th>
//                             <th className="py-3 px-4 text-center font-medium">Actions</th>
//                             <th className="py-3 px-4 text-center font-medium" style={{ width: '120px' }}>Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {customers.map((customer) => (
//                             <tr 
//                                 key={customer.customerID} 
//                                 className={`border-b hover:bg-gray-50 transition-colors duration-300 ${
//                                     customer.isActive ? 'bg-green-50' : 'bg-red-50'
//                                 }`}
//                             >
//                                 <td className="py-2 px-4">{customer.firstName}</td>
//                                 <td className="py-2 px-4">{customer.lastName}</td>
//                                 <td className="py-2 px-4">{customer.phoneNumber}</td>
//                                 <td className="py-2 px-4 flex space-x-2 justify-center">
//                                     <button
//                                         onClick={() => onEdit(customer)}
//                                         className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
//                                     >
//                                         Edit
//                                     </button>
//                                     <button
//                                         onClick={() => onDelete(customer.customerID)}
//                                         className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
//                                     >
//                                         Delete
//                                     </button>
//                                     <button
//                                         onClick={() => setCustomerID(customer.customerID)}
//                                         className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-200"
//                                     >
//                                         Orders
//                                     </button>
//                                 </td>
//                                 <td className="py-2 px-4 text-center" style={{ width: '120px' }}>
//                                     <div className="flex items-center justify-center space-x-2">
//                                         <span 
//                                             className={customer.isActive ? "text-green-600" : "text-red-600"}
//                                             style={{ width: '60px', textAlign: 'center' }}
//                                         >
//                                             {customer.isActive ? 'Active' : 'Inactive'}
//                                         </span>
//                                         <Switch
//                                             checked={customer.isActive}
//                                             onChange={() => handleToggleActive(customer.customerID, customer.isActive)}
//                                             color="primary"
//                                         />
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Render CustomerForm for Add/Edit */}
//             {customerToEdit !== undefined && (
//                 <div className="mt-8">
//                     <CustomerForm onAddOrUpdate={onAddOrUpdate} customerToEdit={customerToEdit} />
//                 </div>
//             )}

//             {/* Render CustomerOrderDetails if a customer is selected */}
//             {customerID !== undefined && (
//                 <div className="mt-8">
//                     <CustomerOrderDetails customerID={customerID} />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CustomerList;



// import React, { useState, useEffect } from 'react';
// import { apiClient, getToken } from '../../common/Axios/auth';
// import CustomerForm from './CustomerForm';
// import CustomerOrderDetails from './CustomerOrderDetails';
// import { Switch } from '@mui/material';

// const CustomerList = () => {
//     const [customers, setCustomers] = useState([]);
//     const [customerToEdit, setCustomerToEdit] = useState(undefined);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [expandedRows, setExpandedRows] = useState({}); // To manage expanded rows

//     useEffect(() => {
//         fetchCustomers();
//     }, []);

//     const fetchCustomers = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await apiClient.get('/CustomerDetail/list');
//             if (response.data && response.data.$values) {
//                 setCustomers(response.data.$values);
//             } else {
//                 throw new Error('Invalid response structure');
//             }
//         } catch (error) {
//             console.error('Error fetching customers:', error);
//             setError('Failed to fetch customers.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleToggleActive = async (customerID, isActive) => {
//         const originalStatus = isActive;
//         setCustomers((prevCustomers) =>
//             prevCustomers.map(customer =>
//                 customer.customerID === customerID ? { ...customer, isActive: !isActive } : customer
//             )
//         );

//         try {
//             const token = getToken();
//             await apiClient.put(`/CustomerDetail/${customerID}/status`, {}, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//         } catch (error) {
//             console.error('Error toggling active status:', error);
//             setCustomers((prevCustomers) =>
//                 prevCustomers.map(customer =>
//                     customer.customerID === customerID ? { ...customer, isActive: originalStatus } : customer
//                 )
//             );
//             setError('Failed to update active status.');
//         }
//     };

//     const onDelete = async (id) => {
//         try {
//             await apiClient.delete(`/CustomerDetail/${id}`);
//             fetchCustomers();
//         } catch (error) {
//             console.error('Error deleting customer:', error);
//             setError('Failed to delete customer.');
//         }
//     };

//     const onEdit = (customer) => {
//         setCustomerToEdit(customer);
//     };

//     const onAddOrUpdate = () => {
//         fetchCustomers();
//         setCustomerToEdit(undefined);
//     };

//     const toggleExpandRow = (customerID) => {
//         setExpandedRows((prev) => ({
//             ...prev,
//             [customerID]: !prev[customerID],
//         }));
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h2 className="text-3xl font-bold mb-6 text-center">Customer List</h2>

//             {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
//             {loading && <div className="text-center">Loading...</div>}

//             <div className="overflow-x-auto rounded-lg shadow-lg">
//                 <table className="min-w-full bg-white border border-gray-200">
//                     <thead>
//                         <tr className="bg-gray-100 border-b">
//                             <th className="py-3 px-4 text-left font-medium">First Name</th>
//                             <th className="py-3 px-4 text-left font-medium">Last Name</th>
//                             <th className="py-3 px-4 text-left font-medium">Phone Number</th>
//                             <th className="py-3 px-4 text-center font-medium">Actions</th>
//                             <th className="py-3 px-4 text-center font-medium" style={{ width: '120px' }}>Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {customers.map((customer) => (
//                             <React.Fragment key={customer.customerID}>
//                                 <tr 
//                                     className={`border-b hover:bg-gray-50 transition-colors duration-300 ${
//                                         customer.isActive ? 'bg-green-50' : 'bg-red-50'
//                                     }`}
//                                 >
//                                     <td className="py-2 px-4">{customer.firstName}</td>
//                                     <td className="py-2 px-4">{customer.lastName}</td>
//                                     <td className="py-2 px-4">{customer.phoneNumber}</td>
//                                     <td className="py-2 px-4 flex space-x-2 justify-center">
//                                         <button
//                                             onClick={() => onEdit(customer)}
//                                             className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
//                                         >
//                                             Edit
//                                         </button>
//                                         <button
//                                             onClick={() => onDelete(customer.customerID)}
//                                             className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
//                                         >
//                                             Delete
//                                         </button>
//                                         <button
//                                             onClick={() => toggleExpandRow(customer.customerID)}
//                                             className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-200"
//                                         >
//                                             {expandedRows[customer.customerID] ? 'Hide Orders' : 'Show Orders'}
//                                         </button>
//                                     </td>
//                                     <td className="py-2 px-4 text-center" style={{ width: '120px' }}>
//                                         <div className="flex items-center justify-center space-x-2">
//                                             <span 
//                                                 className={customer.isActive ? "text-green-600" : "text-red-600"}
//                                                 style={{ width: '60px', textAlign: 'center' }}
//                                             >
//                                                 {customer.isActive ? 'Active' : 'Inactive'}
//                                             </span>
//                                             <Switch
//                                                 checked={customer.isActive}
//                                                 onChange={() => handleToggleActive(customer.customerID, customer.isActive)}
//                                                 color="primary"
//                                             />
//                                         </div>
//                                     </td>
//                                 </tr>

//                                 {/* Nested Orders Table */}
//                                 {expandedRows[customer.customerID] && (
//                                     <tr>
//                                         <td colSpan="5" className="p-4">
//                                             {/* Here you would fetch and render customer order details */}
//                                             <CustomerOrderDetails customerID={customer.customerID} />
//                                         </td>
//                                     </tr>
//                                 )}
//                             </React.Fragment>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Render CustomerForm for Add/Edit */}
//             {customerToEdit !== undefined && (
//                 <div className="mt-8">
//                     <CustomerForm onAddOrUpdate={onAddOrUpdate} customerToEdit={customerToEdit} />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CustomerList;



// import React, { useState, useEffect } from 'react';
// import { apiClient, getToken } from '../../common/Axios/auth';
// import CustomerForm from './CustomerForm';
// import CustomerOrderDetails from './CustomerOrderDetails';
// import { Switch, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

// const CustomerList = () => {
//     const [customers, setCustomers] = useState([]);
//     const [customerToEdit, setCustomerToEdit] = useState(undefined);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [orderDialogOpen, setOrderDialogOpen] = useState(false);
//     const [selectedCustomerID, setSelectedCustomerID] = useState(null);

//     useEffect(() => {
//         fetchCustomers();
//     }, []);

//     const fetchCustomers = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await apiClient.get('/CustomerDetail/list');
//             if (response.data && response.data.$values) {
//                 setCustomers(response.data.$values);
//             } else {
//                 throw new Error('Invalid response structure');
//             }
//         } catch (error) {
//             console.error('Error fetching customers:', error);
//             setError('Failed to fetch customers.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleToggleActive = async (customerID, isActive) => {
//         const originalStatus = isActive;
//         setCustomers((prevCustomers) =>
//             prevCustomers.map(customer =>
//                 customer.customerID === customerID ? { ...customer, isActive: !isActive } : customer
//             )
//         );

//         try {
//             const token = getToken();
//             await apiClient.put(`/CustomerDetail/${customerID}/status`, {}, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//         } catch (error) {
//             console.error('Error toggling active status:', error);
//             setCustomers((prevCustomers) =>
//                 prevCustomers.map(customer =>
//                     customer.customerID === customerID ? { ...customer, isActive: originalStatus } : customer
//                 )
//             );
//             setError('Failed to update active status.');
//         }
//     };

//     const onDelete = async (id) => {
//         try {
//             await apiClient.delete(`/CustomerDetail/${id}`);
//             fetchCustomers();
//         } catch (error) {
//             console.error('Error deleting customer:', error);
//             setError('Failed to delete customer.');
//         }
//     };

//     const onEdit = (customer) => {
//         setCustomerToEdit(customer);
//     };

//     const onAddOrUpdate = () => {
//         fetchCustomers();
//         setCustomerToEdit(undefined);
//     };

//     const handleOpenOrderDialog = (customerID) => {
//         setSelectedCustomerID(customerID);
//         setOrderDialogOpen(true);
//     };

//     const handleCloseOrderDialog = () => {
//         setSelectedCustomerID(null);
//         setOrderDialogOpen(false);
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h2 className="text-3xl font-bold mb-6 text-center">Customer List</h2>

//             {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
//             {loading && <div className="text-center">Loading...</div>}

//             <div className="overflow-x-auto rounded-lg shadow-lg">
//                 <table className="min-w-full bg-white border border-gray-200">
//                     <thead>
//                         <tr className="bg-gray-100 border-b">
//                             <th className="py-3 px-4 text-left font-medium">First Name</th>
//                             <th className="py-3 px-4 text-left font-medium">Last Name</th>
//                             <th className="py-3 px-4 text-left font-medium">Phone Number</th>
//                             <th className="py-3 px-4 text-center font-medium">Actions</th>
//                             <th className="py-3 px-4 text-center font-medium" style={{ width: '120px' }}>Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {customers.map((customer) => (
//                             <tr key={customer.customerID} className={`border-b hover:bg-gray-50 transition-colors duration-300 ${customer.isActive ? 'bg-green-50' : 'bg-red-50'}`}>
//                                 <td className="py-2 px-4">{customer.firstName}</td>
//                                 <td className="py-2 px-4">{customer.lastName}</td>
//                                 <td className="py-2 px-4">{customer.phoneNumber}</td>
//                                 <td className="py-2 px-4 flex space-x-2 justify-center">
//                                     <button onClick={() => onEdit(customer)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200">Edit</button>
//                                     <button onClick={() => onDelete(customer.customerID)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200">Delete</button>
//                                     <button onClick={() => handleOpenOrderDialog(customer.customerID)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-200">View Orders</button>
//                                 </td>
//                                 <td className="py-2 px-4 text-center" style={{ width: '120px' }}>
//                                     <div className="flex items-center justify-center space-x-2">
//                                         <span className={customer.isActive ? "text-green-600" : "text-red-600"} style={{ width: '60px', textAlign: 'center' }}>
//                                             {customer.isActive ? 'Active' : 'Inactive'}
//                                         </span>
//                                         <Switch checked={customer.isActive} onChange={() => handleToggleActive(customer.customerID, customer.isActive)} color="primary" />
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Render CustomerForm for Add/Edit */}
//             {customerToEdit !== undefined && (
//                 <div className="mt-8">
//                     <CustomerForm onAddOrUpdate={onAddOrUpdate} customerToEdit={customerToEdit} />
//                 </div>
//             )}

//             {/* Dialog for Customer Order Details */}
//             <Dialog open={orderDialogOpen} onClose={handleCloseOrderDialog} fullWidth maxWidth="lg">
                
//                 <DialogContent>
//                     {selectedCustomerID && <CustomerOrderDetails customerID={selectedCustomerID} />}
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleCloseOrderDialog} color="primary">Close</Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// };

// export default CustomerList;




import React, { useState, useEffect } from 'react';
import { apiClient, getToken } from '../../common/Axios/auth';
import CustomerForm from './CustomerForm';
import CustomerOrderDetails from './CustomerOrderDetails';
import { Switch, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [customerToEdit, setCustomerToEdit] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [orderDialogOpen, setOrderDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false); // For Edit Dialog
    const [selectedCustomerID, setSelectedCustomerID] = useState(null);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.get('/CustomerDetail/list');
            if (response.data && response.data.$values) {
                setCustomers(response.data.$values);
            } else {
                throw new Error('Invalid response structure');
            }
        } catch (error) {
            console.error('Error fetching customers:', error);
            setError('Failed to fetch customers.');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleActive = async (customerID, isActive) => {
        const originalStatus = isActive;
        setCustomers((prevCustomers) =>
            prevCustomers.map(customer =>
                customer.customerID === customerID ? { ...customer, isActive: !isActive } : customer
            )
        );

        try {
            const token = getToken();
            await apiClient.put(`/CustomerDetail/${customerID}/status`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            console.error('Error toggling active status:', error);
            setCustomers((prevCustomers) =>
                prevCustomers.map(customer =>
                    customer.customerID === customerID ? { ...customer, isActive: originalStatus } : customer
                )
            );
            setError('Failed to update active status.');
        }
    };

    const onDelete = async (id) => {
        try {
            await apiClient.delete(`/CustomerDetail/${id}`);
            fetchCustomers();
        } catch (error) {
            console.error('Error deleting customer:', error);
            setError('Failed to delete customer.');
        }
    };

    const onEdit = (customer) => {
        setCustomerToEdit(customer);
        setEditDialogOpen(true); // Open the edit dialog
    };

    const onAddOrUpdate = () => {
        fetchCustomers();
        setCustomerToEdit(undefined);
        setEditDialogOpen(false); // Close the edit dialog
    };

    const handleOpenOrderDialog = (customerID) => {
        setSelectedCustomerID(customerID);
        setOrderDialogOpen(true);
    };

    const handleCloseOrderDialog = () => {
        setSelectedCustomerID(null);
        setOrderDialogOpen(false);
    };

    const handleCloseEditDialog = () => {
        setCustomerToEdit(undefined);
        setEditDialogOpen(false);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Customer List</h2>

            {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
            {loading && <div className="text-center">Loading...</div>}

            <div className="overflow-x-auto max-w-screen-xl mx-auto rounded-lg shadow-lg">
    <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="py-3 px-4 text-left font-medium">First Name</th>
                            <th className="py-3 px-4 text-left font-medium">Last Name</th>
                            <th className="py-3 px-4 text-left font-medium">Phone Number</th>
                            <th className="py-3 px-4 text-center font-medium">Actions</th>
                            <th className="py-3 px-4 text-center font-medium" style={{ width: '120px' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.customerID} className={`border-b hover:bg-gray-50 transition-colors duration-300 ${customer.isActive ? 'bg-green-50' : 'bg-red-50'}`}>
                                <td className="py-2 px-4">{customer.firstName}</td>
                                <td className="py-2 px-4">{customer.lastName}</td>
                                <td className="py-2 px-4">{customer.phoneNumber}</td>
                                <td className="py-2 px-4 flex space-x-2 justify-center">
                                    <button onClick={() => onEdit(customer)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200">Edit</button>
                                    <button onClick={() => onDelete(customer.customerID)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200">Delete</button>
                                    <button onClick={() => handleOpenOrderDialog(customer.customerID)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-200">View Orders</button>
                                </td>
                                <td className="py-2 px-4 text-center" style={{ width: '120px' }}>
                                    <div className="flex items-center justify-center space-x-2">
                                        <span className={customer.isActive ? "text-green-600" : "text-red-600"} style={{ width: '60px', textAlign: 'center' }}>
                                            {customer.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                        <Switch checked={customer.isActive} onChange={() => handleToggleActive(customer.customerID, customer.isActive)} color="primary" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Dialog for Customer Order Details */}
            <Dialog open={orderDialogOpen} onClose={handleCloseOrderDialog} fullWidth maxWidth="lg">
                <DialogContent>
                    {selectedCustomerID && <CustomerOrderDetails customerID={selectedCustomerID} />}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseOrderDialog} color="primary">Close</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog for Editing Customer */}
            <Dialog open={editDialogOpen} onClose={handleCloseEditDialog} fullWidth maxWidth="sm">
                
                <DialogContent>
                    {customerToEdit && (
                        <CustomerForm onAddOrUpdate={onAddOrUpdate} customerToEdit={customerToEdit} />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog} color="secondary">Cancel</Button>
                    
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CustomerList;
