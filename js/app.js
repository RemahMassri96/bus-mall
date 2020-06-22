'use strict';
var productsArray = [];
var imgPathArray = [];
var nameArray = [];
var countClickedArray = [];
var countShownArray = [];
var previousImgDisplay = [];
var img1 = document.getElementById('image1');
var img2 = document.getElementById('image2');
var img3 = document.getElementById('image3');
var body = document.getElementsByTagName('body')[0];
var totalClicks = 0;

function Products(name, filePath){
  this.name = name;
  this.filePath = filePath;
  this.countShown = 0;
  this.countClicked = 0;
  productsArray.push(this);
  imgPathArray.push(filePath);
  nameArray.push(name);
};

var bag = new Products('bag', 'img/bag.jpg');
var banana = new Products('banana', 'img/banana.jpg');
var bathroom = new Products('bathroom', 'img/bathroom.jpg');
var boots = new Products('boots', 'img/boots.jpg');
var breakfast = new Products('breakfast', 'img/breakfast.jpg');
var bubblegum = new Products('bubblegum', 'img/bubblegum.jpg');
var chair = new Products('chair', 'img/chair.jpg');
var cthulhu = new Products('cthulhu', 'img/cthulhu.jpg');
var dogDuck = new Products('dog-duck', 'img/dog-duck.jpg');
var dragon = new Products('dragon', 'img/dragon.jpg');
var pen = new Products('pen', 'img/pen.jpg');
var petSweep = new Products('pet-sweep', 'img/pet-sweep.jpg');
var scissors = new Products('scissors', 'img/scissors.jpg');
var shark = new Products('shark', 'img/shark.jpg');
var sweep = new Products('sweep', 'img/sweep.png');
var tauntaun = new Products('tauntaun', 'img/tauntaun.jpg');
var unicorn = new Products('unicorn', 'img/unicorn.jpg');
var usb = new Products('usb', 'img/usb.gif');
var waterCan = new Products('water-can', 'img/water-can.jpg');
var wineGlass = new Products('wine-glass', 'img/wine-glass.jpg');

function randomNumGen() {
  return Math.floor(Math.random() * imgPathArray.length);
};

function randomImgGen() {
  var currentImgDisplay = [];
  while (currentImgDisplay.length < 3){
    var randomNum = randomNumGen();
    if (!currentImgDisplay.includes(randomNum) == !previousImgDisplay.includes(randomNum)) {
      currentImgDisplay.push(randomNum);
    }
  }
  var prod1 = productsArray[currentImgDisplay[0]];
  var prod2 = productsArray[currentImgDisplay[1]];
  var prod3 = productsArray[currentImgDisplay[2]];
  img1.src = prod1.filePath;
  img2.src = prod2.filePath;
  img3.src = prod3.filePath;
  img1.alt = currentImgDisplay[0];
  img2.alt = currentImgDisplay[1];
  img3.alt = currentImgDisplay[2];
  previousImgDisplay = currentImgDisplay;
  prod1.countShown++;
  prod2.countShown++;
  prod3.countShown++;
};
randomImgGen();

function handleClick (){
  randomImgGen();
  totalClicks++;
  var productsArrayIdx = this.alt;
  productsArray[productsArrayIdx].countClicked++;
  if (totalClicks >= 25) {
    img1.removeEventListener('click', handleClick);
    img2.removeEventListener('click', handleClick);
    img3.removeEventListener('click', handleClick);
    var picSection = document.getElementById('imagechoices');
    body.removeChild(picSection);
    countClickedArrayPush();
  }
};
img1.addEventListener('click', handleClick);
img2.addEventListener('click', handleClick);
img3.addEventListener('click', handleClick);

function countClickedArrayPush (){
  for (var i = 0; i < productsArray.length; i++) {
    countClickedArray.push(productsArray[i].countClicked);
    countShownArray.push(productsArray[i].countShown);
  }
};
