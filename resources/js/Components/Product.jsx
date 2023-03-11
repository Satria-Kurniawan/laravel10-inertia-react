import { useState } from "react";
import { router } from "@inertiajs/react";

import Modal from "./Modal";
import Button from "./Button";
import TextInput from "./TextInput";
import InputLabel from "./InputLabel";
import Dropdown from "./Dropdown";
import { TbEdit, TbTrash } from "react-icons/tb";
import { ImWarning } from "react-icons/im";
import { MdClose, MdCheck } from "react-icons/md";

import { itemInputs } from "@/constants";

const Product = ({ product, categories }) => {
    const [showModal, setShowModal] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);

    const [item, setItem] = useState({
        name: "",
        price: "",
        stock: "",
    });
    const [selectedProductCategory, setSelectedProductCategory] = useState({
        id: 0,
        name: "Select Category",
    });

    const handleDelete = (itemId) => {
        router.delete(route("product.delete", itemId));

        setShowModalDelete(false);
        setShowModal(false);
    };

    const handleEdit = (product) => {
        setShowModal(true);
        setItem({
            ...item,
            name: product.name,
            price: product.price,
            stock: product.stock,
        });
    };

    const handleUpdate = (e, itemId) => {
        e.preventDefault();

        const product = {
            name: item.name,
            price: item.price,
            stock: item.stock,
            image: null,
            category_id: selectedProductCategory.id,
        };

        router.put(route("product.update", itemId), product);

        setShowModal(false);

        setTimeout(() => {
            setItem({
                ...item,
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
        <div className="rounded-md p-3 border-l-[5px] bg-tertiary border-primary hover:bg-primary hover:text-black duration-300 cursor-pointer group">
            <h1 className="font-semibold">{product.name}</h1>
            <h2 className="text-[#A7A7A7] font-semibold text-sm">
                Rp. {product.price}
            </h2>
            <h3 className="text-end text-sm font-semibold">
                {product.stock} items
            </h3>
            <div className="mt-5">
                <TbEdit
                    onClick={() => handleEdit(product)}
                    size={25}
                    className="hover:scale-110 duration-300"
                />
            </div>

            <Modal show={showModal} onClose={setShowModal} maxWidth={"md"}>
                <div className="py-5 px-10 bg-[#272727] rounded-md">
                    <div className="flex gap-x-3 items-center">
                        <TbEdit size={20} />
                        <h1 className="font-semibold">Item</h1>
                    </div>
                    <form
                        onSubmit={(e) => handleUpdate(e, product.id)}
                        className="flex flex-col gap-y-1 mt-3"
                    >
                        {itemInputs.map((input, i) => (
                            <div key={i}>
                                <InputLabel value={input.label} />
                                <TextInput
                                    {...input}
                                    value={item[input.name]}
                                    onChange={(e) =>
                                        setItem({
                                            ...item,
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
                            onClick={() => setShowModal(false)}
                            type={"button"}
                            text={"Cancel"}
                            className="bg-danger"
                        />
                        <p
                            onClick={() => setShowModalDelete(true)}
                            className="ml-auto text-danger inline-flex gap-x-1 items-center cursor-pointer"
                        >
                            Delete Item
                            <TbTrash />
                        </p>
                    </form>
                </div>
            </Modal>

            <Modal
                show={showModalDelete}
                onClose={setShowModalDelete}
                maxWidth={"xs"}
            >
                <div className="py-5 px-10 bg-[#272727]">
                    <div className="flex justify-center">
                        <ImWarning size={30} className="text-danger" />
                    </div>
                    <p className="mt-5">
                        Are you sure want to delete{" "}
                        <span className="text-danger">{product.name}</span> ?
                    </p>
                    <div className="flex justify-end mt-5">
                        <div className="inline-flex gap-x-2">
                            <MdClose
                                onClick={() => setShowModalDelete(false)}
                                size={30}
                                className="text-danger cursor-pointer"
                            />
                            <MdCheck
                                onClick={() => handleDelete(product.id)}
                                size={30}
                                className="text-primary cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Product;
