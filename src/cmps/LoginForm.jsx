import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';

const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .required(`Enter your username`),
    password: Yup.string()
        .required('Enter your password'),
})



export function LoginForm({ onSubmit, handleChange, isSignup, onUploadImg, uploadedImage }) {
    const navigate = useNavigate()

    return (
        <div className="login-container">
            <Formik
                enableReinitialize
                initialValues={{
                    username: '',
                    password: '',
                    fullname: ''
                }}
                validationSchema={SignupSchema}
                onSubmit={onSubmit}>
                {({ errors, touched }) => (
                    <Form className='auth-form' onChange={handleChange}>
                        <Field name="username" placeholder="Enter your username" />
                        {errors.username && touched.username && (
                            <div>{errors.username}</div>
                        )}
                        <Field name="password" type="password" placeholder="Enter password" />
                        {errors.password && touched.password && (
                            <div>{errors.password}</div>
                        )}
                        {isSignup === 'signup' && <Field name="fullname" type="fullname" placeholder="Enter your full name" />}
                        {errors.fullname && touched.fullname && (
                            <div>{errors.fullname}</div>
                        )}
                        {isSignup === 'signup' && <div className="profile-pic-container">
                            <input
                                type="file"
                                id="profile-pic"
                                accept="image/*"
                                onChange={onUploadImg}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="profile-pic" className="profile-pic-label">
                                {uploadedImage ? (
                                    <img src={uploadedImage} alt="Profile" className="profile-pic-preview" />
                                ) : (
                                    <span>Upload Profile Picture</span>
                                )}
                            </label>
                        </div>}
                        <button type="submit">{isSignup === 'signup' ? 'Sign up' : 'Continue'}</button>
                    </Form>
                )}
            </Formik>
            <p onClick={() => navigate(isSignup === 'signup' ? '/login' : '/signup', { replace: true })}>{isSignup === 'signup' ? 'Already have a Trellife account? Log in' : 'Create an account'}</p>
        </div>
    )
}