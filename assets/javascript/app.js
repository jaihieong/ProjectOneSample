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
    $("#search-result").show();
    $("#carouselExampleIndicators").hide();
    // create a new table row element
    for (var i = 0; i < 10; i++) {
        
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
// click event for drop-down menu items
$(".dropdown-menu").on("click", "a", function(event) {
    // prevent page from refreshing
    event.preventDefault();
    $("#search-result-list").empty();
    //Create variable to read and store the clicked category/cuisine
    var searchTerm = $(this).attr("data");
    searchAPI(searchTerm);
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
// display carousel images from Yummly API
window.onload = function() {
    var appID = "c264894e&";
    //
    var apiKey = "f5984f792fe199d55811bb9a14dd9e5c";
    var categories = ["main dishes", "soup", "desserts", "side dishes", "snacks", "appetizers"];
    var searchTerm = categories[Math.floor(Math.random() * categories.length)];
    var searchRandom = categories[Math.floor(Math.random() * categories.length)];
    // Here we are building the URL we need to query the database
    var queryURL = "https://api.yummly.com/v1/api/recipes?_app_id=" +appID+ "_app_key=" + apiKey +"&q="+searchTerm;
    var queryURL2 = "https://api.yummly.com/v1/api/recipes?_app_id=" +appID+ "_app_key=" + apiKey +"&q="+searchRandom;

    var arrayRandomRecipesNames = [];
    var arrayRandomRecipes = [];
    var arrayRandom = [];
    // Here we run our AJAX call to the Yummly API
    $.ajax({
    url: queryURL,
    method: "GET"
    })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {
        
        for (var i = 0; i < 10; i++){
        var imgUrl = response.matches[i].smallImageUrls;
        // var recipeName = response.matches[i].recipeName;
        //console.log(imgUrl);
      
        // var image = $("<img>").attr("src", imgUrl);
        // image.addClass("recipeimage");
        // image.attr("id", i);
        var ingredients = response.matches[i].imageUrlsBySize;
        //console.log(ingredients);
        arrayRandomRecipes.push(imgUrl);
        // arrayRandomRecipesNames.push(recipeName);
        //console.log(arrayRandomRecipes);
        }
        function getValue() {
            var randomValue;
            do {
                randomValue = Math.floor(Math.random() * 10);
            } while(randomValue === index1 || randomValue === index2 || randomValue === index3);
            return randomValue;
        };
        var index1 = getValue();
        var index2 = getValue();
        var index3 = getValue();
        console.log(index1, index2, index3);

        var randomURL1 = arrayRandomRecipes[index1];
        var randomURL2 = arrayRandomRecipes[index2];
        var randomURL3 = arrayRandomRecipes[index3];
        //console.log(randomURL);

        var newURL1 = hdImgURL(randomURL1[0]);
        var newURL2 = hdImgURL(randomURL2[0]);
        var newURL3 = hdImgURL(randomURL3[0]);
        $("#first-image").attr("src", newURL1);
        $("#second-image").attr("src", newURL2);
        $("#third-image").attr("src", newURL3);

    });

    $.ajax({
        url: queryURL2,
        method: "GET"
        })
        // We store all of the retrieved data inside of an object called "response"
        .then(function(response) {

            for (var i = 0; i < 10; i++){
                var img = response.matches[i].smallImageUrls;
                var recipeName = response.matches[i].recipeName;
                //console.log(imgUrl);
                arrayRandom.push(img);
                arrayRandomRecipesNames.push(recipeName);
                //console.log(arrayRandomRecipes);
            }
            for(var j = 0; j < 10; j++) {

                var randomPic = arrayRandom[j];
                console.log(randomPic);

                var randomPicName = arrayRandomRecipesNames[j];
                console.log(randomPicName);

                var newPic = hdImgURL(randomPic[0]);
                console.log(newPic);

                $("#random" + j).attr("src", newPic);
                $("#random" + j + "-name").text(randomPicName);
            }
        
        });
        
            
};
function randomURL (url) {
    var newURL = arrayRandomRecipes[Math.floor(Math.random() * arrayRandomRecipes.length)];
    return newURL;
};
// function to grab image link in high definition 
function hdImgURL(url) {
    var arrayURL = url.split('');
    var newArrayUrl = arrayURL.slice(0, arrayURL.length - 2);
    newArrayUrl.push("1500"); 
    var newURL = newArrayUrl.join('');
    return newURL;
};
//YouTube function starts here
$("#search-result").on("click", "tr", function(event) {
    $("#random-recipes").empty();
    event.preventDefault();
    
    var recipeRandom = ["cooking", "recipe"];
    var youtube = $("#input-search").val();
    var youtube1 = $("#input-search").val() + recipeRandom[0];
    var youtube2 = $("#input-search").val() + recipeRandom[1];
    //
    var queryURL = "https://www.youtube.com/embed/?listType=search&list=" + youtube + "&loop=1";
    var queryURL1 = "https://www.youtube.com/embed/?listType=search&list=" + youtube1 + "&loop=1";
    var queryURL2 = "https://www.youtube.com/embed/?listType=search&list=" + youtube2 + "&loop=1";
    var frame = $("<iframe class=embed-responsive-item>").attr("src", queryURL );
    var frame1 = $("<iframe class=embed-responsive-item>").attr("src", queryURL1 );
    var frame2 = $("<iframe class=embed-responsive-item>").attr("src", queryURL2 );
            // var frame1 = $("<tr>").html(frame);        
    $("#random-recipes").append(frame, frame1, frame2);
});
var player;
function onYouTubeIframeAPIReady(){
    player = new YT.Player('player',    {
      height: '500',
      width: '500',
    events : {
    'onReady' : onPlayerReady,
    'onStateChange' : onPlayerStateChange
    }
    });
    }
function onPlayerReady(e){
   //console.log('youtube player is ready');
    } 
function onPlayerStateChange(e){
    //console.log('player state change');
}

