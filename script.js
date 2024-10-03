const palavras = [
    { palavra: "amor", dica: "Sentimento forte." },
    { palavra: "casa", dica: "Lugar onde moramos." },
    { palavra: "cachorro", dica: "Melhor amigo do homem." },
    { palavra: "viagem", dica: "Ir a outro lugar." }
];

let palavraAtual;
let acertos = 0;
let letrasTentadas = [];

function iniciarJogo() {
    acertos = 0;
    letrasTentadas = [];
    proximaPalavra();
    criarTeclado();
}

function proximaPalavra() {
    if (palavras.length === 0) {
        document.getElementById("resultado").innerText = "Espere pelo próximo jogo, eu te amo pra sempre ♡";
        return;
    }

    palavraAtual = palavras.shift();
    document.getElementById("dica").innerText = palavraAtual.dica;
    atualizarForca();
}

function criarTeclado() {
    const teclado = document.getElementById("teclado");
    teclado.innerHTML = ""; // Limpa o teclado anterior

    const letras = "abcdefghijklmnopqrstuvwxyz".split("");
    letras.forEach(letra => {
        const tecla = document.createElement("div");
        tecla.className = "tecla";
        tecla.innerText = letra.toUpperCase();
        tecla.onclick = () => tentar(letra); // Corrigido para garantir que a letra seja passada
        teclado.appendChild(tecla);
    });
}

function atualizarForca() {
    const forcaElement = document.getElementById("forca");
    forcaElement.innerHTML = "";

    palavraAtual.palavra.split("").forEach(letra => {
        const letraElement = document.createElement("span");
        letraElement.innerText = letrasTentadas.includes(letra) ? letra : "_"; // Mostra a letra ou underscore
        letraElement.style.marginRight = "5px"; // Espaço entre as letras
        forcaElement.appendChild(letraElement);
    });
}

function tentar(letra) {
    if (letrasTentadas.includes(letra)) {
        return; // Já tentou essa letra
    }
    
    letrasTentadas.push(letra);

    const tecla = document.querySelector(`.tecla:contains(${letra.toUpperCase()})`);
    if (palavraAtual.palavra.includes(letra)) {
        tecla.classList.add("acertou");
    } else {
        tecla.classList.add("errou");
    }

    atualizarForca();

    if (palavraAtual.palavra.split("").every(letra => letrasTentadas.includes(letra))) {
        tocarVideo();
    }

    document.getElementById("resultado").innerText = "";
}

function tocarVideo() {
    const videos = [
        "video1.mp4", // Substitua pelo caminho do seu vídeo
        "video2.mp4", // Substitua pelo caminho do seu vídeo
        "video3.mp4", // Substitua pelo caminho do seu vídeo
        "video4.mp4"  // Substitua pelo caminho do seu vídeo
    ];
    
    const videoElement = document.getElementById("video");
    const videoSource = document.getElementById("videoSource");

    videoSource.src = videos[acertos];
    videoElement.load();
    document.getElementById("videoContainer").classList.remove("hidden");
    
    videoElement.onended = () => {
        document.getElementById("videoContainer").classList.add("hidden");
        acertos++; // Aumenta o contador de acertos para o próximo vídeo
        proximaPalavra();
    };

    videoElement.play();
}

// Iniciar o jogo ao carregar a página
window.onload = iniciarJogo;
