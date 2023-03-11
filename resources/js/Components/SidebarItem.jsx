import { Link } from "@inertiajs/react";

const SidebarItem = ({ link, pathname, isOpen }) => {
    return (
        <Link
            href={link.path}
            className={`${
                isOpen && "hover:bg-tertiary"
            } py-1 px-2 inline-flex gap-x-3 items-center rounded-md duration-300`}
        >
            <div
                className={`${
                    pathname === link.path
                        ? "bg-primary text-black"
                        : "bg-tertiary"
                } p-[6px] rounded-md text-xl duration-300 ${
                    !isOpen && "hover:bg-primary hover:text-black"
                }`}
            >
                {link.icon}
            </div>
            <span
                className={`${
                    isOpen ? "opacity-100" : "opacity-0 -translate-x-5"
                } origin-left duration-300`}
            >
                {link.name}
            </span>
        </Link>
    );
};

export default SidebarItem;
