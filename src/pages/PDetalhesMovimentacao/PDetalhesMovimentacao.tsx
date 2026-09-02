import { type JSX } from "react";
import Navegacao from "../../components/Navegacao/Navegacao";
import DetalhesMovimentacao from "../../components/Detalhes/DetalhesMovimentacao";
import Rodape from "../../components/Rodape/Rodape";

function PDetalhesMovimentacao(): JSX.Element {
    return (
        <div className="flex min-h-screen flex-col bg-slate-100">
            <Navegacao />

            <DetalhesMovimentacao />

            <Rodape />
        </div>
    );
}

export default PDetalhesMovimentacao;