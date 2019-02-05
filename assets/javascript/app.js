console.log("working");

// This is our API key
$("#search-button").on("click", function(event) {

    event.preventDefault();
    var appID = "df5214bf";


    var apiKey = "a53ad74fe53755c853236e98d9aca762";
    var searchTerm = $("#input-search").val();

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.edamam.com/search?q=" + searchTerm + "&app_id=" + appID + "&app_key=" + apiKey;

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
    url: queryURL,
    method: "GET"
    })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);
    });
  });


