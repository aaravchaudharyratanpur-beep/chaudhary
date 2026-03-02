let score=0, streak=0, level=1;
let timeLeft=10, timer;
let answered=false;

const questions=[
{q:"Capital of India?",o:["Delhi","Mumbai","Chennai","Kolkata"],a:"Delhi"},
{q:"Red planet?",o:["Earth","Mars","Jupiter","Venus"],a:"Mars"},
{q:"Largest ocean?",o:["Indian","Pacific","Atlantic","Arctic"],a:"Pacific"},
{q:"5+7=?",o:["10","11","12","13"],a:"12"},
{q:"Sun is a?",o:["Planet","Star","Asteroid","Moon"],a:"Star"}
];

let currentQ;

function startGame(){
document.getElementById("startScreen").classList.add("hidden");
document.getElementById("gameScreen").classList.remove("hidden");
document.getElementById("bgMusic").play();
nextQuestion();
}

function nextQuestion(){

answered=false;
timeLeft=10;
updateProgress();

currentQ=questions[Math.floor(Math.random()*questions.length)];

let qEl=document.getElementById("question");
qEl.classList.remove("fade-in");
void qEl.offsetWidth;
qEl.classList.add("fade-in");

qEl.innerText=currentQ.q;

let html="";
currentQ.o.forEach(opt=>{
html+=`<button onclick="checkAnswer(this,'${opt}')">${opt}</button>`;
});
document.getElementById("options").innerHTML=html;

startTimer();
}

function startTimer(){
clearInterval(timer);
timer=setInterval(()=>{
timeLeft--;
document.getElementById("timer").innerText="⏱ "+timeLeft;
updateProgress();

if(timeLeft<=0){
gameOver();
}
},1000);
}

function checkAnswer(btn,ans){

if(answered) return;
answered=true;
clearInterval(timer);

if(ans===currentQ.a){
score+=10;
streak++;
btn.classList.add("correct");
document.getElementById("correctSound").play();
if(streak%5===0){
level++;
launchConfetti();
}
}
else{
streak=0;
btn.classList.add("wrong");
document.getElementById("wrongSound").play();
}

updateUI();
setTimeout(nextQuestion,1000);
}

function updateUI(){
document.getElementById("score").innerText="Score: "+score+" | Streak: "+streak;
document.getElementById("level").innerText="Level: "+level;
}

function updateProgress(){
document.getElementById("progressFill").style.width=(timeLeft*10)+"%";
}

function gameOver(){
document.getElementById("gameScreen").classList.add("hidden");
document.getElementById("gameOverScreen").classList.remove("hidden");
document.getElementById("finalScore").innerText="Score: "+score;
document.getElementById("bgMusic").pause();
}

function restartGame(){
location.reload();
}

function launchConfetti(){
const canvas=document.getElementById("confetti");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
for(let i=0;i<100;i++){
ctx.fillStyle="hsl("+Math.random()*360+",100%,50%)";
ctx.fillRect(Math.random()*canvas.width,Math.random()*canvas.height,5,5);
}
setTimeout(()=>ctx.clearRect(0,0,canvas.width,canvas.height),500);
}