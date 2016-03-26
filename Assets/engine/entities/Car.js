#pragma strict

class Car extends Movable {

  function Start() {

    super.Start();
    speed = 4;
    movingAnimationName = null;
    moveToParkingSpot();
  }

  function moveToParkingSpot() {
    var parking = Spawner.findRoom(Parking) as Parking;
    var parking_spot = parking.getParkingSpot();
    moveTowards(parking_spot);
  }
}
