#pragma strict

class Car extends Movable {

  function Start() {

    speed = 4;
    repos(7, 0);

    var desk = Spawner.spawn("desk", Vector2(12, 17)) as Interactive;

    moveTo(desk);
  }
}
