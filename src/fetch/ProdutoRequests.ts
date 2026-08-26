import type ProdutoDTO from "../dto/ProdutoDTO";

const API_URL = "http://localhost:3000/api/produtos";

export async function listarProdutos(): Promise<ProdutoDTO[]> {
    const resposta = await fetch(API_URL);
    if (!resposta.ok) throw new Error("Erro ao listar produtos");
    return resposta.json();
}

export async function buscarProdutoPorId(idProduto: number): Promise<ProdutoDTO> {
    const resposta = await fetch(`${API_URL}/${idProduto}`);
    if (!resposta.ok) throw new Error("Erro ao buscar produto");
    return resposta.json();
}

export async function cadastrarProduto(
    produto: Omit<ProdutoDTO, "id_produto" | "ativo" | "data_cadastro">
): Promise<ProdutoDTO> {
    const resposta = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto),
    });
    if (!resposta.ok) {
        
        const erro = await resposta.json();
        throw new Error(erro.erro ?? erro.erros?.join(", ") ?? "Erro ao cadastrar produto");
    }
    return resposta.json();
}

export async function atualizarProduto(
    idProduto: number,
    produto: Omit<ProdutoDTO, "id_produto" | "ativo" | "data_cadastro">
): Promise<ProdutoDTO> {
    const resposta = await fetch(`${API_URL}/${idProduto}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto),
    });
    if (!resposta.ok) {
        const erro = await resposta.json();
        throw new Error(erro.erro ?? erro.erros?.join(", ") ?? "Erro ao atualizar produto");
    }
    return resposta.json();
}

export async function removerProduto(idProduto: number): Promise<void> {
    const resposta = await fetch(`${API_URL}/${idProduto}`, { method: "DELETE" });
    if (!resposta.ok) throw new Error("Erro ao remover produto");
}