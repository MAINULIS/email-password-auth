import React, { useState } from 'react';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth'
import app from '../firebase/firebase.config';

const auth = getAuth(app);

const Register = () => {
    const [error, setError] = useState ('');
    const [success, setSuccess] =useState('');

    const handleSubmit = (event) =>{
        // 1. prevent page refresh 
        event.preventDefault();
        setSuccess('');
        setError('');
        // 2. get data from form
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password)
        // Validation
        if(! /(?=.*[A-Z])/.test(password)){
            setError('please add at least 1 uppercase');
            return;
        }
        else if(!/(?=.*\d.*\d.*\d)/.test(password)){
            setError('please add at least 3 digit')
            return;
        }
        else if(password.length < 6){
            setError('password should be greater than six')
            return
        }
        
        // 3. create user in firebase
        createUserWithEmailAndPassword(auth, email,password)
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser);
            setError('')
            event.target.reset();
            setSuccess('user has been successfully sign up')
        })
        .catch(error =>{
            console.error(error.message);
            setError(error.message)
        })
    }

    const handleEmailChange = (event) =>{
    //    console.log(event.target.value)
    //    setEmail(event.target.value)
    }
   
    const handlePasswordBlur = (event) =>{
        // console.log(event.target.value)
    }
    return (
        <div className='my-container  text-center mt-4'>
            <h3 className='text-3xl tracking-wide font-bold mb-5'>Please Register</h3>

            <form onSubmit={handleSubmit} className='p-4'>
               <input onChange={handleEmailChange} className='border border-gray-500 px-2 ' type="email" name="email" id=" email" placeholder='Your Email' required />
               <br />
               <input onBlur={handlePasswordBlur} className='border border-gray-500 px-2 mt-4' type="password" name="password" id="password" placeholder='Your Password' required />
               <br />
               <p className='text-red-500'>{error}</p>
               <p className='text-blue-600'>{success}</p>
               <input className='border rounded font-medium bg-fuchsia-400 hover:bg-fuchsia-500 mt-5 border-gray-500 px-4 py-1' type="submit" value="Register" />
            </form>
        </div>
    );
};

export default Register;