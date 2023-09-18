let music = new Audio("music.mp3");
let audioturn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let gameoverresult = false;
// music.play();

let turnInitial = "X";

// function to change the turn
const changeTurn = () => {
  return turnInitial === "X" ? "0" : "X";
};

// function to check for a win
const checkWin = () => {
  let boxtexts = document.querySelectorAll(".boxtext");
  let wins = [
    // first three index used for checking the win-win result
    // last three for rotation of line
    [0, 1, 2, 5, 5, 0],
    [3, 4, 5, 5, 15, 0],
    [6, 7, 8, 5, 25, 0],
    [0, 3, 6, -5, 15, 90],
    [1, 4, 7, 5, 15, 90],
    [2, 5, 8, 15, 15, 90],
    [0, 4, 8, 5, 15, 45],
    [2, 4, 6, 5, 15, 135],
  ];
  wins.forEach((e) => {
    if (
      boxtexts[e[0]].innerText === boxtexts[e[1]].innerText &&
      boxtexts[e[2]].innerText === boxtexts[e[1]].innerText &&
      boxtexts[e[0]].innerText !== ""
    ) {
      document.querySelector(".info").innerText =
        "Congrats!! " + boxtexts[e[0]].innerText + " won";
      gameoverresult = true;
      if (gameoverresult === true) {
        const imgbox = document.querySelector(".imgbox img");
        imgbox.style.width = "205px";

        // for rotation of line
        document.querySelector(
          ".line"
        ).style.transform = `translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`;
        document.querySelector(".line").style.width = "20vw";

        function gameOverMessage() {
          alert("Game Over!! Reset to Restart..\n Best Of Luck!!!");
          gameover.play();
        }
        const myTimeout = setTimeout(gameOverMessage, 2000);
      }
    }
  });
};

// Game Logic
// on click addeventLitener

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (boxtext.innerText === "") {
      boxtext.innerText = turnInitial;
      turnInitial = changeTurn();
      audioturn.play();
      checkWin();
      if (!gameoverresult)
        document.getElementsByClassName("info")[0].innerText =
          "Turn for " + turnInitial;
    }
  });
});

// add onclick listener to reset button
const reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
  let boxtext = document.querySelectorAll(".boxtext");
  Array.from(boxtext).forEach((element) => {
    element.innerText = "";
  });
  turnInitial = "X";
  gameoverresult = false;
  document.getElementsByClassName("info")[0].innerText =
    "Turn for " + turnInitial;

  const imgbox = document.querySelector(".imgbox img");
  imgbox.style.width = "0px";
  document.querySelector(".line").style.width = "0px";
});
