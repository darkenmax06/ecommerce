import "./hero.css"

function Hero (){
    return (
        <main className="hero" id="hero">
            <div className="hero__container">
                <video 
                    src="/hero.mp4" 
                    autoPlay 
                    muted 
                    loop className="hero__bg"></video>
                <div className="hero__textbox">
                    <img src="/logow.png" alt="" />
                    <h2 className="h5" >No son solo marcas, es actitud</h2>
                    <h1 className="title" >Viste el éxito, refleja poder</h1>
                    <p>Articulos premium que combinan lujo y calle para quienes saben lo que valen. Hecha un vistazo a los articulos dando click abajo</p>
                    <a href="#products" className="hero__btn">
                        Ver productos
                    </a>
                </div>
            </div>
        </main>
    )
}

export default Hero