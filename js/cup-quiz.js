function calculateScore() {
    //Add up the score
    var score = 0;

    if (championshipsSelect.value == 'correct') score++;
    if (hotelSelect.value == 'correct') score++;
    if (debutSelect.value == 'correct') score++;

    if (hostNumber.value == 4) score++;
    if (countriesNumber.value == 8) score++;
    if (participatedNumber.value == 1) score++;
    if (hostedNumber.value == 2) score++;

    var message = '';
    if (score > 4) {
      message = 'You are amazing!';
    } else if (score > 2) {
      message = 'Good job!';
    } else {
      message = 'You need to do some research!';
    }

    //Display the score
    alert('Score: ' + score + '/7' + message);
  }

  checkAnswersButton.onclick = calculateScore;