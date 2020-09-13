import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";


export default function Layout(props) {
    return (
        <main className="antialiased min-h-screen h-full flex">
            <div className="bg-gray-900 text-purple-400 flex-none w-56 pb-6 hidden md:block">

                <div className="my-6">
                    <div className="px-4 mb-2 text-white flex flex-col justify-between items-center">
                        <Link
                            to="/overview"
                            className="hover:bg-gray-800 p-2 px-3 w-full rounded-md font-medium text-gray-500"
                        >
                            Overview
            </Link>
                        <Link
                            to="/planner"
                            className="hover:bg-gray-800 p-2 px-3 w-full rounded-md font-medium text-white"
                        >
                            Planner
            </Link>
                        <Link
                            to="/auth/logout"
                            className="hover:bg-gray-800 p-2 px-3 w-full rounded-md font-medium text-gray-500"
                        >
                            Logout
            </Link>
                    </div>
                </div>
            </div>
            <section className="w-full bg-white">{props.children}</section>
        </main>
    );
}

Layout.propTypes = { children: PropTypes.object };