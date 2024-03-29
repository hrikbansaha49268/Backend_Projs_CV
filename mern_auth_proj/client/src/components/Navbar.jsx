import { useEffect, useState } from "react";

const Navbar = () => {

    const [authBtn, setAuthBtn] = useState('');

    const logoutSession = () => {
        localStorage.removeItem('token');
        window.location.href = "/login";
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthBtn('Logout');
        } else {
            setAuthBtn('Login');
        }
    }, []);

    return (
        <div className="border-b-2 border-blue-700 mb-6">
            <nav className="flex justify-between w-3/4 mx-auto py-6 items-center text-blue-800">
                <h1 className="text-3xl font-light italic">
                    Quotes Manager
                </h1>
                <ul className="flex gap-x-4">
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/register">Register</a></li>
                    <li>{authBtn === "Login" ?
                        <a href="/dashboard" className="text-gray-500 text-opacity-35 cursor-default" onClick={e => e.preventDefault()}>Dashboard</a> :
                        <a href="/dashboard">Dashboard</a>}</li>
                    <li>{authBtn === 'Login' ? <a href="/login">{authBtn}</a> : <button onClick={logoutSession}>{authBtn}</button>}</li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar