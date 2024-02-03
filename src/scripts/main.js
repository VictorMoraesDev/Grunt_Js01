document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('form-sorteador').addEventListener('submit', function(evento) {
        evento.preventDefault();
        let numeroMaximo = document.getElementById('numero-maximo');
        numeroMaximo = parseInt(numeroMaximo.value);

        let numeroAleatorio = Math.random() * numeroMaximo;

        document.getElementById('resultado-valor').innerText = numeroAleatorio;
    })
})