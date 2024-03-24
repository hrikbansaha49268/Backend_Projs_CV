import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Register() {

  const history = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function registerUser(event) {
    event.preventDefault();
    const resp = await fetch('http://localhost:8080/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await resp.json();

    if (data.status === 'ok') {
      history('/login', { replace: true });
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          type="text" name="name" id="name"
          placeholder='Name' />
        <br />
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
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
