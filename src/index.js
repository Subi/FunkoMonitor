const ipcRenderer = require('electron').ipcRenderer;


//landingLayout
const enter = document.getElementById('enter');
const logo = document.getElementById('logo');
const logoContainer = document.getElementById('logoContainer');
const enterContainer = document.getElementById('enterContainer');
const controlContainer = document.getElementById('controlContainer');
const progressContainer = document.getElementById('progressContainer');
const progressStatus = document.getElementById('progressStatus');
const exit = document.querySelector('.exit');


exit.addEventListener('click',()=>{
    ipcRenderer.send('alert');
})


enter.addEventListener('click',() =>{
    enterContainer.style.display ='none';
    controlContainer.style.display = 'block';
    logo.style.animationPlayState = 'running';
    logoContainer.style.animationPlayState = 'running';
    settingsBtn.style.display = 'block';
})

//Monitor Layout 
const start = document.getElementById('start');
start.addEventListener('click',() =>{
    ipcRenderer.send('start');
    setTimeout(()=>{
        progressContainer.style.display = 'block';
    } , 1000);
});

const stop = document.getElementById('stop');
stop.addEventListener('click',()=>{
    ipcRenderer.send('stop');
    setTimeout(()=>{
        progressStatus.style.display = 'none';
        setTimeout(() => {
            progressContainer.style.display ='none';
        }, 1000);
    },3000);
})

ipcRenderer.on('update',(e , data)=>{
    setTimeout(() =>{
        progressStatus.innerHTML = `<p> ${data} </p>`;
    } , 2000);
})
