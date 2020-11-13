const player = document.querySelector('.player');
const video = document.querySelector('.viewer'); 
const ad = document.querySelector('.ad'); 
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const progressBarAd = document.querySelector('.progress__filled_ad');
const toggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('.player__slider');

var v = window.location.href.match(/\?v=(.*)/);
video.src = v[1];

var dataAd = [
'https://cdn.glitch.com/5ca1968a-d6a8-4e14-8bfc-1829566a2cd0%2Fmms-crispy-les-mms-crispy-sont-la-pub-20s.mp4?v=1602277584089',
'https://cdn.glitch.com/5ca1968a-d6a8-4e14-8bfc-1829566a2cd0%2Fcampagne-2016-30-millions-damis.mp4?v=1602289864151',
'https://cdn.glitch.com/5ca1968a-d6a8-4e14-8bfc-1829566a2cd0%2Faldi-la-grande-distribution-place-au-nouveau-consommateur-pub-43s.mp4?v=1602289901191',
'https://cdn.glitch.com/5ca1968a-d6a8-4e14-8bfc-1829566a2cd0%2Fcanard-freshdisc-et-gel-scjohnson-une-entreprise-familiale-oeuvrant-pour-un-monde-meilleur-pub-15s.mp4?v=1602290555881',
'https://cdn.glitch.com/5ca1968a-d6a8-4e14-8bfc-1829566a2cd0%2Flidl-robot-multifonction-silvercrest-reservez-vos-vacances-lundi-12-octobre-2020-pub-30s.mp4?v=1602290592263',
'https://cdn.glitch.com/5ca1968a-d6a8-4e14-8bfc-1829566a2cd0%2Fikea-ranger-fait-de-la-place-a-la-vie-be-quiet-publicite-030.mp4?v=1602290615204',
'https://cdn.glitch.com/5ca1968a-d6a8-4e14-8bfc-1829566a2cd0%2Fsuper-glue-3-loctite-dites-non-a-jeter-dites-oui-a-reparer-pub-15s.mp4?v=1602290642974'
];

function random(array) {
  return array[Math.floor(Math.random() * array.length)]
}
ad.src = random(dataAd);

function viewAd() {
  player.querySelector(".play__button").addEventListener('click', function () {ad.play();document.querySelector(".play__button").style.display='none';setTimeout(function(){player.querySelector(".skip_ad_btn").style.display = "block";}, 5000);});
  player.querySelector(".player__controls").style.display = "none";
}
onload=viewAd;

player.querySelector(".skip_ad_btn").onclick = function () {
  ad.pause();
  ad.style.display = "none";
  player.querySelector(".progress_ad").style.display = "none";
  document.querySelector(".ad__info").style.display = "none";
  player.querySelector(".skip_ad_btn").style.display = "none";
  video.style.display = "block";
  player.querySelector(".player__controls").style.display = "";
  video.play();
}

ad.addEventListener("ended",function() {
  ad.style.display = "none";
  document.querySelector(".ad__info").style.display = "none";
  player.querySelector(".progress_ad").style.display = "none";
  player.querySelector(".skip_ad_btn").style.display = "none";
  video.style.display = "block";
  player.querySelector(".player__controls").style.display = "";
  video.play();
});

function togglePlay() {
  if(video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

function updateButton() {
  const icon = this.paused ? '<img width="26px" src="https://cdn.glitch.com/5ca1968a-d6a8-4e14-8bfc-1829566a2cd0%2Fplay-arrow.svg?v=1602267681812">' : '<img width="26px" src="https://cdn.glitch.com/5ca1968a-d6a8-4e14-8bfc-1829566a2cd0%2Fpause%20(2).svg?v=1602267734514">';
  const title = this.paused ? 'Lire' : 'Pause';
  toggle.innerHTML = icon;
  toggle.title = title;
};

function skip() {
  console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
};

function handleRangeUpdate() {
  console.log(this.value);
  video[this.name] = this.value;
};

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  const percentad = (ad.currentTime / ad.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
  progressBarAd.style.flexBasis = `${percentad}%`;
};

function scrub(event) {
  console.log(event);
  const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};

var elem = document.querySelector(".player");
document.querySelector("[js_sel='openfs']").onclick = function () {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
document.querySelector("[js_sel='openfs']").style.display = "none";
document.querySelector("[js_sel='closefs']").style.display = "block";
}

document.querySelector("[js_sel='closefs']").onclick = function () {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
document.querySelector("[js_sel='openfs']").style.display = "block";
document.querySelector("[js_sel='closefs']").style.display = "none";
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

video.addEventListener('timeupdate', handleProgress);
ad.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (event) => mousedown && scrub(event));

progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);