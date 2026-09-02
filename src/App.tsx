import "./App.css";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import PHome from "./pages/PHome/PHome";
import PLogin from "./pages/PLogin/PLogin";
import PListagemProduto from "./pages/PListagemProduto/PListagemProduto";
import PListagemCategoria from "./pages/PListagemCategoria/PListagemCategoria";
import PListagemMovimentacao from "./pages/PListagemMovimetacao/PListagemMovimentacao";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<PHome />}
                />

                <Route
                    path="/login"
                    element={<PLogin />}
                />

     
                <Route
                    path="/lista/produtos"
                    element={<PListagemProduto />}
                />

          
                <Route
                    path="/lista/categorias"
                    element={<PListagemCategoria />}
                />

                <Route
                    path="/lista/movimentacoes"
                    element={<PListagemMovimentacao />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;