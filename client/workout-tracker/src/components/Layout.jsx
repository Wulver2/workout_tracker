import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";

export function Layout({ user }) {
    return (
        <>
            <Navbar user={user} />
            <main>
                <Outlet />
            </main>
        </>
    )
}