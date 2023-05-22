let buttons = document.querySelectorAll(".btn");
let button = document.querySelectorAll(".btn");
let score = document.querySelectorAll(".score")[1];
let scoreText = document.querySelectorAll(".score")[0];
let imageSource = [
  {
    id: 0,
    source: "./assets/images/burger.png",
    usedCount: 0
  },
  {
    id: 1,
    source: "./assets/images/donut.png",
    usedCount: 0
  },
  {
    id: 2,
    source: "./assets/images/fried-chicken.png",
    usedCount: 0
  },
  {
    id: 3,
    source: "./assets/images/ice-cream.png",
    usedCount: 0
  },
  {
    id: 4,
    source: "./assets/images/milkshake.png",
    usedCount: 0
  },
  {
    id: 5,
    source: "./assets/images/muffin.png",
    usedCount: 0
  },
  {
    id: 6,
    source: "./assets/images/noodles.png",
    usedCount: 0
  },
  {
    id: 7,
    source: "./assets/images/pizza.png",
    usedCount: 0
  }
]

let img = document.querySelectorAll("img");
let playAgain = document.querySelector(".restart");

window.addEventListener('DOMContentLoaded' , function() {
  for(let i = 0; i < img.length; i++) {
    img[i].style.zIndex = "-1";
    img[i].src = generateImageSource();
  }
});


function generateImageSource() {

  let randomNumber = Math.floor(Math.random() * 10000) % 8;

  while(imageSource[randomNumber].usedCount == 2) {
    randomNumber = Math.floor(Math.random() * 10000) % 8;
  }

  imageSource[randomNumber].usedCount++;

  return imageSource[randomNumber].source;

}

let prevBtn = "";
let curBtn = "";

let totalMoves = 0;
let successfulMoves = 0;
 
for(let i = 0; i < button.length; i++) {
  button[i].addEventListener("click" , function () {

    totalMoves++;
    let img = this.querySelector("img")
    if(img.style.zIndex === "-1") {
      img.style.zIndex = "2";
      this.disabled = true;
      this.classList.remove("btn-hover");


      if(prevBtn === "") {
        prevBtn = this;
      } else {
        curBtn = this;

        let curImage = curBtn.querySelector("img").src;
        let prevImage = prevBtn.querySelector("img").src;

        if(curImage == prevImage) {
          prevBtn.disabled = true;
          prevBtn.classList.remove("btn-hover");
          curBtn.disabled = true;
          curBtn.classList.remove("btn-hover");


          let temp = [];
          for(let i = 0; i < button.length; i++) {
            if(button[i] !== curBtn && button[i] !== prevBtn) {
              temp.push(button[i]);
            }
          }

          button = temp;

          prevBtn = "";
          curBtn = "";
          successfulMoves += 2;

          let scores = Math.ceil((successfulMoves / totalMoves) * 100);
          score.textContent = scores;

          if(successfulMoves == 16) {

            let audio = new Audio("./assets/sounds/game-over.wav");
            audio.play();
            scores = Math.ceil((successfulMoves / totalMoves) * 100);
            scoreText.textContent = "Final Score :"
          } else {
            let audio = new Audio("./assets/sounds/correct.wav");
            audio.play();
          }
        } else {
          let audio = new Audio("./assets/sounds/wrong.wav");
          audio.play();
          for(let i = 0; i < button.length; i++) {
              button[i].disabled = true;
              button[i].classList.remove("btn-hover");
          }
          setTimeout(function() {
            curBtn.querySelector("img").style.zIndex = -1;
            prevBtn.querySelector("img").style.zIndex = -1;
            curBtn.disabled = false;
            curBtn.classList.add("btn-hover");
            prevBtn.disabled = false;
            prevBtn.classList.add("btn-hover");
            prevBtn = "";
            curBtn = "";
          } , 1000);
          setTimeout(function() {
            for(let i = 0; i < button.length; i++) {
                button[i].disabled = false;
                button[i].classList.add("btn-hover");
            }
          } , 1100);
        }

      }
    } 
  });
}


playAgain.addEventListener('click' , function() {
  totalMoves = 0;
  successfulMoves = 0;
  prevBtn = "";
  curBtn = "";
  for(let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
    buttons[i].classList.add("btn-hover");
    buttons[i].querySelector("img").style.zIndex = -1;
  }
  button = buttons;
  for(let i = 0; i < imageSource.length; i++) {
    imageSource[i].usedCount = 0;
  }
  for(let i = 0; i < img.length; i++) {
    img[i].style.zIndex = "-1";
    img[i].src = generateImageSource();
  }
  score.textContent = "0";
  scoreText.textContent = "Live Score";
});








