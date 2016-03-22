#pragma strict

private var zoom_speed = 1.1;

private var cameraBaseSpeed = 4;

function moveMe(vec: Vector3) {
  transform.position +=
    vec * Time.deltaTime * cameraBaseSpeed * GetComponent.<Camera>().orthographicSize;
}

function rotateMe(angle: int) {
  var ray : Ray =
    GetComponent.<Camera>().ViewportPointToRay(Vector3(0.5, 0.5, 0));

  var hit : RaycastHit;

  if (Physics.Raycast(ray, hit, Mathf.Infinity)) {
    transform.RotateAround(hit.point, Vector3.up, 80 * angle * Time.deltaTime);
  }
}

function Update () {

  //TODO: use generic keys

  if (Input.GetKey('z'))
    moveMe(transform.up);
  if (Input.GetKey('q'))
    moveMe(-transform.right);
  if (Input.GetKey('s'))
    moveMe(-transform.up);
  if (Input.GetKey('d'))
    moveMe(transform.right);
  if (Input.GetKey('e'))
    rotateMe(1);
  if (Input.GetKey('a'))
    rotateMe(-1);

  if(Input.GetAxis("Mouse ScrollWheel") > 0)
  {
    GetComponent.<Camera>().orthographicSize /= zoom_speed;
  }
  else if (Input.GetAxis("Mouse ScrollWheel") < 0)
  {
    GetComponent.<Camera>().orthographicSize *= zoom_speed;
  }
}
