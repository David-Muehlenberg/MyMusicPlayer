import { musicList } from "./musiclist.js";
import { lyricsList } from "./lyrics.js";



let songId = 0;
let index = 0;
const player = document.getElementById("player");
const playButton = document.getElementById("play_button");
const pauseButton = document.getElementById("pause_button");
const btnRandom = document.querySelector("#random_button");
const nextSong = document.querySelector("#next_song");
const previousSong = document.querySelector("#previous_song");
const volSlider = document.getElementById("volume");
const posSlider = document.getElementById("range");
const lyric = document.createElement("p");
const lyricButton = document.getElementById("lyric_button");
const audioTimer = document.getElementById("audio_timer");
const audioTimelength = document.getElementById("audio_timelength");



// PLAYED SONG SETUP
function newSongSetup(songItem, autoplay) {
    document.querySelector("h1").innerHTML = songItem.songName;
    document.querySelector("h2").innerHTML = songItem.bandName;
    document.getElementById("cover").setAttribute("src", songItem.cover);
    document.getElementById("player").setAttribute("src", songItem.song);
    if (autoplay === true) {
        document.getElementById("player").setAttribute("autoplay", "autoplay");
    }
    songId = songItem.id;
    addLyricslist();
}

// STARTING SONG IF PAGE LOADS FOR THE FIRST TIME
function loadingFirstSong(index) {
    newSongSetup(musicList[index], false);
}
loadingFirstSong(0);

// PLAYING NEXT SONG IF ENDED
player.addEventListener("ended", () => {
    const songItem = selectNextSong();
    newSongSetup(songItem, true);
});

// RANDOM SONG
btnRandom.addEventListener("click", () => {
    const songItem = selectRandomSong();
    newSongSetup(songItem, true);
});

function selectRandomSong() {
    const randomIndex = Math.floor(Math.random()* musicList.length);
    const song = musicList[randomIndex];
    index = randomIndex;
    return song;
}

// NEXT SONG
nextSong.addEventListener("click", () => {
    const songItem = selectNextSong();
    newSongSetup(songItem);
})

function selectNextSong() {
    if (index === musicList.length -1) {
        index = -1;
    }
    index = index + 1;
    return musicList[index];
}

// PREVIOUS SONG
previousSong.addEventListener("click", () => {
    const songItem = selectPreviousSong();
    newSongSetup(songItem);
})

function selectPreviousSong() {
    if (index === 0) {
        index = musicList.length;
    } 
    index = index - 1;
    return musicList[index];
}

// START & PAUSE BUTTON
playButton.addEventListener("click", () => {
    player.play();
})

pauseButton.addEventListener("click", () => {
    player.pause();
})

// VOLUME SLIDER
volSlider.addEventListener("input", () => {
    player.volume = volSlider.value / 100;
});

// POSITION SLIDER
posSlider.addEventListener("input", () => {
    player.currentTime = posSlider.value;
});

player.addEventListener("timeupdate", () => {
    posSlider.value = player.currentTime;
});

player.addEventListener("loadedmetadata", () => {
    posSlider.setAttribute('max', player.duration);
    posSlider.setAttribute('min', 0); 
});

// PLAYLIST
function addPlaylist() {
    const playList = document.createElement("ol");
    playlist_container.appendChild(playList);

    musicList.forEach(songItem => {
        const listItem = document.createElement("li");
        playList.appendChild(listItem);

        const cover = document.createElement("img");
        const songTitel = document.createElement("h3");
        const bandName = document.createElement("h4");

        cover.setAttribute("src", songItem.cover);
        songTitel.textContent = songItem.songName;
        bandName.textContent = songItem.bandName;

        listItem.append(cover, songTitel, bandName);
    });
}
addPlaylist();

// LYRICS
function addLyricslist() {
    lyricslist_container.appendChild(lyric);
    const selectedLyric = lyricsList.filter((lyricsObject) => {
        return lyricsObject.id === songId;
    });
    lyric.textContent = selectedLyric[0].lyrics;
}

// LYRIC BUTTON
lyricButton.addEventListener("click", () => {
    const lyricDisplay = document.getElementById("lyricslist_container");
    if (lyricDisplay.style.display === "none") {
        lyricDisplay.style.display = "block";
    }
    else {
        lyricDisplay.style.display = "none";
    }
})

// AUDIO PLAYTIME
player.addEventListener("timeupdate", () => {
    audioTimer.textContent = Math.floor(player.currentTime);
})

// AUDIO SONG LENGTH
player.addEventListener("loadedmetadata", () => {
    audioTimelength.textContent = Math.floor(player.duration);
})