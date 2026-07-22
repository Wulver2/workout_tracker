import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";

export function Layout({ user, setUser }) {
    return (
        <>
            <Navbar user={user} setUser={setUser}/>
            <main>
                <Outlet />
            </main>
        </>
    )
}