import { useState, useRef } from "react";
import { router } from "@inertiajs/react";

import AdminLayout from "@/Layouts/AdminLayout";
import Modal from "@/Components/Modal";
import Button from "@/Components/Button";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import Category from "@/Components/Category";
import Product from "@/Components/Product";
import { TbEdit, TbPlus } from "react-icons/tb";
import { BiCategory } from "react-icons/bi";

import { colors, itemInputs } from "@/constants";
import Dropdown from "@/Components/Dropdown";

const Store = ({ categories, products, ...restProps }) => {
    const { pathname } = window.location;

    const [showModalCategory, setShowModalCategory] = useState(false);
    const [showModalProduct, setShowModalProduct] = useState(false);
    const [openCategoryInput, setOpenCategoryInput] = useState(false);

    const categoryNameRef = useRef();

    const [productItem, setProductItem] = useState({
        name: "",
        price: "",
        stock: "",
    });
    const [selectedProductCategory, setSelectedProductCategory] = useState({
        id: 0,
        name: "Select Category",
    });

    const randomIndex = () => Math.floor(Math.random() * colors.length);

    const categoryInput = {
        placeholder: "Type category name...",
        errorMessage: "Please fill the category name!",
        required: true,
    };

    const handleAddCategory = (e) => {
        e.preventDefault();

        router.post(
            route("category.add", { name: categoryNameRef.current?.value })
        );

        setOpenCategoryInput(false);
        categoryNameRef.current.value = "";
    };

    const handleAddProduct = (e) => {
        e.preventDefault();

        const product = {
            name: productItem.name,
            price: productItem.price,
            stock: productItem.stock,
            image: null,
            category_id: selectedProductCategory.id,
        };

        router.post(route("product.add"), product);

        setShowModalProduct(false);

        setTimeout(() => {
            setProductItem({
                ...productItem,
                name: "",
                price: "",
                stock: "",
            });
            setSelectedProductCategory({
                ...selectedProductCategory,
                id: 0,
                name: "Select Category",
            });
        }, 500);
    };

    return (
        <>
            <Modal
                show={showModalCategory}
                onClose={setShowModalCategory}
                maxWidth={"md"}
            >
                <div className="py-5 px-10 bg-[#272727] rounded-md">
                    <div className="flex gap-x-3 items-center">
                        <TbEdit size={20} />
                        <h1 className="font-semibold">Category</h1>
                    </div>
                    <div className="mt-3 flex justify-end">
                        <div
                            onClick={() =>
                                setOpenCategoryInput(!openCategoryInput)
                            }
                        >
                            <Button
                                variant={!openCategoryInput && "primary"}
                                text={
                                    !openCategoryInput
                                        ? "Add New"
                                        : "Close Input"
                                }
                                className={openCategoryInput && "bg-danger"}
                            />
                        </div>
                    </div>
                    {openCategoryInput && (
                        <form onSubmit={handleAddCategory} className="mt-3">
                            <TextInput
                                ref={categoryNameRef}
                                {...categoryInput}
                            />
                            <Button
                                type={"submit"}
                                variant={"primary"}
                                text={"Save Item"}
                                className="mt-2 w-full"
                            />
                        </form>
                    )}
                    <div
                        id="categoriesInModal"
                        className="mt-3 flex flex-col gap-y-2 max-h-[16rem] overflow-y-auto pr-2"
                    >
                        {categories.map((category, i) => (
                            <Category key={i} category={category} />
                        ))}
                    </div>
                    {/* <div className="mt-5">
                        <p className="text-danger text-sm">
                            Delete selected item
                        </p>
                    </div> */}
                </div>
            </Modal>
            <header className="flex justify-between items-center">
                <div></div>
                <div className="text-end">
                    <h1 className="first-letter:uppercase font-semibold">
                        {pathname.split("/")}
                    </h1>
                    <h2 className="text-secondary text-sm">{pathname}</h2>
                </div>
            </header>
            <main className="mt-7">
                <div className="flex gap-x-3">
                    <div className="mt-2">
                        <div
                            onClick={() => setShowModalCategory(true)}
                            className="h-fit rounded-md py-1.5 px-4 bg-tertiary inline-flex gap-x-3 items-center cursor-pointer "
                        >
                            <TbEdit size={20} />
                            Category
                        </div>
                    </div>
                    <div
                        id="categories"
                        className="max-w-[67vw] flex gap-x-3 overflow-auto py-2"
                    >
                        {categories.map((category, i) => (
                            <div
                                key={i}
                                className={`rounded-md py-1.5 px-4 inline-flex gap-x-3 items-center text-black text-sm font-semibold ${
                                    colors[randomIndex()]
                                }`}
                            >
                                <BiCategory size={20} color="black" />
                                {category.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-5 gap-5 mt-7">
                    <div
                        onClick={() => setShowModalProduct(true)}
                        className="rounded-md border-dashed border-2 border-primary p-3 flex justify-center items-center cursor-pointer"
                    >
                        <div>
                            <TbPlus size={25} className="mx-auto" />
                            <p className="text-sm text-center">add new item</p>
                        </div>
                    </div>
                    {products.map((product, i) => (
                        <Product
                            key={i}
                            product={product}
                            categories={categories}
                        />
                    ))}
                </div>

                <Modal
                    show={showModalProduct}
                    closeable={true}
                    onClose={setShowModalProduct}
                    maxWidth={"md"}
                >
                    <div className="py-5 px-10 bg-[#272727] rounded-md">
                        <div className="flex gap-x-3 items-center">
                            <TbPlus size={20} />
                            <h1 className="font-semibold">Item</h1>
                        </div>
                        <form
                            onSubmit={handleAddProduct}
                            className="flex flex-col gap-y-1 mt-3"
                        >
                            {itemInputs.map((input, i) => (
                                <div key={i}>
                                    <InputLabel value={input.label} />
                                    <TextInput
                                        {...input}
                                        value={productItem[input.name]}
                                        onChange={(e) =>
                                            setProductItem({
                                                ...productItem,
                                                [e.target.name]: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            ))}

                            <InputLabel value={"Category"} />
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <div className="w-full rounded-md bg-tertiary border-none py-1.5 px-3 focus:outline-none focus:ring-primary">
                                        {selectedProductCategory.name}
                                    </div>
                                </Dropdown.Trigger>
                                <Dropdown.Content
                                    widthClasses="w-full"
                                    contentClasses="p-3 max-h-[12rem] overflow-auto flex flex-col gap-y-1"
                                >
                                    {categories.map((c, i) => (
                                        <div
                                            key={i}
                                            className="px-3 py-1 rounded-md hover:bg-primary hover:text-black cursor-pointer"
                                            onClick={() =>
                                                setSelectedProductCategory({
                                                    ...selectedProductCategory,
                                                    id: c.id,
                                                    name: c.name,
                                                })
                                            }
                                        >
                                            {c.name}
                                        </div>
                                    ))}
                                </Dropdown.Content>
                            </Dropdown>

                            <Button
                                type={"submit"}
                                variant={"primary"}
                                text={"Save Item"}
                                className="mt-3 mb-1"
                            />
                            <Button
                                onClick={() => setShowModalProduct(false)}
                                type={"button"}
                                text={"Cancel"}
                                className="bg-danger"
                            />
                        </form>
                    </div>
                </Modal>
            </main>
        </>
    );
};

Store.layout = (page) => <AdminLayout children={page} title="Store" />;

export default Store;
