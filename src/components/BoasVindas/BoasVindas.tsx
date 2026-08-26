import { type JSX } from "react";

function BoasVindas(): JSX.Element {
    return (
        <main className="flex-1 bg-gray-200 flex flex-col items-center justify-center px-4 py-16 sm:py-24 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                InfoTech
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
                Seja bem-vindo ao InfoTech, a sua loja de produtos de tecnologia! Explore nossa ampla variedade de produtos,
                 desde os mais recentes gadgets até acessórios essenciais para o seu dia a dia. Aproveite nossas 
                 ofertas exclusivas e descubra as últimas tendências em tecnologia. E
                 estamos aqui para proporcionar a melhor experiência de compra para você!
            </p>
        </main>
    );
}

export default BoasVindas;