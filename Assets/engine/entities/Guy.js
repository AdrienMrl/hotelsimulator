#pragma strict

class GuyStateMachine extends MovableStateMachine {

  var guy: Guy;

  function GuyStateMachine(guy: GameObject) {
      super(guy);
      this.guy = gobj.GetComponent.<Guy>();
      refreshRate = 1;
  }

  function initialState(): function(): Function {
    return checkIn;
  }

  function checkIn(): Function {

    var desk = Spawner.findObjectOnGrid("desk");
    guy.driver.moveTowards(desk);
    return walking;
  }

  function walking(): Function {
    if (guy.driver.isOnTarget()) {
      return walking;
    }
    return walking;
  }
}

class Guy extends Movable {

  function Start() {

    super.Start();
    speed = 1.5;
    machine = new GuyStateMachine(gameObject);
  }

}
