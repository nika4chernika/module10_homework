const inputMessage = document.querySelector('.text-area');
const sendMessageButton = document.querySelector('.send-message');
const geoButton = document.querySelector('.geo-button');
const dialogWindow = document.querySelector('.dialog-window');


// send message

const wsUri = "wss://echo.websocket.org/";
let websocket;

inputMessage.addEventListener('click', () => {
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) {
      console.log('CONNECTED');
    };
    websocket.onerror = function(evt) {
      console.log('ERROR');
    };
})

sendMessageButton.addEventListener('click', () => {
    const inputValue = inputMessage.value;
    let myMessage = document.createElement('div')
    myMessage.className = 'my-message'
    dialogWindow.append(myMessage)
    myMessage.innerHTML = `Вопрос:  ${inputValue}`;
    
    websocket.send(inputValue);
    websocket.onmessage = function(evt) {
    let backMessage = document.createElement('div')
    backMessage.className = 'back-message'
    dialogWindow.append(backMessage)
    backMessage.innerHTML = `Ответ: ${evt.data}`;
    };
});


// get geoposition


const error = () => {
    let geoMessage = document.createElement('div'); 
        geoMessage.className = 'my-message';
        dialogWindow.append(geoMessage);
    geoMessage.innerHTML = `<p>Невозможно получить ваше местоположение</p>`;
    console.log('Невозможно получить ваше местоположение')
}


function newFunction() {
    return 'Geolocation не поддерживается вашим браузером';
}
  
const success = (position) => {
    let geoMessage = document.createElement('div'); 
        geoMessage.className = 'my-message';
        dialogWindow.append(geoMessage);
    console.log('position', position);
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    geoMessage.innerHTML = `<a href='https://www.openstreetmap.org/#map=18/${latitude}/${longitude}'>Гео-локация</a>`;
}

geoButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
       console.log(newFunction());
    } else {
        console.log('Определение местоположения…');
        navigator.geolocation.getCurrentPosition(success, error);
    }
})