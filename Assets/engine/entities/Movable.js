#pragma strict

class Movable extends OnGrid {

  var speed = 1;
  public var movingAnimationName = "walking";
  public var idleAnimationName = "idle";
  private var target: Interactive;
  private var target_node: Node;

  function Start() {
    super.Start();
  }

  function Update() {

    if (target != null) {

      if (target_node == null) {
        target = null;
        stopedMoving();
        return;
      }

      var step = speed * Time.deltaTime;
      faceDirection();
      transform.position =
        Vector3.MoveTowards(transform.position, target_node.getWorldPos(), step);

      if (Vector3.Distance(transform.position, target_node.getWorldPos()) <= step) {
        current_node = target_node;
        target_node = toNextNode();
      }
    }

  }

  function faceDirection() {
    var new_dir = Vector3.RotateTowards(transform.forward,
      target_node.getWorldPos() - transform.position, speed * 3 * Time.deltaTime, 0);
      transform.rotation = Quaternion.LookRotation(new_dir);
    }

    function toNextNode(): Node {
      return target.entrance.tellMeTheWay(this);
    }

    function stopedMoving() {
      GetComponent.<Animation>().Stop(movingAnimationName);
      GetComponent.<Animation>().Play(idleAnimationName);
    }

    function startedMoving() {
      if (movingAnimationName != null) {
        var animation = GetComponent.<Animation>();
        animation.Play(movingAnimationName);
        for (var state: AnimationState in animation) {
          state.speed = 2;
        }
      }
    }

    /* --- API --- */

    function moveTo(trgt: Interactive) {
      target = trgt;
      target_node = toNextNode();
      startedMoving();
    }
  }
