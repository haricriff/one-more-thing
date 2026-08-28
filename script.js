const introText = document.getElementById("introText");
const beginBtn = document.getElementById("beginBtn");

const welcomeScreen = document.getElementById("welcomeScreen");
const puzzle1 = document.getElementById("puzzle1");
const puzzle2 = document.getElementById("puzzle2");

const answer1 = document.getElementById("answer1");
const check1 = document.getElementById("check1");
const result1 = document.getElementById("result1");

const heart = document.getElementById("heart");
const heartGame = document.getElementById("heartGame");
const heartCount = document.getElementById("heartCount");
const timerDisplay = document.getElementById("timer");
const gameMessage = document.getElementById("gameMessage");

const loveSong = document.getElementById("loveSong");

/* -------------------------
   WELCOME TYPING EFFECT
------------------------- */

const message =
    "I could have just told you what I wanted to say... " +
    "but I thought you should find it yourself.";

let i = 0;

function typeText() {

    if (i < message.length) {

        introText.textContent += message[i];

        i++;

        setTimeout(typeText, 40);
    }
}

typeText();


/* -------------------------
   BEGIN
------------------------- */

beginBtn.addEventListener("click", function () {

    welcomeScreen.classList.add("hidden");

    puzzle1.classList.remove("hidden");

});


/* -------------------------
   PUZZLE 1
------------------------- */

check1.addEventListener("click", function () {

    const answer = answer1.value.trim().toLowerCase();

    if (answer === "chamet") {

        result1.textContent = "✓ Correct ❤️";

        setTimeout(function () {

            puzzle1.classList.add("hidden");

            puzzle2.classList.remove("hidden");

            startHeartGame();

        }, 900);

    } else {

        result1.textContent = "Hmm... not quite. Try again 😏";

    }

});


/* -------------------------
   HEART GAME
------------------------- */

let heartsCaught = 0;
let timeLeft = 15;
let gameRunning = false;
let timerInterval;
let moveInterval;


function startHeartGame() {

    heartsCaught = 0;
    timeLeft = 15;
    gameRunning = true;

    heartCount.textContent = "0";
    timerDisplay.textContent = "15";
    gameMessage.textContent = "";

    moveHeart();

    moveInterval = setInterval(moveHeart, 1100);

    timerInterval = setInterval(function () {

        timeLeft--;

        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {

            endHeartGame(false);

        }

    }, 1000);
}


function moveHeart() {

    const gameWidth = heartGame.clientWidth;
    const gameHeight = heartGame.clientHeight;

    const heartSize = 55;

    const x = Math.random() * (gameWidth - heartSize);
    const y = Math.random() * (gameHeight - heartSize);

    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;

    /*
       Gets faster as she catches more hearts.
    */

    const speed =
    Math.max(800, 1800 - heartsCaught * 60);

    clearInterval(moveInterval);

    moveInterval = setInterval(moveHeart, speed);
}


heart.addEventListener("click", function () {

    if (!gameRunning) return;

    heartsCaught++;

    heartCount.textContent = heartsCaught;

    /* Phone vibration where supported */

    if (navigator.vibrate) {
        navigator.vibrate(35);
    }

    if (heartsCaught >= 10) {

        endHeartGame(true);

    } else {

        moveHeart();

    }

});


function endHeartGame(won) {

    gameRunning = false;

    clearInterval(timerInterval);
    clearInterval(moveInterval);

    if (won) {

        heart.style.display = "none";

        gameMessage.textContent =
            "You caught them all. ❤️";

        setTimeout(function () {

    puzzle2.classList.add("hidden");

    puzzle3.classList.remove("hidden");

}, 900);

    } else {

        gameMessage.textContent =
            "Almost... try again ❤️";

        heart.style.display = "block";

        setTimeout(function () {

            startHeartGame();

        }, 1200);

    }

}
/* -------------------------
   PUZZLE 3
------------------------- */

const puzzle3 = document.getElementById("puzzle3");

const answer3 = document.getElementById("answer3");
const check3 = document.getElementById("check3");

const finalScreen = document.getElementById("finalScreen");
const finalMessage = document.getElementById("finalMessage");


check3.addEventListener("click", function () {

    const answer = answer3.value.trim();

    if (answer.length === 0) {

        return;

    }

    puzzle3.classList.add("hidden");

    finalScreen.classList.remove("hidden");

    startFinalReveal();

});


/* -------------------------
   FINAL MESSAGE
------------------------- */

const loveMessage = `Hey you...

So... you actually made it to the end. 😌
You found where our story started.
You survived my ridiculous little heart game. 😂❤️
And now you're here.

I wanted to make something for you because sometimes a normal message doesn't feel like enough.
We've never had the chance to be in the same place, to sit beside each other, or just randomly look at each other and smile.

There's a screen between us.
There are miles between us.
Sometimes there are days when all we have is a message.

But somehow, none of that stopped you from becoming important to me.
You became someone I look forward to talking to.
Someone whose message can change my entire mood.
Someone who can make me smile without even trying.

And honestly... that's a little unfair. 😭
You have way too much power over me. 😂❤️

I don't know exactly where life will take us.
I don't know what our next chapter will look like.

But I know one thing:
I'm really, really glad I met you.
And if I had to go back and do everything again...
I'd still choose that first conversation.
I'd still choose that first message.
I'd still choose you. 💙
So this little website, these puzzles, the stupid hearts, all of it...
was just my tiny way of telling you something much bigger.
You mean more to me than I probably know how to put into words.
I ALWAYS LOVE YoU BABY
❤️`;


function startFinalReveal() {

    loveSong.currentTime = 0;

    loveSong.play().catch(function(error) {
        console.log("Music could not start:", error);
    });

    let index = 0;

    finalMessage.textContent = "";


    const typing = setInterval(function () {

        if (index < loveMessage.length) {

            finalMessage.textContent += loveMessage[index];

            index++;

        } else {

            clearInterval(typing);


        }

    }, 45);

}
