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

const OrdersTable = () => {
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

    const handleShippedOrder=(orderId)=>{
      dispatch(shipOrder(orderId))
      handleClose()
    }
    const handleConfirmedOrder=(orderId)=>{
      dispatch(confirmOrder(orderId))
      handleClose()
    }
    const handleDeliveredOrder=(orderId)=>{
      dispatch(deliverOrder(orderId))
      handleClose()
    }
    
    const handleDeleteOrder=(orderId)=>{
      dispatch(deleteOrder(orderId))
      
    }
    return(
        <div className=" ">
           <Card
                className="mt-2"
                sx={{ position: "relative", bgcolor: "#242124", color: "white", maxHeight: "90vh" }} // Adjust maxHeight as needed
            >
                <CardHeader title="All Users" />
                <TableContainer component={Paper} sx={{ maxHeight: "75vh", overflow: "auto" }}>
                    <Table sx={{ minWidth: 100 }} aria-label="simple table" stickyHeader>
                        <TableHead>
                            <TableRow>
          
            <TableCell sx={{ bgcolor: "#F5F5F5", color: "black" }}>Order Id</TableCell>
            <TableCell sx={{ bgcolor: "#F5F5F5", color: "black" }}>Product</TableCell>
            <TableCell sx={{ bgcolor: "#F5F5F5", color: "black" }}>Product Name</TableCell>
            <TableCell sx={{ bgcolor: "#F5F5F5", color: "black" }}>MRP Price</TableCell>
            <TableCell sx={{ bgcolor: "#F5F5F5", color: "black" }}>Total Price</TableCell>
            <TableCell sx={{ bgcolor: "#F5F5F5", color: "black" }}>Total Items</TableCell>
            <TableCell sx={{ bgcolor: "#F5F5F5", color: "black" }}>Order Status</TableCell>
            <TableCell sx={{ bgcolor: "#F5F5F5", color: "black" }}></TableCell>
            <TableCell sx={{ bgcolor: "#F5F5F5", color: "black" }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {adminOrder.orders?.map((item,index) => (
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
              <TableCell align="left">
              <Button
        id="basic-button"
        aria-controls={`basic-menu-${item.order_id}`}
        aria-haspopup="true"
        aria-expanded={Boolean(anchorEl[index])}
        onClick={(event) => handleClick(event,index)}
       
      >
        Status
      </Button>
      <Menu
        id={`basic-menu-${item.order_id}`}
        anchorEl={anchorEl[index]}
        open={Boolean(anchorEl[index])}
        onClose={() =>handleClose(index)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=> handleConfirmedOrder(item.order_id)}>Comfirmed</MenuItem>
        <MenuItem onClick={()=> handleShippedOrder(item.order_id)}>Shipped</MenuItem>
        <MenuItem onClick={()=> handleDeliveredOrder(item.order_id)}>Delivered</MenuItem>
      </Menu>
              </TableCell>
              <TableCell align="left">
                <Button onClick={()=>handleDeleteOrder(item.order_id)}>
                  Delete
                </Button>
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
export default OrdersTable