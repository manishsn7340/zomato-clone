import React, { useContext, useEffect } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url, token } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        const response = await axios.post(
            url + "/api/order/verify",
            { success: success === "true", orderId },
            { headers: { token, "Content-Type": "application/json" } }
        );

        console.log("Frontend sending:", { success, orderId });
        console.log("Backend responded:", response.data);

        await new Promise(r => setTimeout(r, 500));

        if (response.data.success || response.data.success == "true") {
            navigate("/myorders");
        } else {
            navigate("/");
        }
    };

    useEffect(() => {
        (async () => {
            await verifyPayment();
        })();
    }, []);

    return (
        <div className='verify'>
            <div className="spinner"></div>
        </div>
    );
};

export default Verify;
