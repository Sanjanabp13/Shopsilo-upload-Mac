// import React, { useState, useEffect } from 'react';
// import { apiClient, getUserId } from '../../../common/Axios/auth'; // Assuming Axios setup here

// const OrderView = () => {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [expandedOrderId, setExpandedOrderId] = useState(null);
//     const [orderItems, setOrderItems] = useState({});
//     const [orderTotals, setOrderTotals] = useState({}); // New state for order totals

//     useEffect(() => {
//         const sellerId = getUserId(); // Assuming getUserId fetches seller ID from token/session
//         fetchSellerOrders(sellerId);
//     }, []);

//     const fetchSellerOrders = async (sellerId) => {
//         try {
//             const response = await apiClient.get(`/Order/SellerOrder/${sellerId}`); // API call to backend
//             setOrders(response.data.$values);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching seller orders:', error);
//             setError('Error fetching orders');
//             setLoading(false);
//         }
//     };

//     const fetchOrderItems = async (orderId) => {
//         try {
//             const response = await apiClient.get(`/OrderItem/Order/${orderId}`); // API call to backend for order items
//             setOrderItems(prev => ({ ...prev, [orderId]: response.data.$values }));
//             calculateTotalAmount(orderId, response.data.$values); // Calculate total for the fetched order items
//         } catch (error) {
//             console.error('Error fetching order items:', error);
//         }
//     };

//     const calculateTotalAmount = (orderId, items) => {
//         // const total = items.reduce((sum, item) => sum + (item.product?.price * item.quantity), 0);
//         const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//         setOrderTotals(prev => ({ ...prev, [orderId]: total }));
//     };

//     const handleViewDetails = (orderId) => {
//         if (expandedOrderId === orderId) {
//             setExpandedOrderId(null); // Collapse if already expanded
//         } else {
//             setExpandedOrderId(orderId);
//             fetchOrderItems(orderId);
//         }
//     };

//     return (
//         <div className="container mx-auto px-4 py-6">
//             <h2 className="text-2xl font-bold mb-4">Seller Orders</h2>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : error ? (
//                 <p>{error}</p>
//             ) : orders.length === 0 ? (
//                 <p>No orders found.</p>
//             ) : (
//                 <div className="overflow-x-auto">
//                     <table className="table-auto w-full bg-white shadow-md rounded-lg">
//                         <thead>
//                             <tr className="bg-gray-200">
//                                 <th className="px-4 py-2 text-center">Order ID</th>
//                                 <th className="px-4 py-2 text-center">Order Date</th>
//                                 <th className="px-4 py-2 text-center">Total Amount</th>
//                                 <th className="px-4 py-2 text-center">Status</th>
//                                 <th className="px-4 py-2 text-center">Tracking Number</th>
//                                 <th className="px-4 py-2 text-center">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {orders.map((order) => (
//                                 <React.Fragment key={order.orderID}>
//                                     <tr className="border-t">
//                                         <td className="px-4 py-2 text-center">{order.orderID}</td>
//                                         <td className="px-4 py-2 text-center">{new Date(order.orderDate).toLocaleDateString()}</td>
//                                         <td className="px-4 py-2 text-center">₹ {orderTotals[order.orderID]?.toFixed(2) || order.totalPrice?.toFixed(2)}</td>
//                                         <td className="px-4 py-2 text-center">{order.orderStatus}</td>
//                                         <td className="px-4 py-2 text-center">{order.trackingNumber}</td>
//                                         <td className="px-4 py-2 text-center">
//                                             <button
//                                                 onClick={() => handleViewDetails(order.orderID)}
//                                                 className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
//                                             >
//                                                 {expandedOrderId === order.orderID ? 'Hide Details' : 'View Details'}
//                                             </button>
//                                         </td>
//                                     </tr>

//                                     {expandedOrderId === order.orderID && (
//                                         <tr>
//                                             <td colSpan="6" className="p-4">
//                                                 <table className="table-auto w-full bg-gray-100 shadow-inner rounded-lg">
//                                                     <thead>
//                                                         <tr className="bg-gray-300">
//                                                             <th className="px-4 py-2 text-center">Product Name</th>
//                                                             <th className="px-4 py-2 text-center">Quantity</th>
//                                                             <th className="px-4 py-2 text-center">Price</th>
//                                                         </tr>
//                                                     </thead>
//                                                     <tbody>
//                                                         {orderItems[order.orderID]?.map((item) => (
//                                                             <tr key={item.orderItemID}>
//                                                                 <td className="px-4 py-2 text-center">{item.productName}</td>
//                                                                 <td className="px-4 py-2 text-center">{item.quantity}</td>
//                                                                 {/* <td className="px-4 py-2 text-center">₹ {(item.product?.price * item.quantity).toFixed(2)}</td> */}
//                                                                 <td className="px-4 py-2 text-center">₹ {(item.price * item.quantity).toFixed(2)}</td>
//                                                             </tr>
//                                                         ))}
//                                                         <tr>
//                                                             <td className="px-4 py-2 text-right font-bold" colSpan="2">Total:</td>
//                                                             <td className="px-4 py-2 text-center">
//                                                                 ₹ {orderTotals[order.orderID]?.toFixed(2) || order.totalAmount?.toFixed(2)}
//                                                             </td>
//                                                         </tr>
//                                                     </tbody>
//                                                 </table>
//                                             </td>
//                                         </tr>
//                                     )}
//                                 </React.Fragment>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default OrderView;

// import React, { useState, useEffect } from 'react';
// import { apiClient, getUserId } from '../../../common/Axios/auth'; // Assuming Axios setup here

// const OrderView = () => {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [expandedOrderId, setExpandedOrderId] = useState(null);
//     const [orderItems, setOrderItems] = useState({});
//     const [orderTotals, setOrderTotals] = useState({});

//     useEffect(() => {
//         const sellerId = getUserId(); // Fetch seller ID from token/session
//         fetchSellerOrders(sellerId);
//     }, []);

//     const fetchSellerOrders = async (sellerId) => {
//         try {
//             const response = await apiClient.get(`/Order/SellerOrder/${sellerId}`);
//             setOrders(response.data.$values);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching seller orders:', error);
//             setError('Error fetching orders');
//             setLoading(false);
//         }
//     };

//     const fetchOrderItems = async (orderId) => {
//         if (!orderItems[orderId]) { // Fetch items only if they haven't been loaded yet
//             try {
//                 const response = await apiClient.get(`/OrderItem/Order/${orderId}`);
//                 const items = response.data.$values;
//                 setOrderItems(prev => ({ ...prev, [orderId]: items }));
//                 calculateTotalAmount(orderId, items); // Calculate total for the fetched order items
//             } catch (error) {
//                 console.error('Error fetching order items:', error);
//             }
//         }
//     };

//     const calculateTotalAmount = (orderId, items) => {
//         const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//         setOrderTotals(prev => ({ ...prev, [orderId]: total }));
//     };

//     const handleViewDetails = (orderId) => {
//         if (expandedOrderId === orderId) {
//             setExpandedOrderId(null); // Collapse if already expanded
//         } else {
//             setExpandedOrderId(orderId);
//             fetchOrderItems(orderId); // Fetch items only when expanding
//         }
//     };

//     return (
//         <div className="container mx-auto px-4 py-6">
//             <h2 className="text-2xl font-bold mb-4">Seller Orders</h2>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : error ? (
//                 <p>{error}</p>
//             ) : orders.length === 0 ? (
//                 <p>No orders found.</p>
//             ) : (
//                 <div className="overflow-x-auto">
//                     <table className="table-auto w-full bg-white shadow-md rounded-lg">
//                         <thead>
//                             <tr className="bg-gray-200">
//                                 <th className="px-4 py-2 text-center">Order ID</th>
//                                 <th className="px-4 py-2 text-center">Order Date</th>
//                                 <th className="px-4 py-2 text-center">Total Amount</th>
//                                 <th className="px-4 py-2 text-center">Status</th>
//                                 <th className="px-4 py-2 text-center">Tracking Number</th>
//                                 <th className="px-4 py-2 text-center">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {orders.map((order) => (
//                                 <React.Fragment key={order.orderID}>
//                                     <tr className="border-t">
//                                         <td className="px-4 py-2 text-center">{order.orderID}</td>
//                                         <td className="px-4 py-2 text-center">{new Date(order.orderDate).toLocaleDateString()}</td>
//                                         <td className="px-4 py-2 text-center">₹ {orderTotals[order.orderID]?.toFixed(2) || order.totalAmount?.toFixed(2)}</td>
//                                         <td className="px-4 py-2 text-center">{order.orderStatus}</td>
//                                         <td className="px-4 py-2 text-center">{order.trackingNumber}</td>
//                                         <td className="px-4 py-2 text-center">
//                                             <button
//                                                 onClick={() => handleViewDetails(order.orderID)}
//                                                 className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
//                                             >
//                                                 {expandedOrderId === order.orderID ? 'Hide Details' : 'View Details'}
//                                             </button>
//                                         </td>
//                                     </tr>

//                                     {expandedOrderId === order.orderID && orderItems[order.orderID] && (
//                                         <tr>
//                                             <td colSpan="6" className="p-4">
//                                                 <table className="table-auto w-full bg-gray-100 shadow-inner rounded-lg">
//                                                     <thead>
//                                                         <tr className="bg-gray-300">
//                                                             <th className="px-4 py-2 text-center">Product Name</th>
//                                                             <th className="px-4 py-2 text-center">Quantity</th>
//                                                             <th className="px-4 py-2 text-center">Price</th>
//                                                         </tr>
//                                                     </thead>
//                                                     <tbody>
//                                                         {orderItems[order.orderID].map((item) => (
//                                                             <tr key={item.orderItemID}>
//                                                                 <td className="px-4 py-2 text-center">{item.productName}</td>
//                                                                 <td className="px-4 py-2 text-center">{item.quantity}</td>
//                                                                 <td className="px-4 py-2 text-center">₹ {(item.price * item.quantity).toFixed(2)}</td>
//                                                             </tr>
//                                                         ))}
//                                                         <tr>
//                                                             <td className="px-4 py-2 text-right font-bold" colSpan="2">Total:</td>
//                                                             <td className="px-4 py-2 text-center">
//                                                                 ₹ {orderTotals[order.orderID]?.toFixed(2)}
//                                                             </td>
//                                                         </tr>
//                                                     </tbody>
//                                                 </table>
//                                             </td>
//                                         </tr>
//                                     )}
//                                 </React.Fragment>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default OrderView;

// import React, { useState, useEffect } from 'react';
// import { apiClient, getUserId } from '../../../common/Axios/auth'; // Assuming Axios setup here

// const OrderView = () => {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [expandedOrderId, setExpandedOrderId] = useState(null);
//     const [orderItems, setOrderItems] = useState({});

//     useEffect(() => {
//         const sellerId = getUserId(); // Fetch seller ID from token/session
//         fetchSellerOrders(sellerId);
//     }, []);

//     const fetchSellerOrders = async (sellerId) => {
//         try {
//             const response = await apiClient.get(`/Order/SellerOrder/${sellerId}`);
//             const ordersData = response.data.$values;
//             setOrders(ordersData);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching seller orders:', error);
//             setError('Error fetching orders');
//             setLoading(false);
//         }
//     };

//     const fetchOrderItems = async (orderId) => {
//         if (!orderItems[orderId]) { // Fetch items only if they haven't been loaded yet
//             try {
//                 const response = await apiClient.get(`/OrderItem/Order/${orderId}`);
//                 const items = response.data.$values;
//                 setOrderItems(prev => ({ ...prev, [orderId]: items }));
//             } catch (error) {
//                 console.error('Error fetching order items:', error);
//             }
//         }
//     };

//     const handleViewDetails = (orderId) => {
//         if (expandedOrderId === orderId) {
//             setExpandedOrderId(null); // Collapse if already expanded
//         } else {
//             setExpandedOrderId(orderId);
//             fetchOrderItems(orderId); // Fetch items only when expanding
//         }
//     };

//     return (
//         <div className="container mx-auto px-4 py-6">
//             <h2 className="text-2xl font-bold mb-4">Seller Orders</h2>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : error ? (
//                 <p>{error}</p>
//             ) : orders.length === 0 ? (
//                 <p>No orders found.</p>
//             ) : (
//                 <div className="overflow-x-auto">
//                     <table className="table-auto w-full bg-white shadow-md rounded-lg">
//                         <thead>
//                             <tr className="bg-gray-200">
//                                 <th className="px-4 py-2 text-center">Order ID</th>
//                                 <th className="px-4 py-2 text-center">Order Date</th>
//                                 <th className="px-4 py-2 text-center">Total Amount</th>
//                                 <th className="px-4 py-2 text-center">Status</th>
//                                 <th className="px-4 py-2 text-center">Tracking Number</th>
//                                 <th className="px-4 py-2 text-center">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {orders.map((order) => (
//                                 <React.Fragment key={order.orderID}>
//                                     <tr className="border-t">
//                                         <td className="px-4 py-2 text-center">{order.orderID}</td>
//                                         <td className="px-4 py-2 text-center">{new Date(order.orderDate).toLocaleDateString()}</td>
//                                         <td className="px-4 py-2 text-center">₹ {order.totalAmount?.toFixed(2)}</td> {/* Directly use totalAmount */}
//                                         <td className="px-4 py-2 text-center">{order.orderStatus}</td>
//                                         <td className="px-4 py-2 text-center">{order.trackingNumber}</td>
//                                         <td className="px-4 py-2 text-center">
//                                             <button
//                                                 onClick={() => handleViewDetails(order.orderID)}
//                                                 className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
//                                             >
//                                                 {expandedOrderId === order.orderID ? 'Hide Details' : 'View Details'}
//                                             </button>
//                                         </td>
//                                     </tr>

//                                     {expandedOrderId === order.orderID && orderItems[order.orderID] && (
//                                         <tr>
//                                             <td colSpan="6" className="p-4">
//                                                 <table className="table-auto w-full bg-gray-100 shadow-inner rounded-lg">
//                                                     <thead>
//                                                         <tr className="bg-gray-300">
//                                                             <th className="px-4 py-2 text-center">Product Name</th>
//                                                             <th className="px-4 py-2 text-center">Quantity</th>
//                                                             <th className="px-4 py-2 text-center">Price</th>
//                                                             <th className="px-4 py-2 text-center">Total Price</th> {/* Adding Total Price column */}
//                                                         </tr>
//                                                     </thead>
//                                                     <tbody>
//                                                         {orderItems[order.orderID].map((item) => (
//                                                             <tr key={item.orderItemID}>
//                                                                 <td className="px-4 py-2 text-center">{item.productName || "N/A"}</td>
//                                                                 <td className="px-4 py-2 text-center">{item.quantity}</td>
//                                                                 <td className="px-4 py-2 text-center">₹ {item.price.toFixed(2)}</td> {/* Price for each item */}
//                                                                 <td className="px-4 py-2 text-center">₹ {item.totalPrice.toFixed(2)}</td> {/* Total Price for each item */}
//                                                             </tr>
//                                                         ))}
//                                                         <tr>
//                                                             <td className="px-4 py-2 text-right font-bold" colSpan="3">Order Total:</td>
//                                                             <td className="px-4 py-2 text-center">
//                                                                 ₹ {order.totalAmount?.toFixed(2)} {/* Use the total amount from the order */}
//                                                             </td>
//                                                         </tr>
//                                                     </tbody>
//                                                 </table>
//                                             </td>
//                                         </tr>
//                                     )}
//                                 </React.Fragment>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default OrderView;
// import React, { useState, useEffect } from 'react';
// import { apiClient, getUserId } from '../../../common/Axios/auth'; // Assuming Axios setup here

// const OrderView = () => {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [expandedOrderId, setExpandedOrderId] = useState(null);
//     const [orderItems, setOrderItems] = useState({});
    
//     // Define possible order statuses
//     const orderStatuses = ['Pending', 'Shipped', 'Delivered', 'Cancelled', 'Processing'];

//     useEffect(() => {
//         const sellerId = getUserId(); // Fetch seller ID from token/session
//         fetchSellerOrders(sellerId);
//     }, []);

//     const fetchSellerOrders = async (sellerId) => {
//         try {
//             const response = await apiClient.get(`/Order/SellerOrder/${sellerId}`);
//             const ordersData = response.data.$values;
//             setOrders(ordersData);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching seller orders:', error);
//             setError('Error fetching orders');
//             setLoading(false);
//         }
//     };

//     const fetchOrderItems = async (orderId) => {
//         if (!orderItems[orderId]) { // Fetch items only if they haven't been loaded yet
//             try {
//                 const response = await apiClient.get(`/OrderItem/Order/${orderId}`);
//                 const items = response.data.$values;
//                 setOrderItems(prev => ({ ...prev, [orderId]: items }));
//             } catch (error) {
//                 console.error('Error fetching order items:', error);
//             }
//         }
//     };

//     const handleViewDetails = (orderId) => {
//         if (expandedOrderId === orderId) {
//             setExpandedOrderId(null); // Collapse if already expanded
//         } else {
//             setExpandedOrderId(orderId);
//             fetchOrderItems(orderId); // Fetch items only when expanding
//         }
//     };

//     const handleStatusChange = async (orderId, status) => {
//         try {
//             // Update the status in the backend
//             await apiClient.get(`/Order/Status/${status}`);
//             // Update the local state to reflect the new status
//             setOrders((prevOrders) =>
//                 prevOrders.map((order) =>
//                     order.orderID === orderId ? { ...order, orderStatus: tatus } : order
//                 )
//             );
//         } catch (error) {
//             console.error('Error updating order status:', error);
//             // Optionally handle error state
//         }
//     };

//     return (
//         <div className="container mx-auto px-4 py-6">
//             <h2 className="text-2xl font-bold mb-4">Seller Orders</h2>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : error ? (
//                 <p>{error}</p>
//             ) : orders.length === 0 ? (
//                 <p>No orders found.</p>
//             ) : (
//                 <div className="overflow-x-auto">
//                     <table className="table-auto w-full bg-white shadow-md rounded-lg">
//                         <thead>
//                             <tr className="bg-gray-200">
//                                 <th className="px-4 py-2 text-center">Order ID</th>
//                                 <th className="px-4 py-2 text-center">Order Date</th>
//                                 <th className="px-4 py-2 text-center">Total Amount</th>
//                                 <th className="px-4 py-2 text-center">Status</th>
//                                 <th className="px-4 py-2 text-center">Tracking Number</th>
//                                 <th className="px-4 py-2 text-center">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {orders.map((order) => (
//                                 <React.Fragment key={order.orderID}>
//                                     <tr className="border-t">
//                                         <td className="px-4 py-2 text-center">{order.orderID}</td>
//                                         <td className="px-4 py-2 text-center">{new Date(order.orderDate).toLocaleDateString()}</td>
//                                         <td className="px-4 py-2 text-center">₹ {order.totalAmount?.toFixed(2)}</td> {/* Directly use totalAmount */}
//                                         <td className="px-4 py-2 text-center">
//                                             <select
//                                                 value={order.orderStatus} // Set the dropdown value to the current status
//                                                 onChange={(e) => handleStatusChange(order.orderID, e.target.value)} // Update status on change
//                                                 className="border rounded-md p-1"
//                                             >
//                                                 {orderStatuses.map((status) => (
//                                                     <option key={status} value={status}>
//                                                         {status}
//                                                     </option>
//                                                 ))}
//                                             </select>
//                                         </td>
//                                         <td className="px-4 py-2 text-center">{order.trackingNumber}</td>
//                                         <td className="px-4 py-2 text-center">
//                                             <button
//                                                 onClick={() => handleViewDetails(order.orderID)}
//                                                 className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
//                                             >
//                                                 {expandedOrderId === order.orderID ? 'Hide Details' : 'View Details'}
//                                             </button>
//                                         </td>
//                                     </tr>

//                                     {expandedOrderId === order.orderID && orderItems[order.orderID] && (
//                                         <tr>
//                                             <td colSpan="6" className="p-4">
//                                                 <table className="table-auto w-full bg-gray-100 shadow-inner rounded-lg">
//                                                     <thead>
//                                                         <tr className="bg-gray-300">
//                                                             <th className="px-4 py-2 text-center">Product Name</th>
//                                                             <th className="px-4 py-2 text-center">Quantity</th>
//                                                             <th className="px-4 py-2 text-center">Price</th>
//                                                             <th className="px-4 py-2 text-center">Total Price</th>
//                                                         </tr>
//                                                     </thead>
//                                                     <tbody>
//                                                         {orderItems[order.orderID].map((item) => (
//                                                             <tr key={item.orderItemID}>
//                                                                 <td className="px-4 py-2 text-center">{item.productName || "N/A"}</td>
//                                                                 <td className="px-4 py-2 text-center">{item.quantity}</td>
//                                                                 <td className="px-4 py-2 text-center">₹ {item.price.toFixed(2)}</td>
//                                                                 <td className="px-4 py-2 text-center">₹ {item.totalPrice.toFixed(2)}</td>
//                                                             </tr>
//                                                         ))}
//                                                         <tr>
//                                                             <td className="px-4 py-2 text-right font-bold" colSpan="3">Order Total:</td>
//                                                             <td className="px-4 py-2 text-center">₹ {order.totalAmount?.toFixed(2)}</td>
//                                                         </tr>
//                                                     </tbody>
//                                                 </table>
//                                             </td>
//                                         </tr>
//                                     )}
//                                 </React.Fragment>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default OrderView;
import React, { useState, useEffect } from 'react';
import { apiClient, getUserId } from '../../../common/Axios/auth';

const OrderView = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const [orderItems, setOrderItems] = useState({});

    // Define possible order statuses
    const orderStatuses = ['Pending', 'Shipped', 'Delivered', 'Cancelled', 'Processing'];

    // Define color styles based on order status
    const statusColors = {
        Pending: 'bg-orange-100 text-orange-600',    // Pending in orange
        Shipped: 'bg-green-100 text-green-600',      // Shipped in green
        Delivered: 'bg-blue-100 text-blue-600',      // Delivered in blue
        Cancelled: 'bg-red-100 text-red-600',        // Cancelled in red
        Processing: 'bg-yellow-100 text-yellow-600', // Processing in yellow
    };

    useEffect(() => {
        const sellerId = getUserId();
        fetchSellerOrders(sellerId);
    }, []);

    const fetchSellerOrders = async (sellerId) => {
        try {
            const response = await apiClient.get(`/Order/SellerOrder/${sellerId}`);
            const ordersData = response.data.$values;
            setOrders(ordersData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching seller orders:', error);
            setError('Error fetching orders');
            setLoading(false);
        }
    };

    const fetchOrderItems = async (orderId) => {
        if (!orderItems[orderId]) {
            try {
                const response = await apiClient.get(`/OrderItem/Order/${orderId}`);
                const items = response.data.$values;
                setOrderItems(prev => ({ ...prev, [orderId]: items }));
            } catch (error) {
                console.error('Error fetching order items:', error);
            }
        }
    };

    const handleViewDetails = (orderId) => {
        if (expandedOrderId === orderId) {
            setExpandedOrderId(null);
        } else {
            setExpandedOrderId(orderId);
            fetchOrderItems(orderId);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await apiClient.put(`/Order/Status/${orderId}/${newStatus}`, {
                headers: { 'Content-Type': 'application/json' }
            });

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.orderID === orderId ? { ...order, orderStatus: newStatus } : order
                )
            );
        } catch (error) {
            console.error('Error updating order status:', error.response ? error.response.data : error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold mb-4">Seller Orders</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full bg-white shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 text-center">Order ID</th>
                                <th className="px-4 py-2 text-center">Order Date</th>
                                <th className="px-4 py-2 text-center">Total Amount</th>
                                <th className="px-4 py-2 text-center">Status</th>
                                <th className="px-4 py-2 text-center">Tracking Number</th>
                                <th className="px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <React.Fragment key={order.orderID}>
                                    <tr className="border-t">
                                        <td className="px-4 py-2 text-center">{order.orderID}</td>
                                        <td className="px-4 py-2 text-center">{new Date(order.orderDate).toLocaleDateString()}</td>
                                        <td className="px-4 py-2 text-center">₹ {order.totalAmount?.toFixed(2)}</td>
                                        <td className="px-4 py-2 text-center">
                                            <select
                                                value={order.orderStatus}
                                                onChange={(e) => handleStatusChange(order.orderID, e.target.value)}
                                                className={`border rounded-md p-1 ${statusColors[order.orderStatus]}`}
                                            >
                                                {orderStatuses.map((status) => (
                                                    <option key={status} value={status}>
                                                        {status}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-4 py-2 text-center">{order.trackingNumber}</td>
                                        <td className="px-4 py-2 text-center">
                                            <button
                                                onClick={() => handleViewDetails(order.orderID)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                                            >
                                                {expandedOrderId === order.orderID ? 'Hide Details' : 'View Details'}
                                            </button>
                                        </td>
                                    </tr>

                                    {expandedOrderId === order.orderID && orderItems[order.orderID] && (
                                        <tr>
                                            <td colSpan="6" className="p-4">
                                                <table className="table-auto w-full bg-gray-100 shadow-inner rounded-lg">
                                                    <thead>
                                                        <tr className="bg-gray-300">
                                                            <th className="px-4 py-2 text-center">Product Name</th>
                                                            <th className="px-4 py-2 text-center">Quantity</th>
                                                            <th className="px-4 py-2 text-center">Price</th>
                                                            <th className="px-4 py-2 text-center">Total Price</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {orderItems[order.orderID].map((item) => (
                                                            <tr key={item.orderItemID}>
                                                                <td className="px-4 py-2 text-center">{item.productName || "N/A"}</td>
                                                                <td className="px-4 py-2 text-center">{item.quantity}</td>
                                                                <td className="px-4 py-2 text-center">₹ {item.price.toFixed(2)}</td>
                                                                <td className="px-4 py-2 text-center">₹ {item.totalPrice.toFixed(2)}</td>
                                                            </tr>
                                                        ))}
                                                        <tr>
                                                            <td className="px-4 py-2 text-right font-bold" colSpan="3">Order Total:</td>
                                                            <td className="px-4 py-2 text-center">₹ {order.totalAmount?.toFixed(2)}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrderView;
