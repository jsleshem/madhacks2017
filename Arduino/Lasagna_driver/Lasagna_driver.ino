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

#define STEP_AMOUNT 520

// servo object declarations
Servo panS;
Servo tiltS;
Servo spinS;
Servo swingS;
Servo gateS;

Stepper center(100, center1, center2, center3, center4);

bool swingState = false;
bool gateState = false;

bool cond = false;

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

//  if (Serial.available() > 0) {
//    byte cond = Serial.read();
//    byte readin = Serial.read();
//    if (cond == 0x21) {
//      Serial.println("yo");
//      //byte readin = Serial.read();
//      Serial.println(readin, HEX);
//      if (readin == 0x31 || readin == 0x32) {
//        gateState = !gateState;
//        Serial.println("hey");
//      }
//      else if (readin == 0x33) {
//        swingState = !swingState;
//      }
//      else if (readin == 0x34) {
//        center.step(STEP_AMOUNT);
//      }
//    }
//  }

  //bool cond = false;
  while (Serial.available() > 0) {
    byte readin = Serial.read();
    if (readin == 0x21) {
      cond = true;
      //Serial.println("Set cond to true");
    }
    else if (cond) {
      //Serial.println("Got inside the if statement");
      if (readin == 0x31 || readin == 0x32) {
        gateState = !gateState;
        //Serial.println("hey");
      }
      else if (readin == 0x33) {
        swingState = !swingState;
      }
      else if (readin == 0x34) {
        center.step(STEP_AMOUNT);
      }

      cond = false;
    }
    //Serial.println(readin, HEX);
  }

  // Read joystick values
  int lrread = analogRead(LR);
  int udread = analogRead(UD);

  panS.write(map(lrread,0,1023,45,135));
  tiltS.write(map(udread,30,1023,45,135));

  if (gateState) {
    gateS.write(60);
  }
  else {
    gateS.write(77);
  }

  if (swingState) {
    swingS.write(90);
  }
  else {
    swingS.write(10);
  }
}
