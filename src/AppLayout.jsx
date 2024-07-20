import { Outlet } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader'

export function AppLayout({ isHomePage }) {
    return (
        <>
            <AppHeader isHomePage={isHomePage} />
            <Outlet />
        </>
    )
}