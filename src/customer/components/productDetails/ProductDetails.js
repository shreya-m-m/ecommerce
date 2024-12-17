import { useEffect, useState } from 'react'
import { Radio, RadioGroup } from '@headlessui/react'
import Rating from '@mui/material/Rating';
import { Box, Button, Grid, LinearProgress } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ProductReviewCard from './ProductReviewCard';
import { women_dress } from '../../../Data/clothing/women_dress';
import HomeSetionCard from '../homeSectionCard/HomeSectionCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findProductById } from '../../../state/Product/Action';
import { addItemToCart } from '../../../state/Cart/Action';
import { addItemToWishlist } from '../../../state/Wishlist/Action';
import { getProductReviews } from '../../../state/Review/Action';
import { getProductRatings } from '../../../state/Ratings/Action';
import ReviewRatingForm from './ReviewRatingForm';
import AddIcon from '@mui/icons-material/Add';
const product = {

    highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
    ],
    details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {

    const [selectedSize, setSelectedSize] = useState("")
    const navigate = useNavigate();
    const param = useParams();
    const token = localStorage.getItem("token")
    const dispatch = useDispatch();
    const { products } = useSelector(store => store)
    const { reviews } = useSelector(store => store)
    console.log("Reviews in Store:", reviews);

    const { ratings } = useSelector(store => store)
    console.log("Ratings in Store:", ratings);

    console.log("Param.....", param);
    const [sizes, setSizes] = useState([]);

    const [openForm, setOpenForm] = useState(false);
    // const currentProduct = products.product;

    // console.log("Current Product ")


    useEffect(() => {
        const productId = param.productId;
        dispatch(getProductReviews(productId, token))
        console.log("products.product.product_id", productId)
        console.log("Reviews Data", reviews)
    }, []
    )

    useEffect(() => {
        const productId = param.productId;
        dispatch(getProductRatings(productId, token))
        console.log("products.product.product_id", productId)
        console.log("Ratingssss Data", reviews)
    }, []
    )
    // Define sizes for clothing and footwear
    const getSizeOptions = (categoryName, subCategoryName) => {
        console.log("Category Name:", categoryName, "Subcategory Name:", subCategoryName);

        switch (categoryName) {
            case 'clothing ':
                switch (subCategoryName) {
                    case 'women_jeans':
                        return [
                            { name: '26', inStock: true },
                            { name: '28', inStock: true },
                            { name: '30', inStock: true },
                            { name: '32', inStock: true },
                            { name: '34', inStock: false },
                            { name: '36', inStock: true },
                        ];
                    case 'women_saree':
                        return []; // No sizes required for saree
                    case 'women_lehenga':
                        return [
                            { name: 'Semi-stitched', inStock: true },
                            { name: 'Un-stitched', inStock: true },
                        ];
                    default:
                        return [
                            { name: 'XS', inStock: false },
                            { name: 'S', inStock: true },
                            { name: 'M', inStock: true },
                            { name: 'L', inStock: true },
                            { name: 'XL', inStock: true },
                        ];
                }
            case 'footwear':
                return [
                    { name: '5', inStock: true },
                    { name: '6', inStock: true },
                    { name: '7', inStock: true },
                    { name: '8', inStock: true },
                ];
            default:
                return [];
        }
    };
    useEffect(() => {
        const categoryName = products.product?.category?.parentCategory?.name;
        const subCategoryName = products.product?.category?.name;

        const sizeOptions = getSizeOptions(categoryName, subCategoryName);
        setSizes(sizeOptions);
        console.log("Size Options:", sizeOptions);
    }, [products.product]);
    const handleAddToBag = () => {
        const data = { productId: param.productId, size: selectedSize.name }
        console.log("Cart Data...", data)
        dispatch(addItemToCart(data))
        navigate("/cart")

    }
    const handleWishlist = () => {

        const data = { productId: param.productId, size: selectedSize.name }

        console.log("Wishlist Data...", data)
        dispatch(addItemToWishlist(data))
        navigate("/wishlist")

    }
    useEffect(() => {
        const data = { productId: param.productId }
        dispatch(findProductById(data))

    }, [param.productId])
    const averageRating = ratings.ratings?.reduce((total, item) => total + item.rating, 0) / ratings.ratings?.length || 0;

    const handleOpenForm = () => setOpenForm(true);
    const handleCloseForm = () => setOpenForm(false);

    return (
        <div className="bg-white lg:px-20">
            <div className="pt-6">
                <nav aria-label="Breadcrumb">
                    <ol
                        role="list"
                        className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
                    >
                        {products.product?.category?.parentCategory?.parentCategory && (
                            <li key="grandparent">
                                <div className="flex items-center">
                                    <a
                                        href="#"
                                        className="mr-2 text-sm font-medium text-gray-900"
                                    >
                                        {products.product.category.parentCategory.parentCategory.name}
                                    </a>
                                    <svg
                                        fill="currentColor"
                                        width={16}
                                        height={20}
                                        viewBox="0 0 16 20"
                                        aria-hidden="true"
                                        className="h-5 w-4 text-gray-300"
                                    >
                                        <path d="/women/clothing/women_top" />
                                    </svg>
                                </div>
                            </li>
                        )}
                        {products.product?.category?.parentCategory && (
                            <li key="parent">
                                <div className="flex items-center">
                                    <a
                                        href="#"
                                        className="mr-2 text-sm font-medium text-gray-900"
                                    >
                                        {products.product.category.parentCategory.name}
                                    </a>
                                    <svg
                                        fill="currentColor"
                                        width={16}
                                        height={20}
                                        viewBox="0 0 16 20"
                                        aria-hidden="true"
                                        className="h-5 w-4 text-gray-300"
                                    >
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                    </svg>
                                </div>
                            </li>
                        )}
                        {products.product?.category && (
                            <li key="current">
                                <div className="flex items-center">
                                    <a
                                        href="#"
                                        className="mr-2 text-sm font-medium text-gray-900"
                                    >
                                        {products.product.category.name}
                                    </a>
                                    <svg
                                        fill="currentColor"
                                        width={16}
                                        height={20}
                                        viewBox="0 0 16 20"
                                        aria-hidden="true"
                                        className="h-5 w-4 text-gray-300"
                                    >
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                    </svg>
                                </div>
                            </li>
                        )}
                        {/* Render the current product name */}
                        <li className="text-sm">
                            <a
                                href={products.product?.href || "#"}
                                aria-current="page"
                                className="font-medium text-gray-500 hover:text-gray-600"
                            >
                                {products.product?.name}
                            </a>
                        </li>
                    </ol>
                </nav>

                <section className='grid grid-cols-1 lg:grid-cols-2 px-4 pt-10'>

                    {/* Image gallery */}
                    <div className="flex flex-col item-center">
                        <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
                            <img
                                alt={products.product?.imageUrl}
                                src={products.product?.imageUrl}   // this is working check from here 
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="flex flex-wrap space-x-5 justify-center">
                            {products.product?.imageUrl && (
                                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] mt-4">
                                    <img
                                        alt="Product Image"
                                        src={products.product.imageUrl}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                            )}
                        </div>


                    </div>


                    {/* Product info */}
                    <div className="lg:col-span-1 max-auto max-w-2xl px-4 pb-16 sn:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
                        <div className="lg:col-span-2 ">
                            <h1 className="text-lg lg:text-xl font-semibold text-gray-900 text-left">{products.product?.brand}</h1>
                            <h1 className='text-lg lg:text-xl text-gray-900 text-left pt-1'>{products.product?.title}</h1>
                        </div>

                        {/* Options */}
                        <div className="lg:row-span-3 mt-1">
                            <h2 className="sr-only">Product information</h2>
                            <div className='flex space-x-2 item-center text-lg lg:text-xl text-gray-900 mt-6'>
                                <p className="font-semibold">₹{products.product?.discountedPrice}</p>
                                <p className="opacity-50 line-through">₹{products.product?.price}</p>
                                <p className="text-green-600 font-semibold">{products.product?.discountPersent}% off</p>

                            </div>

                            {/* Reviews */}
                            <div className="mt-2">
                                <div className='flex item-center space-x-3'>
                                    <Rating value={averageRating} precision={0.5} readOnly />
                                    <p className='opacity-60'>{ratings.ratings?.length || 0} Ratings</p>
                                    <p className='ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500'>{reviews.reviews?.length || 0} Reviews</p>

                                </div>
                            </div>

                            <form className="mt-4">

                                {/* Sizes */}
                                <div className="mt-2">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                    </div>

                                    <fieldset aria-label="Choose a size" className="mt-4">
                                        <RadioGroup
                                            value={selectedSize}
                                            onChange={setSelectedSize}
                                            className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                                        >
                                            {sizes.map((size) => (
                                                <Radio
                                                    key={size.name}
                                                    value={size}
                                                    disabled={!size.inStock}
                                                    className={classNames(
                                                        size.inStock
                                                            ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                                            : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                                        'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6'
                                                    )}
                                                >
                                                    <span>{size.name}</span>
                                                    {size.inStock ? (
                                                        <span
                                                            aria-hidden="true"
                                                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                                                        />
                                                    ) : (
                                                        <span
                                                            aria-hidden="true"
                                                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                        >
                                                            <svg
                                                                stroke="currentColor"
                                                                viewBox="0 0 100 100"
                                                                preserveAspectRatio="none"
                                                                className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                            >
                                                                <line
                                                                    x1={0}
                                                                    x2={100}
                                                                    y1={100}
                                                                    y2={0}
                                                                    vectorEffect="non-scaling-stroke"
                                                                />
                                                            </svg>
                                                        </span>
                                                    )}
                                                </Radio>
                                            ))}
                                        </RadioGroup>
                                    </fieldset>
                                </div>

                                <div className="mt-4" style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                                    <Button onClick={handleAddToBag} variant="contained" sx={{ px: '2rem', py: '1rem', backgroundColor: '#E30B5C' }} startIcon={<ShoppingBagIcon />} >
                                        Add to Bag
                                    </Button>
                                    <Button onClick={handleWishlist} variant="contained" sx={{ px: '2rem', py: '1rem', backgroundColor: '#9155fd' }} startIcon={<FavoriteIcon />} >
                                        WishList
                                    </Button>
                                </div>

                            </form>
                        </div>

                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                            {/* Description and details */}
                            {/* <div>
                                <h3 className="sr-only">Description</h3>

                                <div className="space-y-6">
                                    <p className="text-base text-gray-900">{products.product?.description}</p>
                                </div>
                            </div> */}

                            <div className="mt-10">
                                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                                <div className="mt-1">
                                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                        {product.highlights.map((highlight) => (
                                            <li key={highlight} className="text-gray-400">
                                                <span className="text-gray-600">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                                <div className="mt-1 space-y-6">
                                    <p className="text-sm text-gray-600">{products.product?.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Rating and reviews */}
                <section className='mt-2'>
                    <h1 className='font-semibold text-lg pb-4 text-left '>Customer Reviews</h1>

                    <div className="border p-5">
                        <Grid container spacing={7}>
                            <Grid item xs={7}>
                                <div className="space-y-5">
                                    {reviews.reviews?.map((item) => (
                                        <ProductReviewCard item={item} />
                                    ))}
                                </div>
                            </Grid>


                            <Grid item xs={5} >
                                <Grid container justifyContent="flex-end" alignItems="flex-start">
                                    <Button
                                        color="primary"
                                        onClick={handleOpenForm}
                                        startIcon={<AddIcon />}
                                        sx={{
                                            backgroundColor: 'transparent',
                                            color: 'primary.main',
                                            borderRadius: '50%',
                                            padding: '8px',
                                            minWidth: 'auto',
                                            boxShadow: 'none',
                                        }}
                                    >

                                    </Button>
                                </Grid>
                                <h1 className='text-xl font-semibold pb-2 text-left'>Ratings</h1>
                                <div className='flex item-center space-x-3'>

                                    <Rating value={averageRating} precision={0.5} readOnly />
                                    <p className='opacity-60'>{ratings.ratings?.length || 0} Ratings</p>
                                </div>


                                <Box className="mt-5 space-y-3">

                                    {(() => {
                                        const categoryCounts = {
                                            Excellent: 0,
                                            VeryGood: 0,
                                            Good: 0,
                                            Average: 0,
                                            Poor: 0
                                        };


                                        ratings.ratings?.forEach(item => {
                                            const { rating } = item;


                                            if (rating >= 4.5) {
                                                categoryCounts.Excellent++;
                                            } else if (rating >= 3.5) {
                                                categoryCounts.VeryGood++;
                                            } else if (rating >= 2.5) {
                                                categoryCounts.Good++;
                                            } else if (rating >= 1.5) {
                                                categoryCounts.Average++;
                                            } else {
                                                categoryCounts.Poor++;
                                            }
                                        });

                                        // Get total ratings count
                                        const totalRatings = ratings.ratings?.length || 0;


                                        return ['Excellent', 'VeryGood', 'Good', 'Average', 'Poor'].map(label => {
                                            // Calculate the percentage for each category
                                            const percentage = totalRatings > 0 ? (categoryCounts[label] / totalRatings) * 100 : 0;


                                            const color = label === 'Excellent' ? 'success' :
                                                label === 'VeryGood' ? 'success' :
                                                    label === 'Good' ? 'secondary' :
                                                        label === 'Average' ? 'warning' : 'error';

                                            return (
                                                <Grid container alignItems="center" gap={1} key={label}>
                                                    <Grid item xs={2}>
                                                        <p className='opacity-60 text-left'>{label}</p>
                                                    </Grid>
                                                    <Grid item xs={7} container alignItems="center" spacing={1}>
                                                        {/* LinearProgress for the bar */}
                                                        <Grid item xs={9}>
                                                            <LinearProgress
                                                                sx={{
                                                                    bgcolor: "#d0d0d0",
                                                                    borderRadius: 4,
                                                                    height: 7
                                                                }}
                                                                variant="determinate"
                                                                value={percentage}
                                                                color={color}
                                                            />
                                                        </Grid>
                                                        {/* Percentage Text */}
                                                        <Grid item xs={3} container justifyContent="flex-start">
                                                            <p className="text-left opacity-60">{`${percentage.toFixed(1)}%`}</p>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                            );
                                        });
                                    })()}
                                </Box>
                            </Grid>

                        </Grid>

                    </div>
                    <ReviewRatingForm
                        productId={param.productId}
                        open={openForm}
                        onClose={handleCloseForm}
                    />
                </section>
                {/* Similar Products */}
                <section className='pt-10'>
            <h1 className='py-5 text-xl font-bold text-left'>More Products</h1>
            <div className='flex flex-wrap gap-5'>
                {/* Filter products from the Redux store based on the current product's category */}
                {women_dress.map((item) => (
                        <HomeSetionCard product={item} /> // Render similar products
                    ))}
            </div>
        </section>





            </div>
        </div>
    )
}
