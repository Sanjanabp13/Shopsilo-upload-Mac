﻿
// import React, { useState, useEffect } from 'react';
// import { apiClient } from '../../common/Axios/auth';
// import ProductForm from './ProductForm';
// import SelectDropdownwithchild from './SelectDropdownwithchild';
// import Pagination from '@mui/material/Pagination';

// const AdminProductList = () => {
//     const [products, setProducts] = useState([]);
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState('');
    
//     const [categories, setCategories] = useState([]);
//     const [showProductList, setShowProductList] = useState(true);
//     const [productID, setProductID] = useState(undefined);
//     const [reviews, setReviews] = useState({});

//     // Pagination state
//     const [currentPage, setCurrentPage] = useState(1);
//     const [pageSize] = useState(5); // Set number of products per page

//     useEffect(() => {
//         fetchProducts();
//         fetchCategories();
//     }, []);

//     useEffect(() => {
//         filterProducts();
//     }, [products, searchTerm, selectedCategory]);

//     const fetchProducts = async () => {
//         try {
//             const response = await apiClient.get('/Product');
//             setProducts(response.data.$values);
//             setFilteredProducts(response.data.$values);
//             response.data.$values.forEach(product => fetchProductReviews(product.productID));
//         } catch (error) {
//             console.error('Error fetching products:', error);
//         }
//     };

//     const fetchCategories = async () => {
//         try {
//             const response = await apiClient.get('/Categories/names');
//             const allCategories = response.data.$values;

//             // Create a map for parent categories
//             const parentCategories = allCategories
//                 // .filter(item => !item.parentCategoryId) // Filter out parent categories
//                 .map(item => ({
//                     categoryID: item.categoryID,
//                     categoryName: item.categoryName,
//                     child: item.subCategories.$values//(sub => sub.parentCategoryId === item.categoryId) // Find child categories
//                 }));

//             setCategories(parentCategories); // Set the structured categories
//         } catch (error) {
//             console.error('Error fetching categories:', error);
//         }
//     };

//     const fetchProductReviews = async (productId) => {
//         try {
//             const response = await apiClient.get(`/ProductReview/Product/${productId}`);
//             setReviews(prevReviews => ({ ...prevReviews, [productId]: response.data.reviews.$values }));
//         } catch (error) {
//             console.error(`Error fetching reviews for product ${productId}:`, error);
//         }
//     };

//     const onClose = async () => {
//         setProductID(undefined);
//         setShowProductList(true);
//         await fetchProducts(); // Refresh products after closing the form
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm('Are you sure you want to delete this product?')) {
//             try {
//                 await apiClient.delete(`/Product/${id}`);
//                 fetchProducts();
//             } catch (error) {
//                 console.error('Error deleting product:', error);
//             }
//         }
//     };

//     const handleProductUpdated = async () => {
//         await fetchProducts(); // Fetch products to update the list dynamically
//     };

//     const getAverageRating = (productReviews) => {
//         if (!productReviews || productReviews.length === 0) return 'No ratings';
//         const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
//         return (totalRating / productReviews.length).toFixed(1);
//     };

//     const filterProducts = () => {
//         const filtered = products.filter((product) => {
//             const matchesCategory = selectedCategory ? product.categoryID === Number(selectedCategory) : true;
//             const matchesSearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase());
//             return matchesCategory && matchesSearch;
//         });
//         setFilteredProducts(filtered);
//         setCurrentPage(1); // Reset to the first page whenever filters change
//     };

//     const handleChange = (event, value) => {
//         setCurrentPage(value);
//     };

//     const indexOfLastProduct = currentPage * pageSize;
//     const indexOfFirstProduct = indexOfLastProduct - pageSize;
//     const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
//     const totalPages = Math.ceil(filteredProducts.length / pageSize);

//     return (
//         <div className="container mx-auto px-4 py-6">
//             {showProductList && (
//                 <div>
//                     <h2 className="text-2xl font-bold mb-4">Product List</h2>
//                     <div className="flex justify-between mb-4">
//                         <button onClick={() => { setShowProductList(false); setProductID(undefined); }} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add New Product</button>
//                         <div className="flex">
//                             <SelectDropdownwithchild 
//                                 data={categories} 
//                                 onSelect={(value) => setSelectedCategory(value)} 
//                                 title={"All Categories"} 
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Search products..."
//                                 className="border rounded p-2 ml-2"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                             />
//                         </div>
//                     </div>

//                     <div className="space-y-4">
//                         {currentProducts.map((product) => (
//                             <div key={product.productID} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex items-center">
//                                 <div className="w-1/3">
//                                     <img src={product.imageURL} alt={product.productName} className="w-full h-auto object-cover" />
//                                 </div>

//                                 <div className="p-6 w-2/3">
//                                     <h3 className="text-lg font-semibold mb-1">{product.productName}</h3>
//                                     <p className="text-gray-700 mb-2">₹{product.price.toFixed(2)}</p>
//                                     <p className="text-gray-600 mb-2">Stock: {product.stockQuantity}</p>
//                                     <p className="text-gray-500 mb-2">Category: {product.categoryName}</p>
//                                     <p className="text-yellow-500 mb-2">Rating: {getAverageRating(reviews[product.productID])}</p>
//                                     {reviews[product.productID] && reviews[product.productID].map(review => (
//                                         <div key={review.reviewID} className="mt-2">
//                                             <p className="text-gray-800">{review.reviewText}</p>
//                                             <p className="text-sm text-gray-600">- {review.userID}, {new Date(review.reviewDate).toLocaleDateString()}</p>
//                                         </div>
//                                     ))}
//                                     <div className="flex justify-end mt-4">
//                                         <button onClick={() => { setShowProductList(false); setProductID(product.productID); }} className="text-blue-500 hover:underline mr-4">Edit</button>
//                                         <button onClick={() => handleDelete(product.productID)} className="text-red-500 hover:underline">Delete</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     <div className="flex justify-center mt-4">
//                         <Pagination
//                             count={totalPages}
//                             page={currentPage}
//                             onChange={handleChange}
//                             color="primary"
//                             showFirstButton
//                             showLastButton
//                         />
//                     </div>
//                 </div>
//             )}
//             {!showProductList && (
//                 <ProductForm
//                     id={productID}
//                     onClose={onClose}
//                     onProductUpdated={handleProductUpdated}
//                 />
//             )}
//         </div>
//     );
// };

// export default AdminProductList;



import React, { useState, useEffect } from 'react';
import { apiClient } from '../../common/Axios/auth';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ProductForm from './ProductForm';
import SelectDropdown from './SelectDropdown';
import Pagination from '@mui/material/Pagination';
import { useNavigate } from 'react-router-dom';

const AdminProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [showProductList, setShowProductList] = useState(true);
    const [productID, setProductID] = useState(undefined);
    const [reviews, setReviews] = useState({});
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5); // Set number of products per page

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    useEffect(() => {
        filterProducts();
    }, [products, searchTerm, selectedCategory]);

    const fetchProducts = async () => {
        try {
            const response = await apiClient.get('/Product');
            setProducts(response.data.$values);
            console.log(response.data.$values);
            setFilteredProducts(response.data.$values);
            //response.data.$values.forEach(product => fetchProductReviews(product.productID));
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await apiClient.get('/Categories/names');
            const fetchedCategories = response.data.$values.map(d => ({ id: d.categoryID, name: d.categoryName }));
            setCategories(fetchedCategories);
            console.log('Fetched categories:', fetchedCategories);  // Ensure this logs the correct data
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    //const fetchProductReviews = async (productId) => {
    //    try {
    //        const response = await apiClient.get(/ProductReview/Product/${productId});
    //        setReviews(prevReviews => ({ ...prevReviews, [productId]: response.data.reviews.$values }));
    //    } catch (error) {
    //        console.error(Error fetching reviews for product ${productId}:, error);
    //    }
    //};

    const onClose = async () => {
        setProductID(undefined);
        setShowProductList(true);
        await fetchProducts(); // Refresh products after closing the form
    };

    const handleDelete = async (id) => {
        try {
            await apiClient.delete(`/Product/${id}`);
            fetchProducts();
            setOpen(false);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleProductUpdated = async () => {
        await fetchProducts(); // Fetch products to update the list dynamically
    };

    const handleEditClick = (productId) => {
        // Navigate to the edit product page with the selected productId
        navigate(`/admin/editproduct/${productId}`);
    };

    const getAverageRating = (productReviews) => {
        if (!productReviews || productReviews.length === 0) return 'No ratings';
        const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
        return (totalRating / productReviews.length).toFixed(1);
    };

    // Function to handle filtering logic
    const filterProducts = () => {
        const filtered = products.filter((product) => {
            const matchesCategory = selectedCategory ? product.categoryID === Number(selectedCategory) : true;
            const matchesSearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
        setFilteredProducts(filtered);
        setCurrentPage(1); // Reset to the first page whenever filters change
    };

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    //// Pagination logic
    const indexOfLastProduct = currentPage * pageSize;
    const indexOfFirstProduct = indexOfLastProduct - pageSize;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / pageSize);

    return (
        <div className="container mx-auto px-4 py-6">
            {showProductList && (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Product List</h2>
                    <div className="flex justify-between mb-4">
                        <button onClick={() => { setShowProductList(false); setProductID(undefined); }} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add New Product</button>
                        <div className="flex">
                            <SelectDropdown data={categories} onSelect={setSelectedCategory} title={"All Categories"} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="border rounded p-2 ml-2"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        {currentProducts.map((product) => (
                            <div key={product.productID} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex items-center">
                                {/* Left: Product Image */}
                                <div className="w-1/3">
                                    <img src={product.imageURL} alt={product.productName} className="w-full h-auto object-cover" />
                                </div>

                                {/* Right: Product Details */}
                                <div className="p-6 w-2/3">
                                    <h3 className="text-lg font-semibold mb-1">{product.productName}</h3>
                                    <p className="text-gray-700 mb-2">₹{product.price.toFixed(2)}</p>
                                    <p className="text-gray-600 mb-2">Stock: {product.stockQuantity}</p>
                                    <p className="text-gray-500 mb-2">Category: {product.categoryName}</p>
                                    <p className="text-yellow-500 mb-2">Rating: {getAverageRating(reviews[product.productID])}</p>

                                    {/* Reviews */}
                                    {reviews[product.productID] && reviews[product.productID].map(review => (
                                        <div key={review.reviewID} className="mt-2">
                                            <p className="text-gray-800">{review.reviewText}</p>
                                            <p className="text-sm text-gray-600">- {review.userID}, {new Date(review.reviewDate).toLocaleDateString()}</p>
                                        </div>
                                    ))}

                                    {/* Edit and Delete Buttons */}
                                    <div className="flex justify-end mt-4">
                                        <Button variant="outlined" onClick={() => handleEditClick(product.productID)} sx={{ backgroundColor: '#00BCD4', color: 'white', border: '#00BCD4', marginRight: 2, '&:hover': { backgroundColor: '#03A9F4' } }}>
                                            Edit
                                        </Button>
                                        <React.Fragment>
                                            <Button variant="outlined" onClick={handleClickOpen} sx={{ backgroundColor: '#c92029', color: 'white', border: '#c92029', '&:hover': { backgroundColor: 'red' } }}>
                                                Delete
                                            </Button>
                                            <Dialog
                                                fullScreen={fullScreen}
                                                open={open}
                                                onClose={handleClose}
                                                BackdropProps={{
                                                    style: { backgroundColor: 'rgba(0, 0, 0, 0.3)' }  // Set desired transparency here
                                                }}
                                                aria-labelledby="responsive-dialog-title"
                                            >
                                            <DialogTitle id="responsive-dialog-title">
                                                {"Are your sure you want to delete this product?"}
                                            </DialogTitle>
                                            <DialogContent>
                                                <DialogContentText>
                                                    You won't be able to recover the deleted product details forever.
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button autoFocus onClick={handleClose}>
                                                    Cancel
                                                </Button>
                                                <Button onClick={() => handleDelete(product.productID)} autoFocus>
                                                    Delete
                                                </Button>
                                            </DialogActions>
                                            </Dialog>
                                        </React.Fragment>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-4">
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handleChange}
                            color="primary"
                            showFirstButton
                            showLastButton
                        />
                    </div>
                </div>
            )}

            {!showProductList && (
                <ProductForm
                    id={productID}
                    onClose={onClose}
                    onProductUpdated={handleProductUpdated} // Pass the callback function
                />
            )}
        </div>
    );
};

export default AdminProductList;