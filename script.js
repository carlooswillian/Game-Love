const palavras = [
    { palavra: "BETO CARRERO WORLD", dica: "Foi um dia divertido e muito engraçado." },
    { palavra: "PORTILLO", dica: "Lugar mais frio que já fomos." },
    { palavra: "CONQUISTAS", dica: "Que Deus continue nos abençoando com muitas..." },
    { palavra: "AMOR Y PASTA", dica: "Pedacinho da Itália." }
];

let palavraAtual;
let acertos = 0;
let letrasTentadas = [];
let erros = 0;

function iniciarJogo() {
    acertos = 0;
    letrasTentadas = [];
    erros = 0;
    document.getElementById("contadorErros").innerText = "Erros: 0";
    proximaPalavra();
    criarTeclado();
}

function proximaPalavra() {
    if (palavras.length === 0) {
        return;
    }

    palavraAtual = palavras.shift();
    letrasTentadas = [];
    document.getElementById("dica").innerText = `Dica: ${palavraAtual.dica}`;
    atualizarForca();
    resetarTeclado();
    erros = 0;  // Reinicia o contador de erros
    document.getElementById("contadorErros").innerText = "Erros: 0";
}

function criarTeclado() {
    const teclado = document.getElementById("teclado");
    teclado.innerHTML = "";

    const letras = "abcdefghijklmnopqrstuvwxyz".split("");
    letras.forEach(letra => {
        const tecla = document.createElement("div");
        tecla.className = "tecla";
        tecla.innerText = letra.toUpperCase();
        tecla.onclick = () => tentar(letra);
        teclado.appendChild(tecla);
    });
}

function resetarTeclado() {
    const teclas = document.getElementsByClassName("tecla");
    Array.from(teclas).forEach(tecla => {
        tecla.classList.remove("acertou", "errou");
    });
}

function atualizarForca() {
    const forcaElement = document.getElementById("forca");
    forcaElement.innerHTML = "";

    palavraAtual.palavra.split("").forEach(letra => {
        const letraElement = document.createElement("span");
        if (letra === " ") {
            letraElement.innerText = " ";  // Mantém os espaços
        } else {
            letraElement.innerText = letrasTentadas.includes(letra.toLowerCase()) ? letra.toUpperCase() : "_";
        }
        letraElement.style.marginRight = "5px";
        forcaElement.appendChild(letraElement);
    });
}

function tentar(letra) {
    letra = letra.toUpperCase();  // Garante que a letra tentada esteja em maiúsculas

    if (letrasTentadas.includes(letra)) {
        return;
    }

    letrasTentadas.push(letra);

    const tecla = Array.from(document.getElementsByClassName("tecla")).find(tecla => tecla.innerText === letra);

    if (palavraAtual.palavra.includes(letra)) {
        tecla.classList.add("acertou");
    } else {
        tecla.classList.add("errou");
        erros++;  // Incrementa o contador de erros
        document.getElementById("contadorErros").innerText = `Erros: ${erros}`;
    }

    atualizarForca();

    if (palavraAtual.palavra.replace(/\s/g, "").split("").every(letra => letrasTentadas.includes(letra.toUpperCase()))) {
        tocarVideo();
    }
}

function tocarVideo() {
    const videos = [
        "Video1.mp4",
        "Video2.mp4",
        "Video3.mp4",
        "Video4.mp4"
    ];

    if (acertos < videos.length) {
        const videoElement = document.getElementById("video");
        const videoSource = document.getElementById("videoSource");

        const videoCaminho = videos[acertos];
        videoSource.src = videoCaminho;

        videoElement.load();
        document.getElementById("videoContainer").classList.remove("hidden");

        videoElement.onended = () => {
            document.getElementById("videoContainer").classList.add("hidden");
            acertos++;
            if (acertos < videos.length) {
                proximaPalavra();
            } else {
                window.location.href = "final.html";
            }
        };

        videoElement.play().catch(error => {
            console.error("Erro ao tentar reproduzir o vídeo:", error);
            alert("Não foi possível reproduzir o vídeo. Verifique se o arquivo existe e está no formato correto.");
        });
    }
}

window.onload = iniciarJogo;
