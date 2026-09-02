import { type JSX } from "react";
import Navegacao from "../../components/Navegacao/Navegacao";
import ListagemCategorias from "../../components/Listagens/ListagemCategoria";
import Rodape from "../../components/Rodape/Rodape";

function PListagemCategoria(): JSX.Element {
    return (
        <div className="flex min-h-screen flex-col bg-slate-100">
            <Navegacao />

            <ListagemCategorias />

            <Rodape />
        </div>
    );
}

export default PListagemCategoria;