"use client";
import { useState } from 'react';

function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function registerUser(event) {
        event.preventDefault();
        const resp = await fetch(`http://localhost:${process.env.PORT}/api/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await resp.json();
        console.log(data);

        // if (data.status === 'ok') {
        //     window.location.href = "/login"
        // }
    };

    return (
        <>
            <h1 className='text-5xl text-center flex justify-center items-center h-[20vh] uppercase font-extrabold tracking-wide font-serif text-blue-800'>
                Register
            </h1>
            <form className='flex flex-col py-6 w-1/2 mx-auto h-[50vh] justify-around' onSubmit={registerUser}>
                <input className='py-4 pl-4 outline-none border-b border-blue-600 placeholder:text-blue-600 focus:bg-blue-600 focus:bg-opacity-5'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type="text" name="name" id="name"
                    placeholder='Name' />
                <br />
                <input value={email} className='py-4 pl-4 outline-none border-b border-blue-600 placeholder:text-blue-600 focus:bg-blue-600 focus:bg-opacity-5'
                    onChange={e => setEmail(e.target.value)}
                    type="email" name="email"
                    id="email" placeholder='Email' />
                <br />
                <input value={password} className='py-4 pl-4 outline-none border-b border-blue-600 placeholder:text-blue-600 focus:bg-blue-600 focus:bg-opacity-5'
                    onChange={e => setPassword(e.target.value)}
                    type="password" name="password"
                    id="password" placeholder='Password' />
                <br />
                <input className='bg-blue-600 text-white w-1/4 h-12 self-center rounded-md cursor-pointer' type="submit" value="Register" />
            </form>
            <div className="flex w-1/2 mx-auto gap-x-6 justify-center mt-6">
                <p className='italic'>Already have an account?</p>
                <a href='/login' className='text-blue-800 underline'>Sign In</a>
            </div>
        </>
    );
};

export default Register;
