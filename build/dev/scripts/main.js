document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("form-sorteador").addEventListener("submit", function(e) {
        e.preventDefault();
        let t = document.getElementById("numero-maximo");
        t = parseInt(t.value);
        let n = Math.random() * t;
        n = Math.floor(n + 1);
        document.getElementById("resultado-valor").innerText = n;
        document.querySelector(".resultado").style.display = "block";
    });
});