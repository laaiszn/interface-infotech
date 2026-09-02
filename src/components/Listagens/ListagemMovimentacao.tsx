import {
    useState,
    useEffect,
    type JSX,
    type ChangeEvent,
} from "react";
import type MovimentacaoDTO from "../../dto/MovimentacaoDTO";
import MovimentacaoRequests from "../../fetch/MovimentacaoRequests";
import { useNavigate } from "react-router-dom";

function ListagemMovimentacoes(): JSX.Element {
    const [movimentacoes, setMovimentacoes] = useState<MovimentacaoDTO[]>([]);
    const [busca, setBusca] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [carregando, setCarregando] = useState(true);

    const rowsPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        const buscarMovimentacoes = async () => {
            try {
                setCarregando(true);

                const listaDeMovimentacoes =
                    await MovimentacaoRequests.obterListaDeMovimentacoes();

                setMovimentacoes(listaDeMovimentacoes ?? []);
            } catch (error) {
                console.error(
                    `Erro ao buscar movimentações. ${error}`
                );

                alert(
                    "Erro ao carregar a listagem de movimentações."
                );
            } finally {
                setCarregando(false);
            }
        };

        buscarMovimentacoes();
    }, []);

    /* FILTRO */
    const movimentacoesFiltradas = movimentacoes.filter(
        (movimentacao) => {
            const termo = busca.toLowerCase().trim();

            if (!termo) {
                return true;
            }

            return (
                movimentacao.id_movimentacao
                    .toString()
                    .includes(termo) ||
                movimentacao.id_produto
                    .toString()
                    .includes(termo) ||
                movimentacao.tipo_movimentacao
                    ?.toLowerCase()
                    .includes(termo) ||
                movimentacao.motivo
                    ?.toLowerCase()
                    .includes(termo)
            );
        }
    );

    /* PAGINAÇÃO */
    const totalPages = Math.ceil(
        movimentacoesFiltradas.length / rowsPerPage
    );

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;

    const movimentacoesAtuais =
        movimentacoesFiltradas.slice(
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
    const handleRemoverMovimentacao = async (
        id_movimentacao: number
    ) => {
        const confirmar = window.confirm(
            "Você realmente deseja remover esta movimentação?"
        );

        if (!confirmar) {
            return;
        }

        try {
            await MovimentacaoRequests.removerMovimentacao(
                id_movimentacao
            );

            setMovimentacoes((listaAtual) =>
                listaAtual.filter(
                    (movimentacao) =>
                        movimentacao.id_movimentacao !==
                        id_movimentacao
                )
            );

            alert("Movimentação removida com sucesso!");
        } catch (error) {
            console.error(
                `Erro ao remover movimentação. ${error}`
            );

            alert(
                error instanceof Error
                    ? error.message
                    : "Não foi possível remover a movimentação."
            );
        }
    };

    /* FORMATAÇÃO */
    const formatarPreco = (valor: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(valor);
    };

    const formatarData = (data: string) => {
        if (!data) {
            return "-";
        }

        return new Date(data).toLocaleDateString("pt-BR");
    };

    return (
        <main className="flex-1 bg-violet-50 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* CABEÇALHO */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-slate-800">
                        Movimentações
                    </h1>

                    <p className="text-sm text-slate-500">
                        Lista de movimentações cadastradas
                    </p>
                </div>

                {/* BUSCA */}
                <div className="mb-6">
                    <input
                        type="text"
                        value={busca}
                        onChange={handleBusca}
                        placeholder="Pesquisar movimentação..."
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                    />
                </div>

                {/* TABELA */}
                <div className="overflow-hidden rounded-xl bg-white shadow">
                    {carregando ? (
                        <div className="p-8 text-center text-slate-500">
                            Carregando movimentações...
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-violet-950 text-xs uppercase tracking-wide text-violet-100">
                                
                                 
                                        <th className="px-4 py-4">
                                            ID
                                        </th>

                                        <th className="px-4 py-4">
                                            Produto
                                        </th>

                                        <th className="px-4 py-4">
                                            Tipo
                                        </th>

                                        <th className="px-4 py-4">
                                            Quantidade
                                        </th>

                                        <th className="px-4 py-4">
                                            Preço
                                        </th>

                                        <th className="px-4 py-4">
                                            Data
                                        </th>

                                        <th className="px-4 py-4 text-center">
                                            Ações
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {movimentacoesAtuais.length > 0 ? (
                                        movimentacoesAtuais.map(
                                            (movimentacao) => (
                                                <tr
                                                    key={
                                                        movimentacao.id_movimentacao
                                                    }
                                                    className="border-b border-slate-200 hover:bg-slate-50"
                                                >
                                                    <td className="px-4 py-4 text-sm text-slate-600">
                                                        {
                                                            movimentacao.id_movimentacao
                                                        }
                                                    </td>

                                                    <td className="px-4 py-4 text-sm text-slate-600">
                                                        {
                                                            movimentacao.id_produto
                                                        }
                                                    </td>

                                                    <td className="px-4 py-4 font-medium text-slate-800">
                                                        {
                                                            movimentacao.tipo_movimentacao
                                                        }
                                                    </td>

                                                    <td className="px-4 py-4 text-sm text-slate-600">
                                                        {
                                                            movimentacao.quantidade
                                                        }
                                                    </td>

                                                    <td className="px-4 py-4 text-sm text-slate-600">
                                                        {formatarPreco(
                                                            movimentacao.preco_unitario
                                                        )}
                                                    </td>

                                                    <td className="px-4 py-4 text-sm text-slate-600">
                                                        {formatarData(
                                                            movimentacao.data_movimentacao
                                                        )}
                                                    </td>

                                                    <td className="px-4 py-4">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <button
                                                                onClick={() =>
                                                                    navigate(`/detalhes/movimentacao/${movimentacao.id_movimentacao}`)
                                                                }
                                                                className="rounded-lg bg-purple-100 px-3 py-2 text-sm font-medium text-purple-700 transition hover:bg-purple-200"
                                                            >
                                                                Detalhes
                                                            </button>

                                                            <button
                                                                onClick={() =>
                                                                    navigate(`/atualizar/movimentacao/${movimentacao.id_movimentacao}`)
                                                                }
                                                                className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-600 transition hover:bg-emerald-100"
                                                            >
                                                                Editar
                                                            </button>

                                                            <button
                                                                onClick={() => handleRemoverMovimentacao(movimentacao.id_movimentacao)}
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
                                                colSpan={7}
                                                className="px-6 py-8 text-center text-slate-500"
                                            >
                                                Nenhuma movimentação encontrada.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* PAGINAÇÃO */}
                {!carregando && totalPages > 1 && (
                    <div className="mt-6 flex items-center justify-center gap-2">

                        <button
                            type="button"
                            disabled={currentPage === 1}
                            onClick={() =>
                                setCurrentPage(currentPage - 1)
                            }
                            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Anterior
                        </button>

                        <span className="px-3 text-sm text-slate-600">
                            Página {currentPage} de {totalPages}
                        </span>

                        <button
                            type="button"
                            disabled={currentPage === totalPages}
                            onClick={() =>
                                setCurrentPage(currentPage + 1)
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

export default ListagemMovimentacoes;