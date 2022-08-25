import { movies } from "./database.js";

//Get the ul element
const movieList = document.querySelector('#movielist');
//console.log(movieList);

// children of the ul element
const allMovieLi = movieList.children;
//console.log(allMovieLi);

// radiobtns
const radiobtns = document.querySelectorAll(".header_nav_radio_label_btn");
//console.log(radiobtns);

//Searchbar
const searchbar = document.querySelector("#searchbar");
//console.log(searchbar);

// Adding movies to DOM
const addMoviesToDom = function(movies){
    // create new array with .map function
    const newMovieArray = movies.map(function (movie){
        // create li for each movie
        const movieListItem = document.createElement("li");

        //adding title and year attributes to the li
        movieListItem.setAttribute("title", movie.title);
        movieListItem.setAttribute("value", movie.year);
        //console.log(movie.year)

        // create a for each movie, set attributes and put it in the li
        const movieLink = document.createElement("a");
        movieLink.setAttribute("href", getImdbId(movie.imdbID));
        movieLink.setAttribute("target", "_blank");
        movieListItem.append(movieLink);

        // create img element for each movie, set attributes and put it in the a (sounds dirty)
        const newImage = document.createElement("img")
        newImage.setAttribute("src", movie.poster);
        // add img elements to the li elements
        movieLink.append(newImage);

        //movieListItem.append(movieLink);
        //console.log(movieListItem);
        return movieListItem;
    });
    // add the li elements to the ul element
    newMovieArray.forEach(function (movie) {
            movieList.append(movie);
    });

    return newMovieArray;
};

// Event Listeners for radiobuttons
const addEventListeners = function(array){
    for (let i=0; i<array.length; i++){
        array[i].addEventListener("change", function(event){
            //console.log("you changed me");
            handleOnChangeEvent(event);
        });
    };
};

// When X btn is changed, X happens.
const handleOnChangeEvent = function(event) {
    const targetValue = event.target.value;
    switch(targetValue) {
        case "latest":
            filterLatestMovies()
        break;
        case "avenger":
            filterMovies(targetValue);
        break;
        case "x-men":
            filterMovies(targetValue);
        break;
        case "princess":
            filterMovies(targetValue);
        break;
        case "batman":
            filterMovies(targetValue);
        break;
        default:
            console.log("Cannot find this movie")
    };
};

// filter for value in title of movie
const filterMovies = function (wordInMovie) {
    for (let li of allMovieLi){
        if(li.title.toLowerCase().includes(wordInMovie)){
            li.style.display = "block";
        } else {
            li.style.display = "none";
        };
    };
}; 

//filter for years
const filterLatestMovies = function(){
    for (let li of allMovieLi){
        //const listitem = li.value;
        //console.log(typeof listitem);

        if(li.value >= 2014){
            li.style.display = "block";
        } else {
            li.style.display = "none";
        };
    };
};

//combine the first half of the URL with the imdbID
const getImdbId = function(imdbID){
    const imdbUrl = "https://www.imdb.com/title/";
    //console.log(imdbUrl + imdbID);
    return `${imdbUrl}${imdbID}`;
};

const getUserInput = function(event){
    const userInput = event.target.value.toLowerCase();
    //console.log(userInput);

    for (let li of allMovieLi){
        console.log(li);
        if(li.title.toLowerCase().includes(userInput)){
            li.style.display = "block";
        } else {
            li.style.display = "none";
        };
    };
};

searchbar.addEventListener("keydown", getUserInput);

addMoviesToDom(movies);
addEventListeners(radiobtns);