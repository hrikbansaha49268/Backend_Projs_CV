import { decodeToken } from 'react-jwt';
import { useNavigation } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

const Dashboard = () => {

    const history = useNavigation();
    const [quote, setQuote] = useState('');
    const [tempQuote, setTempQuote] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = decodeToken(token);
            if (!user) {
                localStorage.removeItem('token');
                history('/login', { replace: true });
            } else {
                populateQuote();
            };
        } else {
            window.location.href = '/login';
        };
    }, []);

    async function populateQuote() {
        const req = await fetch('http://localhost:8080/api/quote', {
            headers: { 'x-access-token': localStorage.getItem('token') },
        });
        const data = await req.json();
        if (data.status === 'ok') {
            setQuote(data.quote);
        } else {
            alert(data.error);
        };
    };


    async function updateQuote(event) {
        event.preventDefault();
        const req = await fetch('http://localhost:8080/api/quote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                quote: tempQuote,
            }),
        });
        const data = await req.json();
        if (data.status === 'ok') {
            setQuote(tempQuote);
            setTempQuote('');
        } else {
            alert(data.error);
        };
    };

    const logoutSession = () => {
        localStorage.removeItem('token');
        window.location.href = "/login";
    };

    return (
        <div className='flex flex-col justify-center w-full h-screen'>
            <h1 className='text-5xl text-center flex justify-center items-center h-[20vh] uppercase font-extrabold tracking-wide font-serif text-blue-800'>
                Your quote
            </h1>
            <h1 className='text-center italic'>
                {quote || 'No quote found'}
            </h1>
            <button className='bg-blue-600 absolute left-4 top-4 text-white px-6 py-2 self-center rounded-md' onClick={logoutSession}>Logout</button>
            <form className='flex flex-col justify-around h-1/2 w-1/3 mx-auto' onSubmit={updateQuote}>
                <input className='py-4 pl-4 outline-none border-b border-blue-600 placeholder:text-blue-600 focus:bg-blue-600 focus:bg-opacity-5'
                    type="text"
                    placeholder="Quote"
                    value={tempQuote}
                    onChange={(e) => setTempQuote(e.target.value)}
                />
                <input className='bg-yellow-600 text-white w-1/4 h-12 self-center rounded-md cursor-pointer'
                    type="submit" value="Update quote" />
            </form>
        </div>
    );
};

export default Dashboard;