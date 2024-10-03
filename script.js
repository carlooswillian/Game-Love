const palavras = [
    { palavra: "amor", dica: "Sentimento forte." },
    { palavra: "casa", dica: "Lugar onde moramos." },
    { palavra: "cachorro", dica: "Melhor amigo do homem." },
    { palavra: "viagem", dica: "Ir a outro lugar." }
];

let palavraAtual;
let acertos = 0;

function iniciarJogo() {
    acertos = 0;
    proximaPalavra();
}

function proximaPalavra() {
    if (palavras.length === 0) {
        document.getElementById("resultado").innerText = "Espere pelo próximo jogo, eu te amo pra sempre ♡";
        return;
    }

    palavraAtual = palavras.shift();
    document.getElementById("dica").innerText = palavraAtual.dica;
    document.getElementById("forca").innerText = "_ ".repeat(palavraAtual.palavra.length);
}

function tentar() {
    const letra = document.getElementById("letra").value.toLowerCase();
    const palavra = palavraAtual.palavra.toLowerCase();
    
    if (palavra.includes(letra)) {
        acertos++;
        if (acertos === palavra.length) {
            tocarVideo(acertos);
        } else {
            document.getElementById("resultado").innerText = "Acertou! Continue!";
            // Atualizar a forca na tela (para simplificação, não implementado aqui)
        }
    } else {
        document.getElementById("resultado").innerText = "Errou! Tente novamente!";
    }

    document.getElementById("letra").value = '';
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

    videoSource.src = videos[acertos - 1];
    videoElement.load();
    document.getElementById("videoContainer").classList.remove("hidden");
    
    videoElement.onended = () => {
        document.getElementById("videoContainer").classList.add("hidden");
        proximaPalavra();
    };

    videoElement.play();
}

// Iniciar o jogo ao carregar a página
window.onload = iniciarJogo;
