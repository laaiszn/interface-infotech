
import {
    useEffect,
    useState,
    type JSX,
    type ChangeEvent,
    type FormEvent,
} from "react";

import { useNavigate, useParams } from "react-router-dom";

import MovimentacaoRequests from "../../fetch/MovimentacaoRequests";
import type MovimentacaoDTO from "../../dto/MovimentacaoDTO";

function AtualizarMovimentacao(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [movimentacao, setMovimentacao] =
        useState<MovimentacaoDTO | null>(null);

    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);

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

    function alterarCampo(
        evento: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) {
        if (!movimentacao) return;

        setMovimentacao({
            ...movimentacao,
            [evento.target.name]: evento.target.value,
        });
    }

    async function salvar(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault();

        if (!id || !movimentacao) return;

        setSalvando(true);

        const sucesso =
            await MovimentacaoRequests.atualizarMovimentacao(
                Number(id),
                {
                    ...movimentacao,
                    id_produto: Number(movimentacao.id_produto),
                    quantidade: Number(movimentacao.quantidade),
                    preco_unitario: Number(
                        movimentacao.preco_unitario
                    ),
                    valor_total: Number(movimentacao.valor_total),
                }
            );

        setSalvando(false);

        if (sucesso) {
            alert("Movimentação atualizada com sucesso!");
            navigate("/lista/movimentacoes");
        } else {
            alert("Não foi possível atualizar a movimentação.");
        }
    }

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
            <main className="flex flex-1 items-center justify-center">
                <p className="text-lg text-red-600">
                    Movimentação não encontrada.
                </p>
            </main>
        );
    }

    return (
        <main className="flex-1 px-6 py-8">
            <div className="mx-auto max-w-3xl">

                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-800">
                        Atualizar Movimentação
                    </h1>

                    <p className="mt-1 text-slate-500">
                        Altere os dados da movimentação.
                    </p>
                </div>

                <form
                    onSubmit={salvar}
                    className="rounded-xl bg-white p-6 shadow-md"
                >

                    <div className="grid gap-5 md:grid-cols-2">

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-600">
                                ID
                            </label>

                            <input
                                type="text"
                                value={movimentacao.id_movimentacao}
                                disabled
                                className="w-full rounded-lg border border-slate-300 bg-slate-100 px-4 py-2 text-slate-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-600">
                                ID do Produto
                            </label>

                            <input
                                type="number"
                                name="id_produto"
                                value={movimentacao.id_produto}
                                onChange={alterarCampo}
                                required
                                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-600">
                                Tipo da Movimentação
                            </label>

                            <select
                                name="tipo_movimentacao"
                                value={movimentacao.tipo_movimentacao}
                                onChange={alterarCampo}
                                required
                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 outline-none focus:border-blue-500"
                            >
                                <option value="">
                                    Selecione
                                </option>

                                <option value="ENTRADA">
                                    Entrada
                                </option>

                                <option value="SAIDA">
                                    Saída
                                </option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-600">
                                Quantidade
                            </label>

                            <input
                                type="number"
                                name="quantidade"
                                value={movimentacao.quantidade}
                                onChange={alterarCampo}
                                required
                                min="1"
                                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-600">
                                Preço Unitário
                            </label>

                            <input
                                type="number"
                                name="preco_unitario"
                                value={movimentacao.preco_unitario}
                                onChange={alterarCampo}
                                required
                                step="0.01"
                                min="0"
                                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-600">
                                Valor Total
                            </label>

                            <input
                                type="number"
                                name="valor_total"
                                value={movimentacao.valor_total}
                                onChange={alterarCampo}
                                required
                                step="0.01"
                                min="0"
                                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-600">
                                Data da Movimentação
                            </label>

                            <input
                                type="datetime-local"
                                name="data_movimentacao"
                                value={
                                    movimentacao.data_movimentacao
                                        ? movimentacao.data_movimentacao.slice(
                                              0,
                                              16
                                          )
                                        : ""
                                }
                                onChange={alterarCampo}
                                required
                                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-600">
                                Motivo
                            </label>

                            <input
                                type="text"
                                name="motivo"
                                value={movimentacao.motivo || ""}
                                onChange={alterarCampo}
                                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-slate-600">
                                Observação
                            </label>

                            <textarea
                                name="observacao"
                                value={movimentacao.observacao || ""}
                                onChange={alterarCampo}
                                rows={4}
                                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
                            />
                        </div>

                    </div>

                    <div className="mt-8 flex gap-3">

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/lista/movimentacoes")
                            }
                            className="rounded-lg bg-slate-200 px-5 py-2 font-medium text-slate-700 hover:bg-slate-300"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={salvando}
                            className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {salvando
                                ? "Salvando..."
                                : "Salvar"}
                        </button>

                    </div>

                </form>
            </div>
        </main>
    );
}

export default AtualizarMovimentacao;

