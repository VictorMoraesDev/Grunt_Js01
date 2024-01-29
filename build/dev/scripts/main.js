document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("form-sorteador").addEventListener("submit", function() {
        let e = document.getElementById("numero-maximo").value;
        e = parseInt(e);
        let t = Math.random() * e;
        document.getElementById("resultado-valor").innerText = t;
    });
});