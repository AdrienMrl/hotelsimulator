#pragma strict

class Guy extends Movable {

  function Start() {

    super.Start();

    var desk = Spawner.spawn("desk", Vector2(12, 1)) as Interactive;

//    Dijkstra.showOutputGrid(desk.entrance.dijkstra_grid);
    moveTo(desk);
  }

}
