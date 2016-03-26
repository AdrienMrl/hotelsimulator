#pragma strict

static var rooms = List.<Room>();
static var selected_prefab = 0;

// this script is added to the engine game object from Engine.js

function Update() {

  // TODO: generic
  if (Input.GetKeyDown("r"))
    selected_prefab = 0;
  if (Input.GetKeyDown("t"))
    selected_prefab = 1;
  if (Input.GetKeyDown("y"))
    selected_prefab = 2;
  if (Input.GetMouseButtonDown(0))
    spawnMouse();
}

function spawnMouse() {
  // lower-case 'c' in 'camera' - common error
  var camera = GameObject.Find("Main Camera").GetComponent.<Camera>();
  var ray : Ray = camera.ScreenPointToRay (Input.mousePosition);
  var hit : RaycastHit;

  if (Physics.Raycast (ray, hit, Mathf.Infinity)) {

    var i = 0;
    for (var key in Meta.meta.Keys as System.Collections.ICollection) {
      if (i++ == selected_prefab) {
        spawn(key as String, Grid.worldPointToGrid(hit.point));
        return;
      }
    }
  }

}

static function spawn(what: String, where: Vector2): OnGrid {

  var object = Instantiate(Resources.Load(what)) as GameObject;
  var on_grid = object.GetComponent.<OnGrid>();
  on_grid.setup(what);
  on_grid.repos(where);

  return on_grid;
}

static function spawnInteractive(what: String, where: Vector2): Interactive {
  var obj = spawn(what, where) as Interactive;
  obj.entrance_relative_pos = (Meta.meta[what] as Meta).entrance;
  return obj;
}

static function createRoom(name: String) {
  var room = Instantiate(Resources.Load("Room")) as GameObject;
  var room_component = room.AddComponent.<Parking>();
  rooms.Add(room_component);
}

static function findRoom(type: System.Type): Room {
  for (room in rooms) {
    if (typeof(room) == Parking)
      return room;
  }
  return null;
}

function Start () {
}
