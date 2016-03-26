#pragma strict

class Movable extends OnGrid {

  var speed = 1;
  public var movingAnimationName = "walking";
  public var idleAnimationName = "idle";
  public var driver: MovableDriver;

  function Start() {
    super.Start();
    driver = new MovableDriver(gameObject);
  }

  function Update() {
    super.Update();
    driver.UpdatePosition();
  }

  /* --- API --- */

  function moveTowards(trgt: Interactive) {
    return driver.moveTowards(trgt);
  }

  function startWandering() {
    machine = new WanderStateMachine(gameObject);
  }
}
