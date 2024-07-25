import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { LoginForm } from "../cmps/LoginForm.jsx";
import { login, signup } from '../store/actions/user.actions.js';


export function Login() {
    const [userInfo, setUserInfo] = useState('')
    const [isSignup, setIsSignup] = useState(false)
    const navigate = useNavigate()

    function handleChange({ target }) {
        let { value, type, name: field, checked } = target
        value = type === 'number' ? +value : value
        value = type === 'checkbox' ? checked : value
        setUserInfo(prevUser => ({ ...prevUser, [field]: value }))
    }

    async function onSubmit() {
        const { fullname, username, password, imgUrl } = userInfo
        const newUser = { username, password, imgUrl }

        if (isSignup) {
            newUser.fullname = fullname
        }

        try {
            const user = isSignup ? await signup(newUser) : await login(newUser)

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
                                    <h5>{isSignup ? 'Sign up to continue' : 'Log in to continue'}</h5>
                                </div>
                                <LoginForm onSubmit={onSubmit} handleChange={handleChange} setIsSignup={setIsSignup} isSignup={isSignup} />
                            </div>
                        </article>
                    </article>
                </section>
            </section>
        </section>
    )
}