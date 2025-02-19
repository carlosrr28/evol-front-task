import { LogOut } from "lucide-react";
import { FC } from "react";

const NavBar: FC = () => {

    const onLogOut = () => {
        localStorage.removeItem("user");
        window.location.href = "/login";
    }

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <a href="#" className="text-white bg-gray-900 px-3 py-2 rounded-md text-sm font-medium">Tareas</a>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <button onClick={onLogOut} className="text-white px-3 py-2 rounded-md text-sm font-medium flex justify-center">
                                <LogOut className="mr-2" />
                                Cerrar sesión
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;