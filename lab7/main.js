function readFile(object) {
    var file = object.files[0]
    var reader = new FileReader()
    reader.onload =  function() {
        OutputTittles(reader.result);
    }
    reader.readAsText(file)
  }


  const OutputTittles = (jsontext) =>{
      let arr = JSON.parse(jsontext);
      for(let i = 6; i <= 8; i++){
        document.getElementById('out').innerHTML += "i: " + arr[i]._nickname + "/ ";
      }
  } 