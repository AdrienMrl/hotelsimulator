#pragma strict

var foo = {'hello': 'world', 'world': 'hi'};

function Awake() {

  Grid.instance.toggleDebug();
  var gridsize = Grid.instance.size;

  for (var i = 0; i < 30; i++) {
    Spawner.spawn("tree", Vector2(Random.Range(0, gridsize.x), Random.Range(0, gridsize.y)));
  }

//  Spawner.createRoom("Parking");
  Spawner.spawn("desk", Vector2(5, 3));

}

function Update () {

}
