import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import "../css/login.css"
import loginBannerImg from "../assets/images/login/login-banner.png"
import appleImg from "../assets/images/login/apple.png"
import googleImg from "../assets/images/login/google.png"
import facebookImg from "../assets/images/login/facebook.png"


export default function Login() {
    return (
        <div className="login-page">
            <div className="left-login-banner">
                <Image src={loginBannerImg} alt="Login Banner" className='banner-image' fill priority/>
            </div>

            <div className="right-login-form">
                <h1 className="welcome-text">Welcome</h1>
                <div className="login-form">
                    <form action="">
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Please type your email here..." />
                        <br />
                        <br />
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Enter your password here..." />

                        <Link href="/forgot-password" className='forgot-password'>Forgot Password?</Link>
                        <button type="submit" className='login-btn'>Login</button>
                    </form>

                    <div className="or-divider">
                        <div className="line"></div>
                        <span>OR</span>
                        <div className="line"></div>
                    </div>

                    <div className="other-login-method">
                        <Image src={appleImg} alt="Apple" className='img-social' />
                        <Image src={googleImg} alt="Google" className='img-social' />
                        <Image src={facebookImg} alt="Facebook" className='img-social' />
                    </div>

                    <div className="signup-link">
                        <p>Don't have an account? <Link href="/signup" className='a'>Register here</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}