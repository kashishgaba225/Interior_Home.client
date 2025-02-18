import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { signupschema } from '../Validation/AllValidation';
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { TbPasswordFingerprint } from "react-icons/tb";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { APIURL } from '../../GlobalURL';
import { showErrorToast, showSuccessToast, showWarningToast } from '../React Toastify/ToastiNotificcation';

export default function SignIn() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '', confirmPassword: '' },
    validationSchema: signupschema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('password', values.password);
        if (selectedFile) {
          formData.append("profileimg", selectedFile);
        }

        const response = await axios.post(`${APIURL}create`, formData);
        const id = response.data.id;
        const email = response.data.data.email;

        if (response.data.msg === 'Email already verified. Please log in.') {
          showSuccessToast('Email already verified. Please log in.');
          navigate("/Login");
          localStorage.setItem('UserEMail', email);
        }

        if (response.status === 200 || response.status === 201) {
          showSuccessToast('User Login Successfully');
          navigate(`/otpverification/${id}`);
        } else {
          showWarningToast("Invalid data");
        }
      } catch (error) {
        console.error("Error", error);
        showErrorToast(error.response?.data?.msg || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const formFields = [
    { labelName: 'Name', name: 'name', placeholder: 'Enter Your Name...', type: 'text', logo: <MdOutlineDriveFileRenameOutline /> },
    { labelName: 'Email ID', name: 'email', placeholder: 'Enter Your Email...', type: 'text', logo: <MdOutlineMarkEmailUnread /> },
    { 
      labelName: 'Password', 
      name: 'password', 
      placeholder: 'Enter Your Password...', 
      type: passwordVisible ? 'text' : 'password', 
      logo: <TbPasswordFingerprint />, 
      passOpenLogo: <FaEye />, 
      passClose: <FaEyeSlash />, 
      toggleVisibility: () => setPasswordVisible(!passwordVisible) 
    },
    { 
      labelName: 'Confirm Password', 
      name: 'confirmPassword', 
      placeholder: 'Enter Your Confirm Password...', 
      type: confirmPasswordVisible ? 'text' : 'password', 
      logo: <RiLockPasswordFill />, 
      passOpenLogo: <FaEye />, 
      passClose: <FaEyeSlash />, 
      toggleVisibility: () => setConfirmPasswordVisible(!confirmPasswordVisible) 
    },
    {
      labelName: 'Upload Image', 
      name: 'profileimg', 
      placeholder: '', 
      type: 'file', 
      logo: null, 
      onChange: handleFileChange
    }
  ];

  return (
    <div className='flex justify-center h-screen items-center pb-2 bg-gradient-to-r from-purple-300 to-purple-500 animate-gradient'>
      <form onSubmit={formik.handleSubmit}
        className='flex flex-col gap-2 mt-[20px] bg-white px-12 py-8 rounded-lg shadow-2xl'
        encType="multipart/form-data"
      >
        <h1 className='text-3xl font-bold text-center text-purple-800'>Sign Up</h1>

        {formFields.map((field) => (
          <div key={field.name} className='mb-4'>
            <label htmlFor={field.name} className='block font-medium text-gray-700'>{field.labelName}</label>
            <div className='flex flex-col justify-center relative'>
              {field.logo && <div className='absolute ml-3'>{field.logo}</div>}

              {(field.name === 'password' || field.name === 'confirmPassword') && (
                <div onClick={field.toggleVisibility} className='absolute ml-[280px] cursor-pointer'>
                  {field.type === 'password' ? field.passOpenLogo : field.passClose}
                </div>
              )}

              <input
                className='pl-10 w-full p-2 border-2 border-purple-950 rounded-lg focus:border-purple-300 focus:ring focus:ring-purple-900'
                type={field.type}
                name={field.name}
                id={field.name}
                placeholder={field.placeholder}
                value={field.name !== 'profileimg' ? formik.values[field.name] : undefined}
                onChange={field.name === 'profileimg' ? field.onChange : formik.handleChange}
                onBlur={field.name !== 'profileimg' ? formik.handleBlur : undefined}
              />
            </div>
            {formik.errors[field.name] && formik.touched[field.name] && <p className='text-red-500 text-sm'>{formik.errors[field.name]}</p>}
          </div>
        ))}

        {preview && (
          <div className='mt-2 flex justify-center'>
            <img src={preview} alt="Preview" className='h-20 w-20 object-cover rounded-full shadow-lg' />
          </div>
        )}

        <button type="submit" className={`w-full p-3 rounded-lg transition-all flex items-center justify-center ${isloading ? "bg-purple-500 cursor-not-allowed" : "bg-purple-800 hover:bg-purple-700 text-white"}`}
          disabled={isloading}
        >
          {isloading ? (
            <>
              <svg className='animate-spin h-5 w-5 mr-2 border-4 border-white border-t-transparent rounded-full' viewBox='0 0 24 24'></svg>
              Uploading...
            </>
          ) : (
            "Sign Up"
          )}
        </button>

        <div className='mt-4 text-center'>
          <Link to="/Login" className='w-full block'>
            <button className='w-full p-3 border-2 border-purple-600 rounded-lg text-purple-600 hover:bg-purple-800 hover:text-white'>
              Log In
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}