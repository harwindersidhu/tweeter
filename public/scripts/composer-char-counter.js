$(document).ready(function() {
  $("#tweet-text").on('input', function() {
    let numberOfCharactersLeft = 140 - this.value.length;
    if (numberOfCharactersLeft >= 0) {
      $(this).parent().find("output").val(numberOfCharactersLeft).css({"color": "#545149"});
    } else {
      $(this).parent().find("output").val(numberOfCharactersLeft).css({"color": "red"});
    }
  });
});