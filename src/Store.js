import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findProducts } from './state/Product/Action';
import ProductCard from './customer/components/product/ProductCard';

const Store = () => {
  const { products, loading } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = {
      category: '',
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 100000,
      minDiscount: 0,
      sort: 'price_low',
      pageNumber: 0,
      pageSize: 200,
    };
    dispatch(findProducts(data));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className=" flex flex-col justify-center px-5 lg:px-10">
      <div className="w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 ">Shop Our Latest Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
          {products.products?.content?.map((item, index) => (
            <ProductCard key={index} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Store;
