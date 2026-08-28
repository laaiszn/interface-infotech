import { type JSX } from "react";

function BoasVindas(): JSX.Element {
    return (
        <main className="flex-1 bg-slate-100 flex items-center justify-center px-6 py-20">
            <section className="max-w-4xl text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-800 mb-6">
                    InfoTech
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed">
                    Seja bem-vindo ao InfoTech, a sua loja de produtos de tecnologia!
                    Explore nossa ampla variedade de produtos, desde os mais recentes
                    gadgets até acessórios essenciais para o seu dia a dia.
                    Aproveite nossas ofertas exclusivas e descubra as últimas tendências
                    em tecnologia. Estamos aqui para proporcionar a melhor experiência
                    de compra para você!
                </p>
            </section>
        </main>
    );
}

export default BoasVindas;
