

// alert( (20).toString(2) ); // 10100
// 2
// alert( parseInt( "10100", 2 ) ); 

document.addEventListener("DOMContentLoaded", function(event) { 
  const out10 =  document.getElementById('out10')
  const out2 =  document.getElementById('out2')
  const out10from2 =  document.getElementById('out10from2')
  const inputelem =  document.getElementById('inputtext')
  const okelem =  document.getElementById('okbutton')
  const to2 =  document.getElementById('to2')
  const backto10 =  document.getElementById('backto10')
  
  var arr10 = new Array();
  var arr2 = new Array();
  var arrback10 = new Array();
  
  okelem.onclick = () => {
    arr10.push(parseInt(inputelem.value, 10));
    out10.innerText += (inputelem.value + '_');
    console.log(arr10);
  }
  to2.onclick = () => {
    out2.innerText = '';
    for(let i = 0; i < arr10.length; i++){
      arr2.push(arr10[i].toString(2));
      out2.innerText += (arr2[i] + '_');
    }
  }
  backto10.onclick = () => {
    out10from2.innerText = '';
    for(let i = 0; i < arr2.length; i++){
      arrback10.push(parseInt( arr2[i], 2));
      out10from2.innerText += (arrback10[i] + '_');
    }
  }

});