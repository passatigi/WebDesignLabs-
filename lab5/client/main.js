

let textArea = document.getElementById('textArea');
let defColor = textArea.style.color.valueOf();
let footerInfo = document.getElementById('gameFooter');
let defaultText = textArea.innerHTML;
let score = 0;
let fillinwindow = document.getElementById('fillinfowindow');
fillinwindow.style.display = "none";

let start;
let end;


const buttonOk = document.getElementById('okbutton');
const defButOkStyle = buttonOk.style;
let nickname;
buttonOk.onclick = () => {
    buttonOk.style.background = "blue";
    nickname = document.getElementById('personNickname').innerText;
    AddPlayerToServer();
    fillinwindow.style.display = "none";

    setTimeout(()=>{
        buttonOk.style.background = defButOkStyle.background;
        GetPlayersJson();
    }, 100)
}

const FillStatWindowShow = () => {
    end = new Date().getTime();
    time = end - start;
    footerInfo.innerText = "ваш результат: " +score + " очков, " + time + " ms.";
    fillinwindow.style.display = "block";
    window.scrollTo({
        top: fillinwindow.getBoundingClientRect().top,
        behavior: 'smooth'
    })

}
const checkInputInfoWithServer = () => {
    let hxr = new XMLHttpRequest();
    hxr.onreadystatechange = () => {
        if (hxr.readyState === 4 && hxr.status === 200) {
            console.log(hxr.responseText);

            if(hxr.responseText == '0'){
                textArea.style.color = defColor;
                checkInputInfoWithServer();
            }
            else if(hxr.responseText == 'done'){
                FillStatWindowShow();
            }
            else{
                textArea.style.color = "red";
                score = score - 1;
                footerInfo.innerText = score;
                checkInputInfoWithServer();
            }
         
        }   
    }
    hxr.open("POST", "http://localhost:3000", true);
    hxr.setRequestHeader('Content-Type', 'text/plain');
    let text = textArea.innerHTML;
    if(text == defaultText) 
        {
            text = 'У'
        }
    console.log(text);
    hxr.send(text);
}

const AddPlayerToServer = () => {
    let player = {
        _nickname: nickname,
        _score: score,
        _timems: time
    }
    let playerJson = JSON.stringify(player).toString();
    console.log(playerJson);

    let hxr = new XMLHttpRequest();
    hxr.onreadystatechange = () => {
        if (hxr.readyState === 4 && hxr.status === 200) {
            console.log("successful added");
        }   
    }
    hxr.open("POST", "http://localhost:3000/stats/add", true); 
    hxr.setRequestHeader('Content-Type', 'text/plain');
    hxr.send(playerJson);
}
const GetPlayersJson = () => {
    let hxr = new XMLHttpRequest();
    hxr.onreadystatechange = () => {
        if (hxr.readyState === 4 && hxr.status === 200) {
            console.log(hxr.responseText);
            FillInPlayersTable(JSON.parse(hxr.responseText));
        }   
    }
    hxr.open("GET", "http://localhost:3000/stats", true); 
    hxr.setRequestHeader('Content-Type', 'text/plain');
    hxr.send();
} 

let resultsDiv = document.getElementById('results');
//_nickname":"kasha","_score":0,"_timems"
const FillInPlayersTable = (arr) =>{
    resultsDiv.innerText = "";
    let tempth = document.createElement('tr');

    let temptdId = document.createElement('td');
    temptdId.innerText = "ID попытки";
    tempth.appendChild(temptdId)

        let temptdNick = document.createElement('td');
        temptdNick.innerText = "Ник";
        tempth.appendChild(temptdNick)

        let temptdscore = document.createElement('td');
        temptdscore.innerText = "Результат";
        tempth.appendChild(temptdscore)

        let temptdtime = document.createElement('td');
        temptdtime.innerText = "Время мс";
        tempth.appendChild(temptdtime);

        resultsDiv.appendChild(tempth); //---------------
        arr.sort((a,b)=> {
            if(a._timems > b._timems){
                return 1;
            }
            if(a._timems < b._timems){
                return -1;
            }
            return 0;
        })
        // arr.sort((a,b)=> {
        //     if(a.try_id > b.try_id){
        //         return 1;
        //     }
        //     if(a.try_id < b.try_id){
        //         return -1;
        //     }
        //     return 0;
        // })

    for(let i = 0; i< arr.length; i++){
        
        let temptr = document.createElement('tr');

        temptdId = document.createElement('td');
        temptdId.innerText =  arr[i].try_id;
        temptr.appendChild(temptdId)

         temptdNick = document.createElement('td');
        temptdNick.innerText = arr[i]._nickname;
        temptr.appendChild(temptdNick)

         temptdscore = document.createElement('td');
        temptdscore.innerText = arr[i]._score;
        temptr.appendChild(temptdscore)

         temptdtime = document.createElement('td');
        temptdtime.innerText = arr[i]._timems;
        temptr.appendChild(temptdtime);
        if(arr[i]._nickname.toString().indexOf("A") == 0){
            temptr.style.color = "red";
            console.log(arr[i]._nickname);
        }
        resultsDiv.appendChild(temptr);
        
    }
}
document.addEventListener("DOMContentLoaded", function(event) { 
    start = new Date().getTime();
    GetPlayersJson();
    checkInputInfoWithServer();
});

