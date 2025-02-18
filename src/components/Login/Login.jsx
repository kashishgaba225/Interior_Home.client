import React, { useState } from 'react'
import { LogInschema } from '../Validation/AllValidation';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import login from '../../assets/log.webp'
import { TbPasswordFingerprint } from "react-icons/tb";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { APIURL } from '../../GlobalURL';
import axios from "axios"
import {showErrorToast,showSuccessToast,showWarningToast} from '../React Toastify/ToastiNotificcation'


export default function Login() {

  const [isloading, setIsLoading] = useState(false);

  const navigate = useNavigate();



  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: LogInschema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {

        console.log('first')
        
        const response = await axios.post(`${APIURL}userLogin`, values);

        if (response.status === 200 ) {

          const UserToken = response.data.UserToken
          const userId = response.data.userid

          localStorage.setItem('UserToken',UserToken)
          localStorage.setItem('userId',userId)

          showSuccessToast('User Login Successfully')
          navigate('/');

        } 
        else showWarningToast("Invalid data")
        
      } catch (error) {
        showErrorToast(error.response?.data?.msg || "An eerro occurred")
      } finally {
        setIsLoading(false);
      }
    },
  });


  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-300 to-purple-400'>

      <form onSubmit={handleSubmit}
        className='flex bg-white p-7 py-12 mt-[100px] rounded-lg shadow-lg drop-shadow-2xl '>

        <div className='flex flex-col gap-2 p-5 justify-center w-1/2'>

          <h1 className='text-3xl font-bold mb-4 text-purple-950'>Welcome</h1>

          {[
            { labelName: 'Email ID', name: 'email', placeholder: 'Enter your email...', type: 'text', logo: <MdOutlineMarkEmailUnread /> },
            { labelName: 'Password', name: 'password', placeholder: 'Enter your password...', type: 'password', logo: <TbPasswordFingerprint /> },
          ].map((item, key) => (
            <div className='flex flex-col gap-2 font-semibold' key={key}>
              <label htmlFor={item.name}>{item.labelName}</label>
              <input className='flex border p-2 rounded-sm' type={item.type} autoComplete='off' name={item.name} id={item.name} value={values[item.name]}
                placeholder={item.placeholder} onChange={handleChange} onBlur={handleBlur} />

              {errors[item.name] && touched[item.name] && (
                <p className='text-red-500 text-sm mt-1'>{errors[item.name]}</p>
              )}
            </div>
          ))}

          <button className='border bg-purple-950 text-white p-2 rounded-md mt-4' type='submit'>Log In</button>

          <button className='border bg-purple-950 text-white p-2 rounded-md mt-4'>
            <Link to='/singup'>Sign Up</Link></button>
        </div>

        <div className='ml-8 hidden md:flex'>
          <img className='h-[400px] w-[500px] rounded-lg' src={login} alt="" />
        </div>

      </form>



    </div>
  )
}



