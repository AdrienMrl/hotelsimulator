#pragma strict

class MovableDriver {

  var targetNode: Node;
  var movable: Movable;
  var pullNextNode: Function;
  var target: Interactive;
  var directionToFace = Vector3.zero;

  private var gObject: GameObject;

  function MovableDriver(gameObj: GameObject) {
    movable = gameObj.GetComponent.<Movable>();
    gObject = gameObj;
  }

  function UpdatePosition() {

    if (targetNode != null) {

      var step = movable.speed * Time.deltaTime;
      directionToFace = targetNode.getWorldPos() - gObject.transform.position;
      gObject.transform.position =
      Vector3.MoveTowards(gObject.transform.position, targetNode.getWorldPos(), step);

      if (Vector3.Distance(gObject.transform.position, targetNode.getWorldPos()) <= step) {
        movable.currentNode = targetNode;
        targetNode = getNextNode();
        if (targetNode == null && target != null) {
          directionToFace = Grid.gridPointToWorld(target.entrance.facing);
        }
      }
    } else {
      stopedMoving();
    }
    faceDirection(directionToFace);
  }

  function getNextNode(): Node {
    if (this.pullNextNode == null)
      return null;
    return this.pullNextNode() as Node;
  }

  function setPullNode(f: function(): Node) {
    this.pullNextNode = f;
    if (f == null) {
      stopedMoving();
    } else {
      startedMoving();
      targetNode = f();
    }
  }

  function faceDirection(direction: Vector3) {
    if (direction == Vector3.zero)
      return;

    var newRotation = Quaternion.LookRotation(direction);
    newRotation.x = 0.0;
    newRotation.z = 0.0;
    gObject.transform.rotation = Quaternion.Slerp(gObject.transform.rotation, newRotation, Time.deltaTime * 5);

    }

    function stopedMoving() {
      if (movable.movingAnimationName != null) {
        gObject.GetComponent.<Animation>().Stop(movable.movingAnimationName);
        gObject.GetComponent.<Animation>().Play(movable.idleAnimationName);
      }
    }

    function startedMoving() {
      if (movable.movingAnimationName != null) {
        var animation = gObject.GetComponent.<Animation>();
        animation.Play(movable.movingAnimationName);
        for (state in animation) {
          (state as AnimationState).speed = 2;
        }
      }
    }

    function pullNodeTowardsTarget() {
      return target.entrance.tellMeTheWay(movable);
    }

    function moveTowardsInteractiveWithLine(trgt: InteractiveWithLine) {
      trgt.line.enqueue(movable);
      return null;
    }

    function moveTowards(trgt: Interactive) {

      var withLine = trgt.GetComponent.<InteractiveWithLine>();
      if (withLine != null) {
        return moveTowardsInteractiveWithLine(withLine);
      }

      target = trgt;
      setPullNode(pullNodeTowardsTarget);
      return target;
    }

    function isStopped() {
      return targetNode == null;
    }

    function setNextNode(node: Node) {
      targetNode = node;
      startedMoving();
    }

    function isOnTarget() {
      return target == null || movable.currentNode == target.entrance.node;
    }
}
