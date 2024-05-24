const cartas = document.querySelectorAll('.carta-da-memoria');
let virouCarta = false;
let travarTabuleiro = false;
let primeiraCarta, segundaCarta;

function virarCarta() {
    if (travarTabuleiro) return;
    if (this === primeiraCarta) return;

    this.classList.add('virada');
    this.textContent = this.dataset.numero;

    if (!virouCarta) {
        // primeiro clique
        virouCarta = true;
        primeiraCarta = this;
        return;
    }

    // segundo clique
    segundaCarta = this;
    verificarCorrespondencia();
}

function verificarCorrespondencia() {
    let corresponde = primeiraCarta.dataset.numero === segundaCarta.dataset.numero;
    corresponde ? desabilitarCartas() : desvirarCartas();
}

function desabilitarCartas() {
    primeiraCarta.removeEventListener('click', virarCarta);
    segundaCarta.removeEventListener('click', virarCarta);

    resetarTabuleiro();
}

function desvirarCartas() {
    travarTabuleiro = true;

    setTimeout(() => {
        primeiraCarta.classList.remove('virada');
        segundaCarta.classList.remove('virada');
        primeiraCarta.textContent = '';
        segundaCarta.textContent = '';

        resetarTabuleiro();
    }, 1500);
}

function resetarTabuleiro() {
    [virouCarta, travarTabuleiro] = [false, false];
    [primeiraCarta, segundaCarta] = [null, null];
}

(function embaralhar() {
    cartas.forEach(carta => {
        let posicaoAleatoria = Math.floor(Math.random() * 9);
        carta.style.order = posicaoAleatoria;
    });
})();

cartas.forEach(carta => carta.addEventListener('click', virarCarta));