import React, { useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const history = useNavigate();

    populateQuote = async () => {
        const resp = await fetch('http://localhost:8080/api/quote', {
            headers: { 'x-access-token': localStorage.getItem('token') }
        });
        const data = await resp.json();
        console.log(data);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = jwt.decode(token);
            if (!user) {
                localStorage.removeItem('token');
                history('/login', { replace: true });
            } else {
                populateQuote();
            }
        };
    }, []);

    return (
        <div>Dashboard</div>
    );
};

export default Dashboard;