import React from "react";
import { Auth } from "../contexts/Auth";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Layout() {
    return (
        <Auth>
            <div className="h-screen w-screen m-0 p-0 bg-colorY font-Secondary flex flex-col gap-2">
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </Auth >
    );
}
