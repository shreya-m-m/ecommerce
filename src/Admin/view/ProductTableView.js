import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { deleteProduct, findProducts } from '../../state/Product/Action.js';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Card, CardHeader } from '@mui/material';



const ProductTableView = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(store => store)
    console.log("PRODUCTS...",products)

    useEffect(() => {
        
        const data = {
            category:"",
            colors: [],
            sizes: [],
            minPrice:0,
            maxPrice:100000,
            minDiscount: 0,
            sort: "price_low",
            pageNumber: 0,
            pageSize: 10,
        };
        dispatch(findProducts(data));
        console.log('Dispacting Dataaa',data)
    }, [products.deleteProduct]);

    return (
    
        <div className="p-10">
            <Card className='mt-2'sx={{position:"relative",bgcolor:"#242124",color:"white"}}>
              <CardHeader title="Recent Products" />
              <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell></TableCell>
            <TableCell>Product</TableCell>
            <TableCell align="left">Product Id</TableCell>
            <TableCell align="left">category</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Quantity</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {products.products?.content?.slice(0,5).map((item) => (
            <TableRow
              key={item.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                <Avatar
                    src={item.imageUrl} >
                    </Avatar>
                 </TableCell>
              <TableCell component="th" scope="row">
                {item.title}
              </TableCell>
              <TableCell align="left">{item.product_id}</TableCell>
              <TableCell align="left">{item.category.name}</TableCell>
              <TableCell align="left">{item.price}</TableCell>
              <TableCell align="left">{item.quantity}</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Card>
    
        </div>
    );
};

export default ProductTableView;
