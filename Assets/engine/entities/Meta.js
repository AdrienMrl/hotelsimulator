#pragma strict

class DeskMeta extends Meta {
  function DeskMeta() {
    var geo = new int[4, 2];
    geo[0,1] = 0; geo[1,1] = 0; geo[2,1] = 0; geo[3, 1] = 1;
    geo[0,0] = 1; geo[1,0] = 1; geo[2,0] = 1; geo[3, 0] = 1;
    super(true, geo, Vector2(1, -1));
  }
}

static var zero = Vector2(0, 0);

static var meta = {
  'guy': Meta(false, null, zero),
  'tree': Meta(true, null, zero),
  'car': Meta(false, null, zero),
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
