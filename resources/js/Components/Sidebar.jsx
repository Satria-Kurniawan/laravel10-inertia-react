import { Link } from "@inertiajs/react";
import { useState } from "react";

import { FaSignOutAlt } from "react-icons/fa";
import SidebarItem from "./SidebarItem";

import { adminSidebarLinks } from "@/constants";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const { pathname } = window.location;

    return (
        <aside
            className={`${
                isOpen ? "w-64" : "w-24"
            } p-7 h-screen sticky top-0 overflow-hidden duration-500`}
        >
            <div className="px-2 inline-flex gap-x-3 items-center">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`${
                        isOpen && "rotate-[360deg]"
                    } w-8 h-8 flex justify-center items-center duration-500 delay-500`}
                >
                    <div className="flex flex-col gap-y-1">
                        <div
                            className={`${
                                isOpen ? "w-6" : "w-[20px]"
                            } h-[2px] bg-white duration-500`}
                        />
                        <div className="h-[2px] w-6 bg-white duration-500" />
                        <div
                            className={`${
                                isOpen ? "w-6" : "w-[14px]"
                            } h-[2px] bg-white duration-500`}
                        />
                    </div>
                </button>
                <h1
                    className={`${
                        isOpen ? "opacity-100" : "opacity-0 -translate-x-5"
                    } font-bold text-xl origin-left duration-500`}
                >
                    BrandName
                </h1>
            </div>
            <ul className="mt-7 flex flex-col gap-y-5">
                {adminSidebarLinks.map((link, i) => (
                    <SidebarItem
                        key={i}
                        link={link}
                        pathname={pathname}
                        isOpen={isOpen}
                    />
                ))}
            </ul>
            <div className="absolute bottom-5">
                <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className={`${
                        isOpen && "bg-tertiary hover:bg-danger group"
                    } py-1 px-2 w-full inline-flex gap-x-3 items-center rounded-md duration-500`}
                >
                    <div
                        className={`p-[6px] bg-tertiary rounded-md text-xl hover:bg-danger group-hover:bg-danger duration-500`}
                    >
                        <FaSignOutAlt />
                    </div>
                    <span
                        className={`${
                            isOpen ? "opacity-100" : "opacity-0 -translate-x-5"
                        } bg-tertiary group-hover:bg-danger origin-left duration-500`}
                    >
                        Sign Out
                    </span>
                </Link>
                <h6 className="mt-5 text-sm">&#169;2023 Point of Sales</h6>
            </div>
        </aside>
    );
};

export default Sidebar;
