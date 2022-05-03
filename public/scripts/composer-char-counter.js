$(document).ready(function () {
  $("#tweet-text").on('input', function () {
    //  console.log($(this).val()); 
    const maxChars = 140;
    const length = $(this).val().length;
    const $counter = $(this).siblings("div").children("output");
    $counter.text(maxChars - length);
    if (length > maxChars)  $counter.addClass("text-purple");
    if (length <= maxChars) $counter.removeClass("text-purple");
    

  });


});


