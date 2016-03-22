#pragma strict

class DeskMeta extends Meta {
  function DeskMeta() {
    var geo = new int[4, 2];
    geo[0,1] = 0; geo[1,1] = 0; geo[2,1] = 0; geo[3, 1] = 1;
    geo[0,0] = 1; geo[1,0] = 1; geo[2,0] = 1; geo[3, 0] = 1;
    super(true, geo, Vector2(1, -1));
  }
}

static var meta = {
  'guy': Meta(false, null, null),
  'tree': Meta(true, null, null),
  'car': Meta(false, null, null),
  'desk': DeskMeta(),
  'parking-spot': Meta(false, null, Vector2(0, 1))
};

class Meta {
  var isObstacle: System.Boolean;
  var geometry: int[,];
  var entrance = Vector2(0, 0);

  function Meta(isOb: System.Boolean, geo, entr) {
    isObstacle = isOb;
    geometry = geo;
    if (entr != null)
      entrance = entr;
  }
}
