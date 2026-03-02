let score=0;
let level=1;
let count=0;
let timer;
let timeLeft=10;
let currentQ;

const questions=[
{q:"Capital of India?",o:["Delhi","Mumbai","Kolkata","Chennai"],a:"Delhi"},
{q:"2+2=?",o:["3","4","5","6"],a:"4"},
{q:"Sun is a?",o:["Planet","Star","Moon","Comet"],a:"Star"},
{q:"Water formula?",o:["H2O","CO2","O2","NaCl"],a:"H2O"},
{q:"Largest planet?",o:["Earth","Mars","Jupiter","Venus"],a:"Jupiter"}
];

function startGame(){

let name=document.getElementById("playerName").value;
if(name==="") name="Player";

localStorage.setItem("playerName",name);

document.getElementById("startScreen").classList.add("hidden");
document.getElementById("quizScreen").classList.remove("hidden");

nextQuestion();
}

function nextQuestion(){

clearInterval(timer);
timeLeft=10;
updateUI();

currentQ=questions[Math.floor(Math.random()*questions.length)];

document.getElementById("question").innerText=currentQ.q;

let html="";
currentQ.o.forEach(opt=>{
html+=`<button onclick="checkAnswer(this,'${opt}')">${opt}</button>`;
});
document.getElementById("options").innerHTML=html;

timer=setInterval(()=>{
timeLeft--;
updateUI();
if(timeLeft<=0){
clearInterval(timer);
nextQuestion();
}
},1000);
}

function checkAnswer(btn, ans){

clearInterval(timer);

if(ans===currentQ.a){
score+=10;
btn.classList.add("correct");
document.getElementById("correctSound").play();
document.getElementById("feedback").innerText="Correct!";
}
else{
btn.classList.add("wrong");
document.getElementById("wrongSound").play();
document.getElementById("feedback").innerText="Wrong!";
}

count++;

if(count%5===0){
level++;
confettiEffect();
}

setTimeout(nextQuestion,1000);
updateUI();
}

function updateUI(){

document.getElementById("playerDisplay").innerText=localStorage.getItem("playerName");
document.getElementById("scoreDisplay").innerText="Score: "+score;
document.getElementById("levelDisplay").innerText="Level: "+level;
document.getElementById("timerDisplay").innerText="Time: "+timeLeft;

document.getElementById("progressBar").style.width=(timeLeft*10)+"%";
}

function confettiEffect(){
alert("Level Up!");
}