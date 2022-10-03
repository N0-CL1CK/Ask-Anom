$(document).on("input", "#answer-text", function () {
    var limit = 255;
    var countChars = $(this).val().length;
    var remainingChars = limit - countChars;
    var text = document.getElementById('remaining-chars');

    $(".chars").text(remainingChars);

    (remainingChars > 20) ? text.style.color = 'black' : text.style.color = 'red';
});