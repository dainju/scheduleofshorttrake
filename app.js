/* ======================
CSV 주소
====================== */

const PROGRAM_URL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vTRV-lLroEFMXiMaricD-GkYcWOyt8cwT6Z6f49GlqbJVwXMQdJllhzPc_gg8io9x6B-z0o_tk3Xbdl/pub?gid=1082967064&single=true&output=csv";

const PLAYER_URL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vTyGAUBesyUjGuuAHSsJB0pVgTzPsW_D6H0i1U8mdflyI4zFPzmlwWYrMuXBIjSblX0c-7mVoFX3AW7/pub?gid=0&single=true&output=csv";

const MEN_URL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vTswd4uMhCYfp76AGceaAt69FcRoVuQz8Jn-wtK-U24kXdNQyPqFJWP7dJnGm8gw-rFPw7CgmcDaizf/pub?gid=0&single=true&output=csv";

const WOMEN_URL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vSmgJa6tVpjryj2UjpAiUQqeiXSQC2e2kZaT8UDyJCkhYwp4dtEgofnNEZnJX3alL_XTh3tO0m2XzeP/pub?gid=0&single=true&output=csv";

/* ======================
전역 변수
====================== */

let competitions = [];
let players = [];
let menResults = [];
let womenResults = [];

let currentDate = new Date();

/* ======================
메뉴
====================== */

function toggleMenu(){

document
.getElementById("sidebar")
.classList.toggle("open");

document
.getElementById("overlay")
.classList.toggle("show");

}

function closeMenu(){

document
.getElementById("sidebar")
.classList.remove("open");

document
.getElementById("overlay")
.classList.remove("show");

}

/* ======================
화면 전환
====================== */

function showScreen(id){

document
.querySelectorAll(".screen")
.forEach(

screen=>screen.classList.remove("active")

);

document
.getElementById(id)
.classList.add("active");

closeMenu();

}

/* ======================
모달
====================== */

function openModal(html){

document
.getElementById("modalBody")
.innerHTML = html;

document
.getElementById("detailModal")
.style.display = "flex";

}

function closeModal(){

document
.getElementById("detailModal")
.style.display = "none";

}

/* ======================
CSV 파싱
====================== */

function parseCSV(text){

const lines =
text.trim().split("\n");

return lines.map(

line=>

line.split(",").map(

cell=>

cell.replace(/^"|"$/g,"").trim()

)

);

}

/* ======================
D-Day
====================== */

function getDday(start){

const today = new Date();

today.setHours(0,0,0,0);

const target = new Date(start);

target.setHours(0,0,0,0);

const diff =
Math.floor(
(target-today)/(1000*60*60*24)
);

if(diff===0)
return "D-Day";

if(diff>0)
return "D-"+diff;

return "종료";

}

/* ======================
CSV 로딩 (대회 일정)
====================== */

async function loadCompetitions(){

try{

const res =
await fetch(PROGRAM_URL);

const text =
await res.text();

const rows =
parseCSV(text);

competitions = rows.slice(1).map(

r=>({

start:r,
end:r,
title:r,
place:r,
type:r,
target:r,
category:r,
note:r,
season:r

})

);

renderAll();

renderMonth();

renderDomestic();

renderInternational();

renderPast();

}catch(e){

console.log("일정 로딩 실패", e);

}

}

/* ======================
카드 생성
====================== */

function createCard(item){

return `

<div class="card"
onclick="openCompetition('${item.title}')">

<div class="card-top">

<div>

${item.start} ~ ${item.end}

</div>

<div class="dday">

${getDday(item.start)}

</div>

</div>

<div class="card-title">

${item.title}

</div>

<div class="card-place">

📍 ${item.place}

</div>

</div>

`;

}

/* ======================
전체 일정
====================== */

function renderAll(){

const container =
document.getElementById("scheduleScreen");

container.innerHTML =
competitions.map(createCard).join("");

}

/* ======================
이번달 경기
====================== */

function renderMonth(){

const now =
new Date();

const month =
now.getMonth()+1;

const filtered =
competitions.filter(

c=>
new Date(c.start).getMonth()+1
=== month

);

document
.getElementById("monthScreen")
.innerHTML =
filtered.map(createCard).join("");

}

/* ======================
국내 / 국제
====================== */

function renderDomestic(){

const filtered =
competitions.filter(
c=>c.type==="국내"
);

document
.getElementById("domesticScreen")
.innerHTML =
filtered.map(createCard).join("");

}

function renderInternational(){

const filtered =
competitions.filter(
c=>c.type==="국제"
);

document
.getElementById("internationalScreen")
.innerHTML =
filtered.map(createCard).join("");

}

/* ======================
종료대회
====================== */

function renderPast(){

const filtered =
competitions.filter(

c=>getDday(c.start)==="종료"

);

document
.getElementById("pastScreen")
.innerHTML =
filtered.map(createCard).join("");

}

/* ======================
대회 상세
====================== */

function openCompetition(title){

const item =
competitions.find(
c=>c.title===title
);

if(!item) return;

const html = `

<h2 class="modal-title">${item.title}</h2>

<div class="info-row">
<b>기간</b><br>
${item.start} ~ ${item.end}
</div>

<div class="info-row">
<b>장소</b><br>
${item.place}
</div>

<div class="info-row">
<b>구분</b><br>
${item.type}
</div>

<div class="info-row">
<b>대상</b><br>
${item.target || "-"}
</div>

<div class="info-row">
<b>비고</b><br>
${item.note || "-"}
</div>

<div class="info-row">
<b>시즌</b><br>
${item.season}
</div>

`;

openModal(html);

}

/* ======================
선수 CSV 로딩
====================== */

async function loadPlayers(){

try{

const res =
await fetch(PLAYER_URL);

const text =
await res.text();

const rows =
parseCSV(text);

players = rows;

renderPlayers();

}catch(e){

console.log("선수 로딩 실패", e);

}

}

/* ======================
선수 화면
====================== */

function renderPlayers(){

const screen =
document.getElementById("playerScreen");

if(!players.length){

screen.innerHTML =
"<div class='card'>선수 데이터 없음</div>";

return;

}

let html = "";

const headers = players[0];

for(let c=0;c<headers.length;c++){

const team =
headers[c];

if(!team) continue;

html += `

<div class="player-group">

<div class="player-group-title">
${team}
</div>
`;

for(let r=1;r<players.length;r++){

const name =
players[r][c];

if(name){

html += `

<div class="player-item">
${name}
</div>
`;

}

}

html += "</div>";

}

screen.innerHTML = html;

}

/* ======================
검색
====================== */

document
.getElementById("search")
.addEventListener(

"input",

function(){

const keyword =
this.value.trim().toLowerCase();

if(keyword===""){

renderAll();
return;

}

const filtered =
competitions.filter(

item=>

(item.title||"")
.toLowerCase()
.includes(keyword)

||

(item.place||"")
.toLowerCase()
.includes(keyword)

);

document
.getElementById("scheduleScreen")
.innerHTML =
filtered.map(createCard).join("");

showScreen("scheduleScreen");

}

);

/* ======================
Android 뒤로가기
====================== */

window.addEventListener(

"popstate",

function(){

closeMenu();

closeModal();

showScreen("scheduleScreen");

}

);

function pushHistory(){

history.pushState(
{},
"",
location.href
);

}

/* ======================
초기화
====================== */

async function init(){

pushHistory();

await loadCompetitions();

await loadPlayers();

}

document.addEventListener(
"DOMContentLoaded",
init
);

/* ======================
경기결과 CSV 로딩
====================== */

async function loadResults(){

try{

const menRes =
await fetch(MEN_URL);

const menText =
await menRes.text();

menResults =
parseCSV(menText);

}catch(e){

console.log("남자 결과 로딩 실패",e);

}

try{

const womenRes =
await fetch(WOMEN_URL);

const womenText =
await womenRes.text();

womenResults =
parseCSV(womenText);

}catch(e){

console.log("여자 결과 로딩 실패",e);

}

}

/* ======================
남자 결과 찾기
====================== */

function findMenResult(title){

if(!menResults.length)
return null;

for(let i=1;i<menResults.length;i++){

const row =
menResults[i];

if(
(row[2]||"").trim()
===================

title.trim()
){

return row;

}

}

return null;

}

/* ======================
여자 결과 찾기
====================== */

function findWomenResult(title){

if(!womenResults.length)
return null;

for(let i=1;i<womenResults.length;i++){

const row =
womenResults[i];

if(
(row[2]||"").trim()
===================

title.trim()
){

return row;

}

}

return null;

}

/* ======================
결과 HTML 생성
====================== */

function createResultTable(row){

if(!row)
return "<div class='card'>결과 없음</div>";

const headers =
menResults[0];

let html =
"<table style='width:100%;border-collapse:collapse'>";

for(let i=0;i<headers.length;i++){

if(!row[i]) continue;

html += `

<tr>

<td
style="
border:1px solid #ddd;
padding:8px;
font-weight:bold;
width:40%;
">

${headers[i]}

</td>

<td
style="
border:1px solid #ddd;
padding:8px;
">

${row[i]}

</td>

</tr>

`;

}

html += "</table>";

return html;

}

/* ======================
결과 보기
====================== */

function openResult(title,gender){

let row;

if(gender==="men"){

row =
findMenResult(title);

}else{

row =
findWomenResult(title);

}

openModal(

`

<h2 class="modal-title">

${title}

</h2>

${createResultTable(row)}

`

);

}

/* ======================
달력
====================== */

function renderCalendar(){

const screen =
document.getElementById(
"calendarScreen"
);

const year =
currentDate.getFullYear();

const month =
currentDate.getMonth();

const firstDay =
new Date(year,month,1);

const lastDay =
new Date(year,month+1,0);

let html = `

<div class="calendar-nav">

<button
onclick="changeMonth(-1)">

◀

</button>

<h2>

${year}년
${month+1}월

</h2>

<button
onclick="changeMonth(1)">

▶

</button>

</div>

<div class="calendar-grid">

<div class="day-header">일</div>
<div class="day-header">월</div>
<div class="day-header">화</div>
<div class="day-header">수</div>
<div class="day-header">목</div>
<div class="day-header">금</div>
<div class="day-header">토</div>

`;

for(
let i=0;
i<firstDay.getDay();
i++
){

html +=
`<div class="day"></div>`;

}

for(
let day=1;
day<=lastDay.getDate();
day++
){

const dateText =
`${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;

html += `

<div class="day">

<div class="day-number">

${day}

</div>
`;

const dayEvents =
competitions.filter(

item=>

item.start===dateText

);

dayEvents.forEach(

event=>{

html += `

<div
class="event"

onclick="
openCompetition(
'${event.title}'
)
">

${event.title}

</div>

`;

}

);

html +=
`</div>`;

}

html +=
`</div>`;

screen.innerHTML =
html;

}

/* ======================
월 이동
====================== */

function changeMonth(num){

currentDate.setMonth(
currentDate.getMonth()+num
);

renderCalendar();

}

/* ======================
시즌별 종료대회
====================== */

function renderSeasonPages(){

const seasons = {};

competitions.forEach(item=>{

if(
getDday(item.start)!=="종료"
)
return;

const season =
item.season || "기타";

if(!seasons[season]){

seasons[season] = [];

}

seasons[season].push(item);

});

createSeasonMenus(seasons);

}

/* ======================
시즌 메뉴 생성
====================== */

function createSeasonMenus(seasons){

const sidebar =
document.getElementById(
"sidebar"
);

Object.keys(seasons)
.sort()
.reverse()
.forEach(

season=>{

const btn =
document.createElement("div");

btn.className =
"menu-item";

btn.innerText =
season + " 시즌";

btn.onclick = ()=>{

openSeason(season);

};

sidebar.appendChild(btn);

}

);

}

/* ======================
시즌 열기
====================== */

function openSeason(season){

let screen =
document.getElementById(
"pastScreen"
);

const list =
competitions.filter(

item=>

item.season===season
&&
getDday(item.start)==="종료"

);

screen.innerHTML =

`

<h2
style="
margin-bottom:20px;
">

${season}
시즌

</h2>

`

*

list.map(
createCard
).join("");

showScreen(
"pastScreen"
);

}

/* ======================
최종 초기화
====================== */

async function finalInit(){

await init();

renderSeasonPages();

}

document.addEventListener(

"DOMContentLoaded",

finalInit

);
