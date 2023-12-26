import React from "react";
import { Auth } from "../../contexts/Auth";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function BasicPage() {
    return (
        <Auth>
            <div className="h-screen w-screen flex flex-col m-0 p-0">
                <div className="flex-1 overflow-y-scroll">
                    <Navbar />
                    <Outlet />
                </div>
                <Footer />
            </div>
        </Auth>
    );
}
