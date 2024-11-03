

import React, { useState, useEffect } from 'react';
import { apiClient } from '../../common/Axios/auth';
import SellerProductItem from './SellerProductItem.jsx'; // Component to display product details

const SellerProductDetails = ({ sellerID }) => {
    const [sellerProducts, setSellerProducts] = useState([]);
    const [visibleProductID, setVisibleProductID] = useState(null); // State to track the visible product
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        fetchSellerProducts();
    }, [sellerID]);

    const fetchSellerProducts = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get(`/Seller/products/${sellerID}`);
            setSellerProducts(response.data.$values);
        } catch (error) {
            setError('Error fetching seller products.');
            console.error('Error fetching seller products:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading products...</div>; // Loading message
    if (error) return <div>{error}</div>; // Error message

    const toggleProductDetails = (productID) => {
        setVisibleProductID((prevID) => (prevID === productID ? null : productID)); // Toggle visibility
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Seller Product List</h2>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="py-2 px-4 text-left">Product ID</th>
                        <th className="py-2 px-4 text-left">Product Name</th>
                        <th className="py-2 px-4 text-left">Price</th>
                        <th className="py-2 px-4 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sellerProducts.map((product) => (
                        <React.Fragment key={product.productID}>
                            <tr className="border-b hover:bg-gray-50">
                                <td className="py-2 px-4">{product.productID}</td>
                                <td className="py-2 px-4">{product.productName}</td>
                                <td className="py-2 px-4">₹{product.price.toFixed(2)}</td>
                                <td className="py-2 px-4">
                                    <button
                                        onClick={() => toggleProductDetails(product.productID)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                    >
                                        {visibleProductID === product.productID ? 'Hide Details' : 'View Product Details'}
                                    </button>
                                </td>
                            </tr>
                            {visibleProductID === product.productID && ( // Nested product details
                                <tr>
                                    <td colSpan="4">
                                        <SellerProductItem productID={product.productID} />
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SellerProductDetails;
