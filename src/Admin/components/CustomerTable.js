import React, { useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import { Avatar, Button, Card, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, getUser } from '../../state/Auth/Action';
const CustomerTable = () => {
    const dispatch = useDispatch();
    const { auth } = useSelector(store => store);
    const token = localStorage.getItem('token');

    console.log("Auth User ", auth)
    useEffect(() => {
        dispatch(getAllUsers(token));
    }, [dispatch, token]);

    return (
        <div>
            <Card
                className="mt-2"
                sx={{ position: "relative", bgcolor: "#242124", color: "white", maxHeight: "90vh" }} // Adjust maxHeight as needed
            >
                <CardHeader title="All Users" />
                <TableContainer component={Paper} sx={{ maxHeight: "75vh", overflow: "auto" }}>
                    <Table sx={{ minWidth: 100 }} aria-label="simple table" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ bgcolor: "#F5F5F5", color: "black" }}>User Id</TableCell>
                                <TableCell sx={{ bgcolor: "#F5F5F5", color: "black" }}>Name</TableCell>
                                <TableCell sx={{ bgcolor: "#F5F5F5", color: "black" }}>Email</TableCell>
                                <TableCell sx={{ bgcolor: "#F5F5F5", color: "black" }}>Phone Number</TableCell>
                                <TableCell sx={{ bgcolor: "#F5F5F5", color: "black" }}>Address</TableCell>
                                {/* <TableCell sx={{ bgcolor: "#F5F5F5", color: "black" }}>Quantity</TableCell>
                                <TableCell sx={{ bgcolor: "#F5F5F5", color: "black" }}></TableCell>
                                <TableCell sx={{ bgcolor: "#F5F5F5", color: "black" }}></TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {auth.users?.map((item) => (
                                <TableRow key={item.user_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="left">{item.user_id}</TableCell>
                                    <TableCell align="left">{item.firstname} {item.lastname} </TableCell>
                                    <TableCell align="left">{item.email}</TableCell>
                                    <TableCell align="left">{item.phone_number}</TableCell>
                                    <TableCell align="left">{item.address[0]?.streetname} {item.address[0]?.city} {item.address[0]?.state} {item.address[0]?.zipcode}</TableCell>
                                    

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

        </div>


    )
}
export default CustomerTable