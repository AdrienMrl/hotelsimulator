#pragma strict

class StateMachine {

  var gobj: GameObject;
  var state = initialState;
  var elapsed = 0.0;
  var refreshRate = 0;

  function update() {

    if (refreshRate == 0) {
      state = state();
    }

    elapsed += Time.deltaTime;

    if (elapsed >= refreshRate) {
      elapsed = 0;
      state = state();
    }
  }

  function StateMachine() {

  }

  function StateMachine(gobj: GameObject) {
    this.gobj = gobj;
  }

  function initialState(): function(): Function {
    return initialState;
  }

  function sleepState(): Function {
    return sleepState;
  }
}

class MovableStateMachine extends StateMachine {

  var movable: Movable;

  function MovableStateMachine(gobj: GameObject) {
    // I would gladly write this(gobj); but unity segfaults. Anyone knows why ?
    this.gobj = gobj;
    movable = gobj.GetComponent.<Movable>();
  }

}

class WanderStateMachine extends MovableStateMachine {

  function WanderStateMachine(gobj: GameObject) {
    super(gobj);
  }

  function initialState() {
    return findNextWay;
  }

  var forwardCount = 0;
  var direction = Vector2.zero;
  var stayPutTime: float;
  var idle_elapsed: float = 0;

  function walking(): Function {
    return movable.driver.isStopped() ? walkForward : walking;
  }

  function stayPut(): Function {

    idle_elapsed += Time.deltaTime;
    if (idle_elapsed > stayPutTime) {
      idle_elapsed = 0;
      return findNextWay;
    }
    return stayPut;
  }

  function walkForward(): Function {

    if (direction == Vector2.zero) {
      stayPutTime = Random.Range(1, 10);
      return stayPut;
    }

    if (forwardCount-- < 0) {
      return findNextWay;
    }

    var trgtNode = Grid.instance.getNodeAt(
      movable.currentNode.positionOnGrid + direction);

      if (trgtNode != null && trgtNode.type != Node.Type.Obstacle) {
        movable.driver.setNextNode(trgtNode);
      }
    return walking;
  }

  function findNextWay(): Function {

    direction = Dijkstra.directions[Random.Range(0, 8)];
    forwardCount = Random.Range(0, 5);
    if (forwardCount == 0) {
      direction = Vector2.zero;
    }
    return walking;
  }
}
