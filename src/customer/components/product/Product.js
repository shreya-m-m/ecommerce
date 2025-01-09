import React, { useEffect } from 'react';
import { useState } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { women_dress } from '../../../Data/clothing/women_dress'
import ProductCard from './ProductCard'
import { filters, singleFilter } from './FilterData'
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { FormControl, FormControlLabel, FormLabel, Pagination, Radio, RadioGroup } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { women_top } from '../../../Data/clothing/women_top';
import { Panorama } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { findProducts } from '../../../state/Product/Action';

const sortOptions = [
    { name: 'Price: Low to High', href: '#', current: false },
    { name: 'Price: High to Low', href: '#', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
function SliderValueLabel(props) {
    const { children, open } = props;
    return (
        <Typography
            component="span"
            variant="caption"
            color="textSecondary"
            sx={{
                fontWeight: 'bold',
                bgcolor: 'background.paper',
                borderRadius: 1,
                px: 1,
                py: 0.5,
                display: open ? 'block' : 'none'
            }}
        >
            {children}
        </Typography>
    );
}

export default function Product() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [priceRange, setPriceRange] = React.useState([
        singleFilter.find(section => section.id === 'price').slider.min,
        singleFilter.find(section => section.id === 'price').slider.max
    ]);
    const [selectedValue, setSelectedValue] = useState("");

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    const location = useLocation()
    const navigate = useNavigate();
    const param = useParams();
    const dispatch = useDispatch();
    const { products } = useSelector(store => store)

    const decodedQueryString = decodeURIComponent(location.search);
    const searchParams = new URLSearchParams(decodedQueryString);

    const colorValue = searchParams.get("color");
    const sizeValue = searchParams.get("size");
    const priceValue = searchParams.get("price");
    const discount = searchParams.get("discount");
    const sortValue = searchParams.get("sort");
    const pageNumber = searchParams.get("page") || 1;
    // Extract filters from the URL
    // const sizeFilter = searchParams.get('size');
    // const discountFilter = searchParams.get('minDiscount');

    // // Apply filters to your product list or display them in the UI
    // console.log('Size Filter:', sizeFilter);
    // console.log('Discount Filter:', discountFilter);



    const handleFilter = (value, sectionId) => {
        const searchParams = new URLSearchParams(location.search);
        let filterValue = searchParams.getAll(sectionId);

        // Handle discount as a range, split into min and max if needed
        if (sectionId === "minDiscount" && value.includes("-")) {
            const [minDiscount, maxDiscount] = value.split("-");
            searchParams.set("minDiscount", minDiscount);
            searchParams.set("maxDiscount", maxDiscount);
            console.log("Discount range set:", minDiscount, maxDiscount);
        } else {
            // Handle other filters normally
            if (filterValue.length > 0 && filterValue[0].split(",").includes(value)) {
                filterValue = filterValue[0].split(",").filter(item => item !== value);

                if (filterValue.length === 0) {
                    searchParams.delete(sectionId);
                    console.log("Deleted filter for ", sectionId);
                }
                console.log("Filter removed:", value, sectionId);
            } else {
                filterValue.push(value);
                console.log("Filter added:", value, sectionId);
            }

            if (filterValue.length > 0) {
                searchParams.set(sectionId, filterValue.join(","));
            }
        }

        const query = searchParams.toString();
        console.log("Updated query:", query); // For debugging the query
        navigate({ search: `?${query}` });
    };


    const handleSliderChange = (event, newValue) => {
        setPriceRange(newValue);
        const minPrice = newValue[0];
        const maxPrice = newValue[1];

        const searchParams = new URLSearchParams(location.search);

        // Create the price range string
        const priceRangeString = `${minPrice}-${maxPrice}`;

        // Update or add the price range parameter
        const currentPriceRange = searchParams.get('price');
        if (currentPriceRange !== priceRangeString) {
            searchParams.set('price', priceRangeString);
        } else {
            searchParams.delete('price');
        }

        const query = searchParams.toString();
        navigate({ search: `?${query}` });
    };


    const handleRadioFilterChange = (event, sectionId) => {
        const selectedValue = event.target.value;
        setSelectedValue(selectedValue);
    
        const searchParams = new URLSearchParams(location.search);
    
        // Handle discount range if the section is "minDiscount"
        if (sectionId === "minDiscount" && selectedValue.includes("-")) {
            const [minDiscount, maxDiscount] = selectedValue.split("-").map(Number);
            searchParams.set("minDiscount", minDiscount);
          
        } else {
            searchParams.set(sectionId, selectedValue);
        }
    
        const query = searchParams.toString();
        navigate({ search: `?${query}` });
    };


    const handlePanginationChange = (event, value) => {
        const searchParams = new URLSearchParams(location.search)
        searchParams.set("page", value);
        const query = searchParams.toString();
        navigate({ search: `${query}` })

    };
    useEffect(() => {
        const [minPrice, maxPrice] = priceValue === null ? [0, 10000] : priceValue.split("-").map(Number);

        const data = {
            category: param.lavelThree,
            colors: colorValue ? colorValue.split(",") : [],
            sizes: sizeValue ? sizeValue.split(",") : [],
            minPrice,
            maxPrice,
            minDiscount: discount || 0,
            sort: sortValue || "price",
            pageNumber: pageNumber - 1,
            pageSize: 5,
        };
        dispatch(findProducts(data));
        console.log("dispatching the data is done ", data);
    }, [param.lavelThree, colorValue, sizeValue, priceValue, discount, sortValue, pageNumber]);


    return (
        <div className="bg-white">
            <div>
                {/* Mobile filter dialog */}
                <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                    />

                    <div className="fixed inset-0 z-40 flex">
                        <DialogPanel
                            transition
                            className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
                        >
                            <div className="flex items-center justify-between px-4">
                                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                <button
                                    type="button"
                                    onClick={() => setMobileFiltersOpen(false)}
                                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                                </button>
                            </div>

                            {/* Filters */}
                            <form className="mt-4 border-t border-gray-200">
                                {filters.map((section) => (
                                    <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                                        <h3 className="-mx-2 -my-3 flow-root">
                                            <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                <span className="ml-6 flex items-center">
                                                    <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                                                    <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                                                </span>
                                            </DisclosureButton>
                                        </h3>
                                        <DisclosurePanel className="pt-6">
                                            <div className="space-y-6">
                                                {section.option.map((option, optionIdx) => (
                                                    <div key={option.value} className="flex items-center">

                                                        <input

                                                            defaultValue={option.value}
                                                            defaultChecked={option.checked}
                                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                                            name={`${section.id}[]`}
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                        <label
                                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                            className="ml-3 min-w-0 flex-1 text-gray-500"
                                                        >
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </DisclosurePanel>
                                    </Disclosure>
                                ))}
                            </form>
                        </DialogPanel>
                    </div>
                </Dialog>

                <main className="mx-auto px-4 sm:px-6 lg:px-20">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Sort
                                        <ChevronDownIcon
                                            aria-hidden="true"
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                        />
                                    </MenuButton>
                                </div>

                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <div className="py-1">
                                        {sortOptions.map((option) => (
                                            <MenuItem key={option.name}>
                                                <a
                                                    href={option.href}
                                                    className={classNames(
                                                        option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                        'block px-4 py-2 text-sm data-[focus]:bg-gray-100',
                                                    )}
                                                >
                                                    {option.name}
                                                </a>
                                            </MenuItem>
                                        ))}
                                    </div>
                                </MenuItems>
                            </Menu>

                            <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                                <span className="sr-only">View grid</span>
                                <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setMobileFiltersOpen(true)}
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">

                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                            <div>
                                <div className='py-10 flex justify-between items-center'>
                                    <h1 className='text-lg font-bold text-left'>Filters</h1>
                                    <FilterListIcon />
                                </div>
                                <form className="hidden lg:block">
                                    {filters.map((section) => (
                                        <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                                            <h3 className="-my-3 flow-root">
                                                <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                    <span className="font-medium text-gray-900">{section.name}</span>
                                                    <span className="ml-6 flex items-center">
                                                        <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                                                        <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                                                    </span>
                                                </DisclosureButton>
                                            </h3>
                                            <DisclosurePanel className="pt-6">
                                                <div className="space-y-4">
                                                    {section.option.map((option, optionIdx) => (
                                                        <div key={option.value} className="flex items-center">
                                                            <input
                                                                onChange={() => handleFilter(option.value, section.id)}
                                                                defaultValue={option.value}
                                                                defaultChecked={option.checked}
                                                                id={`filter-${section.id}-${optionIdx}`}
                                                                name={`${section.id}[]`}
                                                                type="checkbox"
                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                            />
                                                            <label htmlFor={`filter-${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
                                                                {option.label}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </DisclosurePanel>
                                        </Disclosure>
                                    ))}
                                    {singleFilter.map((section) => (
                                        <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                                            <h3 className="-my-3 flow-root">
                                                <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                    <span className="font-medium text-gray-900">{section.name}</span>
                                                    <span className="ml-6 flex items-center">
                                                        <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                                                        <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                                                    </span>
                                                </DisclosureButton>
                                            </h3>
                                            <DisclosurePanel className="pt-6">
                                                <div className="space-y-4">
                                                    {section.id === 'price' ? (
                                                        <div>
                                                            <Typography gutterBottom>{section.name}</Typography>
                                                            <Slider
                                                                value={priceRange}
                                                                onChange={handleSliderChange}
                                                                valueLabelDisplay="auto"
                                                                min={section.slider.min}
                                                                max={section.slider.max}
                                                                step={section.slider.step}
                                                                components={{ ValueLabel: SliderValueLabel }}
                                                            />
                                                            <Typography>
                                                                Selected range: ₹{priceRange[0]} - ₹{priceRange[1]}
                                                            </Typography>
                                                        </div>
                                                    ) : (
                                                        <FormControl component="fieldset">
                                                            <RadioGroup
                                                                name={section.id} 
                                                                value={selectedValue} 
                                                                onChange={(e) => handleRadioFilterChange(e, section.id)} 
                                                            >
                                                                {section.option.map((option, optionIdx) => (
                                                                    <FormControlLabel
                                                                        key={`${section.id}-${optionIdx}`} 
                                                                        value={option.value} 
                                                                        control={<Radio />} 
                                                                        label={option.label} 
                                                                    />
                                                                ))}
                                                            </RadioGroup>
                                                        </FormControl>

                                                    )}
                                                </div>
                                            </DisclosurePanel>
                                        </Disclosure>
                                    ))}



                                </form>
                            </div>

                            {/* Product grid */}
                            <div className="lg:col-span-4 w-full">
                                <div className='flex flex-wrap justify-center bg-white py-5 '>
                                    {products.products && products.products?.content?.map((item, index) => <ProductCard key={index} product={item} />)}
                                </div>

                            </div>
                        </div>
                    </section>

                    <section className='w-full px=[3.6rem]'>
                        <div className="px-4 py-5 flex justify-center">
                            <Pagination
                                count={products.products?.totalPages}
                                variant="outlined"
                                color="secondary"
                                onChange={handlePanginationChange}
                            />
                        </div>

                    </section>
                </main>
            </div>
        </div>
    )
}
