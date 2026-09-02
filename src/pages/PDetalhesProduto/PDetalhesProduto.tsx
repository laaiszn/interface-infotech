import { type JSX } from "react";
import Navegacao from "../../components/Navegacao/Navegacao";
import DetalhesProduto from "../../components/Detalhes/DetalhesProdutos";
import Rodape from "../../components/Rodape/Rodape";

function PDetalhesProduto(): JSX.Element {
    return (
        <div className="flex min-h-screen flex-col bg-slate-100">
            <Navegacao />

            <DetalhesProduto />

            <Rodape />
        </div>
    );
}

export default PDetalhesProduto;