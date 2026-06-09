/* =========================
   Google Sheet CSV 주소
========================= */

const COMPETITION_CSV =
"https://docs.google.com/spreadsheets/d/12kSiIDg4VltLMhOA6L7L18FSSzcKBnPajqXYrazuTa0/export?format=csv&gid=1082967064";

const ATHLETE_CSV =
"https://docs.google.com/spreadsheets/d/1dwgy0Te6U-YZ1J8SeSRBCsbtzRz3iEM2AvF2iOHSlOo/export?format=csv&gid=0";

const FEMALE_RESULT_CSV =
"https://docs.google.com/spreadsheets/d/1ztNkwWuBkNiLH3T9Nfc04LAQErgbcZB47oDj8u4sfGs/export?format=csv&gid=0";

const MALE_RESULT_CSV =
"https://docs.google.com/spreadsheets/d/1NEjKyWD3ql_2W-Decdgg9bl1siv68L6OCR7FM_k3kEU/export?format=csv&gid=0";

/* =========================
   데이터 저장
========================= */

let competitions = [];
let athletes = {};
let femaleResults = [];
let maleResults = [];

/* =========================
   CSV 파서
========================= */

function parseCSV(text){

    const rows = [];
    let row = [];
    let value = "";
    let insideQuote = false;

    for(let i=0;i<text.length;i++){

        const char = text[i];
        const next = text[i+1];

        if(char === '"'){

            if(
                insideQuote &&
                next === '"'
            ){
                value += '"';
                i++;
            }else{
                insideQuote = !insideQuote;
            }

        }else if(
            char === "," &&
            !insideQuote
        ){

            row.push(value);
            value = "";

        }else if(
            (char === "\n" || char === "\r")
            &&
            !insideQuote
        ){

            if(value !== "" || row.length){

                row.push(value);

                rows.push(row);

                row = [];
                value = "";

            }

        }else{

            value += char;

        }

    }

    if(value !== "" || row.length){

        row.push(value);

        rows.push(row);

    }

    return rows;

}

/* =========================
   CSV -> 객체
========================= */

function csvToObjects(csv){

    const rows =
    parseCSV(csv);

    const headers =
    rows[0];

    return rows
    .slice(1)
    .filter(r=>r.length)
    .map(row=>{

        const obj = {};

        headers.forEach((h,index)=>{

            obj[h?.trim()] =
            row[index] || "";

        });

        return obj;

    });

}

/* =========================
   선수 변환
========================= */

function csvToAthletes(csv){

    const rows =
    parseCSV(csv);

    const headers =
    rows[0];

    const result = {};

    headers.forEach(team=>{

        result[team] = [];

    });

    rows.slice(1).forEach(row=>{

        headers.forEach((team,index)=>{

            const player =
            row[index];

            if(
                player &&
                player.trim()
            ){

                result[team].push(
                    player.trim()
                );

            }

        });

    });

    return result;

}

/* =========================
   데이터 로딩
========================= */

async function loadSheetsData(){

    try{

        const [

            competitionCSV,
            athleteCSV,
            femaleCSV,
            maleCSV

        ] = await Promise.all([

            fetch(COMPETITION_CSV)
            .then(r=>r.text()),

            fetch(ATHLETE_CSV)
            .then(r=>r.text()),

            fetch(FEMALE_RESULT_CSV)
            .then(r=>r.text()),

            fetch(MALE_RESULT_CSV)
            .then(r=>r.text())

        ]);

        competitions =
        csvToObjects(
            competitionCSV
        );

        athletes =
        csvToAthletes(
            athleteCSV
        );

        femaleResults =
        csvToObjects(
            femaleCSV
        );

        maleResults =
        csvToObjects(
            maleCSV
        );

        return true;

    }catch(error){

        console.error(error);

        return false;

    }

}

/* =========================
   날짜
========================= */

function formatDate(date){

    if(!date) return "";

    const d =
    new Date(date);

    if(isNaN(d))
        return date;

    return

    `${d.getFullYear()}.${String(
        d.getMonth()+1
    ).padStart(2,"0")}.${String(
        d.getDate()
    ).padStart(2,"0")}`;

}

/* =========================
   일정
========================= */

function getSchedule(item){

    return `${

        formatDate(
            item["시작일"]
        )

    } ~ ${

        formatDate(
            item["종료일"]
        )

    }`;

}

/* =========================
   종료 여부
========================= */

function isEnded(item){

    const today =
    new Date();

    const end =
    new Date(
        item["종료일"]
    );

    return end < today;

}

function isUpcoming(item){

    const today =
    new Date();

    const end =
    new Date(
        item["종료일"]
    );

    return end >= today;

}

/* =========================
   D-DAY
========================= */

function getDday(item){

    const start =
    new Date(
        item["시작일"]
    );

    const today =
    new Date();

    const diff =
    Math.ceil(

        (
            start - today
        )

        / 86400000

    );

    if(diff < 0){

        return "진행중";

    }

    if(diff === 0){

        return "D-Day";

    }

    return `D-${diff}`;

}

/* =========================
   필터
========================= */

function getUpcomingCompetitions(){

    return competitions

    .filter(isUpcoming)

    .sort((a,b)=>

        new Date(
            a["시작일"]
        )

        -

        new Date(
            b["시작일"]
        )

    );

}

function getEndedCompetitions(){

    return competitions

    .filter(isEnded);

}

function getSeasonCompetitions(
    season
){

    return competitions

    .filter(item=>

        item["시즌"]
        ===
        season

        &&

        isEnded(item)

    )

    .sort((a,b)=>

        new Date(
            a["시작일"]
        )

        -

        new Date(
            b["시작일"]
        )

    );

}

function getDomesticCompetitions(){

    return competitions

    .filter(item=>

        item["구분"]
        ?.includes("국내")

        &&

        isUpcoming(item)

    );

}

function getInternationalCompetitions(){

    return competitions

    .filter(item=>

        item["구분"]
        ?.includes("국제")

        &&

        isUpcoming(item)

    );

}

function getThisMonthCompetitions(){

    const now =
    new Date();

    return competitions

    .filter(item=>{

        const d =
        new Date(
            item["시작일"]
        );

        return (

            d.getMonth()
            ===
            now.getMonth()

            &&

            d.getFullYear()
            ===
            now.getFullYear()

        );

    });

}

/* =========================
   검색
========================= */

function searchCompetition(
    keyword
){

    return competitions

    .filter(item=>

        item["대회명"]

        ?.toLowerCase()

        .includes(

            keyword
            .toLowerCase()

        )

    );

}

function searchAthlete(
    keyword
){

    const result = [];

    Object.keys(
        athletes
    ).forEach(team=>{

        athletes[team]
        .forEach(player=>{

            if(

                player.includes(
                    keyword
                )

            ){

                result.push({

                    team,
                    player

                });

            }

        });

    });

    return result;

}
