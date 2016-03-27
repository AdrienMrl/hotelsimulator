#pragma strict

class EngineMachine extends StateMachine {

  var engine: Engine;

  function EngineMachine(engine: Engine) {
    super(engine as GameObject);
    this.engine = engine;
    refreshRate = 0.5;
  }

  function initialState(): function(): Function {
    return spawnGuy;
  }

  function spawnGuy(): Function {
    if (Random.Range(0, 3) == 2) {
      Spawner.spawn("guy", Vector2(0, 0));
    }
    return spawnGuy;
  }
}

class Engine extends IglooObject {

  function RandomizeArray(arr : Array)
  {
    for (var i = arr.length - 1; i > 0; i--) {
      var r = Random.Range(0,i);
      var tmp = arr[i];
      arr[i] = arr[r];
      arr[r] = tmp;
    }
    return arr;
  }

  function playBackgroundMusic() {

    var audio = gameObject.AddComponent.<AudioSource>();

    var music_dir = Application.dataPath + "/Resources/Music";
    var dirInfo = new System.IO.DirectoryInfo(music_dir).GetFiles("*.mp3");

    while (true) {

      for (fileName in dirInfo) {
        var filename = fileName.Name.Substring(0, fileName.Name.Length - 4);
        audio.clip = Resources.Load("Music/" + filename, AudioClip);
        audio.Play();
        yield WaitForSeconds(audio.clip.length);
      }
    }


  }

  function Start () {
    //playBackgroundMusic();
    gameObject.AddComponent.<Spawner>();
    machine = new EngineMachine(this);
  }
}
