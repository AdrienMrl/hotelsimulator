#pragma strict

class IglooObject extends MonoBehaviour {

  var machine: StateMachine;

  function Start() {
  }

  function Update() {

    if (machine != null)
      machine.update();
  }

}
