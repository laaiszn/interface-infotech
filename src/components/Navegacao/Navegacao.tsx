import { useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import AuthRequests from "../../fetch/AuthRequests";

function Navegacao(): JSX.Element {

    const [menuAberto, setMenuAberto] = useState(false);

    const navigate = useNavigate();

    const isAuthenticated = !!(
        localStorage.getItem("isAuth") &&
        localStorage.getItem("token") &&
        AuthRequests.checkTokenExpiry()
    );

    const nome = localStorage.getItem("nome") || "Usuário";
    const email = localStorage.getItem("email") || "";

    const avatarImage =
        "https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png";

    const links = [
        {
            label: "Home",
            icon: "pi pi-home",
            url: "/"
        },

        ...(isAuthenticated
            ? [
                  {
                      label: "Produtos",
                      icon: "pi pi-box",
                      url: "/lista/produtos"
                  },
                  {
                      label: "Movimentações",
                      icon: "pi pi-arrow-right-arrow-left",
                      url: "/lista/movimentacoes"
                  },
                  {
                      label: "Categorias",
                      icon: "pi pi-tags",
                      url: "/lista/categorias"
                  }
              ]
            : [])
    ];

    const navegar = (url: string) => {
        navigate(url);
        setMenuAberto(false);
    };

    const sair = () => {
        AuthRequests.removeToken();
        setMenuAberto(false);
        navigate("/login");
    };

    return (
        <header className="bg-slate-700 relative z-50">

            {/* Barra principal */}
            <div className="flex items-center justify-between px-4 py-3 min-h-[64px]">

                {/* Logo + Links */}
                <div className="flex items-center gap-2">

                    <nav className="hidden sm:flex items-center gap-1 ml-4">

                        {links.map((link) => (
                            <button
                                key={link.url}
                                type="button"
                                onClick={() => navegar(link.url)}
                                className="flex items-center gap-1.5 text-white text-sm px-3 py-2 rounded hover:bg-white/15 transition-colors"
                            >
                                <i className={link.icon}></i>

                                <span>
                                    {link.label}
                                </span>
                            </button>
                        ))}

                    </nav>

                </div>

                {/* Botão do menu mobile */}
                <button
                    type="button"
                    className="sm:hidden text-white p-3 rounded bg-slate-600 hover:bg-slate-500 transition-colors flex items-center gap-2"
                    onClick={() => setMenuAberto(!menuAberto)}
                    aria-label="Menu"
                >
                    <i
                        className={`pi ${
                            menuAberto ? "pi-times" : "pi-bars"
                        } text-lg`}
                    ></i>

                    <span className="text-sm">
                        Menu
                    </span>
                </button>

                {/* Área do usuário */}
                <div className="hidden sm:flex items-center gap-3">

                    {isAuthenticated ? (
                        <>
                            <div className="flex flex-col items-end">

                                <span className="text-white text-sm font-semibold leading-tight">
                                    {nome}
                                </span>

                                <span className="text-white/70 text-xs leading-tight">
                                    {email}
                                </span>

                            </div>

                            <img
                                src={avatarImage}
                                alt="Avatar"
                                className="w-9 h-9 rounded-full object-cover"
                            />

                            <button
                                type="button"
                                className="bg-white text-slate-700 px-4 py-1.5 rounded text-sm font-medium flex items-center gap-1.5 hover:bg-gray-100 transition-colors"
                                onClick={sair}
                            >
                                <i className="pi pi-sign-out"></i>

                                Sair
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            className="bg-white text-slate-700 px-4 py-1.5 rounded text-sm font-medium flex items-center gap-1.5 hover:bg-gray-100 transition-colors"
                            onClick={() => navegar("/login")}
                        >
                            <i className="pi pi-sign-in"></i>

                            Login
                        </button>
                    )}

                </div>

            </div>

            {/* Menu mobile */}
            {menuAberto && (
                <div className="sm:hidden bg-slate-800 border-t border-slate-600 px-4 pb-4 flex flex-col gap-1">

                    {links.map((link) => (
                        <button
                            key={link.url}
                            type="button"
                            onClick={() => navegar(link.url)}
                            className="flex items-center gap-2 text-white text-sm px-3 py-2.5 rounded hover:bg-white/15 transition-colors text-left"
                        >
                            <i className={link.icon}></i>

                            {link.label}
                        </button>
                    ))}

                    <hr className="border-slate-600 my-2" />

                    {isAuthenticated ? (
                        <>
                            {/* Usuário */}
                            <div className="flex items-center gap-3 px-3 py-2">

                                <img
                                    src={avatarImage}
                                    alt="Avatar"
                                    className="w-8 h-8 rounded-full object-cover"
                                />

                                <div>

                                    <p className="text-white text-sm font-semibold m-0">
                                        {nome}
                                    </p>

                                    <p className="text-white/70 text-xs m-0">
                                        {email}
                                    </p>

                                </div>

                            </div>

                            {/* Botão sair */}
                            <button
                                type="button"
                                className="mt-1 bg-white text-slate-700 px-4 py-2 rounded text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                                onClick={sair}
                            >
                                <i className="pi pi-sign-out"></i>

                                Sair
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            className="bg-white text-slate-700 px-4 py-2 rounded text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                            onClick={() => navegar("/login")}
                        >
                            <i className="pi pi-sign-in"></i>

                            Login
                        </button>
                    )}

                </div>
            )}

        </header>
    );
}

export default Navegacao;