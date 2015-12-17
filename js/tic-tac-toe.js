var gameover = false;

  function checkCombination(b1, b2, b3) {
    if (b1.innerHTML != '' && b1.innerHTML == b2.innerHTML && b1.innerHTML == b3.innerHTML) {

      gameover = true;
      b1.style.backgroundColor = 'limeGreen';
      b2.style.backgroundColor = 'limeGreen';
      b3.style.backgroundColor = 'limeGreen';
    }
  }

  function checkWin() {
    checkCombination(button1, button2, button3);
    checkCombination(button4, button5, button6);
    checkCombination(button7, button8, button9);
    checkCombination(button1, button4, button7);
    checkCombination(button2, button5, button8);
    checkCombination(button3, button6, button9);
    checkCombination(button1, button5, button9);
    checkCombination(button3, button5, button7);
  }

  function pickSquare() {
    if (gameover || this.innerHTML != '') return;

    this.innerHTML = selectTurn.value;

    if (selectTurn.value == 'X') {
      selectTurn.value = 'O';
    } else {
      selectTurn.value = 'X';
    }

    checkWin();
  }

  function resetGame() {
    button1.style.backgroundColor = '';
    button2.style.backgroundColor = '';
    button3.style.backgroundColor = '';
    button4.style.backgroundColor = '';
    button5.style.backgroundColor = '';
    button6.style.backgroundColor = '';
    button7.style.backgroundColor = '';
    button8.style.backgroundColor = '';
    button9.style.backgroundColor = '';
    button1.innerHTML = '';
    button2.innerHTML = '';
    button3.innerHTML = '';
    button4.innerHTML = '';
    button5.innerHTML = '';
    button6.innerHTML = '';
    button7.innerHTML = '';
    button8.innerHTML = '';
    button9.innerHTML = '';
    gameover = false;
  }

  button1.onclick = pickSquare;
  button2.onclick = pickSquare;
  button3.onclick = pickSquare;
  button4.onclick = pickSquare;
  button5.onclick = pickSquare;
  button6.onclick = pickSquare;
  button7.onclick = pickSquare;
  button8.onclick = pickSquare;
  button9.onclick = pickSquare;
  playButton.onclick = resetGame;