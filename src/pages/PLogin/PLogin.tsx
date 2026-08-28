import { type JSX } from "react";
import Navegacao from "../../components/Navegacao/Navegacao";
import LoginForm from "../../components//FormLogin/FormLogin";
import Rodape from "../../components/Rodape/Rodape";


function PLogin(): JSX.Element {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Renderiza o cabeçalho da página */}
            <Navegacao />

            {/* Renderiza o formulário de login */}
            <LoginForm />

            <Rodape />
        </div>
    );
}

export default PLogin;