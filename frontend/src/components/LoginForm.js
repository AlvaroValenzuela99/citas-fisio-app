import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/citas/login', {
        username,
        password,
      });

      const token = response.data.token;
      localStorage.setItem('token', token);

      // Llama a la función handleLogin para actualizar el estado de autenticación en App.js
      handleLogin();

      // Navega a la ruta /admin después de una autenticación exitosa
      navigate('/admin');
    } catch (error) {
      setError('Error de autenticación');
    }
  };

  return (
    <div className='App'>
      <h2>Inicio de sesión</h2>
      <div className='container'>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleFormSubmit} className='formulario-login'>
            <label>
            Usuario:
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            </label>
            <br />
            <label>
            Contraseña:
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </label>
            <br />
            <button type="submit" className='boton-login'>Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;