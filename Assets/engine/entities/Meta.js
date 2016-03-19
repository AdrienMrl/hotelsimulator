#pragma strict

class DeskMeta extends Meta {
  function DeskMeta() {
    var geo = new int[4, 2];
    geo[0,1] = 0; geo[1,1] = 0; geo[2,1] = 0; geo[3, 1] = 1;
    geo[0,0] = 1; geo[1,0] = 1; geo[2,0] = 1; geo[3, 0] = 1;
    super(true, geo);
  }
}

static var meta = {
  'tree': Meta(true, null),
  'desk': DeskMeta()
};

class Meta {
  var isObstacle: System.Boolean;
  var geometry: int[,];

  function Meta(isOb: System.Boolean, geo) {
    isObstacle = isOb;
    geometry = geo;
  }
}
