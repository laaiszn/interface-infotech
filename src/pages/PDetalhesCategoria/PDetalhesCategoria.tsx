import { type JSX } from "react";
import Navegacao from "../../components/Navegacao/Navegacao";
import DetalhesCategoria from "../../components/Detalhes/DetalhesCategoria";
import Rodape from "../../components/Rodape/Rodape";

function PDetalhesCategoria(): JSX.Element {
    return (
        <div className="flex min-h-screen flex-col bg-slate-100">
            <Navegacao />

            <DetalhesCategoria />

            <Rodape />
        </div>
    );
}

export default PDetalhesCategoria;