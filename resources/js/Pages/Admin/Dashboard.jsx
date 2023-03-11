import AdminLayout from "@/Layouts/AdminLayout";

const Dashboard = (props) => {
    const { pathname } = window.location;

    return (
        <>
            <header className="flex justify-between items-center">
                <div></div>
                <div className="text-end">
                    <h1 className="first-letter:uppercase font-semibold">
                        {pathname.split("/")}
                    </h1>
                    <h2 className="text-secondary text-sm">{pathname}</h2>
                </div>
            </header>
            <main className="mt-7">Dashboard Content</main>
        </>
    );
};

Dashboard.layout = (page) => <AdminLayout children={page} title="Dashboard" />;

export default Dashboard;
