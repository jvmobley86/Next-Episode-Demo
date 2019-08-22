var unirest = require("unirest");
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var show_array = [];
const User = require("./models/users");



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect("mongodb://localhost/nextepdb", { useNewUrlParser: true });

app.use(express.static('public'));

var test = function (request, response) {
    console.log("TESST" + request.body.email);
    var req = unirest("GET", `https://frecar-epguides-api-v1.p.rapidapi.com/${request.body.show}/next/`);
    // console.log(request.body)
    req.headers({
        "x-rapidapi-host": "frecar-epguides-api-v1.p.rapidapi.com",
        "x-rapidapi-key": "15cacc2175msh52cf4f4aa8efd48p166945jsnb4864ae31222"
    });


    req.end(function (res) {
        // if (res.error) throw new Error(res.error);
        console.log("TESST" + request.body.email);
        var user_response_back = {
            "image": "",

        }
        if (res.body.episode) {

            User.findOneAndUpdate(
                { email: request.body.email },
                { $push: { "shows": request.body.show } }, { new: true }
            ).then(function (dbResponse) {
                console.log(dbResponse);
                response.json(res.body);
            }).catch(function (err) {
                console.log(err);
                res.sendStatus(500)
            });

        } else {
            response.json({ "error": "true" });
        }
    });
}
app.post("/dashboard", test);

app.post("/dashboard/load", function (request, response) {
    console.log("TESST" + JSON.stringify(request.body));
    var req = unirest("GET", `https://frecar-epguides-api-v1.p.rapidapi.com/${request.body.show}/next/`);
    //console.log(show)
    req.headers({
        "x-rapidapi-host": "frecar-epguides-api-v1.p.rapidapi.com",
        "x-rapidapi-key": "15cacc2175msh52cf4f4aa8efd48p166945jsnb4864ae31222"
    });


    req.end(function (res) {
        // if (res.error) throw new Error(res.error);
        //console.log(res.body);
        response.json(res.body);

    });

});


app.post("/dashboard/add", function (req, res) {
    console.log("result" + request.body.show);



})
// .then(function (user) {
//     console.log(user);
//     if (!user) {
//         console.log("no user");
//     } else {
//         res.send(user);
//     }
//     // User.create(req.body);
//     // res.redirect("/dashboard");
// })
// });

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
    // res.send("hello");
});

app.get("/dashboard", function (req, res) {
    res.sendFile(__dirname + "/public/dashboard.html");
    // res.send("hello");
})

app.post("/api/user", function (req, res) {

    const { email, password } = req.body;
    User.findOne({ email })
        .then(function (user) {
            console.log(user);
            if (!user) {
                console.log("no user");
            } else {
                res.send(user);
            }
            // User.create(req.body);
            // res.redirect("/dashboard");
        })
});

app.post("/api/user/create", function (req, res) {

    let user = req.body;
    console.log(user);
    User.create(user)
        .then(function () {
            console.log("user created");
        });


});

app.listen(3003);