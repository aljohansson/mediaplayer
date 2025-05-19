

const songs = [

{
    title: "Goodbye My Love",
    artist:"Irokz",
    src: "Musik/irokz-goodbye.mp3",
    image:"Img/goodbye-my-love.jpg"
},
{
    title: "Want it All",
    artist:"Mqx & MVSTAFA",
    src: "Musik/mqx-mvstafa-want.mp3",
    image:"Img/want-it-all.jpg"
},
{
    title: "Shine (Remix)",
    artist:"Always Mirin, Spektrem",
    src: "Musik/shine-remix.mp3",
    image:"Img/shine.jpg"
},
{
    title: "Heaven Knows",
    artist:"Vizzen & Protolizard",
    src: "Musik/vizzen-heaven-knows.mp3",
    image:"Img/heaven-knows.jpg"
},

{
    title: "Your Burn",
    artist:"vxcelm & ANIZYZ",
    src: "Musik/vxcelm-your-burn.mp3",
    image:"Img/your-burn.jpg"
},
{
    title: "Walk Away",
    artist:"Vaskan",
    src: "Musik/vaskan-walk-away.mp3",
    image:"Img/walk-away.jpg"
},
{
    title: "Summer's End",
    artist:"Jade Key & Tatsunoshin",
    src: "Musik/jadekey-summers-end.mp3",
    image:"Img/summers-end.jpg"
},


];


let currentIndex = 0;
let isPlaying = false;
let isLooping = false;
const audio = new Audio();

const playBtn = document.querySelector('.btn-play');
const nextBtn = document.querySelector('.btn-forward');
const prevBtn = document.querySelector('.btn-rewind');
const shuffleBtn = document.querySelector('.btn-shuffle');
const repeatBtn = document.querySelector('.btn-repeat');

const timeDisplay = document.querySelector('.time span:first-child');
const timeEnd = document.querySelector('.time span:last-child');
const timeShow = document.querySelector('.timeshow');


const listItems = document.querySelectorAll('.list .list-contain');
const titleElem = document.querySelector('.player-info .text h4');
const artistElem = document.querySelector('.player-info .text span');
const imageElem = document.querySelector('.thumb img');

// 

function loadSong(index) {
    const song = songs[index];
    audio.src = song.src;
    titleElem.textContent = song.title;
    artistElem.textContent = song.artist;
    imageElem.src = song.image;

    const allItems = document.querySelectorAll('.list-contain');
    allItems.forEach(item => item.classList.remove('active'));
    if (listItems[index]){
        listItems[index].classList.add('active');
    }



}

// 

function togglePlay(){
    if (isPlaying){
        audio.pause();
    }
    else {
        audio.play();
    }
}

//
function formatTime(seconds){

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    let formattedSeconds = remainingSeconds;
    if (remainingSeconds< 10){
        formattedSeconds = '0' + remainingSeconds
    }

    const formattedTime = minutes + ":" + formattedSeconds;
    return formattedTime;
}

// 


audio.addEventListener("play", function() {
isPlaying = true;

playBtn.innerHTML= '<span class="material-icons">pause_circle_filled</span>';
});


audio.addEventListener("pause", function() {
isPlaying = false;

playBtn.innerHTML= '<span class="material-icons">play_circle_filled</span>';
});

//

audio.addEventListener('timeupdate',function(){

    const activeTime = audio.currentTime;

    timeDisplay.textContent = formatTime(activeTime);

    if (audio.duration){
        const totalTime = audio.duration;

        timeEnd.textContent = formatTime(totalTime);

        const timePlayed =(activeTime / totalTime) * 100;

        timeShow.style.width = timePlayed + "%";    

    }
});


//

nextBtn.addEventListener ('click', function() {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    audio.play();

});


//
prevBtn.addEventListener ('click', function() {
    currentIndex = (currentIndex - 1) % songs.length;
    loadSong(currentIndex);
    audio.play();

});

//

shuffleBtn.addEventListener ('click', function() {
    currentIndex = Math.floor(Math.random() * songs.length);
    loadSong(currentIndex);
    audio.play();
});


//

repeatBtn.addEventListener ('click', function() {
const icon = repeatBtn.querySelector('.material-icons');

    if (isLooping === false){
        isLooping= true;
        audio.loop= true;
        repeatBtn.classList.add('active');
        icon.textContent = 'repeat_one';

        
    } else {
        isLooping= false;
        audio.loop= false;
        repeatBtn.classList.remove('active');  
        icon.textContent = 'repeat';
    }
});


//

for (let i =0; i <listItems.length; i++){
    let item = listItems[i];

    item.addEventListener('click',function(){
    currentIndex = i;
    loadSong(currentIndex);
    audio.play();
    
    document.querySelectorAll('list-contain').forEach(item => {
        item.classList.remove('active');
    });
    listItems[i].classList.add('active');
});


}


playBtn.addEventListener('click', togglePlay);

loadSong(currentIndex);

