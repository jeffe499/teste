from flask import Flask, request, render_template
import random

app = Flask(__name__)

@app.route("/", methods=["GET"])
def home():
    return render_template("index.html", resultado=None)

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

    return render_template("index.html", resultado=resultado_texto)

if __name__ == "__main__":
    app.run(debug=True)