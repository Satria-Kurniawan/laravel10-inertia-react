import { Link } from "@inertiajs/react";

const RegisterPOS = () => {
    return (
        <div>
            <Link href={route("registerPOS.store")} as="button" method="post">
                Daftarkan Toko
            </Link>
        </div>
    );
};

export default RegisterPOS;
