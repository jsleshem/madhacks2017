#include <Servo.h>
#include <Stepper.h>

// pin declarations for joystick
#define LR A0
#define UD A1

// pin declarations for servos
#define pan 3
#define tilt 4
#define spin 5
#define swing 6
#define gate 7

// pin declarations for stepper motor
#define center1 8
#define center2 9
#define center3 10
#define center4 11

// servo object declarations
Servo panS;
Servo tiltS;
Servo spinS;
Servo swingS;
Servo gateS;

Stepper center(100, center1, center2, center3, center4);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  
  pinMode(LR, INPUT);
  pinMode(UD, INPUT);

  panS.attach(pan);
  tiltS.attach(tilt);
  spinS.attach(spin);
  swingS.attach(swing);
  gateS.attach(gate);

  center.setSpeed(100);

  gateS.write(65);

  swingS.write(10);

  spinS.write(98);
}

void loop() {
  // put your main code here, to run repeatedly:

  // Read joystick values
  int lrread = analogRead(LR);
  int udread = analogRead(UD);
  //Serial.println(lrread);
  //Serial.println(udread);

  panS.write(map(lrread,0,1023,45,135));
  tiltS.write(map(udread,30,1023,45,135));

  center.step(1);

  //delay(5);
}
