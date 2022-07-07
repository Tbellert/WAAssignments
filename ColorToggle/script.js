// Dem Variables.
const colorClass = ["home-background", "red-background", "green-background", "blue-background", "orange-background", "purple-background"];
const colors = ["Hello World.", "Red", "Green", "Blue", "Orange", "Purple"];

// Open the dropdown menu
let openNav = function() {
    document.getElementById("dropdownNav").classList.toggle("dropitdown");
};


// Add backgroundcolor + display color text, remove class attribute 
let addColor = function(colorClassNumber, colorNumber){
    colorClassNumber = colorClass[colorClassNumber];
    colorNumber = colors[colorNumber];
    document.getElementById("body").removeAttribute ('class');
    document.getElementById("body").classList.add(colorClassNumber);
    document.getElementById("currentcolor").innerHTML = (colorNumber);
};

// keyboard binds
document.addEventListener("keydown", function(event) {
    if (event.code === "Digit1") {
      addColor(0, 0);
      document.getElementById('radioHome').checked = true;
    } else if (event.code === "Digit2") {
      addColor(1, 1);
      document.getElementById('radioRed').checked = true;
    } else if (event.code === "Digit3") {
      addColor(2, 2);
      document.getElementById('radioGreen').checked = true;
    } else if (event.code === "Digit4") {
      addColor(3, 3);
      document.getElementById('radioBlue').checked = true;
    } else if (event.code === "Digit5") {
      addColor(4, 4);
      document.getElementById('radioOrange').checked = true;
    } else if (event.code === "Digit6") {
      addColor(5, 5);
      document.getElementById('radioPurple').checked = true;
}});

// Event Listeners
document.getElementById("radioHome").addEventListener("click", function(){ addColor(0, 0)});
document.getElementById("radioRed").addEventListener("click", function(){ addColor(1, 1)});
document.getElementById("radioGreen").addEventListener("click", function(){ addColor(2, 2)});
document.getElementById("radioBlue").addEventListener("click", function(){ addColor(3, 3)});
document.getElementById("radioOrange").addEventListener("click", function(){ addColor(4, 4)});
document.getElementById("radioPurple").addEventListener("click", function(){ addColor(5, 5)});



// BONUS POINTS!!!1!!1

// As a user I don't want the colors in the menu described in text. I want to see them also with their corresponding color. Each "row " has a different color.
// As a user I want to click onto a radio button in the color menu, so I can see which color is "active" on that moment.
// As a user I want to open the menu when I hover over the Hamburger icon with the mouse instead of clicking on it. The menu closes when the mouse is not hovering on the hamburger icon.
// As a user I want to see the picked color name described into my webpage and it changes after changing color.
// As a user I want to see the menu sliding in and out smoothly into the screen, instead of popping out suddenly.(Use CSS transition and the direction doesn't matter)
// As a user I am able to change the color with the keyboard.(1 for home, 2 for red, 3 for orange, etc.) ⇒ ****Here you need new Event Type...