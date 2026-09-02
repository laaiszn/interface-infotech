import { useEffect, useState, type JSX } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProdutoRequests from "../../fetch/ProdutoRequests";
import type ProdutoDTO from "../../dto/ProdutoDTO";

function DetalhesProduto(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [produto, setProduto] = useState<ProdutoDTO | null>(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function buscarProduto() {
            if (!id) return;

            const dados = await ProdutoRequests.obterProdutoPorId(
                Number(id)
            );

            if (dados) {
                setProduto(dados);
            }

            setCarregando(false);
        }

        buscarProduto();
    }, [id]);

    if (carregando) {
        return (
            <main className="flex flex-1 items-center justify-center">
                <p className="text-lg text-slate-600">
                    Carregando produto...
                </p>
            </main>
        );
    }

    if (!produto) {
        return (
            <main className="flex flex-1 flex-col items-center justify-center gap-4">
                <p className="text-lg text-red-600">
                    Produto não encontrado.
                </p>

                <button
                    onClick={() => navigate("/lista/produtos")}
                    className="rounded-lg bg-slate-700 px-5 py-2 text-white hover:bg-slate-800"
                >
                    Voltar
                </button>
            </main>
        );
    }

    return (
        <main className="flex-1 px-6 py-8">
            <div className="mx-auto max-w-4xl">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-800">
                        Detalhes do Produto
                    </h1>

                    <p className="mt-1 text-slate-500">
                        Visualize as informações do produto.
                    </p>
                </div>

                <div className="rounded-xl bg-white p-6 shadow-md">
                    <div className="grid gap-6 md:grid-cols-2">

                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                ID
                            </p>

                            <p className="mt-1 text-lg font-semibold text-slate-800">
                                {produto.id_produto}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Nome
                            </p>

                            <p className="mt-1 text-lg font-semibold text-slate-800">
                                {produto.nome}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Código
                            </p>

                            <p className="mt-1 text-lg font-semibold text-slate-800">
                                {produto.codigo}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Preço
                            </p>

                            <p className="mt-1 text-lg font-semibold text-slate-800">
                                {new Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                }).format(Number(produto.preco_unitario))}
                            </p>
                        </div>

                        <div className="md:col-span-2">
                            <p className="text-sm font-medium text-slate-500">
                                Descrição
                            </p>

                            <p className="mt-1 text-lg text-slate-800">
                                {produto.descricao || "Sem descrição"}
                            </p>
                        </div>

                    </div>

                    <div className="mt-8 flex gap-3">
                        <button
                            onClick={() => navigate("/lista/produtos")}
                            className="rounded-lg bg-slate-200 px-5 py-2 font-medium text-slate-700 hover:bg-slate-300"
                        >
                            Voltar
                        </button>

                        <button
                            onClick={() =>
                                navigate(
                                    `/atualizar/produto/${produto.id_produto}`
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

export default DetalhesProduto;