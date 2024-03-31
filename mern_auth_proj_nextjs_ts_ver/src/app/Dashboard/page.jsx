import { decodeToken } from 'react-jwt';
import React, { useEffect, useState } from 'react';
import Quote from '@/components/Quote';

const Dashboard = () => {

    const [quotes, setQuote] = useState([]);
    const [tempQuote, setTempQuote] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = decodeToken(token);
            if (!user) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            } else {
                populateQuote();
            };
        } else {
            window.location.href = '/login';
        };
    }, []);

    async function populateQuote() {
        const req = await fetch(`http://localhost:${process.env.PORT}/api/quote`, {
            headers: { 'x-access-token': localStorage.getItem('token') },
        });
        const data = await req.json();
        if (data.status === 'ok') {
            setQuote([...data.quotes]);
        } else {
            alert(data.error);
        };
    };

    async function updateQuote(event) {
        event.preventDefault();
        const req = await fetch(`http://localhost:${process.env.PORT}/api/quote`, {
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
            quotes.push(tempQuote);
            setTempQuote('');
            populateQuote();
        } else {
            alert(data.error);
        };
    };

    return (
        <div className='flex flex-col justify-center w-full h-[80vh]'>
            <h1 className='text-5xl text-center flex justify-center items-center h-[20vh] uppercase font-extrabold tracking-wide font-serif text-blue-800'>
                Your quote
            </h1>
            <div className="grid grid-cols-3 w-3/4 mx-auto gap-6">
                {quotes.map((e, i) => <Quote key={i} quotedata={{ theQuote: e.quote, author: "You" }} />)}
            </div>
            <form className='flex justify-around items-center gap-x-8 h-1/2 w-3/4 mx-auto' onSubmit={updateQuote}>
                <input className='py-4 pl-4 outline-none border-b border-blue-600 placeholder:text-blue-600 focus:bg-blue-600 focus:bg-opacity-5 w-full h-fit'
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