/* =========================
   Athlete Page
========================= */

const athletePage =
document.getElementById(
    "athletePage"
);

const athleteTitle =
document.getElementById(
    "athleteTitle"
);

const athleteList =
document.getElementById(
    "athleteList"
);

const backAthlete =
document.getElementById(
    "backAthlete"
);

/* =========================
   선수 페이지 열기
========================= */

function openAthletePage(
    team
){

    athletePage.classList.remove(
        "hidden"
    );

    document
    .querySelector(".main")
    .classList.add(
        "hidden"
    );

    document
    .getElementById(
        "seasonPage"
    )
    .classList.add(
        "hidden"
    );

    athleteTitle.innerHTML =
    team;

    athleteList.innerHTML = "";

    const players =
    athletes[team] || [];

    if(players.length === 0){

        athleteList.innerHTML =

        `
        <div class="athlete-card">
            등록된 선수가 없습니다.
        </div>
        `;

        return;

    }

    players.forEach(player=>{

        athleteList.innerHTML +=

        `
        <div class="athlete-card">
            ${player}
        </div>
        `;

    });

}

/* =========================
   뒤로가기
========================= */

backAthlete.addEventListener(
    "click",
    ()=>{

        athletePage.classList.add(
            "hidden"
        );

        document
        .querySelector(".main")
        .classList.remove(
            "hidden"
        );

    }
);

/* =========================
   팀 클릭
========================= */

document.addEventListener(
    "click",
    e=>{

        const teamItem =

        e.target.closest(
            ".team-item"
        );

        if(!teamItem)
            return;

        openAthletePage(

            teamItem.dataset.team

        );

    }
);

/* =========================
   선수 검색
========================= */

function openPlayerSearchResult(
    keyword
){

    athletePage.classList.remove(
        "hidden"
    );

    document
    .querySelector(".main")
    .classList.add(
        "hidden"
    );

    athleteTitle.innerHTML =

    `"${keyword}" 검색 결과`;

    athleteList.innerHTML = "";

    const result =
    searchAthlete(
        keyword
    );

    if(result.length === 0){

        athleteList.innerHTML =

        `
        <div class="athlete-card">
            검색 결과가 없습니다.
        </div>
        `;

        return;

    }

    result.forEach(item=>{

        athleteList.innerHTML +=

        `
        <div class="athlete-card">

            <strong>
                ${item.player}
            </strong>

            <br><br>

            소속 :
            ${item.team}

        </div>
        `;

    });

}

/* =========================
   아코디언
========================= */

function initAthleteAccordion(){

    const headers =

    document.querySelectorAll(
        ".accordion-header"
    );

    headers.forEach(header=>{

        header.addEventListener(
            "click",
            ()=>{

                const submenu =

                header.nextElementSibling;

                if(!submenu)
                    return;

                submenu.classList.toggle(
                    "open"
                );

            }
        );

    });

}

/* =========================
   국가대표
========================= */

function isNationalTeam(
    team
){

    return (

        team ===
        "26-27 남국대"

        ||

        team ===
        "26-27 여국대"

    );

}

/* =========================
   실업팀
========================= */

function isProfessionalTeam(
    team
){

    const teams = [

        "강원도청",
        "고양시청",
        "서울시청",
        "성남시청",
        "스포츠토토",
        "전북도청",
        "화성시청"

    ];

    return teams.includes(
        team
    );

}

/* =========================
   대학부
========================= */

function isUniversityTeam(
    team
){

    const teams = [

        "경희대",
        "고려대",
        "국민대",
        "단국대",
        "동의대",
        "디지털서울문화예술대",
        "서울디지털대",
        "용인대",
        "한국체대",
        "한양대"

    ];

    return teams.includes(
        team
    );

}

/* =========================
   고등부
========================= */

function isHighSchoolTeam(
    team
){

    return (

        team ===
        "남자 고등부"

        ||

        team ===
        "여자 고등부"

    );

}

/* =========================
   중등부
========================= */

function isMiddleSchoolTeam(
    team
){

    return (

        team ===
        "남자 중등부"

        ||

        team ===
        "여자 중등부"

    );

}

/* =========================
   초등부
========================= */

function isElementaryTeam(
    team
){

    return (

        team ===
        "남초부"

        ||

        team ===
        "여초부"

    );

}
