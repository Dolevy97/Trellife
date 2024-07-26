import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom"
import { LoginForm } from "../cmps/LoginForm.jsx";
import { login, signup } from '../store/actions/user.actions.js';
import { cloudinaryService } from '../services/cloudinary.service.js';


export function Auth() {
    const path = window.location.pathname
    const isSignup = path.split('/').pop()
    // const [isSignup, setIsSignup] = useState(false)

    const [userInfo, setUserInfo] = useState('')
    const [uploadedImage, setUploadedImage] = useState(null)
    const navigate = useNavigate()

    function handleChange({ target }) {
        let { value, type, name: field, checked } = target
        value = type === 'number' ? +value : value
        value = type === 'checkbox' ? checked : value
        setUserInfo(prevUser => ({ ...prevUser, [field]: value }))
    }

    async function onSubmit() {
        const { fullname, username, password } = userInfo

        const newUser = { username, password }

        if (isSignup) {
            newUser.fullname = fullname
            newUser.imgUrl = uploadedImage
        }

        try {
            const user = isSignup === 'signup' ? await signup(newUser) : await login(newUser)

            if (user) {
                navigate('/board')
            } else {
                console.error('User info is not valid')
            }
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    async function onUploadImg({ target }) {
        const file = target.files[0]
        const url = await cloudinaryService.uploadImg(file)
        return setUploadedImage(url)
    }

    return (
        <section className="login">
            <section className="login-outer-container">
                <section className="login-inner-container">
                    <article className="login-innermost-container">
                        <article className="black-box-container">
                            <div className="login-signup-container">
                                <div className="login-header">
                                    <div className='logo-container'>
                                        <img className='logo-icon' src='../../../src/assets/imgs/icons/trello-logo.svg' alt='logo' />
                                        <span className='logo-text'>Trellife</span>
                                    </div>
                                    <h5>{isSignup === 'signup' ? 'Sign up to continue' : 'Log in to continue'}</h5>
                                </div>
                                <LoginForm onSubmit={onSubmit} handleChange={handleChange} isSignup={isSignup} onUploadImg={onUploadImg} uploadedImage={uploadedImage} />
                            </div>
                        </article>
                    </article>
                </section>
            </section>
        </section>
    )
}