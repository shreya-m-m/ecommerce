import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { confirmOrder, deleteOrder, deliverOrder, getOrder, shipOrder } from '../../state/Admin/Order/Action';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { Avatar, AvatarGroup, Button, Card, CardHeader } from '@mui/material';

const OrdersTableView = () => {
  const [anchorEl, setAnchorEl] = React.useState([]);
  const open = Boolean(anchorEl);

  const handleClick = (event, index) => {
    const newAnchorELArray=[...anchorEl];
    newAnchorELArray[index]=event.currentTarget;
    setAnchorEl(newAnchorELArray);
  };
  const handleClose = (index) => {
    const newAnchorELArray=[...anchorEl];
    newAnchorELArray[index]=null
    setAnchorEl(newAnchorELArray);
  };
    const dispatch=useDispatch();

    const {adminOrder} = useSelector(store=>store)
    const {products} = useSelector(store => store)
    
    useEffect(() =>{
      
        dispatch(getOrder());
    }, [adminOrder.confirmed,adminOrder.delivered,adminOrder.shipped,adminOrder.deleteOrders]);
    console.log("Admin Orders",adminOrder)

    
    return(
        <div className="p-10 ">
            <Card className='mt-2'sx={{position:"relative",bgcolor:"#242124",color:"white"}}>
              <CardHeader title="Recent Orders" />
              <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
          
            <TableCell>Order Id</TableCell>
            <TableCell align="left">Product</TableCell>
            <TableCell align="left">Product Name</TableCell>
            <TableCell align="left">MRP Price</TableCell>
            <TableCell align="left">Total Price</TableCell>
            <TableCell align="left">Total Items</TableCell>
            <TableCell align="left">Order Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {adminOrder.orders?.slice(0,5).map((item,index) => (
            console.log("items......".item),
            <TableRow
              key={item.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell align="left">{item.order_id}</TableCell>
              <TableCell >
                <AvatarGroup  sx={{justifyContent:"start"}}>
                  {item.orderItem.map((orderItem)=> <Avatar
                    src={orderItem.product.imageUrl} >
                    </Avatar>
                  )}
                </AvatarGroup>
                
                 </TableCell>
              <TableCell component="th" scope="row">
              {item.orderItem.map((orderItem)=> <p>
                    {orderItem.product.title} 
                    </p>
                  )}
              </TableCell>
             
              <TableCell align="left">{item.totalPrice}</TableCell>
              <TableCell align="left">{item.totalDiscountedPrice}</TableCell>
              <TableCell align="left">{item.totalItem}</TableCell>
                <TableCell align="left">
                  <span
                    className={`${item.orderStatus === "CONFIRMED" ? "bg-green-500" :
                        item.orderStatus === "SHIPPED" ? "bg-blue-500" :
                          item.orderStatus === "PENDING" ? "bg-yellow-500" :
                            item.orderStatus === "DELIVERED" ? "bg-green-300" :
                              item.orderStatus === "CANCELED" ? "bg-red-500" :
                              item.orderStatus === "PLACED" ? "bg-green-800" :
                                ""
                      } text-white px-2 py-1 rounded`}
                  >
                    {item.orderStatus}
                  </span>
                </TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Card>
    
        </div>


    )
} 
export default OrdersTableView