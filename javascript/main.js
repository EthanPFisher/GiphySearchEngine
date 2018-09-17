
// api key: krvOHtQ3ZxpkyWOvzQxM1d2GyBEcCra1

var topics = ['dogs', 'the office', 'mario 64', 'cowboy bebop', 'one punch man', 'space', 'han solo', 'deep sea']

var $btns = $('#btns')
var $gifs = $('#gifs')


function addButton(topic) {
    var newBtn = $('<button>')
    newBtn.attr("class", "topic-btn")
    newBtn.text(topic)
    $btns.append(newBtn)
}

for (i = 0; i < topics.length; i++) {
    addButton(topics[i])
}

$('#submit').on('click', function (event) {
    event.preventDefault()

    var topic = $("#input").val().trim()
    addButton(topic)
})



$(document).on('click', '.topic-btn', function () {

    var queryUrl = 'https://api.giphy.com/v1/gifs/search?q=' + $(this).text() + '&api_key=krvOHtQ3ZxpkyWOvzQxM1d2GyBEcCra1&limit=10'

    $.ajax({
        url: queryUrl,
        method: 'GET'
    }).then(function (response) {

        console.log(response)
        var re = response.data

        for (i = 0; i < re.length; i++) {

            var gifDiv = $("<div>")
            var rating = re[i].rating
            var p = $("<p>").text("Rating: " + rating)
            var gif = $("<img>")

            gif.attr(
                "src", re[i].images.fixed_height_still.url
            ).attr(
                "data-still", re[i].images.fixed_height_still.url
            ).attr(
                "data-animate", re[i].images.fixed_height.url
            ).attr(
                "data-state", "still"
            ).attr(
                "class", "gif"
            )

            gifDiv.append(p)
            gifDiv.append(gif)
            $gifs.prepend(gifDiv)
        }
    })
})

$(document).on('click', '.gif', function () {
    
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})