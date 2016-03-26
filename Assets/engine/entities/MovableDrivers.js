#pragma strict

class MovableDriver {

  var target_node: Node;
  var movable: Movable;
  var pull_next_node: Function;
  var target: Interactive;

  private var gObject: GameObject;

  function MovableDriver(gameObj: GameObject) {
    movable = gameObj.GetComponent.<Movable>();
    gObject = gameObj;
  }

  function UpdatePosition() {

    if (target_node != null) {

      var step = movable.speed * Time.deltaTime;
      faceDirection();
      gObject.transform.position =
      Vector3.MoveTowards(gObject.transform.position, target_node.getWorldPos(), step);

      if (Vector3.Distance(gObject.transform.position, target_node.getWorldPos()) <= step) {
        movable.current_node = target_node;
        target_node = get_next_node();
        if (target_node == null)
          stopedMoving();
      }
    }
  }

  function get_next_node(): Node {
    if (this.pull_next_node == null)
      return null;
    return this.pull_next_node() as Node;
  }

  function set_pull_node(f: Function) {
    this.pull_next_node = f;
    if (f == null)
      stopedMoving();
    else {
      startedMoving();
      target_node = f();
    }
  }

  function faceDirection() {
    var new_dir = Vector3.RotateTowards(gObject.transform.forward,
      target_node.getWorldPos() - gObject.transform.position,
      movable.speed * 3 * Time.deltaTime, 0);
      gObject.transform.rotation = Quaternion.LookRotation(new_dir);
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
        for (var state: AnimationState in animation) {
          state.speed = 2;
        }
      }
    }

    function pull_next_node_towards_target() {
      return target.entrance.tellMeTheWay(movable);
    }

    function moveTowards(trgt: Interactive) {
      target = trgt;
      set_pull_node(pull_next_node_towards_target);
    }
  }

  class WanderAround extends MovableDriver {

    var direction = Vector2.zero;
    var forward_count = 0;

    function WanderAround(gameObj: GameObject) {

      super(gameObj);
    }


    function pull_next_node() {

      if (forward_count-- == 0) {

        var r = Random.Range(0,8);
        direction = Dijkstra.directions[r];
        forward_count = Random.Range(1, 10);
      }
      return Grid.instance.getNodeAt(movable.current_node.positionOnGrid + direction);
    }
  }
