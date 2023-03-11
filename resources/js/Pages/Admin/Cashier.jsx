import { useState } from "react";

import AdminLayout from "@/Layouts/AdminLayout";
import { BsArrowRight } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { TbPlus, TbMinus } from "react-icons/tb";
import { FaShoppingBag } from "react-icons/fa";
import Button from "@/Components/Button";

import { categories, colors, products } from "@/constants";

const Cashier = ({ auth }) => {
    const { pathname } = window.location;
    const [isOpen, setIsOpen] = useState(true);

    const randomIndex = () => Math.floor(Math.random() * colors.length);

    return (
        <>
            <header className="flex justify-between items-center">
                <div>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="rounded-md py-1 bg-tertiary border-none focus:ring-primary"
                    />
                </div>
                <div className="text-end inline-flex gap-x-10">
                    <div>
                        <h1 className="first-letter:uppercase font-semibold">
                            {pathname.split("/")}
                        </h1>
                        <h2 className="text-secondary text-sm">{pathname}</h2>
                    </div>
                    <h1>{auth.user.name}</h1>
                </div>
            </header>
            <main className="mt-7">
                <div className="flex gap-x-7">
                    <div
                        id="products"
                        className="w-full h-[80vh] overflow-y-auto"
                    >
                        <div
                            className={`${
                                isOpen ? "grid-cols-4" : "grid-cols-6"
                            } grid gap-3`}
                        >
                            {categories.map((category, i) => (
                                <div
                                    key={i}
                                    className={`${
                                        colors[randomIndex()]
                                    } p-3 rounded-md cursor-pointer`}
                                >
                                    <BiCategory size={20} color="black" />
                                    <div className="mt-10">
                                        <h1 className="text-black font-semibold">
                                            {category.name}
                                        </h1>
                                        <h2 className="text-[#A7A7A7] font-semibold text-xs">
                                            {category.totalItems} items
                                        </h2>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="my-4 h-[0.1px] bg-tertiary" />
                        <div
                            className={`${
                                isOpen ? "grid-cols-4" : "grid-cols-6"
                            } grid grid-cols-4 gap-3`}
                        >
                            {products.map((product, i) => (
                                <div
                                    key={i}
                                    className={`${
                                        i === 2
                                            ? "bg-primary text-black"
                                            : "bg-tertiary"
                                    } p-3 rounded-md border-l-[5px] border-primary hover:bg-primary hover:text-black duration-300 cursor-pointer group`}
                                >
                                    <div className="inline-flex gap-x-3">
                                        <span className="text-xs">
                                            Add to Cart
                                        </span>
                                        <BsArrowRight />
                                    </div>
                                    <div className="mt-3">
                                        <h1
                                            id="product"
                                            className="font-semibold overflow-auto"
                                        >
                                            {product.name}
                                        </h1>
                                        <h2 className="text-[#A7A7A7] font-semibold text-sm">
                                            Rp. {product.price}
                                        </h2>
                                    </div>
                                    <div className="mt-5 flex justify-end">
                                        <div className="inline-flex gap-x-3">
                                            <span
                                                className={`p-1 rounded-md border ${
                                                    i === 2 && "border-black"
                                                } group-hover:border-black`}
                                            >
                                                <TbMinus />
                                            </span>
                                            <span>{i === 2 ? "3" : "0"}</span>
                                            <span
                                                className={`p-1 rounded-md border ${
                                                    i === 2 && "border-black"
                                                } group-hover:border-black`}
                                            >
                                                <TbPlus />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <aside
                        id="cart"
                        className={`${
                            isOpen
                                ? "w-[32rem] overflow-y-auto"
                                : "w-10 overflow-y-hidden"
                        } h-[80vh] overflow-x-hidden duration-500`}
                    >
                        <div className={`${isOpen && "flex justify-between"}`}>
                            <div className={`${isOpen ? "block" : "hidden"}`}>
                                <h1 className="font-semibold">Cart</h1>
                                <h1 className="font-semibold text-xs text-secondary">
                                    Order List
                                </h1>
                            </div>
                            <div
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 w-10 h-10 bg-tertiary rounded-md flex justify-center items-center cursor-pointer"
                            >
                                <FaShoppingBag size={25} />
                            </div>
                        </div>
                        <section
                            className={`${
                                isOpen
                                    ? "opacity-100"
                                    : "opacity-0 translate-x-5"
                            } mt-5 flex flex-col gap-y-2 duration-500`}
                        >
                            <div className="py-3 px-4 bg-tertiary rounded-md flex justify-between text-sm">
                                <div className="inline-flex gap-x-3">
                                    <span className="w-5 h-5 bg-secondary rounded-full flex justify-center items-center text-xs">
                                        1
                                    </span>
                                    <span>Chicken Wings</span>
                                    <span className="text-secondary">x2</span>
                                </div>
                                <h1>Rp. 40</h1>
                            </div>
                            <div className="py-3 px-4 bg-tertiary rounded-md flex justify-between text-sm">
                                <div className="inline-flex gap-x-3">
                                    <span className="w-5 h-5 bg-secondary rounded-full flex justify-center items-center text-xs">
                                        2
                                    </span>
                                    <span>Spaghetti Carbonara</span>
                                    <span className="text-secondary">x3</span>
                                </div>
                                <h1>Rp. 60</h1>
                            </div>
                        </section>
                        <section
                            className={`${
                                isOpen
                                    ? "opacity-100"
                                    : "opacity-0 translate-x-5"
                            } mt-5 flex flex-col gap-y-2 duration-500`}
                        >
                            <div className="py-3 px-4 bg-tertiary rounded-md text-sm flex flex-col gap-y-1">
                                <div className="flex justify-between">
                                    <span className="text-secondary">
                                        Subtotal
                                    </span>
                                    <span className="font-semibold">
                                        Rp. 100
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-secondary">
                                        Tax 10%
                                    </span>
                                    <span className="font-semibold">
                                        Rp. 10
                                    </span>
                                </div>
                                <div className="text-secondary">
                                    ---------------------------------------
                                </div>
                                <div className="flex justify-between">
                                    <span>Total</span>
                                    <span className="font-semibold">
                                        Rp. 110
                                    </span>
                                </div>
                                <div className="mt-2 relative">
                                    <span className="absolute top-1 translate-x-3">
                                        Rp.
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Cash..."
                                        className="pl-12 w-full rounded-md py-1 bg-[#272727] border-none focus:border-primary focus:ring-0"
                                    />
                                </div>
                                <div className=" mt-2 flex justify-between">
                                    <span>Changeover</span>
                                    <span className="font-semibold">
                                        Rp. 40
                                    </span>
                                </div>
                                <div className="mt-2">
                                    <Button
                                        variant={"primary"}
                                        text={"Place Order"}
                                        className={"w-full"}
                                    />
                                </div>
                            </div>
                        </section>
                    </aside>
                </div>
            </main>
        </>
    );
};

Cashier.layout = (page) => <AdminLayout children={page} title="Cashier" />;

export default Cashier;
