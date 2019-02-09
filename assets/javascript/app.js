console.log("First line of javascript file");

$("#search-result").hide();
$("#carouselExampleIndicators").show();

// click event for search box to call searchAPI via searchTerm
$("#search-button").on("click", function(event) {
    // hide carousel upon search
    $("#carouselExampleIndicators").hide();
    $("#search-result").show();
    // preventing page refresh upon click
    event.preventDefault();
    // $("#search-result").empty();
    // $("#result-table").empty();
    $("#search-result-list").empty();
    
    var searchTerm = $("#input-search").val();
    console.log(searchTerm);
    // Here we run our AJAX call to Yummly API
    searchAPI(searchTerm);
});

// pull data from API via search
var searchAPI = function(searchTerm) {

    // API credentials
    var appID = "c264894e";
    var apiKey = "f5984f792fe199d55811bb9a14dd9e5c";
    // Here we are building the URL we need to query the database
    var queryURL = "https://api.yummly.com/v1/api/recipes?_app_id=" + appID + "&_app_key=" + apiKey + "&q=" + searchTerm;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(queryURL);
        createRow(response);
    });
};

// The createRow function takes data returned by API and appends the table data to the tbody
var createRow = function(response) {
    $("#search-result").empty();
    // create a new table row element
    for (var i = 0; i < 10; i++) {
        var table = $("<table>");
        var tHead = $("<thead>");
        var tRow = $("<tr>");

        var recipeTitle = $("<td>").text(response.matches[i].recipeName);
        var image = $("<img>").attr("src", response.matches[i].smallImageUrls);
        
        
        var imageTD = $("<td>").append(image);
        var rating = $("<td>").text(response.matches[i].rating);
        // probably will not need this code below to display on html
        var recipeIDtd = $("<td>").text(response.matches[i].id);
        var recipeID = response.matches[i].id;

        tRow.addClass("searchResult");
        tRow.attr("IDdata", recipeID);
        
        tRow.append(recipeTitle, image, rating, recipeIDtd);
        $("#search-result").append(tRow);
    }
    
};

// click event when a row from the result is clicked
$("#search-result").on("click", "tr", function(event) {
    // prevent page from refreshing
    event.preventDefault();
    // empty contents before displaying new content
    // $("#search-result").empty();
    // $("#result-table").empty();
    $("#search-result-list").empty();
    var recipeID = $(this).attr("IDdata");
    console.log(recipeID + "from click event");

    getAPI(recipeID);

});

// pull data from API via GET call to access specific recipe item
var getAPI = function(recipeID) {
    // prevent page from refreshing
    event.preventDefault();
    // API credentials
    var appID = "c264894e";
    var apiKey = "f5984f792fe199d55811bb9a14dd9e5c";
    // Here we are building the URL we need to query the database
    var queryURL = "https://api.yummly.com/v1/api/recipe/" + recipeID + "?_app_id=" + appID + "&_app_key=" + apiKey;
    
    // Here we run our AJAX GET call to Yummly API
    $.ajax({
    url: queryURL,
    method: "GET"
    })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {

        console.log(recipeID + "from getAPI function");
        console.log(queryURL);
        console.log(response);

        createRowGetAPI(response);
        
    });
};

// creating data to display for specific recipe
var createRowGetAPI = function(response) {
    $("#search-result").empty();
    var recipeName = $("<tr>").text(response.name);
    var cookTime = $("<tr>").text(response.totalTime);
    var ingredients = $("<tr>").text(response.ingredientLines);
    var rating = $("<tr>").text(response.rating);
    var category = $("<tr>").text(response.attributes.course[0]);
    var source = $("<tr>").text(response.source.sourceRecipeUrl);
    var serving = $("<tr>").text(response.numberOfServings);
    var image = $("<img>").attr("src", response.images[0].hostedLargeUrl);
    
    $("#search-result").append(image, recipeName, cookTime, ingredients, rating, category, source, serving);
};

window.onload = function() {
    var appID = "c264894e&";
    //
    var apiKey = "f5984f792fe199d55811bb9a14dd9e5c";
    var categories = ["main dishes", "soup", "desserts", "side dishes", "snacks", "appetizers"];
    var searchTerm = categories[Math.floor(Math.random() * categories.length)];
    
    // Here we are building the URL we need to query the database
    var queryURL = "https://api.yummly.com/v1/api/recipes?_app_id=" +appID+ "_app_key=" + apiKey +"&q="+searchTerm;
    
    var arrayRandomRecipes = [];
    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
    url: queryURL,
    method: "GET"
    })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {
        
        for (var i = 0; i < 10; i++){
        var imgUrl = response.matches[i].smallImageUrls;
        //console.log(imgUrl);
      
        // var image = $("<img>").attr("src", imgUrl);
        // image.addClass("recipeimage");
        // image.attr("id", i);

        var ingredients = response.matches[i].imageUrlsBySize;
        //console.log(ingredients);
        arrayRandomRecipes.push(imgUrl);
        //console.log(arrayRandomRecipes);
        }

        var randomURL = arrayRandomRecipes[Math.floor(Math.random() * arrayRandomRecipes.length)];
        //console.log(randomURL);
        var newURL = hdImgURL(randomURL[0]);

        $("#first-image").attr("src", newURL);
        $("#second-image").attr("src", newURL);
        $("#third-image").attr("src", newURL);

    });

};

function hdImgURL(url) {
    var arrayURL = url.split('');
    var newArrayUrl = arrayURL.slice(0, arrayURL.length - 2);
    newArrayUrl.push("1500"); 
    var newURL = newArrayUrl.join('');
    return newURL;
};