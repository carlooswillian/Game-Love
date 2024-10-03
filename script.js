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
    criarTeclado();  // Cria o teclado ao iniciar
}

function proximaPalavra() {
    if (palavras.length === 0) {
        document.getElementById("resultado").innerText = "Espere pelo próximo jogo, eu te amo pra sempre ♡";
        return;
    }

    palavraAtual = palavras.shift();
    letrasTentadas = []; // Reseta as letras tentadas para a nova palavra
    atualizarForca();
    resetarTeclado(); // Limpa o estado do teclado
}

function criarTeclado() {
    const teclado = document.getElementById("teclado");
    teclado.innerHTML = ""; // Limpa o teclado anterior

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
        tecla.classList.remove("acertou", "errou"); // Remove as classes de acerto e erro
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

    // Encontra a tecla correspondente e atualiza seu estado
    const tecla = Array.from(document.getElementsByClassName("tecla")).find(tecla => tecla.innerText === letra.toUpperCase());
    
    if (palavraAtual.palavra.includes(letra)) {
        tecla.classList.add("acertou");
    } else {
        tecla.classList.add("errou");
    }

    atualizarForca();

    // Verifica se todas as letras foram acertadas
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

    if (acertos < videos.length) {
        const videoElement = document.getElementById("video");
        const videoSource = document.getElementById("videoSource");

        const videoCaminho = videos[acertos];
        videoSource.src = videoCaminho;

        videoElement.load();
        document.getElementById("videoContainer").classList.remove("hidden");

        videoElement.onended = () => {
            document.getElementById("videoContainer").classList.add("hidden");
            acertos++; // Aumenta o contador de acertos para o próximo vídeo
            proximaPalavra();
        };

        videoElement.play().catch(error => {
            console.error("Erro ao tentar reproduzir o vídeo:", error);
            alert("Não foi possível reproduzir o vídeo. Verifique se o arquivo existe e está no formato correto.");
        });
    } else {
        alert("Todos os vídeos já foram reproduzidos.");
    }
}

// Iniciar o jogo ao carregar a página
window.onload = iniciarJogo;
