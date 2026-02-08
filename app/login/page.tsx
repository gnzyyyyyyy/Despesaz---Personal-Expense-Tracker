"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import "../login/login.css"
import loginBannerImg from "../../public/login/login-banner.png"
import appleImg from "../../public/login/apple.png"
import googleImg from "../../public/login/google.png"
import facebookImg from "../../public/login/facebook.png"


export default function Login() {
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (email === "admin@despesaz.com" && password === "despesaz123") {
            router.push("/dashboard")
        } else {
            setError("Invalid email or password")
        }
    }
    return (
        <div className="login-page">
            <div className="left-login-banner">
                <Image src={loginBannerImg} alt="Login Banner" className='banner-image' fill priority/>
            </div>

            <div className="right-login-form">
                <h1 className="welcome-text">Welcome</h1>
                <div className="login-form">
                    <form onSubmit={handleLogin}>
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Please type your email here..." value={email} onChange={(e) => setEmail(e.target.value)} />
                        <br />
                        <br />
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Enter your password here..." value={password} onChange={(e) => setPassword(e.target.value)} />

                        <Link href="/forgot-password" className='forgot-password'>Forgot Password?</Link>
                        
                        {error && (
                            <p style={{ color: "red", fontSize: "12px", marginTop: "10px" }}>
                                {error}
                            </p>
                        )}

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