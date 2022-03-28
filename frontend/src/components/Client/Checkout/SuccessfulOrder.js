import React, {useContext} from 'react';
import {useNavigate} from 'react-router-dom';

import AuthContext from "../../../context/AuthContext";

export default function SuccessfulOrder(){

    const navigate = useNavigate();

    const displayOrderDetails = () => {
        navigate(`/clientOrders/${orderId}`);
    }

    const { orderId } = useContext(AuthContext);

    return (
        <div className='container bg-light text-center mt-5 p-5 border' style={{borderRadius: "10px"}}>
            <h3>Thank you! Your order was placed successfully</h3>
            <h4 className='mt-3'><b>Order ID:</b> <u onClick={displayOrderDetails} style={{cursor: "pointer"}}>{orderId}</u></h4>
        </div>
    )

}