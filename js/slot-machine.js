function runSlots() {
  var slotOne;
  var slotTwo;
  var slotThree;

  var images = ["https://www.silveroakcasino.com/wordpress/wp-content/uploads/2015/01/cherries.jpg", "https://s-media-cache-ak0.pinimg.com/236x/52/b0/e2/52b0e237c055d1215b70bf5378698a68.jpg", "http://www.24hr-slots.co.uk/Microgaming/images/MochaOrange/MochaOrange.jpg"];

  slotOne = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
  slotTwo = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
  slotThree = Math.floor(Math.random() * (3 - 1 + 1)) + 1;

  $('.logger').html('');
  $('.logger').html('Winner !!!');

  $($('.slot')[0]).html('<img src = "' + images[slotOne - 1] + '">');
  $($('.slot')[1]).html('<img src = "' + images[slotTwo - 1] + '">');
  $($('.slot')[2]).html('<img src = "' + images[slotThree - 1] + '">');

  if (slotOne === slotTwo && slotTwo === slotThree) {
    return slotOne;
  }

  if (slotOne !== undefined && slotTwo !== undefined && slotThree !== undefined) {
    $('.logger').html(slotOne);
    $('.logger').append(' ' + slotTwo);
    $('.logger').append(' ' + slotThree);
  }

  return [slotOne, slotTwo, slotThree];
}

$(document).ready(function() {
  $('.go').click(function() {
    runSlots();
  });
});