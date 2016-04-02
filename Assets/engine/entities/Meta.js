#pragma strict

class DeskMeta extends Meta {
  function DeskMeta() {
    var geo = new int[4, 2];
    geo[0,1] = 1; geo[1,1] = 1;
    super(true, geo, Vector2(1, -1), Vector2(0, 2));
  }
}

static var zero = Vector2(0, 0);

static var defaultMeta = Meta(false, null, zero, zero);
static var defaultMetaObstacle = Meta(true, null, zero, zero);

static var meta = {
  'guy': defaultMeta,
  'tree': defaultMetaObstacle,
  'car': defaultMeta,
  'desk': DeskMeta(),
  'parking-spot': Meta(false, null, Vector2(0, 1), Vector2(0, -1))
};

class Meta {
  var isObstacle: System.Boolean;
  var geometry: int[,];
  var entrance = Vector2.zero;
  var facing = Vector2.zero;

  function Meta(isOb: System.Boolean, geo, entr: Vector2, facng: Vector2) {
    isObstacle = isOb;
    geometry = geo as int[,];
    facing = facng;
    entrance = entr;
  }
}
