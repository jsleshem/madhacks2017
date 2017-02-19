from . import app
from .serial import SerialHandler
from flask import request, render_template

serial_handler = SerialHandler()
available_ports = serial_handler.available_ports()

for i, port in enumerate(available_ports):
    print("{}: {}".format(i, port))

while True:
    try:
        selection = int(input("Which port are you using?"))
        serial_handler.port = available_ports[selection]
        break
    except (ValueError, IndexError):
        print("please enter a valid selection")

START_SIG = 0x21
serial_handler.connect()

@app.route("/")
def index():
    return render_template("madhacks.html")

@app.route("/move_wall")
def move_wall():
    x = request.args.get("x", 0, type=int)
    y = request.args.get("y", 0, type=int)

    values = [START_SIG, x, y]

    serial_handler.write(bytes(values))

    return "success"
