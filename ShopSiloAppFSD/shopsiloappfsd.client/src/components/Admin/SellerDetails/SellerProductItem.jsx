// import React, { useState, useEffect } from 'react';
// import { apiClient } from '../../common/Axios/auth';

// const SellerProductItem = ({ productID }) => {
//     const [product, setProduct] = useState(null);

//     useEffect(() => {
//         fetchProductDetails();
//     }, [productID]);

//     const fetchProductDetails = async () => {
//         try {
//             const response = await apiClient.get(`/Product/${productID}`); // Adjust the endpoint as necessary
//             setProduct(response.data);
//         } catch (error) {
//             console.error('Error fetching product details:', error);
//         }
//     };

//     if (!product) return <div>Loading...</div>;

//     return (
//         <div className="border p-4 mt-4">
//             <h3 className="text-2xl font-bold">{product.productName}</h3>
//             <p><strong>Price:</strong> ₹{product.price.toFixed(2)}</p>
//             <p><strong>Description:</strong> {product.description}</p>
//             <p><strong>Stock Quantity :</strong> {product.stockQuantity}</p>
//             {/* Add more product details as necessary */}
//         </div>
//     );
// };

// export default SellerProductItem;

import React, { useState, useEffect } from 'react';
import { apiClient } from '../../common/Axios/auth';

const SellerProductItem = ({ productID }) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        fetchProductDetails();
    }, [productID]);

    const fetchProductDetails = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get(`/Product/${productID}`); // Adjust the endpoint as necessary
            setProduct(response.data);
        } catch (error) {
            setError('Error fetching product details.');
            console.error('Error fetching product details:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading product details...</div>; // Loading message
    if (error) return <div>{error}</div>; // Error message
    if (!product) return null; // Return nothing if product is not loaded yet

    return (
        <div className="border p-4 mt-4">
            <h3 className="text-2xl font-bold">{product.productName}</h3>
            <p><strong>Price:</strong> ₹{product.price.toFixed(2)}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Stock Quantity:</strong> {product.stockQuantity}</p>
            {/* Add more product details as necessary */}
        </div>
    );
};

export default SellerProductItem;
