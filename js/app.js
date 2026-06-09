/* =========================
   Elements
========================= */

const sidebar =
document.getElementById(
    "sidebar"
);

const menuBtn =
document.getElementById(
    "menuBtn"
);

const pageTitle =
document.getElementById(
    "pageTitle"
);

const competitionList =
document.getElementById(
    "competitionList"
);

const detailModal =
document.getElementById(
    "detailModal"
);

const detailContent =
document.getElementById(
    "detailContent"
);

const closeModal =
document.getElementById(
    "closeModal"
);

const seasonPage =
document.getElementById(
    "seasonPage"
);

const searchInput =
document.getElementById(
    "searchInput"
);

/* =========================
   메뉴 열기
========================= */

menuBtn.addEventListener(
    "click",
    ()=>{

        sidebar.classList.toggle(
            "open"
        );

    }
);

/* =========================
   카드 생성
========================= */

function createCompetitionCard(
    competition,
    ended=false
){

    let rightTag = "";

    if(ended){

        if(
            competition["분류"]
            ?.includes("생활체육")
        ){

            rightTag =

            `
            <div class="life-sport">
                생활체육
            </div>
            `;

        }

    }else{

        rightTag =

        `
        <div class="card-dday">
            ${getDday(competition)}
        </div>
        `;

    }

    return `

    <div
    class="competition-card"
    onclick="showCompetitionDetailByIndex(${competitions.indexOf(competition)})">

        <div class="card-top">

            <div class="card-date">
                ${getSchedule(competition)}
            </div>

            ${rightTag}

        </div>

        <div class="card-title">
            ${competition["대회명"]}
        </div>

        <div class="card-location">
            ${competition["장소"]}
        </div>

    </div>

    `;

}

/* =========================
   카드 출력
========================= */

function renderCompetitionList(
    list,
    ended=false
){

    competitionList.innerHTML = "";

    if(
        list.length === 0
    ){

        competitionList.innerHTML =

        `
        <div class="athlete-card">
            데이터가 없습니다.
        </div>
        `;

        return;

    }

    list.forEach(item=>{

        competitionList.innerHTML +=

        createCompetitionCard(
            item,
            ended
        );

    });

}

/* =========================
   상세보기
========================= */

function showCompetitionDetailByIndex(
    index
){

    const competition =
    competitions[index];

    showCompetitionDetail(
        competition
    );

}

function showCompetitionDetail(
    competition
){

    if(
        isEnded(
            competition
        )
    ){

        detailContent.innerHTML =

        buildEndedCompetitionDetail(
            competition
        );

    }else{

        detailContent.innerHTML =

        buildUpcomingCompetitionDetail(
            competition
        );

    }

    detailModal.classList.add(
        "show"
    );

}

closeModal.addEventListener(
    "click",
    ()=>{

        detailModal.classList.remove(
            "show"
        );

    }
);

window.addEventListener(
    "click",
    e=>{

        if(
            e.target === detailModal
        ){

            detailModal.classList.remove(
                "show"
            );

        }

    }
);

/* =========================
   홈
========================= */

function loadHomePage(){

    pageTitle.innerHTML =
    "전체 대회";

    renderCompetitionList(
        getUpcomingCompetitions()
    );

}

/* =========================
   메뉴 이동
========================= */

document
.querySelectorAll(
    "[data-page]"
)
.forEach(item=>{

    item.addEventListener(
        "click",
        ()=>{

            sidebar.classList.remove(
                "open"
            );

            const page =
            item.dataset.page;

            if(
                page === "calendar"
            ){

                renderCalendar();

            }

            else if(
                page === "domestic"
            ){

                pageTitle.innerHTML =
                "국내대회";

                renderCompetitionList(
                    getDomesticCompetitions()
                );

            }

            else if(
                page === "international"
            ){

                pageTitle.innerHTML =
                "국제대회";

                renderCompetitionList(
                    getInternationalCompetitions()
                );

            }

            else if(
                page === "month"
            ){

                pageTitle.innerHTML =
                "이번달대회";

                renderCompetitionList(
                    getThisMonthCompetitions()
                );

            }

            else if(
                page === "ended"
            ){

                document
                .querySelector(".main")
                .classList.add(
                    "hidden"
                );

                seasonPage
                .classList.remove(
                    "hidden"
                );

            }

        }
    );

});

/* =========================
   종료대회 시즌
========================= */

document
.querySelectorAll(
    ".season-item"
)
.forEach(item=>{

    item.addEventListener(
        "click",
        ()=>{

            const season =
            item.dataset.season;

            seasonPage.classList.add(
                "hidden"
            );

            document
            .querySelector(".main")
            .classList.remove(
                "hidden"
            );

            pageTitle.innerHTML =

            `${season} 종료대회`;

            renderCompetitionList(

                getSeasonCompetitions(
                    season
                ),

                true

            );

        }
    );

});

document
.getElementById(
    "backSeason"
)
.addEventListener(
    "click",
    ()=>{

        seasonPage.classList.add(
            "hidden"
        );

        document
        .querySelector(".main")
        .classList.remove(
            "hidden"
        );

        loadHomePage();

    }
);

/* =========================
   검색
========================= */

searchInput.addEventListener(
    "input",
    e=>{

        const keyword =
        e.target.value.trim();

        if(
            keyword === ""
        ){

            loadHomePage();

            return;

        }

        const competitionResult =

        searchCompetition(
            keyword
        );

        if(
            competitionResult.length
            > 0
        ){

            pageTitle.innerHTML =
            "검색 결과";

            renderCompetitionList(
                competitionResult
            );

            return;

        }

        openPlayerSearchResult(
            keyword
        );

    }
);

/* =========================
   시작
========================= */

async function initialize(){

    competitionList.innerHTML =

    `
    <div class="athlete-card">
        데이터 불러오는 중...
    </div>
    `;

    const loaded =
    await loadSheetsData();

    if(!loaded){

        competitionList.innerHTML =

        `
        <div class="athlete-card">
            데이터 로드 실패
        </div>
        `;

        return;

    }

    initAthleteAccordion();

    loadHomePage();

}

initialize();
