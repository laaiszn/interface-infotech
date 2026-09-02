import { useEffect, useState, type JSX } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CategoriaRequests from "../../fetch/CategoriaRequests";
import type CategoriaDTO from "../../dto/CategoriaDTO";

function DetalhesCategoria(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [categoria, setCategoria] = useState<CategoriaDTO | null>(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function buscarCategoria() {
            if (!id) return;

            const dados = await CategoriaRequests.obterCategoriaPorId(
                Number(id)
            );

            if (dados) {
                setCategoria(dados);
            }

            setCarregando(false);
        }

        buscarCategoria();
    }, [id]);

    if (carregando) {
        return (
            <main className="flex flex-1 items-center justify-center">
                <p className="text-lg text-slate-600">
                    Carregando categoria...
                </p>
            </main>
        );
    }

    if (!categoria) {
        return (
            <main className="flex flex-1 flex-col items-center justify-center gap-4">
                <p className="text-lg text-red-600">
                    Categoria não encontrada.
                </p>

                <button
                    onClick={() => navigate("/lista/categorias")}
                    className="rounded-lg bg-slate-700 px-5 py-2 text-white hover:bg-slate-800"
                >
                    Voltar
                </button>
            </main>
        );
    }

    return (
        <main className="flex-1 px-6 py-8">
            <div className="mx-auto max-w-3xl">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-800">
                        Detalhes da Categoria
                    </h1>

                    <p className="mt-1 text-slate-500">
                        Visualize as informações da categoria.
                    </p>
                </div>

                <div className="rounded-xl bg-white p-6 shadow-md">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                ID
                            </p>

                            <p className="mt-1 text-lg font-semibold text-slate-800">
                                {categoria.id_categoria}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Nome
                            </p>

                            <p className="mt-1 text-lg font-semibold text-slate-800">
                                {categoria.nome}
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 flex gap-3">
                        <button
                            onClick={() =>
                                navigate("/lista/categorias")
                            }
                            className="rounded-lg bg-slate-200 px-5 py-2 font-medium text-slate-700 hover:bg-slate-300"
                        >
                            Voltar
                        </button>

                        <button
                            onClick={() =>
                                navigate(
                                    `/atualizar/categoria/${categoria.id_categoria}`
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

export default DetalhesCategoria;