const songs = [  // song name, artist, img, audio file
    {song_name:"APT.", artist:"ROSÉ, Bruno Mars", cover_img:"../song_cover_imgs/apt.jpg", audio_file:"../audio_files/APT..mp3"}, 
    {song_name:"all-american bitch", artist:"Olivia Rodrigo", cover_img:"../song_cover_imgs/all-american%20bitch.jpg", audio_file:"../audio_files/all-american%20bitch.mp3"}, 
    {song_name:"Feather", artist:"Sabrina Carpenter", cover_img:"../song_cover_imgs/feather.jpg", audio_file:"../audio_files/Feather.mp3"},
    {song_name:"四季の唄", artist:"MINMI", cover_img:"../song_cover_imgs/四季の唄.jpg", audio_file:"../audio_files/四季の唄.mp3"}
];
let current_song = 0;
let audio_play = false;

// function closeWindow() {
//     window.close();
// }

document.addEventListener("DOMContentLoaded", () => {
    const minimiseButton = document.getElementById("close-button");

    if (window.electron) {
        minimiseButton.addEventListener("click", () => {
            console.log("Minimizing window...");
            window.electron.close();
        });
    } else {
        console.error("window.electron is undefined. Is preload.js loaded?");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const minimiseButton = document.getElementById("minimise-button");

    if (window.electron) {
        minimiseButton.addEventListener("click", () => {
            console.log("Minimizing window...");
            window.electron.minimize();
        });
    } else {
        console.error("window.electron is undefined. Is preload.js loaded?");
    }
});

function setSong() {
    current_song = 0;
    updateMusicPlayer();
}

function previousSong() {
    current_song = (current_song - 1);
    current_song = (current_song + songs.length) % songs.length;
    updateMusicPlayer();
}

function nextSong() {
    current_song = (current_song + 1) % songs.length;
    updateMusicPlayer();
}

function updateMusicPlayer() {
    document.getElementById("song-title").innerHTML = songs[current_song].song_name;
    document.getElementById("artist-name").innerHTML = songs[current_song].artist;
    document.getElementById("song-cover-img").src = songs[current_song].cover_img;
    document.getElementById("audio-file").src = songs[current_song].audio_file;

    pauseSong();
    resetProgress()
}

function playPauseSong() {
    if (audio_play == false) {
        playSong();
    } else {
        pauseSong();
    }
}

function playSong() {
    document.getElementById("audio-file").play();
    audio_play = true;
    document.getElementById("audio-control-img").src = "../music_app_images/play.png";
}

function pauseSong() {
    document.getElementById("audio-file").pause();
    audio_play = false;
    document.getElementById("audio-control-img").src = "../music_app_images/pause.png";
}




let audio = document.getElementById("audio-file");

audio.ontimeupdate = function() {
    updateProgress();
}

function updateProgress() {
    let songLength = audio.duration;
    let progress = audio.currentTime;
    let marginToSet = Math.floor((progress / songLength) * 198) + "px";
    document.getElementById("progress-img").style.marginLeft = marginToSet;

    if (progress == songLength) {
        pauseSong();
    }
}

function resetProgress() {
    document.getElementById("progress-img").style.marginLeft = "0px";
}