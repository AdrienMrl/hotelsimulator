#pragma strict

class Movable extends OnGrid {

  var speed = 6;
  public var movingAnimationName = "walking";
  public var idleAnimationName = "idle";
  private var path: Queue;
  private var target: Node;

  function Update() {

    if (target != null) {

      var step = speed * Time.deltaTime;
      transform.position =
        Vector3.MoveTowards(transform.position, target.getWorldPos(), step);
      faceDirection();
      if (Vector3.Distance(transform.position, target.getWorldPos()) <= step) {
        current_node = target;
        target = pullNextInQueue();
      }
    }

  }

  function faceDirection() {
      var new_dir = Vector3.RotateTowards(transform.forward,
        target.getWorldPos() - transform.position, speed * Time.deltaTime, 0);
      transform.rotation = Quaternion.LookRotation(new_dir);
  }

  function pullNextInQueue() {

    if (path.Count == 0) {
      GetComponent.<Animation>().Stop(movingAnimationName);
      GetComponent.<Animation>().Play(idleAnimationName);
      return null;
    }

    var next: Node = path.Dequeue() as Node;


    return next;
  }

  function setQueue(queue: Queue) {

    if (movingAnimationName != null) {
      var animation = GetComponent.<Animation>();
      animation.Play(movingAnimationName);
      for (var state: AnimationState in animation) {
        state.speed = 2;
      }
    }

    path = queue;
    target = pullNextInQueue();
  }
  function queue(node: Node) {
    target = node;
    path.Enqueue(node);
  }
}
