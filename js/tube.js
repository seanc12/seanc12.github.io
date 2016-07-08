// injects a script tag to load the iframe API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// create an object to put video players in. has to be defined
// as an object because we have multiple players that need to go
// inside it.
var player = {};
// make a variable to keep track of video count. this is going
// to come in handy when we assign ids and execute player
// actions.
var i = 0;

// this function will execute once the API code has finished
// downloading.
function onYouTubeIframeAPIReady() {
  // first we need to get all the videos on the page. since we 
  // decided to build the iframes ourselves instead of letting 
  // the API do it for us, this is just a simple jquery 
  // selection.
  var $players = $('.video-container iframe');
  // now wee need to loop through and use the API to create a 
  // youtube player object for each video.
  $players.each(function() {
    // before we can create a player object though, we need to
    // make sure our video iframe has an id. since we want this
    // to work dynamically, we'll create and set that id here
    // instead of hard coding it in the HTML. we'll use an 
    // iterator variable to ensure the ids are different.
    var playerID = 'player--' + i;
    // now we actually assign the id to the iframe.
    $(this).attr('id', playerID);
    // using our iterator variable, we select a specific location
    // in our previosly defined player object. we then use the 
    // API to create a new instance of a youtube player object 
    // from the video's iframe id.
    player[i] = new YT.Player(playerID, {
      // set the events option so we can use custom functions
      events: {
        // whenever the play state of the video changes, it fires 
        // off a custom function. 
        'onStateChange': onPlayerStateChange
      }
    });
    // iterate the iterator because... you know... if you 
    // don't... then it isn't an iterator.
    i++;
  });
}

// this function is triggered any time the play state of a video
// changes. the event data being passed to it is provided and
// defined by the API. you can dump it out to console if you want
// to see what it contains (its what i had to do).
function onPlayerStateChange(event) {
  // var scope things that getting used multiple times. i'm sure
  // thre is a performance difference but, positive or negative,
  // its probably negligible. i honestly don't know. i mostly
  // just did it because it is a lot easier to read.
      // var the video iframe as a jquery object so we can get
      // more info based on it.
  var $thisVideo = $(event.target.f),
      // get the video's constraining parent container. since
      // this is using the bootstrap grid, we want to use the 
      // wildcard class selector to find the first parent that is
      // a bootstrap column.
      $parent = $thisVideo.parents('[class*="col-"]'),
      // get this video player's location in the player object.
      // remember that we used the same number we assigned to the
      // id of the player iframe. so we just get that id, split
      // it at the '--' (which we used specifically to make this
      // step easier), and keep only the part after the first
      // (and only)'--'.
      playerNum = $thisVideo.attr('id').split('--')[1],
      // set the event data to a more meaningful variable name.
      // this is just for ease of reading.
      playState = event.data;
  
  // now we need to determine what to do based on what the play
  // state of the video is. the first condition we want to look
  // for is if the video is playing (1) or buffering (3).
  if (playState == 1 || playState == 3) {
    // we only want one video to play at a time so the first
    // thing we want to do here is make sure no other videos are
    // playing. we do this by first starting to loop through
    // each video on the page.
    for (var x = 0; x < i; x++) {
      // we want to find any video that is currently playing AND
      // is NOT the current video.
      if (x != playerNum && player[x].getPlayerState() == 1) {
        // and then we pause it, which is necessary to trigger
        // this function for that video. and then we immediately
        // stop it. which seems uncessary but is done so that if
        // the video is still loading, it won't continue to do
        // so. stopping the video also causes the default video
        // image to return, which is more attractive than the
        // paused screen with player controls.
        player[x].pauseVideo().stopVideo();
      }
    }
    // now that we've stopped other videos on the page, we want
    // to give our currently playing video center stage. in this
    // case that means we it to expand to be the full width of
    // section container. so we grab the parent element we var'd
    // earlier and change it's width to 100%.
    $parent.css('width', '100%');
  }
  // if the video isn't playing or buffering, the only other
  // states we care about is if the video has ended (0) or is 
  // paused (2)
  else if (playState == 0 || playState == 2) {
    // ensure the video is stopped instead of just paused, for
    // reasons stated above. don't worry though, if the video is
    // selected again, playback will resume where it left off.
    player[playerNum].stopVideo();
    // our current video has stopped playing so we need it to go
    // back to its normal size. since 'normal size' is defined
    // by the CSS of a bootstrap column, all we have to do is
    // remove the inline style that was applied when the video
    // started playing. but we don't want to just remove the
    // style attribute entirely (although that would work in
    // this particular case) because we don't necessarily know
    // what other styles might have been applied elseware. so we
    // just set the width to nothing (NOT zero), which is
    // invalid and cause the style to be ignored, therefore
    // falling back to the bootstrap column width.
    $parent.css('width', '');
  }
}