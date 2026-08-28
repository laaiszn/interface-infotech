import { type JSX } from "react";
import Navegacao from "../../components/Navegacao/Navegacao";
import ListagemProdutos from "../../components/Listagens/ListagemProduto";
import Rodape from "../../components/Rodape/Rodape";

function PListagemProduto(): JSX.Element {
    return (
        <div className="flex min-h-screen flex-col bg-slate-100">
            <Navegacao />

            <ListagemProdutos />

            <Rodape />
        </div>
    );
}

export default PListagemProduto;
