import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { registerRoute } from '../utils/ApiRoutes';
const Register = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const toastOptions = {
        position: 'bottom-right',
        autoClose: 800,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
    };
    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate('/');
        }
    }, []);
    const handleValidation = () => {
        const { password, confirmPassword, username, email } = values;
        if (password !== confirmPassword) {
            toast.error('Passwords are not matched to each other!', toastOptions);
            return false;
        } else if (username.length < 3) {
            toast.error('Username should be greater than 3 charactors!', toastOptions);
            return false;
        } else if (password.length < 8) {
            toast.error('Password should be equal or greater than 8 Characters', toastOptions);
            return false;
        } else if (email === '') {
            toast.error('Email is required!', toastOptions);
            return false;
        } else {
            return true;
        }
    };

    const handleSubmit = async (e) => {
        console.log(e);
        e.preventDefault();
        if (handleValidation()) {
            const { password, confirmPassword, username, email } = values;
            console.log(values);
            const { data } = await axios.post(registerRoute, { email, password, username });
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }
            if (data.status === true) {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user));
                navigate('/');
            }
            console.log(data);
        } else {
        }
    };

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };
    return (
        <>
            <FormContainer>
                <form onSubmit={handleSubmit}>
                    <div className='brand'>
                        {/* <img src='' alt='' /> */}
                        <h1>chattr</h1>
                    </div>
                    <input type='text' placeholder='Username' name='username' onChange={handleChange} />
                    <input type='email' placeholder='Email' name='email' onChange={handleChange} />
                    <input type='password' placeholder='Password' name='password' onChange={handleChange} />
                    <input type='password' placeholder='Confirm Password' name='confirmPassword' onChange={handleChange} />

                    <button type='submit'>Create User</button>
                    <span>
                        Already have and account? <Link to='/login'>Login</Link>
                    </span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    );
};

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img {
            height: 5rem;
        }
        h1 {
            color: white;
            text-transform: uppercase;
        }
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;
    }
    input {
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid #4e0eff;
        border-radius: 0.4rem;
        color: white;
        width: 100%;
        font-size: 1rem;
        &:focus {
            border: 0.1rem solid #997af0;
            outline: none;
        }
    }
`;

export default Register;
