
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
            <div className="navbar-main">

                {/* Logo */}
                <div className="navbar-brand">
                    <span>InfoTech</span>
                </div>

                {/* Links */}
                <nav className="navbar-links">

                    {links.map((link) => (
                        <button
                            key={link.url}
                            type="button"
                            onClick={() => navegar(link.url)}
                            className="navbar-link"
                        >
                            <i className={link.icon}></i>

                            <span>
                                {link.label}
                            </span>
                        </button>
                    ))}

                </nav>

                {/* Área do usuário */}
                <div className="user-area">

                    {isAuthenticated ? (
                        <>
                            <div className="user-info">

                                <span className="user-name">
                                    {nome}
                                </span>

                                <span className="user-email">
                                    {email}
                                </span>

                            </div>

                            <img
                                src={avatarImage}
                                alt="Avatar"
                                className="user-avatar"
                            />

                            <button
                                type="button"
                                className="login-button"
                                onClick={sair}
                            >
                                <i className="pi pi-sign-out"></i>

                                Sair
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            className="login-button"
                            onClick={() => navegar("/login")}
                        >
                            <i className="pi pi-sign-in"></i>

                            Login
                        </button>
                    )}

                </div>

                {/* Botão mobile */}
                <button
                    type="button"
                    className="mobile-menu-button"
                    onClick={() => setMenuAberto(!menuAberto)}
                    aria-label="Menu"
                >
                    <i
                        className={`pi ${
                            menuAberto ? "pi-times" : "pi-bars"
                        }`}
                    ></i>

                    <span>
                        Menu
                    </span>
                </button>

            </div>

            {/* Menu mobile */}
            {menuAberto && (
                <div className="mobile-menu">

                    {links.map((link) => (
                        <button
                            key={link.url}
                            type="button"
                            onClick={() => navegar(link.url)}
                            className="mobile-link"
                        >
                            <i className={link.icon}></i>

                            <span>
                                {link.label}
                            </span>
                        </button>
                    ))}

                    <hr />

                    {isAuthenticated ? (
                        <>
                            <div className="mobile-user">

                                <img
                                    src={avatarImage}
                                    alt="Avatar"
                                    className="user-avatar"
                                />

                                <div className="user-info">
                                    <span className="user-name">
                                        {nome}
                                    </span>

                                    <span className="user-email">
                                        {email}
                                    </span>
                                </div>

                            </div>

                            <button
                                type="button"
                                className="mobile-login-button"
                                onClick={sair}
                            >
                                <i className="pi pi-sign-out"></i>
                                Sair
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            className="mobile-login-button"
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
