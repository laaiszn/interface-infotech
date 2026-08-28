import { useState, type JSX } from "react";
import { useNavigate } from 'react-router-dom';
import AuthRequests from "../../fetch/AuthRequests";
import appIcon from "../../assets/app-icon.png";

function Navegacao(): JSX.Element {
    const [menuAberto, setMenuAberto] = useState(false);
    const [isAuthenticated] = useState(() => {
        const isAuth = localStorage.getItem('isAuth');
        const token = localStorage.getItem('token');
        return !!(isAuth && token && AuthRequests.checkTokenExpiry());
    });
    const navigate = useNavigate();

    const nome = localStorage.getItem('nome') || 'Usuário';
    const email = localStorage.getItem('email') || '';
    const avatarImage = "https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png";

    const links = [
        { label: 'Home', icon: 'pi pi-home', url: '/' },
        ...(isAuthenticated ? [
            { label: 'Alunos', icon: 'pi pi-users', url: '/lista/alunos' },
            { label: 'Livros', icon: 'pi pi-book', url: '/lista/livros' },
            { label: 'Empréstimos', icon: 'pi pi-arrow-right-arrow-left', url: '/lista/emprestimos' },
        ] : [])
    ];

    return (
        <header className="bg-slate-700 relative z-50">
            {/* Barra principal */}
            <div className="flex items-center justify-between px-4 py-3 min-h-[64px]">
                {/* Logo + Links (desktop) */}
                <div className="flex items-center gap-2">
                    <img src={appIcon} alt="logo" className="h-10 w-auto" />
                    <nav className="hidden sm:flex items-center gap-1 ml-4">
                        {links.map((link) => (
                            <a
                                key={link.url}
                                href={link.url}
                                className="flex items-center gap-1.5 text-white text-sm px-3 py-2 rounded hover:bg-white/15 transition-colors"
                            >
                                <i className={link.icon}></i>
                                <span>{link.label}</span>
                            </a>
                        ))}
                    </nav>
                </div>

            {/* Botão hambúrguer (mobile) */}
<button
    className="sm:hidden text-white p-3 rounded bg-slate-600 hover:bg-slate-500 transition-colors flex items-center gap-2"
    onClick={() => setMenuAberto(!menuAberto)}
    aria-label="Menu"
>
    <i className={`pi ${menuAberto ? 'pi-times' : 'pi-bars'} text-lg`}></i>
    <span className="text-sm">Menu</span>
</button>

                {/* Área do usuário (desktop) */}
                <div className="hidden sm:flex items-center gap-3">
                    {isAuthenticated ? (
                        <>
                            <div className="flex flex-col items-end">
                                <span className="text-white text-sm font-semibold leading-tight">{nome}</span>
                                <span className="text-white/70 text-xs leading-tight">{email}</span>
                            </div>
                            <img src={avatarImage} alt="avatar" className="w-9 h-9 rounded-full object-cover" />
                            <button
                                className="bg-white text-slate-700 px-4 py-1.5 rounded text-sm font-medium flex items-center gap-1.5 hover:bg-gray-100 transition-colors"
                                onClick={AuthRequests.removeToken}
                            >
                                <i className="pi pi-sign-out"></i>
                                Sair
                            </button>
                        </>
                    ) : (
                        <button
                            className="bg-white text-slate-700 px-4 py-1.5 rounded text-sm font-medium flex items-center gap-1.5 hover:bg-gray-100 transition-colors"
                            onClick={() => navigate('/login')}
                        >
                            <i className="pi pi-sign-in"></i>
                            Login
                        </button>
                    )}
                </div>
            </div>

            {/* Menu mobile (dropdown) */}
            {menuAberto && (
                <div className="sm:hidden bg-slate-800 border-t border-slate-600 px-4 pb-4 flex flex-col gap-1">
                    {links.map((link) => (
                        <a
                            key={link.url}
                            href={link.url}
                            className="flex items-center gap-2 text-white text-sm px-3 py-2.5 rounded hover:bg-white/15 transition-colors"
                            onClick={() => setMenuAberto(false)}
                        >
                            <i className={link.icon}></i>
                            {link.label}
                        </a>
                    ))}
                    <hr className="border-slate-600 my-2" />
                    {isAuthenticated ? (
                        <>
                            <div className="flex items-center gap-3 px-3 py-2">
                                <img src={avatarImage} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                                <div>
                                    <p className="text-white text-sm font-semibold m-0">{nome}</p>
                                    <p className="text-white/70 text-xs m-0">{email}</p>
                                </div>
                            </div>
                            <button
                                className="mt-1 bg-white text-slate-700 px-4 py-2 rounded text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                                onClick={AuthRequests.removeToken}
                            >
                                <i className="pi pi-sign-out"></i>
                                Sair
                            </button>
                        </>
                    ) : (
                        <button
                            className="bg-white text-slate-700 px-4 py-2 rounded text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                            onClick={() => { navigate('/login'); setMenuAberto(false); }}
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