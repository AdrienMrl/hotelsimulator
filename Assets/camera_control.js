#pragma strict

function Start () {

}

private var cameraSpeed = 40;

function moveMe(vec: Vector3) {
  transform.position += vec * Time.deltaTime * cameraSpeed;
}

function Update () {

  //TODO: use generic keys

  if (Input.GetKey('z'))
    moveMe(transform.up);
  else if (Input.GetKey('q'))
    moveMe(-transform.right);
  else if (Input.GetKey('s'))
    moveMe(-transform.up);
  else if (Input.GetKey('d'))
    moveMe(transform.right);
}
