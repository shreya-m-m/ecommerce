import React, { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../state/Product/Action';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography, TextField } from '@mui/material';
import './CreateProductForm.css';

const CreateProductForm = () => {
    const [productData, setProductData] = useState({
        imageUrl: '',
        brand: '',
        title: '',
        color: '',
        discountedPrice: '',
        price: '',
        discountPersent: '',
        size: [{ name: '', quantity: '' }],
        quantity: '',
        topLavelCategory: '',
        secondLavelCategory: '',
        thirdLavelCategory: '',
        description: '',
    });

    const dispatch = useDispatch();
    const token = localStorage.getItem("token");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSizeChange = (e, index) => {
        let { name, value } = e.target;
        name = name === "size_quantity" ? "quantity" : name;
        const sizes = [...productData.size];
        sizes[index][name] = value;
        setProductData((prevState) => ({ ...prevState, size: sizes }));
    };

    const addSize = () => {
        setProductData({
            ...productData,
            size: [...productData.size, { name: '', quantity: '' }]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createProduct(productData));
        console.log(productData);
    };

    const getThirdLevelCategories = () => {
        switch (productData.secondLavelCategory) {
            case "clothing":
                return [
                    { value: "women_top", label: "Top & T-Shirts" },
                    { value: "women_dress", label: "Dresses" },
                    { value: "women_kurtas", label: "Kurtas" },
                    { value: "women_jeans", label: "Jeans" },
                    { value: "women_saree", label: "Saree" },
                    { value: "women_lehenga", label: "Lehenga Choli" },
                    { value: "women_sweaters", label: "Sweatshirt & Jackets" },
                    { value: "women_gouns", label: "Gowns" },
                ];
            case "accessories":
                return [
                    { value: "women_watches", label: "Watches" },
                    { value: "women_bags", label: "Bags, Belts & Wallets" },
                    { value: "women_sunglasses", label: "Sunglasses & Hats" },
                ];
            case "footwear":
                return [
                    { value: "women_shoes", label: "Casual Shoes" },
                    { value: "women_heels", label: "Heels" },
                    { value: "women_flats", label: "Flats" },
                ];
            default:
                return [];
        }
    };

    return (
        <Fragment>
            <Typography variant='h3' className='heading'>
                Add New Product
            </Typography>
            <form onSubmit={handleSubmit} className='createProductContainer'>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Image URL"
                            name="imageUrl"
                            value={productData.imageUrl}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Brand"
                            name="brand"
                            value={productData.brand}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Title"
                            name="title"
                            value={productData.title}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Color"
                            name="color"
                            value={productData.color}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Price"
                            name="price"
                            value={productData.price}
                            onChange={handleChange}
                            type='number'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Discounted Price"
                            name="discountedPrice"
                            value={productData.discountedPrice}
                            onChange={handleChange}
                            type='number'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Discount Percent"
                            name="discountPersent"
                            value={productData.discountPersent}
                            onChange={handleChange}
                            type='number'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Quantity"
                            name="quantity"
                            value={productData.quantity}
                            onChange={handleChange}
                            type='number'
                        />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel>Top Level Category</InputLabel>
                            <Select
                                name="topLavelCategory"
                                value={productData.topLavelCategory}
                                onChange={handleChange}
                                label="Top Level Category"
                            >
                                <MenuItem value="women">Women</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    
                    <Grid item xs={6} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel>Second Level Category</InputLabel>
                            <Select
                                name="secondLavelCategory"
                                value={productData.secondLavelCategory}
                                onChange={handleChange}
                                label="Second Level Category"
                            >
                                <MenuItem value="clothing">Clothing</MenuItem>
                                <MenuItem value="accessories">Accessories</MenuItem>
                                <MenuItem value="footwear">Footwear</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel>Third Level Category</InputLabel>
                            <Select
                                name="thirdLavelCategory"
                                value={productData.thirdLavelCategory}
                                onChange={handleChange}
                                label="Third Level Category"
                            >
                                {getThirdLevelCategories().map((category) => (
                                    <MenuItem key={category.value} value={category.value}>
                                        {category.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {productData.size.map((size, index) => (
                        <Grid container item spacing={3} key={index}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Size Name"
                                    name="name"
                                    value={size.name}
                                    onChange={(event) => handleSizeChange(event, index)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Quantity"
                                    name="size_quantity"
                                    type="number"
                                    value={size.quantity}
                                    onChange={(event) => handleSizeChange(event, index)}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <Button
                            className="addButton"
                            onClick={addSize}
                        >
                            Add Size
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={productData.description}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            className="submitButton"
                            type="submit"
                        >
                            Add New Product
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Fragment>
    );
};

export default CreateProductForm;
