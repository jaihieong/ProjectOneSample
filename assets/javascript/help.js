// display random 9 images on bottom of page images from Yummly API
window.onload = function() {
    var arrayRandomRecipesImg = [];
    var arrayRandomRecipesNames = [];
    var appID = "c264894e&";
    //
    var apiKey = "f5984f792fe199d55811bb9a14dd9e5c";
    var categories = ["main dishes", "soup", "desserts", "side dishes", "snacks", "appetizers"];
    var searchTerm = categories[Math.floor(Math.random() * categories.length)];
    
    // Here we are building the URL we need to query the database
    var queryURL = "https://api.yummly.com/v1/api/recipes?_app_id=" +appID+ "_app_key=" + apiKey +"&q="+searchTerm;
    
    
    // Here we run our AJAX call to the Yummly API
    $.ajax({
    url: queryURL,
    method: "GET"
    })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {
        
        for (var i = 0; i < 9; i++){
        var imgUrl = response.matches[i].smallImageUrls;
        var recipeName = response.matches[i].recipeName;
        //console.log(imgUrl);

        arrayRandomRecipesImg.push(imgUrl);
        //console.log(arrayRandomRecipesImg);
        arrayRandomRecipesNames.push(recipeName);
        //console.log(arrayRandomRecipesNames);
        }

        var randomName1 = arrayRandomRecipesNames[0];
        var randomName2 = arrayRandomRecipesNames[1];
        var randomName3 = arrayRandomRecipesNames[2];
        //console.log(randomName2);
        //console.log(randomName3);


        var randomURL1 = arrayRandomRecipesImg[0];
        var randomURL2 = arrayRandomRecipesImg[1];
        var randomURL3 = arrayRandomRecipesImg[2];
        //console.log(randomURL1);

        var newURL1 = hdImgURL(randomURL1[0]);
        var newURL2 = hdImgURL(randomURL2[0]);
        var newURL3 = hdImgURL(randomURL3[0]);

        $("#random1").attr("src", newURL1);
        $("#random1-name").text(randomName1);
        $("#random2").attr("src", newURL2);
        $("#random2-name").text(randomName2);
        $("#random3").attr("src", newURL3);
        $("#random3-name").text(randomName3);


    })
    
};