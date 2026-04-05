const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/style.css", (req, res) => {
    res.sendFile(path.join(__dirname, "style.css"));
});

app.get("/musica.mp3", (req, res) => {
    res.sendFile(path.join(__dirname, "musica.mp3"));
});

app.post("/resultado", (req, res) => {
    const nome = req.body.nome || "Visitante";
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

    let html = fs.readFileSync(path.join(__dirname, "index.html"), "utf-8");
    html = html.replace("{{RESULTADO}}", resultado);
    html = html.replace("{{MOSTRAR_RESULTADO}}", "true");

    res.send(html);
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});