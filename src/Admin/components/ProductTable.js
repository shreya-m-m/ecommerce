import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { deleteProduct, findProducts, updateProduct } from '../../state/Product/Action.js';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Card, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useLocation } from 'react-router-dom';

const ProductTable = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(store => store);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editProduct, setEditProduct] = useState(null);

    // Open the edit dialog and load the product details
    const handleEditOpen = (product) => {
        setEditProduct(product);
        setEditDialogOpen(true);
    };

    // Close the edit dialog without saving
    const handleEditClose = () => {
        setEditDialogOpen(false);
        setEditProduct(null);
    };

    // Handle input changes in the edit dialog
    const handleEditChange = (field, value) => {
        setEditProduct((prevProduct) => ({
            ...prevProduct,
            [field]: value,
        }));
    };

    const handleEditSave = async () => {
        console.log('Saving product:', editProduct);  // Ensure this has updated data
        if (editProduct) {
            await dispatch(updateProduct(editProduct.product_id, editProduct));
            const data = {
                category: "",
                colors: [],
                sizes: [],
                minPrice: 0,
                maxPrice: 100000,
                minDiscount: 0,
                sort: "price_low",
                pageNumber: 0,
                pageSize: 200,
            };
            dispatch(findProducts(data));  // Re-fetch updated list of products
        }
        handleEditClose();
    };


    // Handle product deletion
    const handleProductDelete = (productId) => {
        dispatch(deleteProduct(productId));

    };

    useEffect(() => {
        const data = {
            category: "",
            colors: [],
            sizes: [],
            minPrice: 0,
            maxPrice: 100000,
            minDiscount: 0,
            sort: "price_low",
            pageNumber: 0,
            pageSize: 200,
        };
        dispatch(findProducts(data));
    }, [dispatch]);

    return (
        <div className=" ">
            <Card
                className="mt-2"
                sx={{ position: "relative", bgcolor: "#242124", color: "white", maxHeight: "90vh" }} // Adjust maxHeight as needed
            >
                <CardHeader title="All Products" />
                <TableContainer component={Paper} sx={{ maxHeight: "75vh", overflow: "auto" }}>
                    <Table sx={{ minWidth: 100 }} aria-label="simple table" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ bgcolor: "#F5F5F5", color: "black" }}></TableCell>
                                <TableCell sx={{ bgcolor: "#F5F5F5", color: "black" }}>Product</TableCell>
                                <TableCell sx={{ bgcolor: "#F5F5F5", color: "black" }}>Product Id</TableCell>
                                <TableCell sx={{ bgcolor: "#F5F5F5", color: "black" }}>Category</TableCell>
                                <TableCell sx={{ bgcolor: "#F5F5F5", color: "black" }}>Price</TableCell>
                                <TableCell sx={{ bgcolor: "#F5F5F5", color: "black" }}>Quantity</TableCell>
                                <TableCell sx={{ bgcolor: "#F5F5F5", color: "black" }}></TableCell>
                                <TableCell sx={{ bgcolor: "#F5F5F5", color: "black" }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.products?.content?.map((item) => (
                                <TableRow key={item.product_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>
                                        <Avatar src={item.imageUrl}></Avatar>
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {item.title}
                                    </TableCell>
                                    <TableCell align="left">{item.product_id}</TableCell>
                                    <TableCell align="left">{item.category.name}</TableCell>
                                    <TableCell align="left">{item.price}</TableCell>
                                    <TableCell align="left">{item.quantity}</TableCell>
                                    <TableCell align="left">
                                        <Button onClick={() => handleEditOpen(item)} variant='outlined'>
                                            Edit
                                        </Button>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Button onClick={() => handleProductDelete(item.product_id)} variant='outlined' sx={{ mr: 1 }}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            {/* Edit Dialog */}
            <Dialog open={editDialogOpen} onClose={handleEditClose}>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Image URL"
                        type="text"
                        fullWidth
                        value={editProduct?.imageUrl || ''}
                        onChange={(e) => handleEditChange('imageUrl', e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Product Brand"
                        type="text"
                        fullWidth
                        value={editProduct?.brand || ''}
                        onChange={(e) => handleEditChange('brand', e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Product Name"
                        type="text"
                        fullWidth
                        value={editProduct?.title || ''}
                        onChange={(e) => handleEditChange('title', e.target.value)}
                    />
                    {/* <TextField
                        margin="dense"
                        label="Category"
                        type="text"
                        fullWidth
                        value={editProduct?.category?.name || ''}
                        onChange={(e) => handleEditChange('category', { ...editProduct.category, name: e.target.value })}
                    /> */}
                    <TextField
                        margin="dense"
                        label="Price"
                        type="number"
                        fullWidth
                        value={editProduct?.price || ''}
                        onChange={(e) => handleEditChange('price', e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Quantity"
                        type="number"
                        fullWidth
                        value={editProduct?.quantity || ''}
                        onChange={(e) => handleEditChange('quantity', e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Cancel</Button>
                    <Button onClick={handleEditSave} variant="contained" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ProductTable;
