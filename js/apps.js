'use strict'
let attemptsEl = document.getElementById('attempts');
let containerEl = document.getElementById('container');
let leftImgEl = document.getElementById('leftImg');
let middilImgEl = document.getElementById('middil');
let rightImgEl = document.getElementById('rightImg');
let ulEl = document.getElementById('result');
let checkArray = [];
let attempts = 1;
let maxAttempts = 25;
let productsName = [];
let votes1 = [];
let view1 = [];
let products = [];


function saveToLocalStorge() {
    let data = JSON.stringify(products);
    localStorage.setItem('Products', data);
}




function readFromLocalStorge() {
    let stringObj = localStorage.getItem('Products');
    let normalObj = JSON.parse(stringObj);
    if (normalObj !== null) {
        products = normalObj;
        


    }
    // renderRandomImg();
    // handelClicks();
    // chartRender();




}













function ProductsImg(productName) {

    this.pName = productName.split('.')[0];
    this.img = 'picture/' + productName;
    this.votes = 0;
    this.views = 0;
    products.push(this);
    productsName.push(this.pName);

}

let pImg = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];


for (let i = 0; i < pImg.length; i++) {
    new ProductsImg(pImg[i]);
};
















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

    while (leftIndex === middilIndex || leftIndex === rightIndex     || middilIndex === rightIndex   || checkArray.includes(leftIndex)||checkArray.includes(rightIndex) || checkArray.includes(middilIndex) ) {
        leftIndex = randomIndex();
        rightIndex = randomIndex();
        middilIndex = randomIndex();

    }


    // while (checkArray.includes(leftIndex)) {
    //     leftIndex = randomIndex();

    // }



    // while (checkArray.includes(rightIndex)) {
    //     rightIndex = randomIndex();

    // }

    // while (checkArray.includes(middilIndex)) {
    //     middilIndex = randomIndex();
    // }

    checkArray = [];
    checkArray.push(leftIndex, middilIndex, rightIndex);











    // console.log(checkArray,'saraBasem');

    // for (let i = 1; i < attempts.length; i++) {

    //     if (leftIndex[i - 1] === leftIndex[i] || leftIndex[i - 1] === middilIndex[i] || leftIndex[i - 1] === rightIndex[i]) {

    //         // leftIndex[i] = randomIndex();
    //         rightIndex[i] = randomIndex();
    //         middilIndex[i] = randomIndex();


    //     }

    //     else if (middilIndex[i - 1] === middilIndex[i] || middilIndex[i - 1] === leftIndex[i] || middilIndex[i - 1] === rightIndex[i]) {
    //         // middilIndex[i] = randomIndex();
    //         rightIndex[i] = randomIndex();
    //         leftIndex[i] = randomIndex();




    //     }

    //     else if  (rightIndex[i - 1] === rightIndex[i] || rightIndex[i - 1] === leftIndex[i] || rightIndex[i - 1] === middilIndex[i]) {
    //         // rightIndex[i] = randomIndex();
    //         leftIndex[i] = randomIndex();
    //         middilIndex[i] = randomIndex();

    //     }

    // }

    leftImgEl.setAttribute('src', products[leftIndex].img);
    middilImgEl.setAttribute('src', products[middilIndex].img);
    rightImgEl.setAttribute('src', products[rightIndex].img);
    // console.log(pImg[1] + 'sara');
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

    // saveToLocalStorge();
}
renderRandomImg();

leftImgEl.addEventListener('click', handelClicks);
middilImgEl.addEventListener('click', handelClicks);
rightImgEl.addEventListener('click', handelClicks);


function handelClicks(event) {
    // ulEl.textContent = '';
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

        saveToLocalStorge();
    }
    else {
        

        let container2 = document.getElementById('conTwo');
        let end = document.getElementById('end');
        end.addEventListener('click', endResult)

        function endResult(event) {

            let ulEl = document.getElementById('result');

            for (let i = 0; i < products.length; i++) {
                let liEl = document.createElement('li');
                liEl.textContent = `${products[i].pName} had ${products[i].votes} voted, and was seen ${products[i].views} times`
                // ulEl.appendChild(end);
                ulEl.appendChild(liEl);
                votes1.push(products[i].votes);
                view1.push(products[i].views);



            }
            end.removeEventListener('click', endResult)
            chartRender();


        }
        leftImgEl.removeEventListener('click', handelClicks);
        middilImgEl.removeEventListener('click', handelClicks);
        rightImgEl.removeEventListener('click', handelClicks);

    }



}


function chartRender() {
    // myChart='';
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: productsName,
            datasets: [{
                label: '# of Votes',
                data: votes1,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }

                , {
                label: '# of viwes',
                data: view1,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }

            ]
        },



        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });





}








readFromLocalStorge();












