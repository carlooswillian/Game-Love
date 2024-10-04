const palavras = [
    { palavra: "amor", dica: "Sentimento forte." },
    { palavra: "casa", dica: "Lugar onde moramos." },
    { palavra: "cachorro", dica: "Melhor amigo do homem." },
    { palavra: "viagem", dica: "Ir a outro lugar." }
];

let palavraAtual;
let acertos = 0;
let letrasTentadas = [];
let contadorErros = 0; // Variável para contar os erros

function iniciarJogo() {
    acertos = 0;
    letrasTentadas = [];
    contadorErros = 0; // Reiniciar o contador de erros no início do jogo
    document.getElementById("contadorErros").innerText = "Erros: 0"; // Exibir contador zerado
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
        letraElement.innerText = letrasTentadas.includes(letra) ? letra : "_";
        letraElement.style.marginRight = "5px";
        forcaElement.appendChild(letraElement);
    });
}

function tentar(letra) {
    if (letrasTentadas.includes(letra)) {
        return; // Não faz nada se a letra já foi tentada
    }

    letrasTentadas.push(letra);

    const tecla = Array.from(document.getElementsByClassName("tecla")).find(tecla => tecla.innerText === letra.toUpperCase());

    if (palavraAtual.palavra.includes(letra)) {
        tecla.classList.add("acertou");
    } else {
        tecla.classList.add("errou");
        contadorErros++; // Incrementar o contador de erros
        document.getElementById("contadorErros").innerText = `Erros: ${contadorErros}`; // Atualizar na tela
    }

    atualizarForca();

    if (palavraAtual.palavra.split("").every(letra => letrasTentadas.includes(letra))) {
        tocarVideo();
    }

    document.getElementById("resultado").innerText = "";
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
