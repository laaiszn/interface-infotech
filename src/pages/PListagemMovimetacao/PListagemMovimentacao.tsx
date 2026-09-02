import { type JSX } from "react";
import Navegacao from "../../components/Navegacao/Navegacao";
import ListagemMovimentacoes from "../../components/Listagens/ListagemMovimentacao";
import Rodape from "../../components/Rodape/Rodape";

function PListagemMovimentacao(): JSX.Element {
    return (
        <div className="flex min-h-screen flex-col bg-slate-100">
            <Navegacao />

            <ListagemMovimentacoes />

            <Rodape />
        </div>
    );
}

export default PListagemMovimentacao;