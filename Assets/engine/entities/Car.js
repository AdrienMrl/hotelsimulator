#pragma strict

class Car extends Movable {

  function Start() {

    super.Start();
    speed = 4;
    movingAnimationName = null;
    startWandering();
  }

  function moveToParkingSpot() {
    var parking = Spawner.findRoom(Parking) as Parking;
    var parkingSpot = parking.getParkingSpot();
    moveTowards(parkingSpot);
  }
}
