void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  byte b = Serial.read();
  if (b == 160) {
    digitalWrite(13, HIGH);
  }
}
