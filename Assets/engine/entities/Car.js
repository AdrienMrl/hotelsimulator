#pragma strict

class CarBehaviour extends MovableStateMachine {

  var car: Car;

  function CarBehaviour(car: GameObject) {
      // FIXME: make it a movable instead of a gameobject
      super(car);
      this.car = car.GetComponent.<Car>();
      refreshRate = 1;
  }

  function initialState(): function(): Function {
    return findParking;
  }

  function driving(): Function {
    if (car.driver.isOnTarget()) {
      return unloadPassengers;
    }
    return driving;
  }

  function unloadPassengers(): Function {
    for (var i = 0; i < car.passengers; i++) {
      var guy = Spawner.spawn("guy", car.currentNode.positionOnGrid + Vector2(1, 0));
    }
    return waitingInParking;
  }

  function waitingInParking(): Function {
    refreshRate = 2;
    return waitingInParking;
  }

  function findParking(): Function {
    if (car.moveToParkingSpot() != null)
      return driving;
    return findParking;
  }

}

class Car extends Movable {

  var passengers = Random.Range(1, 5);

  function Start() {

    super.Start();
    speed = 4;
    movingAnimationName = null;
    machine = new CarBehaviour(gameObject);
  }

  function moveToParkingSpot() {
    var parking = Spawner.findRoom(Parking) as Parking;
    var parkingSpot = parking.getParkingSpot();
    if (parkingSpot == null) {
      return null;
    }
    parkingSpot.available = false;
    return moveTowards(parkingSpot);
  }
}
