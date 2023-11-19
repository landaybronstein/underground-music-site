const musicPlayersUI = $(".music-container");

musicPlayersUI.each(function () {
  let playButtonUI = $(this).find(".music-play")[0];
  let audioUI = $(this).find("audio")[0];
  let progressUI = $(this).find("progress")[0];
  let durationUI = $(this).find(".duration")[0];

  let updateInterval = null;
  let duration = parseInt(audioUI.duration);
  let currentTime = parseInt(audioUI.currentTime);
  durationUI.innerHTML = `${Math.floor(duration / 60)}:${duration%60}`;

  $(playButtonUI).click(() => {
    progressUI.max = duration;
    progressUI.value = currentTime;

    const musicProgressInterval = () => {
      currentTime += 1;
      progressUI.value = currentTime;
      if (currentTime >= duration) {
        clearInterval(updateInterval);
        progressUI.value = 0;
        currentTime = 0;
        $(this).removeClass("play");
        $(playButtonUI).children("i").removeClass("fa-pause");
        $(playButtonUI).children("i").addClass("fa-play");
      }
    };

    if (audioUI.paused) {
      $(this).addClass("play");
      $(playButtonUI).children("i").removeClass("fa-play");
      $(playButtonUI).children("i").addClass("fa-pause");
      audioUI.play();
      updateInterval = setInterval(musicProgressInterval, 1000);
    } else {
      $(this).removeClass("play");
      $(playButtonUI).children("i").removeClass("fa-pause");
      $(playButtonUI).children("i").addClass("fa-play");
      audioUI.pause();
      clearInterval(updateInterval);
    }
  });
});