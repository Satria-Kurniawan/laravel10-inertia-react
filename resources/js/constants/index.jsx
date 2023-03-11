import { MdSpaceDashboard } from "react-icons/md";
import { FaStore, FaShoppingBag, FaHistory } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

const adminSidebarLinks = [
    {
        icon: <MdSpaceDashboard />,
        name: "Dashboard",
        path: "/admin/dashboard",
    },
    { icon: <FaStore />, name: "Store", path: "/admin/store" },
    { icon: <FaShoppingBag />, name: "Cashier", path: "/admin/cashier" },
    { icon: <FaHistory />, name: "History", path: "/admin/history" },
    { icon: <IoMdSettings />, name: "Settings", path: "/admin/settings" },
];

const colors = [
    "bg-[#DFF1DE]",
    "bg-[#F3D4F9]",
    "bg-[#D4E7F9]",
    "bg-[#DDD4F9]",
    "bg-[#FFC5F8]",
    "bg-[#F4F4DE]",
    "bg-[#F3CECE]",
    "bg-[#CDF7ED]",
    "bg-[#F3F3F3]",
];

const itemInputs = [
    {
        label: "Name",
        type: "text",
        name: "name",
        placeholder: "Type item name...",
        errorMessage: "Please fill the item name!",
        required: true,
    },
    {
        label: "Price",
        type: "number",
        name: "price",
        placeholder: "Type item price...",
        errorMessage: "Please fill the item price!",
        required: true,
    },
    {
        label: "Stock",
        type: "number",
        name: "stock",
        placeholder: "Type item stock...",
        errorMessage: "Please fill the item stock!",
        required: true,
    },
];

export { adminSidebarLinks, colors, itemInputs };
