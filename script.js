let player = "";
let score = 0;
let count = 0;
let answered = false;

const questionBank = [
{q:"Capital of India?", o:["Delhi","Mumbai","Chennai","Kolkata"], a:"Delhi"},
{q:"Red planet?", o:["Earth","Mars","Jupiter","Venus"], a:"Mars"},
{q:"Largest ocean?", o:["Indian","Pacific","Atlantic","Arctic"], a:"Pacific"},
{q:"5+7=?", o:["10","11","12","13"], a:"12"},
{q:"Sun is a?", o:["Planet","Star","Asteroid","Moon"], a:"Star"},
{q:"Fastest land animal?", o:["Lion","Tiger","Cheetah","Dog"], a:"Cheetah"},
{q:"Currency of India?", o:["Dollar","Rupee","Euro","Yen"], a:"Rupee"},
{q:"Water formula?", o:["H2O","CO2","O2","NaCl"], a:"H2O"},
{q:"Tallest animal?", o:["Lion","Elephant","Giraffe","Horse"], a:"Giraffe"},
{q:"Primary color?", o:["Green","Red","Black","White"], a:"Red"}
];

let currentQ;

function startGame(){

player = document.getElementById("playerName").value;
if(player === "") return;

document.getElementById("startScreen").classList.add("hidden");
document.getElementById("gameScreen").classList.remove("hidden");

loadProgress();
nextQuestion();

}

function loadProgress(){
score = parseInt(localStorage.getItem(player+"_score")) || 0;
count = parseInt(localStorage.getItem(player+"_count")) || 0;
updateScore();
}

function saveProgress(){
localStorage.setItem(player+"_score", score);
localStorage.setItem(player+"_count", count);
}

function nextQuestion(){

answered = false;
document.getElementById("feedback").innerText = "";

currentQ = questionBank[Math.floor(Math.random()*questionBank.length)];

document.getElementById("question").innerText =
"Q" + (count+1) + ": " + currentQ.q;

let html = "";

currentQ.o.forEach(option=>{
html += `<button onclick="checkAnswer('${option}')">${option}</button>`;
});

document.getElementById("options").innerHTML = html;

updateScore();
}

function checkAnswer(selected){

if(answered) return;
answered = true;

if(selected === currentQ.a){
score++;
document.getElementById("feedback").innerText = "Correct!";
document.getElementById("correctSound").play();
}
else{
document.getElementById("feedback").innerText = "Wrong!";
document.getElementById("wrongSound").play();
}

count++;
saveProgress();
setTimeout(nextQuestion, 1000);
}

function updateScore(){
document.getElementById("score").innerText =
player + " | Score: " + score + " | Played: " + count;
}

function restartGame(){
score = 0;
count = 0;
saveProgress();
nextQuestion();
}