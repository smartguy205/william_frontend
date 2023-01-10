import { Button } from '@mui/material';
import { Outlet, Link } from "react-router-dom";
import { Container, Stack } from '@mui/system';
import React from 'react';
import { useCookies } from 'react-cookie';
import { CookiesProvider } from 'react-cookie';
import { useNavigate } from "react-router";
import Logo from '../Components/Logo/Logo.js';

const AdminLayout = ({ children }) => {
    const [cookies, _setCookie, removeCookie] = useCookies();
    const { email, password } = cookies;
    const navigate = useNavigate();
    const getUserCookies = () => {
        if (email && password) {
            return;
        }

        if (typeof window !== undefined) window.location = "/adminLogin";
    }
    getUserCookies();
    const Logout = () => {
        removeCookie("email", { path: "/" });
        removeCookie("password", { path: "/" });
        navigate("/adminLogin", { replace: true });
    }

    return (

        <CookiesProvider>
            <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 1 }}>
                <Stack sx={{ justifyContent: 'flex-start', margin: "0 .9rem" }}>
                    <Logo />
                </Stack>
                <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Button variant="outlined" sx={{ ml: 3, }}><Link style={{ textDecoration: 'none', }} to="/jobs">Creates Tests</Link></Button>
                    <Button variant="outlined" sx={{ ml: 3, }}><Link style={{ textDecoration: 'none', }} to="/positions">Add positions</Link></Button>
                    <Button variant="outlined" sx={{ ml: 3, }}><Link style={{ textDecoration: 'none', }} to="/table">User Details</Link></Button>
                </Stack>
                <Button variant="outlined" style={{ background: 'red', color: 'whitesmoke', margin: "0 .9rem" }} onClick={Logout}>Logout</Button>
            </Stack>

            <Outlet />
            {children}
        </CookiesProvider>
    );
}

export default AdminLayout;
