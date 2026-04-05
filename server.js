const express = require("express");
const path = require("path");

const app = express();

// Permite ler dados do formulário
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos (CSS, áudio, etc.)
app.use(express.static(__dirname));

// 🔹 Página inicial
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// 🔹 Resultado
app.post("/resultado", (req, res) => {
    const nome = req.body.nome;

    const porcentagem = Math.floor(Math.random() * 11) + 90;

    const frases = [
        "curte um clima divertido",
        "tem energia de protagonista",
        "sempre cai na resenha",
        "adora uma zoeira",
        "vive no modo festa"
    ];

    const motivo = frases[Math.floor(Math.random() * frases.length)];

    const resultado = `${nome}, seu nível de diversão é ${porcentagem}% - ${motivo}`;

    // Lê HTML e injeta resultado
    const fs = require("fs");
    let html = fs.readFileSync("index.html", "utf-8");

    html = html.replace("{{RESULTADO}}", resultado);
    html = html.replace("{{MOSTRAR_RESULTADO}}", "true");

    res.send(html);
});

// Iniciar servidor
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});