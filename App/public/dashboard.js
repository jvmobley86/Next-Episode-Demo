var show = $("#showSearch");
var tvImages = {
    "power": ""
}
var loggedUser = JSON.parse(sessionStorage.getItem("user"));
$(document).ready(function () {
    // var loggedUser = JSON.parse(sessionStorage.getItem("user"));
    $("#welcome").text("Welcome " + loggedUser.userName);
    var userShows = loggedUser.shows;
    userShows.forEach(function (show) {
        console.log(show);
        $.ajax({
            url: "/dashboard/load",
            method: "POST",
            dataType: "json",
            data: { show: show },
        }).then(function (response) {
            //console.log(response);
            var tRow = $("<tr>");


            var name = $("<td>").text(response.episode.show.epguide_name);
            var season = $("<td>").text(response.episode.season);
            var episode = $("<td>").text(response.episode.number);
            var title = $("<td>").text(response.episode.title);
            var date = $("<td>").text(response.episode.release_date);


            tRow.append(name, season, episode, title, date);

            $("tbody").append(tRow);

        }).catch(function (err) {
            console.log(err);
        })
    })
});

$(document).on("click", "#add", function () {
    console.log("click");
    var postData = {
        show: $("#showSearch").val(),
        email: loggedUser.email
    }
    //console.log(postData);
    $.ajax({
        url: "/dashboard",
        method: "POST",
        dataType: "JSON",
        data: postData
    }).then(function (response) {
        // console.log(response);
        // console.log(response.episode.show.epguide_name);
        // console.log(response.episode.season);
        // console.log(response.episode.number);
        // console.log(response.episode.title);
        // console.log(response.episode.release_date);
        if (response.hasOwnProperty("error")) {
            alert("show not found")
        } else {
            var tRow = $("<tr>");

            // This is why we can create and save a reference to a td in the same statement we update its text
            var name = $("<td>").text(response.episode.show.epguide_name);
            var season = $("<td>").text(response.episode.season);
            var episode = $("<td>").text(response.episode.number);
            var title = $("<td>").text(response.episode.title);
            var date = $("<td>").text(response.episode.release_date);

            // Append the newly created table data to the table row
            tRow.append(name, season, episode, title, date);

            $("tbody").append(tRow);

        }

    });

});