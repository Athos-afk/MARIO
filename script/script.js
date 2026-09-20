// ELEMENTOS
const mario = document.querySelector('.mario');

const pipe = document.querySelector('.pipe');

const start = document.querySelector('.start');

const gameOver = document.querySelector('.game-over');

const score = document.querySelector('.score');

const highScoreText = document.querySelector('.high-score');


// ÁUDIOS
const audioStart = new Audio('soung/audio_theme.mp3');

const audioGameOver = new Audio('soung/audio_gameover.mp3');

const jumpSound = new Audio('soung/jumpsound.mp3');


// VOLUMES
audioStart.volume = 0.3;

audioGameOver.volume = 0.5;

jumpSound.volume = 0.4;


// LOOP DA MÚSICA
audioStart.loop = true;


// VARIÁVEIS
let points = 0;

let gameRunning = false;


// POSIÇÃO DO CANO
let pipeX = window.innerWidth;


// VELOCIDADE DO CANO
// aumentei bastante a velocidade inicial
let pipeSpeed = 12;


// RECORDE
let highScore = localStorage.getItem('highScore') || 0;

highScoreText.innerHTML = `Recorde: ${highScore}`;




// INICIAR
function startGame() {

    if (gameRunning) return;

    gameRunning = true;

    start.style.display = 'none';

    audioStart.play();

    gameLoop();

    scoreLoop();
}




// SCORE
function scoreLoop() {

    const interval = setInterval(() => {

        if (!gameRunning) {

            clearInterval(interval);

            return;
        }

        // SCORE
        points++;

        score.innerHTML = points;


        // RECORDE
        if (points > highScore) {

            highScore = points;

            localStorage.setItem('highScore', highScore);

            highScoreText.innerHTML = `Recorde: ${highScore}`;
        }


        // AUMENTA DIFICULDADE
        if (points % 100 === 0) {

            pipeSpeed += 1.5;
        }

    }, 100);
}




// PULO
function jump() {

    if (!gameRunning) return;

    // SOM
    jumpSound.currentTime = 0;

    jumpSound.play();


    // ANIMAÇÃO
    mario.classList.add('jump');

    setTimeout(() => {

        mario.classList.remove('jump');

    }, 700);
}




// LOOP PRINCIPAL
function gameLoop() {

    if (!gameRunning) return;


    // MOVE CANO
    pipeX -= pipeSpeed;

    pipe.style.left = `${pipeX}px`;


    // RESETA CANO
    if (pipeX < -80) {

        pipeX = window.innerWidth;
    }


    // POSIÇÃO DO MARIO
    const marioPosition = +window
        .getComputedStyle(mario)
        .bottom.replace('px', '');


    // COLISÃO
    if (

        pipeX <= 120 &&
        pipeX > 0 &&
        marioPosition < 80

    ) {

        gameOverFunction();

        return;
    }


    // PRÓXIMO FRAME
    requestAnimationFrame(gameLoop);
}




// GAME OVER
function gameOverFunction() {

    gameRunning = false;


    // ÁUDIOS
    audioStart.pause();

    audioGameOver.play();


    // SPRITE
    mario.src = 'img/game-over.png';

    mario.style.width = '80px';

    mario.style.marginLeft = '50px';


    // TELA
    gameOver.style.display = 'flex';
}




// REINICIAR
function restartGame() {

    location.reload();
}




// CONTROLES
document.addEventListener('keydown', (e) => {

    // PULO
    if (e.code === 'Space') {

        jump();
    }

    // START
    if (e.code === 'Enter') {

        startGame();
    }
});




// MOBILE
document.addEventListener('touchstart', () => {

    jump();
});