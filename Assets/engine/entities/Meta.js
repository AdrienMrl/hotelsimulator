#pragma strict

class DeskMeta extends Meta {
  function DeskMeta() {
    var geo = new int[4, 2];
    geo[0,1] = 1; geo[1,1] = 1;
    super(true, geo, Vector2(1, -1));
  }
}

static var zero = Vector2(0, 0);

static var defaultMeta = Meta(false, null, zero);

static var meta = {
  'guy': defaultMeta,
  'tree': Meta(true, null, zero),
  'car': defaultMeta,
  'desk': DeskMeta(),
  'parking-spot': Meta(false, null, Vector2(0, 1))
};

class Meta {
  var isObstacle: System.Boolean;
  var geometry: int[,];
  var entrance = Vector2(0, 0);

  function Meta(isOb: System.Boolean, geo, entr: Vector2) {
    isObstacle = isOb;
    geometry = geo as int[,];
    if (entr != null)
      entrance = entr;
  }
}
