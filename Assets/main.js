#pragma strict

function Awake() {
  Grid.instance.toggleDebug();

  Spawner.spawn("tree", Vector2(4, 4));
  Spawner.spawn("tree", Vector2(4, 3));
  Spawner.spawn("tree", Vector2(4, 2));
  Spawner.spawn("tree", Vector2(4, 1));
  Spawner.spawn("tree", Vector2(4, 7));

  Spawner.spawn("tree", Vector2(6, 0));
  Spawner.spawn("tree", Vector2(6, 1));
  Spawner.spawn("tree", Vector2(6, 2));
}

function Update () {

}
