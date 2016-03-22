#pragma strict

class Parking extends Room {

  var size = 10;
  var spots = List.<Interactive>();

  function Start() {
    for (i in range(size)) {
      spots.Add(Spawner.spawn("parking-spot", Vector2(10 + i, 2)) as Interactive);
    }
  }

  function getParkingSpot() : Interactive {
    for (spot in spots) {
      if (spot.available)
        return spot;
    }
    return null;
  }

}
