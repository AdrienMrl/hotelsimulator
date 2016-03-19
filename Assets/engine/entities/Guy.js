#pragma strict

class Guy extends Movable {

  function Start() {

    super.Start();

    var desk = Spawner.spawn("desk", Vector2(0, 0)) as Interactive;

    moveTo(desk);
  }

}
