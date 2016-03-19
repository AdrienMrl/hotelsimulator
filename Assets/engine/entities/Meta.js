#pragma strict

class Meta {
  static var isObstacle: System.Boolean;
  static var geometry: int[,];

  function Meta(isOb: System.Boolean, geo) {
    isObstacle = isOb;
    geometry = geo as int[,];
  }
}

static function getMetaFor(object: String): Meta {
  return {
    'tree': Meta(true, null),
    'desk': Meta(true, [
      [0, 0, 1],
      [1, 1, 1]
    ])
  }[object] as Meta;
}
