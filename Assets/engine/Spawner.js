#pragma strict

static function spawn(what: String, where: Vector2): OnGrid {

  var object = Instantiate(Resources.Load(what)) as GameObject;
  var on_grid = object.GetComponent.<OnGrid>();
  on_grid.setup(what);
  on_grid.repos(where);

  return on_grid;
}

function Start () {
}
