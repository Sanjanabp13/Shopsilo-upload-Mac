import React, { useState, useEffect } from 'react';
import { apiClient } from '../../common/Axios/auth';
import CustomerOrderItem from './CustomerOrderItem';

const CustomerOrderDetails = ({ customerID }) => {
    const [customerOrder, setCustomerOrder] = useState([]);
    const [expandedOrderID, setExpandedOrderID] = useState(null); // Track expanded order ID for "View" or "Hide" details

    useEffect(() => {
        fetchCustomerOrder();
    }, [customerID]);

    const fetchCustomerOrder = async () => {
        try {
            const response = await apiClient.get(`/Order/User/${customerID}`);
            setCustomerOrder(response.data.$values);
        } catch (error) {
            console.error('Error fetching customer orders:', error);
        }
    };

    const toggleOrderDetails = (orderID) => {
        // Open details if closed, close if open
        setExpandedOrderID(expandedOrderID === orderID ? null : orderID);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Customer Order List</h2>
            <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-blue-50 border-b text-gray-700">
                        <th className="py-3 px-4 text-left">Order ID</th>
                        <th className="py-3 px-4 text-left">Order Date</th>
                        <th className="py-3 px-4 text-left">Total Amount</th>
                        <th className="py-3 px-4 text-left">Order Status</th>
                        <th className="py-3 px-4 text-left">Tracking Number</th>
                        <th className="py-3 px-4 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {customerOrder.map((order) => (
                        <tr
                            key={order.orderID}
                            className={`border-b transition-colors duration-300 ${
                                expandedOrderID === order.orderID ? 'bg-blue-50' : 'hover:bg-gray-50'
                            }`}
                        >
                            <td className="py-3 px-4">{order.orderID}</td>
                            <td className="py-3 px-4">{new Date(order.orderDate).toLocaleDateString('en-CA')}</td>
                            <td className="py-3 px-4">{order.totalAmount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</td>
                            <td className="py-3 px-4">{order.orderStatus}</td>
                            <td className="py-3 px-4">{order.trackingNumber}</td>
                            <td className="py-3 px-4 text-center">
                                <button
                                    onClick={() => toggleOrderDetails(order.orderID)}
                                    className="px-4 py-2 rounded-md transition-colors duration-300 bg-green-500 hover:bg-green-600 text-white"
                                >
                                    {expandedOrderID === order.orderID ? 'Hide Details' : 'View Details'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {expandedOrderID && (
                <div className="mt-8 bg-gray-100 p-6 border rounded-lg shadow-md">
                    <CustomerOrderItem orderID={expandedOrderID} />
                </div>
            )}
        </div>
    );
};

export default CustomerOrderDetails;
