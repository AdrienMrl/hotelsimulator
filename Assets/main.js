#pragma strict

var foo = {'hello': 'world', 'world': 'hi'};

function Awake() {

  Grid.instance.toggleDebug();

  Spawner.spawn("tree", Vector2(4, 4));
  Spawner.createRoom("Parking");
}

function Update () {

}
