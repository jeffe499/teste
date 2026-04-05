from flask import Flask, request, send_from_directory
import random

app = Flask(__name__)

# 🔹 Servir index.html
@app.route("/")
def home():
    return send_from_directory(".", "index.html")

# 🔹 Servir CSS
@app.route("/style.css")
def style():
    return send_from_directory(".", "style.css")

# 🔹 Servir música
@app.route("/musica.mp3")
def musica():
    return send_from_directory(".", "musica.mp3")

# 🔹 Resultado
@app.route("/resultado", methods=["POST"])
def resultado():
    nome = request.form.get("nome")

    porcentagem = random.randint(90, 100)

    frases = [
        "curte um clima divertido",
        "tem energia de protagonista",
        "sempre cai na resenha",
        "adora uma zoeira",
        "vive no modo festa"
    ]

    motivo = random.choice(frases)

    resultado_texto = f"{nome}, seu nível de diversão é {porcentagem}% - {motivo}"

    # Lê o HTML e injeta o resultado
    with open("index.html", "r", encoding="utf-8") as file:
        html = file.read()

    html = html.replace("{{RESULTADO}}", resultado_texto)
    html = html.replace("{{MOSTRAR_RESULTADO}}", "true")

    return html

if __name__ == "__main__":
    app.run(debug=True)