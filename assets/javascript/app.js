var animals = ["Dog", "Cat", "Bird", "Lion"];
function onLoad() {
    for (var i = 0; i < animals.length; i++) {
        var a = $("<button>");
        a.addClass("animal");
        a.attr("data-animal", animals[i]);
        a.text(animals[i]);
        $("#buttons-view").append(a);
    }
}

function renderButtons(animal2){
    var a = $("<button>");
    a.addClass("animal");
    a.attr("data-animal", animal2);
    a.text(animal2);
    $("#buttons-view").append(a);        }

$("#add-animal").on("click", function(event) {
    event.preventDefault();
    var animal = $("#animal-input").val().trim();
    animals.push(animal);
    console.log(animals);
    console.log(animal);
    renderButtons(animal);
});
$(document).on("click", ".animal", function() {
    $("#gifs-appear-here").empty();
    var animal = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='item'>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var animalImage = $("<img>").addClass("photo");
                animalImage.attr("src", results[i].images.fixed_height.url);
                gifDiv.append(p);
                gifDiv.append(animalImage);
                $("#gifs-appear-here").prepend(gifDiv);
                // stopGif()
            }
        });
});
//
// $( document ).ready(function() {
//     onLoad();
// });