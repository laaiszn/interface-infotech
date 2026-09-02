
import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import AtualizarProduto from "../../../components/Atualizar/AtualizarProduto";
import Rodape from "../../../components/Rodape/Rodape";

function PAtualizarProduto(): JSX.Element {
    return (
        <div className="flex min-h-screen flex-col bg-slate-100">
            <Navegacao />

            <AtualizarProduto />

            <Rodape />
        </div>
    );
}

export default PAtualizarProduto;

