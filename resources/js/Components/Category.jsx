import { useState } from "react";
import { router } from "@inertiajs/react";

import Modal from "./Modal";
import TextInput from "./TextInput";
import { TbGridDots, TbEdit, TbTrash } from "react-icons/tb";
import { ImWarning } from "react-icons/im";
import { MdClose, MdCheck } from "react-icons/md";
import { FaSave } from "react-icons/fa";

const Category = ({ category }) => {
    const [active, setActive] = useState(false);
    const [showMOdal, setShowModal] = useState(false);
    const [edit, setEdit] = useState(false);
    const [categoryName, setCategoryName] = useState("");

    const handleCancel = () => {
        setActive(false);
        setEdit(false);
    };

    const handleDelete = (categoryId) => {
        router.delete(route("category.delete", categoryId));

        setShowModal(false);
        setActive(false);
    };

    const handleEdit = (categoryName) => {
        setEdit(!edit);
        setCategoryName(categoryName);
    };

    const handleUpdate = (categoryId) => {
        router.put(route("category.update", categoryId), {
            name: categoryName,
        });
    };

    return (
        <div className="py-1.5 px-3 rounded-md bg-tertiary flex justify-between items-center">
            <div className="inline-flex gap-x-3 items-center">
                <input
                    type="checkbox"
                    className="rounded-sm focus:outline-none focus:ring-0"
                />
                {!edit ? (
                    category.name
                ) : (
                    <TextInput
                        onChange={(e) => setCategoryName(e.target.value)}
                        value={categoryName}
                        isFocused={edit && true}
                    />
                )}
            </div>
            {active ? (
                <div className="inline-flex gap-x-2 items-center ml-3">
                    <span
                        onClick={() => handleEdit(category.name)}
                        className="cursor-pointer"
                    >
                        {!edit ? (
                            <TbEdit color={"white"} size={20} />
                        ) : (
                            <FaSave
                                onClick={() => handleUpdate(category.id)}
                                color="#E2FF52"
                                size={20}
                            />
                        )}
                    </span>
                    <span
                        onClick={() => setShowModal(true)}
                        className="cursor-pointer"
                    >
                        <TbTrash color="white" size={20} />
                    </span>
                    <span
                        onClick={handleCancel}
                        className="text-danger cursor-pointer"
                    >
                        Cancel
                    </span>
                </div>
            ) : (
                <button onClick={() => setActive(true)}>
                    <TbGridDots size={20} />
                </button>
            )}

            <Modal
                show={showMOdal}
                closeable={true}
                onClose={setShowModal}
                maxWidth={"xs"}
            >
                <div className="py-5 px-10 bg-[#272727] rounded-md">
                    <div className="flex justify-center">
                        <ImWarning size={30} className="text-danger" />
                    </div>
                    <p className="mt-5">
                        Are you sure want to delete{" "}
                        <span className="text-danger">{category.name}</span> ?
                    </p>
                    <div className="flex justify-end mt-5">
                        <div className="inline-flex gap-x-2">
                            <MdClose
                                onClick={() => setShowModal(false)}
                                size={30}
                                className="text-danger cursor-pointer"
                            />
                            <MdCheck
                                onClick={() => handleDelete(category.id)}
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

export default Category;
