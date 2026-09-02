import { useEffect, useState, type JSX } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MovimentacaoRequests from "../../fetch/MovimentacaoRequests";
import type MovimentacaoDTO from "../../dto/MovimentacaoDTO";

function DetalhesMovimentacao(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [movimentacao, setMovimentacao] =
        useState<MovimentacaoDTO | null>(null);

    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function buscarMovimentacao() {
            if (!id) return;

            const dados =
                await MovimentacaoRequests.obterMovimentacaoPorId(
                    Number(id)
                );

            if (dados) {
                setMovimentacao(dados);
            }

            setCarregando(false);
        }

        buscarMovimentacao();
    }, [id]);

    if (carregando) {
        return (
            <main className="flex flex-1 items-center justify-center">
                <p className="text-lg text-slate-600">
                    Carregando movimentação...
                </p>
            </main>
        );
    }

    if (!movimentacao) {
        return (
            <main className="flex flex-1 flex-col items-center justify-center gap-4">
                <p className="text-lg text-red-600">
                    Movimentação não encontrada.
                </p>

                <button
                    onClick={() =>
                        navigate("/lista/movimentacoes")
                    }
                    className="rounded-lg bg-slate-700 px-5 py-2 text-white hover:bg-slate-800"
                >
                    Voltar
                </button>
            </main>
        );
    }

    const valorTotal = Number(movimentacao.valor_total);
    const precoUnitario = Number(movimentacao.preco_unitario);

    return (
        <main className="flex-1 px-6 py-8">
            <div className="mx-auto max-w-4xl">

                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-800">
                        Detalhes da Movimentação
                    </h1>

                    <p className="mt-1 text-slate-500">
                        Visualize as informações da movimentação.
                    </p>
                </div>

                <div className="rounded-xl bg-white p-6 shadow-md">

                    <div className="grid gap-6 md:grid-cols-2">

                        {/* ID */}
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                ID da Movimentação
                            </p>

                            <p className="mt-1 text-lg font-semibold text-slate-800">
                                {movimentacao.id_movimentacao}
                            </p>
                        </div>

                        {/* ID Produto */}
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                ID do Produto
                            </p>

                            <p className="mt-1 text-lg font-semibold text-slate-800">
                                {movimentacao.id_produto}
                            </p>
                        </div>

                        {/* Tipo */}
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Tipo da Movimentação
                            </p>

                            <p className="mt-1 text-lg font-semibold text-slate-800">
                                {movimentacao.tipo_movimentacao}
                            </p>
                        </div>

                        {/* Quantidade */}
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Quantidade
                            </p>

                            <p className="mt-1 text-lg font-semibold text-slate-800">
                                {movimentacao.quantidade}
                            </p>
                        </div>

                        {/* Preço Unitário */}
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Preço Unitário
                            </p>

                            <p className="mt-1 text-lg font-semibold text-slate-800">
                                {new Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                }).format(precoUnitario)}
                            </p>
                        </div>

                        {/* Valor Total */}
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Valor Total
                            </p>

                            <p className="mt-1 text-lg font-semibold text-slate-800">
                                {new Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                }).format(valorTotal)}
                            </p>
                        </div>

                        {/* Data */}
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Data da Movimentação
                            </p>

                            <p className="mt-1 text-lg font-semibold text-slate-800">
                                {new Date(
                                    movimentacao.data_movimentacao
                                ).toLocaleString("pt-BR")}
                            </p>
                        </div>

                        {/* Motivo */}
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Motivo
                            </p>

                            <p className="mt-1 text-lg font-semibold text-slate-800">
                                {movimentacao.motivo || "Não informado"}
                            </p>
                        </div>

                        {/* Observação */}
                        <div className="md:col-span-2">
                            <p className="text-sm font-medium text-slate-500">
                                Observação
                            </p>

                            <p className="mt-1 text-lg text-slate-800">
                                {movimentacao.observacao ||
                                    "Nenhuma observação"}
                            </p>
                        </div>

                    </div>

                    {/* BOTÕES */}
                    <div className="mt-8 flex gap-3">

                        <button
                            onClick={() =>
                                navigate("/lista/movimentacoes")
                            }
                            className="rounded-lg bg-slate-200 px-5 py-2 font-medium text-slate-700 hover:bg-slate-300"
                        >
                            Voltar
                        </button>

                        <button
                            onClick={() =>
                                navigate(
                                    `/atualizar/movimentacao/${movimentacao.id_movimentacao}`
                                )
                            }
                            className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
                        >
                            Editar
                        </button>

                    </div>

                </div>
            </div>
        </main>
    );
}

export default DetalhesMovimentacao;