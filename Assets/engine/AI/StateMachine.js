#pragma strict

class StateMachine {

  var movable: Movable;
  var state = initialState;

  function StateMachine() {
  }

  function StateMachine(movable: Movable) {
      this.movable = movable;
      this();
  }

  function initialState(): Function {
    return initialState;
  }
}
