import { Link, Head } from "@inertiajs/react";
import { useState } from "react";

import Button from "@/Components/Button";
import { VscListSelection } from "react-icons/vsc";

const Welcome = ({ auth }) => {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        {
            name: "Link",
            path: "/",
        },
        {
            name: "Link",
            path: "/",
        },
        {
            name: "Link",
            path: "/",
        },
    ];

    return (
        <>
            <Head title="Point of Sales" />
            <div className="container mx-auto">
                <nav className="md:px-32 px-10 py-3 flex justify-between items-center">
                    <div className="inline-flex gap-x-3 items-center">
                        <h1 className="font-bold text-xl">Brand</h1>
                        <img src="" alt="logo" />
                    </div>
                    <ul className="md:inline-flex gap-x-3 items-center font-semibold hidden">
                        {links.map((link, i) => (
                            <Link key={i} href={link.path}>
                                {link.name}
                            </Link>
                        ))}
                    </ul>
                    <div className="md:inline-flex gap-x-3 items-center hidden">
                        {auth.user ? (
                            <Link
                                href={route("dashboard")}
                                className="font-semibold"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={route("login")}>Sign In</Link>
                                <Link href={route("register")}>
                                    <Button
                                        variant={"primary"}
                                        text={"Sign Up"}
                                    />
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(true)}>
                            <VscListSelection size={25} />
                        </button>
                        <ul
                            className={`${
                                isOpen
                                    ? "top-0 duration-300"
                                    : "-top-[100%] duration-500 delay-500"
                            } p-3 bg-transparent backdrop-blur-sm rounded-md absolute left-0 right-0 bottom-0 h-screen flex flex-col gap-y-7 justify-center items-center`}
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-10 h-[1.5rem] w-[1.5rem]"
                            >
                                <div
                                    className={`${
                                        !isOpen && "rotate-0 opacity-0"
                                    } h-[2px] w-[24px] bg-danger absolute rotate-45 duration-500`}
                                />
                                <div
                                    className={`${
                                        !isOpen && "rotate-0 opacity-0"
                                    } h-[2px] w-[24px] bg-danger absolute -rotate-45 duration-500`}
                                />
                            </button>
                            {links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.path}
                                    className="bg-transparent"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            {auth.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="font-semibold"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className="bg-transparent"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href={route("register")}
                                        className="bg-transparent"
                                    >
                                        <Button
                                            variant={"primary"}
                                            text={"Sign Up"}
                                        />
                                    </Link>
                                </>
                            )}
                        </ul>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Welcome;
