import React, { useState, useContext } from 'react';
import UserAuthContext from '../../context/UserAuthContext';
import Animation from '../animations/animation';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const { email, password } = values;
  const { login, signInWithGoogle } = useContext(UserAuthContext);
  const { push } = useHistory();

  //Tomar valores de formularios
  const hanldeChange = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // login
  const handleSubmit = (e) => {
    e.preventDefault();

    login(email, password)
      .then(() => {
        Swal.fire({
          text: 'Bienvenidx 🤩',
          icon: 'success',
        });
        push('/');
      })
      .catch((err) =>
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        }),
      );
  };

  const handleGoogle = (e) => {
    e.preventDefault();
    signInWithGoogle();
    push('/');
  };
  return (
    <div
      className='container d-flex align-items-center justify-content-space'
      style={{ minHeight: '100vh' }}
    >
      <div className='row d-flex align-items-center justify-content-space'>
        <div className='col'>
          <Animation />
        </div>
        <div className='col' style={{ maxWidth: '500px' }}>
          <h2 className='text-center mb-4 font-weight-bold'>Log in 🛸</h2>
          <form className='p-0' onSubmit={handleSubmit}>
            <div className='form-group mb-2'>
              <label>Email</label>
              <input
                type='email'
                className='form-control'
                placeholder='Ingrese su email'
                name='email'
                value={email}
                onChange={hanldeChange}
              />
            </div>
            <div className='form-group mb-2'>
              <label>Password</label>
              <input
                type='password'
                className='form-control'
                placeholder='Ingrese su password'
                name='password'
                value={password}
                onChange={hanldeChange}
              />
            </div>
            <button
              type='submit'
              className='btn btn-primary font-weight-bold text-uppercase d-block w-100 mt-4'
            >
              Log in
            </button>
          </form>
          <button
            type='submit'
            className='btn btn-secondary  font-weight-bold text-uppercase d-block w-100  mt-4'
            onClick={handleGoogle}
          >
            Log in with Google
          </button>
          <small className='text-center mt-3'>
            No tenes cuenta?
            <Link to='/signup'>Sign up</Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
