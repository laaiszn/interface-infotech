import {
    useState,
    useEffect,
    type JSX,
    type ChangeEvent,
} from "react";
import type CategoriaDTO from "../../dto/CategoriaDTO";
import CategoriaRequests from "../../fetch/CategoriaRequests";
import { useNavigate } from "react-router-dom";

function ListagemCategorias(): JSX.Element {
    const [categorias, setCategorias] = useState<CategoriaDTO[]>([]);
    const [busca, setBusca] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [carregando, setCarregando] = useState(true);

    const rowsPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        const buscarCategorias = async () => {
            try {
                setCarregando(true);

                const listaDeCategorias =
                    await CategoriaRequests.obterListaDeCategorias();

                setCategorias(listaDeCategorias ?? []);
            } catch (error) {
                console.error(
                    `Erro ao buscar categorias. ${error}`
                );

                alert(
                    "Erro ao carregar a listagem de categorias."
                );
            } finally {
                setCarregando(false);
            }
        };

        buscarCategorias();
    }, []);

    /* FILTRO */
    const categoriasFiltradas = categorias.filter((categoria) => {
        const termo = busca.toLowerCase().trim();

        if (!termo) {
            return true;
        }

        return categoria.nome
            ?.toLowerCase()
            .includes(termo);
    });

    /* PAGINAÇÃO */
    const totalPages = Math.ceil(
        categoriasFiltradas.length / rowsPerPage
    );

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;

    const categoriasAtuais =
        categoriasFiltradas.slice(
            indexOfFirstRow,
            indexOfLastRow
        );

    const handleBusca = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setBusca(event.target.value);
        setCurrentPage(1);
    };

    /* REMOVER */
    const handleRemoverCategoria = async (
        id_categoria: number
    ) => {
        const confirmar = window.confirm(
            "Você realmente deseja remover esta categoria?"
        );

        if (!confirmar) {
            return;
        }

        try {
            await CategoriaRequests.removerCategoria(
                id_categoria
            );

            setCategorias((categoriasAtuais) =>
                categoriasAtuais.filter(
                    (categoria) =>
                        categoria.id_categoria !== id_categoria
                )
            );

            alert("Categoria removida com sucesso!");
        } catch (error) {
            console.error(
                `Erro ao remover categoria. ${error}`
            );

            alert(
                error instanceof Error
                    ? error.message
                    : "Não foi possível remover a categoria."
            );
        }
    };

    const removerCategoria = (id_categoria: number): void => {
        handleRemoverCategoria(id_categoria);
    };

    return (
        <main className="flex-1 bg-violet-50 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* CABEÇALHO */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">
                            Categorias
                        </h1>

                        <p className="text-sm text-slate-500">
                            Lista de categorias cadastradas
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/cadastro/categoria")
                        }
                        className="rounded-lg bg-violet-600 px-5 py-2.5 font-semibold text-white transition hover:bg-violet-700"
                    >
                        + Nova Categoria
                    </button>
                </div>

                {/* BUSCA */}
                <div className="mb-6">
                    <input
                        type="text"
                        value={busca}
                        onChange={handleBusca}
                        placeholder="Pesquisar categoria..."
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                    />
                </div>

                {/* TABELA */}
                <div className="overflow-hidden rounded-xl bg-white shadow">
                    {carregando ? (
                        <div className="p-8 text-center text-slate-500">
                            Carregando categorias...
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-violet-950 text-xs uppercase tracking-wide text-violet-100">
                                        <th className="px-6 py-4">
                                            ID
                                        </th>

                                        <th className="px-6 py-4">
                                            Nome
                                        </th>

                                        <th className="px-6 py-4 text-center">
                                            Ações
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {categoriasAtuais.length > 0 ? (
                                        categoriasAtuais.map(
                                            (categoria) => (
                                                <tr
                                                    key={
                                                        categoria.id_categoria
                                                    }
                                                    className="border-b border-slate-200 hover:bg-slate-50"
                                                >
                                                    <td className="px-6 py-4 text-sm text-slate-600">
                                                        {
                                                            categoria.id_categoria
                                                        }
                                                    </td>

                                                    <td className="px-6 py-4 font-medium text-slate-800">
                                                        {
                                                            categoria.nome
                                                        }
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <button
                                                                onClick={() =>
                                                                    navigate(`/detalhes/categoria/${categoria.id_categoria}`)
                                                                }
                                                                className="rounded-lg bg-purple-100 px-3 py-2 text-sm font-medium text-purple-700 transition hover:bg-purple-200"
                                                            >
                                                                Detalhes
                                                            </button>

                                                            <button
                                                                onClick={() =>
                                                                    navigate(`/atualizar/categoria/${categoria.id_categoria}`)
                                                                }
                                                                className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-600 transition hover:bg-emerald-100"
                                                            >
                                                                Editar
                                                            </button>

                                                            <button
                                                                onClick={() => removerCategoria(categoria.id_categoria)}
                                                                className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                                                            >
                                                                Excluir
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={3}
                                                className="px-6 py-8 text-center text-slate-500"
                                            >
                                                Nenhuma categoria encontrada.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* PAGINAÇÃO */}
                {!carregando &&
                    totalPages > 1 && (
                        <div className="mt-6 flex items-center justify-center gap-2">

                            <button
                                type="button"
                                disabled={currentPage === 1}
                                onClick={() =>
                                    setCurrentPage(
                                        currentPage - 1
                                    )
                                }
                                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Anterior
                            </button>

                            <span className="px-3 text-sm text-slate-600">
                                Página {currentPage} de{" "}
                                {totalPages}
                            </span>

                            <button
                                type="button"
                                disabled={
                                    currentPage === totalPages
                                }
                                onClick={() =>
                                    setCurrentPage(
                                        currentPage + 1
                                    )
                                }
                                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Próxima
                            </button>

                        </div>
                    )}
            </div>
        </main>
    );
}

export default ListagemCategorias;