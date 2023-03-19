console.log("welcome to spotify");
//Intialize the variables
let songIndex=0;
let audioElement=new Audio("songs/1.mp3");
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songItems=Array.from(document.getElementsByClassName('songItem'));
let songs=[
    {songName:"Warriyo - Mortals",filePath:"songs/1.mp3",coverPath:"covers/1.jpg"},
    {songName:"Cielo - Huma-Huma",filePath:"songs/2.mp3",coverPath:"covers/2.jpg"},
    {songName:"DEAF KEV - Invincible -320k",filePath:"songs/3.mp3",coverPath:"covers/3.jpg"},
    {songName:"Different Heaven & EH!DE - My Heart ",filePath:"songs/4.mp3",coverPath:"covers/4.jpg"},
    {songName:"Janji-Heroes-Tonight-feat-Johnning",filePath:"songs/5.mp3",coverPath:"covers/5.jpg"},
    {songName:"Rabba - Salam-e-Ishq",filePath:"songs/6.mp3",coverPath:"covers/6.jpg"},
]
songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
   element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
//audioElement.play();
// handle play/pause click
masterPlay.addEventListener('click',()=>{
    // when we click on the play buttoni
    if(audioElement.paused ||  audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1; //gif display dark
    }
    else{ //when we click on pause button
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;//gif display light
    }
})
//listen to events
audioElement.addEventListener('timeupdate',()=>{
    //update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress; //progressbar starts from 0

});
myProgressBar.addEventListener('change',()=>{ //if we change the range of the progress bar the song too changes
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
})
// playing other songs
makeAllPlays=()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    })
}
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
element.addEventListener("click",(e)=>{
console.log(e.target);
makeAllPlays();
songIndex=parseInt(e.target.id); //for multiple plays
e.target.classList.remove("fa-circle-play");
e.target.classList.add("fa-circle-pause");
masterSongName.innerText=songs[songIndex].songName;
audioElement.src=`songs/${songIndex+1}.mp3`;
audioElement.currentTime=0;
audioElement.play();
gif.style.opacity=1;
masterPlay.classList.remove('fa-circle-play');
masterPlay.classList.add('fa-circle-pause');
})


})
// for forward and backward buttons
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
audioElement.currentTime=0;
audioElement.play();
masterPlay.classList.remove('fa-circle-play');
masterPlay.classList.add('fa-circle-pause');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
audioElement.currentTime=0;
audioElement.play();
masterPlay.classList.remove('fa-circle-play');
masterPlay.classList.add('fa-circle-pause');
})