from . import app
from .serial import SerialHandler
from flask import request, render_template

'''
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
'''

@app.route("/")
def index():
    return render_template("madhacks.html")

@app.route("/move_wall")
def move_wall():
    wall_id = request.args.get("id", None)
    wall_map = {
        "alt1": "1",
        "alt2": "2",
        "swing": "3"
    }

    # USE THE LIST
    serial_handler.write(bytes([]))

    return "success"
