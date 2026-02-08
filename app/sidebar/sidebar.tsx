"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import "../sidebar/sidebar.css"
import logo from "../../public/sidebar/logo.png"
import dashboardLogo from "../../public/sidebar/dashboard-logo.png"
import expensesLogo from "../../public/sidebar/expenses-logo.png"
import budgetPlanningLogo from "../../public/sidebar/budget-planning-logo.png"
import reportsLogo from "../../public/sidebar/reports-logo.png"
import settingsLogo from "../../public/sidebar/settings-logo.png"
import helpLogo from "../../public/sidebar/help-logo.png"

export default function Sidebar() {
    return (
        <aside>
            <Link href="/" className='logo'>
                <Image src={logo} alt="Logo" className='img-logo' />
            </Link>

            <nav>
                <ul>
                    <li>
                        <Link href="/">
                            <Image src={dashboardLogo} alt="Dashboard Logo" className='img-logo' />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link href="/expenses">
                            <Image src={expensesLogo} alt="Expenses Logo" className='img-logo' />
                            Expenses
                        </Link>
                    </li>
                    <li>
                        <Link href="/budget-planning">
                            <Image src={budgetPlanningLogo} alt="Budget Planning Logo" className='img-logo' />
                            Budget Planning
                        </Link>
                    </li>
                    <li>
                        <Link href="/reports">
                            <Image src={reportsLogo} alt="Reports Logo" className='img-logo' />
                            Reports
                        </Link>
                    </li>

                    <div className="line-divider">
                        <div className="line"></div>
                    </div>

                    <li>
                        <Link href="/settings">
                            <Image src={settingsLogo} alt="Settings Logo" className='img-logo' />
                            Settings
                        </Link>
                    </li>
                    <li>
                        <Link href="/help">
                            <Image src={helpLogo} alt="Help Logo" className='img-logo' />
                            Help
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}