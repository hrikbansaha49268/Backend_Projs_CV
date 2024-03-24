import { useState } from 'react';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function loginUser(event) {
        event.preventDefault();
        const resp = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const resp2 = await resp.json();
        if (resp2.user) {
            alert("Login Succesful");
            window.location.href = "/dashboard";
        } else {
            alert("Please check your username and password");
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={loginUser}>
                <input value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email" name="email"
                    id="email" placeholder='Email' />
                <br />
                <input value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password" name="password"
                    id="password" placeholder='password' />
                <br />
                <input type="submit" value="Login" />
            </form>
        </div>
    );
}

export default Login;
