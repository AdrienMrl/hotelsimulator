#pragma strict

static var rooms = List.<Room>();
static var selected_prefab = 0;
static var interactiveObjects = new Hashtable();

// this script is added to the engine game object from Engine.js

function Update() {

  var i = 0;

  for (c in "rtyuiop") {
    if (Input.GetKeyDown(c.ToString())) {
      selected_prefab = i;
    }
    i++;
  }

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

static function registerObject(what: String, interactive: Interactive) {
  if (!interactiveObjects.Contains(what)) {
    interactiveObjects.Add(what, new List.<Interactive>());
  }

  var list = interactiveObjects[what] as List.<Interactive>;
  list.Add(interactive);
}

static function spawn(what: String, where: Vector2): OnGrid {

  if (Grid.isNodeValid(where)) {
    var object = Instantiate(Resources.Load(what)) as GameObject;

    var interactive = object.GetComponent.<Interactive>();
    if (interactive != null) {
      setupInteractiveSpawn(what, interactive, where);
      registerObject(what, interactive);
    }

    var onGrid = object.GetComponent.<OnGrid>();
    onGrid.setup(what);
    onGrid.repos(where);

    return onGrid;
  }

  return null;
}

static function findObjectOnGrid(name: String) {

  var objects = interactiveObjects[name] as List.<Interactive>;
  if (objects == null) {
    return null;
  }

  for (o in objects) {
    if (o.available)
      return o;
  }

  return null;
}

static function setupInteractiveSpawn(what: String, obj: Interactive, where: Vector2) {
  var meta = Meta.meta[what] as Meta;
  obj.entranceRelativePos = meta.entrance;
  obj.entrance.facing = meta.facing;
  obj.repos(where, meta.facing);
}

static function createRoom(name: String) {
  var room = Instantiate(Resources.Load("Room")) as GameObject;
  var room_component = room.AddComponent.<Parking>();
  rooms.Add(room_component);
}

static function spawnEmptyInteractive(at: Vector2, facing: Vector2, name: String): Interactive {
  var base = new GameObject();
  var interactive = base.AddComponent.<Interactive>();
  interactive.setup(name);
  interactive.repos(at, facing);

  return interactive  ;
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
