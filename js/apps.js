'use strict'
let attemptsEl = document.getElementById('attempts');
let containerEl = document.getElementById('container');
let leftImgEl = document.getElementById('leftImg');
let middilImgEl = document.getElementById('middil');
let rightImgEl = document.getElementById('rightImg');
let ulEl = document.getElementById('result');

let attempts = 1;
let maxAttempts = 25;




let products = [];

function ProductsImg(productName) {

    this.pName = productName.split('.')[0];
    this.img = 'picture/' + productName;
    this.votes = 0;
    this.views = 0;

    products.push(this);

}

let pImg = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];


for (let i = 0; i < pImg.length; i++) {
    new ProductsImg(pImg[i]);
}

console.log(products);


function randomIndex() {

    return Math.floor(Math.random() * pImg.length);

}
let leftIndex;
let middilIndex;
let rightIndex;


function renderRandomImg() {
    leftIndex = randomIndex();
    middilIndex = randomIndex();
    rightIndex = randomIndex();

    while (leftIndex === middilIndex || leftIndex === rightIndex || middilIndex===rightIndex ) {
        leftIndex = randomIndex();
        rightIndex = randomIndex();
    }

    leftImgEl.setAttribute('src', products[leftIndex].img);
    middilImgEl.setAttribute('src', products[middilIndex].img);
    rightImgEl.setAttribute('src', products[rightIndex].img);
    console.log(pImg[1] + 'sara');
    console.log(leftImgEl);
    leftImgEl.setAttribute('alt', products[leftIndex].pName);
    middilImgEl.setAttribute('alt', products[middilIndex].pName);
    rightImgEl.setAttribute('alt', products[rightIndex].pName);

    // console.log(leftIndex);
    // console.log(middilIndex);
    // console.log(rightIndex);

    leftImgEl.setAttribute('title', products[leftIndex].pName);
    middilImgEl.setAttribute('title', products[middilIndex].pName);
    rightImgEl.setAttribute('title', products[rightIndex].pName);

    products[leftIndex].views++;
    products[middilIndex].views++;
    products[rightIndex].views++;



}
renderRandomImg();

leftImgEl.addEventListener('click', handelClicks);
middilImgEl.addEventListener('click', handelClicks);
rightImgEl.addEventListener('click', handelClicks);



function handelClicks(event) {
    attempts++;
    if (attempts <= maxAttempts) {
        let clickedImg = event.target.id;
        if (event.target.id === 'leftImg') {
            products[leftIndex].votes++;
        }
        else if (event.target.id === 'middil') {
            products[middilIndex].votes++;

        }
        else if (event.target.id === 'rightImg') {

            products[rightIndex].votes++;
        }
        renderRandomImg();

    }
        else {
            let ulEl = document.getElementById('result');
            for (let i = 0; i < products.length; i++) {
                let liEl = document.createElement('li');
                liEl.textContent = `${products[i].pName} had ${products[i].votes} voted, and was seen ${products[i].views} times`
                
                ulEl.appendChild(liEl);
            }
            leftImgEl.removeEventListener('click', handelClicks);
            middilImgEl.removeEventListener('click', handelClicks);
            rightImgEl.removeEventListener('click', handelClicks);
        }


   

}





















