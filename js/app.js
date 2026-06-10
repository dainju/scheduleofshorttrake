let DATA = null;

const app =
document.getElementById("app");

const searchInput =
document.getElementById("searchInput");

init();

async function init(){

app.innerHTML =
'<div class="loading">불러오는 중...</div>';

try{

const res =
await fetch(API_URL);

DATA =
await res.json();

showUpcoming();

searchInput.addEventListener(
"input",
searchPlayers
);

}catch(err){

app.innerHTML =
"<h3>데이터를 불러올 수 없습니다.</h3>";

console.error(err);

}

}

function formatDate(v){

if(!v) return "";

const d = new Date(v);

if(isNaN(d)) return String(v);

return d.toLocaleDateString("ko-KR");

}

function getDday(startDate){

const today =
new Date();

today.setHours(0,0,0,0);

const target =
new Date(startDate);

target.setHours(0,0,0,0);

const diff =
Math.ceil(
(target-today)/
(1000*60*60*24)
);

if(diff===0) return "D-Day";

if(diff>0)
return `D-${diff}`;

return "종료";

}

function createCompetitionCard(
item,
finished=false
){

const start =
item[0];

const end =
item[1];

const name =
item[2];

const location =
item[3];

const category =
item[6];

const card =
document.createElement("div");

card.className =
"card";

let topText="";

if(finished){

topText =
`
<div>
${formatDate(start)}
</div>

<div class="life">
${category==="생활체육"
? "생활체육"
: ""}
</div>
`;

}else{

topText =
`
<div>
${formatDate(start)}
</div>

<div class="dday">
${getDday(start)}
</div>
`;

}

card.innerHTML =
`
<div class="card-top">
${topText}
</div>

<div class="card-title">
${name}
</div>

<div class="card-location">
${location}
</div>
`;

card.onclick =
()=>showCompetitionDetail(item);

return card;

}

function showUpcoming(){

const rows =
DATA.competitions.slice(1);

const today =
new Date();

const upcoming =
rows.filter(r=>{

const end =
new Date(r[1]);

return end >= today;

});

upcoming.sort(
(a,b)=>
new Date(a[0])-
new Date(b[0])
);

app.innerHTML="";

upcoming.forEach(c=>{

app.appendChild(
createCompetitionCard(c)
);

});

}

function showFinishedSeasonMenu(){

app.innerHTML="";

const wrap =
document.createElement("div");

wrap.className =
"season-list";

for(
let year=26;
year>=17;
year--
){

const season =
`${year}/${year+1}`;

const btn =
document.createElement("button");

btn.className =
"season-btn";

btn.textContent =
season+" 시즌";

btn.onclick =
()=>showSeasonCompetitions(
season
);

wrap.appendChild(btn);

}

app.appendChild(wrap);

}

function showSeasonCompetitions(
season
){

app.innerHTML="";

const back =
document.createElement("button");

back.className =
"back-btn";

back.textContent =
"← 시즌 목록";

back.onclick =
showFinishedSeasonMenu;

app.appendChild(back);

const rows =
DATA.competitions.slice(1);

const list =
rows.filter(
r=>String(r[8])===season
);

list.sort(
(a,b)=>
new Date(a[0])-
new Date(b[0])
);

list.forEach(c=>{

app.appendChild(
createCompetitionCard(
c,
true
)
);

});

}
function showCompetitionDetail(
item
){

const start = item[0];
const end = item[1];
const name = item[2];
const location = item[3];
const type = item[4];
const target = item[5];
const category = item[6];
const note = item[7];

const today =
new Date();

const finished =
new Date(end) < today;

app.innerHTML =
`
<button
class="back-btn"
onclick="location.reload()">
← 뒤로
</button>

<div class="detail">

<div class="detail-title">
${name}
</div>

<div class="detail-row">
<div class="detail-label">일정</div>
${formatDate(start)}
~
${formatDate(end)}
</div>

<div class="detail-row">
<div class="detail-label">장소</div>
${location}
</div>

<div class="detail-row">
<div class="detail-label">구분</div>
${type}
</div>

<div class="detail-row">
<div class="detail-label">참가대상</div>
${target}
</div>

<div class="detail-row">
<div class="detail-label">분류</div>
${category}
</div>

<div class="detail-row">
<div class="detail-label">비고</div>
${note}
</div>

${
finished
?
`
<div id="results"></div>
`
:
""
}

</div>
`;

if(finished){

renderResults(name);

}

}

function renderResults(
competitionName
){

const container =
document.getElementById(
"results"
);

if(!container) return;

const men =
DATA.menResults
.find(
r=>r[2]===competitionName
);

const women =
DATA.womenResults
.find(
r=>r[2]===competitionName
);

let html =
`
<div class="result-box">

<div class="result-title">
경기결과
</div>
`;

if(men){

html +=
`
<h3>남자부</h3>

<table class="result-table">
`;

DATA.menResults[0]
.forEach((h,i)=>{

if(i<3) return;

html +=
`
<tr>
<td>${h}</td>
<td>${men[i]||""}</td>
</tr>
`;

});

html +=
`</table>`;
}

if(women){

html +=
`
<h3 style="margin-top:20px;">
여자부
</h3>

<table class="result-table">
`;

DATA.womenResults[0]
.forEach((h,i)=>{

if(i<3) return;

html +=
`
<tr>
<td>${h}</td>
<td>${women[i]||""}</td>
</tr>
`;

});

html +=
`</table>`;
}

html +=
`</div>`;

container.innerHTML =
html;

}

function showPlayers(){

app.innerHTML="";

const data =
DATA.players;

const headers =
data[0];

for(
let col=0;
col<headers.length;
col++
){

const title =
headers[col];

const players =
[];

for(
let row=1;
row<data.length;
row++
){

if(data[row][col]){

players.push(
data[row][col]
);

}

}

if(players.length===0)
continue;

const box =
document.createElement("div");

box.className =
"player-card";

box.innerHTML =
`
<div class="player-name">
${title}
</div>

<div>
${players.join(", ")}
</div>
`;

app.appendChild(box);

}

}

function searchPlayers(){

const keyword =
searchInput.value.trim();

if(!keyword){

return;

}

showPlayers();

const cards =
document.querySelectorAll(
".player-card"
);

cards.forEach(card=>{

if(
card.innerText.includes(
keyword
)
){

card.style.display =
"block";

}else{

card.style.display =
"none";

}

});

}
