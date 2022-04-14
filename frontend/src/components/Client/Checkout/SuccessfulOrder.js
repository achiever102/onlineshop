import React, {useContext} from 'react';

import AuthContext from "../../../context/AuthContext";

export default function SuccessfulOrder(){

    const { licensesFileUrl } = useContext(AuthContext);

    return (
        <div className='container bg-light text-center mt-5 p-5 border' style={{borderRadius: "10px"}}>
            <h3>Thank you! Your order was placed successfully</h3>
            <h4 className='mt-3'><b>Click <a href={licensesFileUrl} className="link-success">this link</a> to download your licenses</b></h4>
            <h4 className='mt-3'>You can also download you licenses anytime from Orders page</h4>
        </div>
    )

}