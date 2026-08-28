import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type ProdutoDTO from '../../../dto/ProdutoDTO';
import type CategoriaDTO from '../../../dto/CategoriaDTO';
import ProdutoRequests from '../../../fetch/ProdutoRequests';
import CategoriaRequests from '../../../fetch/CategoriaRequests';

function FormProduto() {
    const navigate = useNavigate();
    const [categorias, setCategorias] = useState<CategoriaDTO[]>([]);
    const [formData, setFormData] = useState<ProdutoDTO>({
        id_categoria: 0,
        codigo: '',
        nome: '',
        descricao: '',
        preco_unitario: 0,
        quantidade_disponivel: 0,
        quantidade_minima: 0,
    });

    useEffect(() => {
        const carregarCategorias = async () => {
            const resposta = await CategoriaRequests.listarCategorias();
            if (resposta !== null && resposta !== undefined) {
                setCategorias(resposta);
            }
        };
        carregarCategorias();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === 'number') {
            setFormData(prev => ({ ...prev, [name]: Number(value) }));
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const resposta = await ProdutoRequests.enviarFormularioProduto(formData);
        if (resposta !== null && resposta !== undefined) {
            alert("Produto cadastrado com sucesso");
            navigate('/lista/produtos');
        } else {
            alert("Erro ao cadastrar produto");
        }
    };

    return (
        <main className="bg-gray-100 flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 border border-slate-200">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold text-slate-800 mb-8 sm:mb-12">
                        Cadastro de Produto
                    </h1>

                    <div className="space-y-6 sm:space-y-8">
                        {/* Linha 1: Categoria e Código */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="id_categoria" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Categoria
                                </label>
                                <select
                                    name="id_categoria"
                                    id="id_categoria"
                                    required
                                    onChange={handleChange}
                                    defaultValue=""
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all"
                                >
                                    <option value="" disabled>Selecione a categoria</option>
                                    {categorias.map((categoria) => (
                                        <option key={categoria.id_categoria} value={categoria.id_categoria}>
                                            {categoria.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex-1">
                                <label htmlFor="codigo" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Código
                                </label>
                                <input
                                    type="text"
                                    name="codigo"
                                    id="codigo"
                                    required
                                    maxLength={20}
                                    onChange={handleChange}
                                    placeholder="Ex: MON-001"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        {/* Linha 2: Nome e Preço Unitário */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="nome" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    name="nome"
                                    id="nome"
                                    required
                                    minLength={2}
                                    maxLength={100}
                                    onChange={handleChange}
                                    placeholder="Digite o nome do produto"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="preco_unitario" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Preço Unitário (R$)
                                </label>
                                <input
                                    type="number"
                                    name="preco_unitario"
                                    id="preco_unitario"
                                    required
                                    min={0}
                                    step={0.01}
                                    onChange={handleChange}
                                    placeholder="Ex: 899.90"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        {/* Linha 3: Descrição */}
                        <div className="flex-1">
                            <label htmlFor="descricao" className="block text-sm font-semibold text-slate-700 mb-2">
                                Descrição
                            </label>
                            <textarea
                                name="descricao"
                                id="descricao"
                                maxLength={255}
                                onChange={handleChange}
                                placeholder="Descrição do produto (opcional)"
                                rows={3}
                                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                            />
                        </div>

                        {/* Linha 4: Quantidades */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="quantidade_disponivel" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Quantidade Disponível
                                </label>
                                <input
                                    type="number"
                                    name="quantidade_disponivel"
                                    id="quantidade_disponivel"
                                    required
                                    min={0}
                                    onChange={handleChange}
                                    placeholder="Ex: 10"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="quantidade_minima" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Quantidade Mínima
                                </label>
                                <input
                                    type="number"
                                    name="quantidade_minima"
                                    id="quantidade_minima"
                                    required
                                    min={0}
                                    onChange={handleChange}
                                    placeholder="Ex: 2"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 sm:mt-14 space-y-4">
                        <input
                            type="submit"
                            value="CADASTRAR PRODUTO"
                            className="w-full bg-slate-800 text-white py-4 rounded-xl font-bold text-lg cursor-pointer hover:bg-slate-700 shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                        />
                        <button
                            type="button"
                            onClick={() => navigate('/lista/produtos')}
                            className="w-full bg-white border-2 border-slate-300 text-slate-600 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all active:scale-[0.98]"
                        >
                            VOLTAR PARA LISTAGEM
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default FormProduto;