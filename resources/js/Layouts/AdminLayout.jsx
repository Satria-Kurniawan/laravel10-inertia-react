import { Head } from "@inertiajs/react";

import Sidebar from "@/Components/Sidebar";

const AdminLayout = ({ children, title }) => {
    return (
        <>
            <Head title={title} />
            <div className="flex">
                <Sidebar />
                <main className="py-7 container mx-auto px-10">{children}</main>
            </div>
        </>
    );
};

export default AdminLayout;
