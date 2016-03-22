#pragma strict

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

    dirInfo = RandomizeArray(dirInfo);

    for (fileName in dirInfo) {
      var filename = fileName.Name.Substring(0, fileName.Name.Length - 4);
      audio.clip = Resources.Load("Music/" + filename, AudioClip);
      audio.Play();
      yield WaitForSeconds(audio.clip.length);
    }
  }


}

function Start () {
  // playBackgroundMusic();
  gameObject.AddComponent.<Spawner>();
}
