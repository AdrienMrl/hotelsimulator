#pragma strict

class Car extends Movable {

  function Start() {

    speed = 4;
    movingAnimationName = null;

    var parking = Spawner.findRoom(Parking) as Parking;
    var parking_spot = parking.getParkingSpot();
    moveTo(parking_spot);
  }
}
