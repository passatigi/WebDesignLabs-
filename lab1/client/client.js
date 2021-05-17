



// =------------- lab1


const timeElement = document.createElement('div');
timeElement.id = 'ServerTime';
document.body.append(timeElement);

const getTimeFromServer = () => {
    let hxr = new XMLHttpRequest();
    hxr.onreadystatechange = () => {
        if (hxr.readyState === 4 && hxr.status === 200) {
         timeElement.innerText = hxr.responseText;
        }   
    }
    hxr.open("POST", "http://localhost:3000", true);
    hxr.setRequestHeader('Content-Type', 'text/plain');
    hxr.send('gettime');
}
getTimeFromServer();
let timeGetter = setInterval(getTimeFromServer, 1000);
const button = document.createElement('button');
button.onclick = () => {
    clearInterval(timeGetter);
}

button.id = 'StopTime';
button.innerHTML = 'StopTime';
document.body.append(button);

const header = document.createElement('div');
header.id = 'header';
header.innerHTML = 'Время на сервере';
document.body.prepend(header);

// ------------------LABA 2
const gerTxtAjax = () => {
    let hxr = new XMLHttpRequest();
    hxr.onreadystatechange = () => {
        if (hxr.readyState === 4 && hxr.status === 200) {
            txtelement.innerText = hxr.responseText;
        }   
    }
    hxr.open("POST", "http://localhost:3000", true);
    hxr.setRequestHeader('Content-Type', 'text/plain');
    hxr.send('gettext');
}

const buttonGetText = document.createElement('button');
buttonGetText.onclick = () => {
    gerTxtAjax();
}
buttonGetText.id = 'GetText';
buttonGetText.innerHTML = 'Get text';
document.body.append(buttonGetText);

const txtelement = document.createElement('div');
txtelement.className = 'SomeText';
document.body.append(txtelement);

const vverxElem = document.getElementById('vverx');
vverxElem.onclick = () => {
    scroll(0,0);
}

window.onscroll = () => {
    if(window.pageYOffset > 100){
    vverxElem.style.visibility = 'visible';
    }
    else{
    vverxElem.style.visibility = 'hidden';
    }

}


const button1 = document.getElementById('plusone');
button1.onclick = () => {
    button1.innerHTML += '1';
}