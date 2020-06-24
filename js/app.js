'use strict';

//global variables
var imageOne = document.getElementById('image-one');
var imageTwo = document.getElementById('image-two');
var imageThree = document.getElementById('image-three');
var productElement = document.getElementById('products');
var button = document.getElementsByTagName('button')[0];
var allProducts = [];
var recentlyShown = []; // rolling window of the 5 most recent indexes
var maxClickedAllowed = 25;
var namesArray = [];
var votesArray = [];
var timesShownArray = [];
var percentagesArray = [];

//constructor function
function ProductInstances(productName, filepath, numberOfTimesShown=0, numberOfTimesClicked=0) {
  this.productName = productName;
  this.filepath = filepath;
  this.numberOfTimesShown = numberOfTimesShown;
  this.numberOfTimesClicked = numberOfTimesClicked;

  allProducts.push(this);
}

//get the image Objects
function getTheImageObjects () {
  var productInStorage = localStorage.getItem('product');

  if(productInStorage){

    allProducts = JSON.parse(productInStorage);

  } else {

    initalizeDatabase();
    localStorage.setItem('product', JSON.stringify(allProducts));
  }
}

// render the object instances
function initalizeDatabase() {
  new ProductInstances("R2D2 Bag", "img/bag.jpg");
  new ProductInstances("Banana Slicer", "img/banana.jpg");
  new ProductInstances("Bathroom Tablet Holder", "img/bathroom.jpg");
  new ProductInstances("Open Toed Rainboots", "img/boots.jpg");
  new ProductInstances("All In One Breakfast Maker", "img/breakfast.jpg");
  new ProductInstances("Meatball Flavored Bubblegum", "img/bubblegum.jpg");
  new ProductInstances("Puffy Chair", "img/chair.jpg");
  new ProductInstances("Cthulhu Action Figure", "img/cthulhu.jpg");
  new ProductInstances("Duck Beak For Your Dog", "img/dog-duck.jpg");
  new ProductInstances("Dragon Meat", "img/dragon.jpg");
  new ProductInstances("Pen Utensils", "img/pen.jpg");
  new ProductInstances("Pet Friendly Sweeper", "img/pet-sweep.jpg");
  new ProductInstances("Pizza Scissors", "img/scissors.jpg");
  new ProductInstances("Shark Sleeping Bag", "img/shark.jpg");
  new ProductInstances("Baby Sweeper", "img/sweep.png");
  new ProductInstances("Tauntaun Sleeping Bag", "img/tauntaun.jpg");
  new ProductInstances("Unicorn Meat", "img/unicorn.jpg");
  new ProductInstances("Tenticle USB", "img/usb.gif");
  new ProductInstances("Self Watering Water Can", "img/water-can.jpg");
  new ProductInstances("Impossible Wine Glass", "img/wine-glass.jpg");
}

//event listener on parent element for images
function setUpEventListener () {
  productElement.addEventListener('click', renderAllFunctions);
  button.addEventListener('click', clear);
}

function clear(){
  localStorage.clear();
  location.reload();
}

function removeEventListeners () {
  productElement.removeEventListener('click', renderAllFunctions);
}

  function transition() {
  removeEventListeners();

  var resultsSection = document.getElementById('results-hidden');
  resultsSection.id = 'results-show';
  var intro = document.getElementById('intro');
  intro.className = 'hidden';
} 

function renderImage(imageElement){
  var randomNumber = Math.floor(Math.random() * allProducts.length);

  while (
    recentlyShown.includes(randomNumber)
  ) {
    randomNumber = Math.floor(Math.random() * allProducts.length);
  }

  // add the random number to the most recent five products Shown
  recentlyShown.push(randomNumber);

  // ensure the products shown only keeps the last five indexes
  if(recentlyShown.length > 5) {
    recentlyShown.shift();
  }

  imageElement.src = allProducts[randomNumber].filepath;
  imageElement.alt = allProducts[randomNumber].productName;
  imageElement.productIndex = randomNumber;
  allProducts[randomNumber].numberOfTimesShown++;

  localStorage.setItem('product', JSON.stringify(allProducts));
}

//event handler
function renderAllFunctions() {

  //generaes the final account form
  if (maxClickedAllowed === 0) {
    chartArrayGenerator();
    transition();
  }

  //counts how many clicks each item gets
  if (event) {
    allProducts[event.target.productIndex].numberOfTimesClicked++;
    maxClickedAllowed--;
  }

  renderImage(imageOne);
  renderImage(imageTwo);
  renderImage(imageThree);
}

function chartArrayGenerator() {

  for (var i = 0; i < allProducts.length; i++){
    namesArray.push(allProducts[i].productName);
    votesArray.push(allProducts[i].numberOfTimesClicked);
    timesShownArray.push(allProducts[i].numberOfTimesShown);
    percentagesArray.push((allProducts[i].numberOfTimesClicked/allProducts[i].numberOfTimesShown)*100);
  }
}

var ctx = document.getElementById("myChart").getContext('2d');

var myChart = new Chart(ctx, {
  type: 'horizontalBar',
  data: {
    labels: namesArray,
    datasets: [{
      label: '% of votes',
      data: percentagesArray,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero:true
        }
      }]
    }
  }
});


getTheImageObjects ();
setUpEventListener();
renderAllFunctions();
