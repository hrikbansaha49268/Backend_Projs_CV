"use client";
import { useState } from 'react'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function loginUser(event) {
        event.preventDefault();
        const response = await fetch(`http://localhost:${process.env.PORT}/api/login `, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })

        const data = await response.json()

        if (data.user) {
            localStorage.setItem('token', data.user);
            alert('Login successful');
            window.location.href = '/dashboard';
        } else {
            alert('Please check your username and password');
        };
    };

    return (
        <>
            <h1 className='text-5xl text-center flex justify-center items-center h-[20vh] uppercase font-extrabold tracking-wide font-serif text-blue-800'>
                Login
            </h1>
            <form className='flex flex-col py-6 w-1/2 mx-auto h-[50vh] justify-around' onSubmit={loginUser}>
                <input
                    className='py-4 pl-4 outline-none border-b border-blue-600 placeholder:text-blue-600 focus:bg-blue-600 focus:bg-opacity-5'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                />
                <br />
                <input
                    className='py-4 pl-4 outline-none border-b border-blue-600 placeholder:text-blue-600 focus:bg-blue-600 focus:bg-opacity-5'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                />
                <br />
                <input className='bg-blue-600 text-white w-1/4 h-12 self-center rounded-md cursor-pointer'
                    type="submit" value="Login" />
                <div className="flex w-1/2 mx-auto gap-x-6 justify-center mt-6">
                    <p className='italic'>Don't have an account?</p>
                    <a href='/register' className='text-blue-800 underline'>Create One</a>
                </div>
            </form>
        </>
    )
}

export default Login;