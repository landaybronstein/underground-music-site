const musicPlayers = $(".music-container");

musicPlayers.each(function() {
  let playButton = $(this).find('.music-play')[0];
  let audio = $(this).find('audio')[0];
  let progress = $(this).find('progress')[0];
  let updateInterval = null;

  $(playButton).click(() => {
    let duration = parseInt(audio.duration);
    let currentTime = parseInt(audio.currentTime);
    progress.max = duration;
    progress.value = currentTime;
    if (audio.paused) {
      $(this).addClass("play");
      $(playButton).children("i").removeClass("fa-play");
      $(playButton).children("i").addClass("fa-pause");
      audio.play();
      updateInterval = setInterval(() => {
        currentTime += 1;
        progress.value = currentTime;
        if (currentTime >= duration) {
          clearInterval(updateInterval);
          progress.value = 0;
          currentTime = 0;
          $(this).removeClass("play");
          $(playButton).children("i").removeClass("fa-pause");
          $(playButton).children("i").addClass("fa-play");
        }
      },1000)
    } else {
      $(this).removeClass("play");
      $(playButton).children("i").removeClass("fa-pause");
      $(playButton).children("i").addClass("fa-play");
      audio.pause();
      clearInterval(updateInterval)
    }
  })
});
