/* =========================
   Calendar
========================= */

let currentCalendarDate =
new Date();

/* =========================
   달력 렌더링
========================= */

function renderCalendar(){

    pageTitle.innerHTML =
    "달력";

    const year =
    currentCalendarDate.getFullYear();

    const month =
    currentCalendarDate.getMonth();

    const firstDay =
    new Date(
        year,
        month,
        1
    );

    const lastDay =
    new Date(
        year,
        month + 1,
        0
    );

    const startDay =
    firstDay.getDay();

    const totalDays =
    lastDay.getDate();

    let html =

    `
    <div class="calendar-wrap">

        <div class="calendar-header">

            <button
            id="prevMonth">
            ◀
            </button>

            <h2>
                ${year}년
                ${month+1}월
            </h2>

            <button
            id="nextMonth">
            ▶
            </button>

        </div>

        <div class="calendar-grid">

            <div class="calendar-day-name">일</div>
            <div class="calendar-day-name">월</div>
            <div class="calendar-day-name">화</div>
            <div class="calendar-day-name">수</div>
            <div class="calendar-day-name">목</div>
            <div class="calendar-day-name">금</div>
            <div class="calendar-day-name">토</div>
    `;

    for(
        let i=0;
        i<startDay;
        i++
    ){

        html +=
        `
        <div
        class="calendar-cell empty">
        </div>
        `;

    }

    for(
        let day=1;
        day<=totalDays;
        day++
    ){

        const dayCompetitions =

        competitions.filter(item=>{

            const start =

            new Date(
                item["시작일"]
            );

            return (

                start.getFullYear()
                === year

                &&

                start.getMonth()
                === month

                &&

                start.getDate()
                === day

            );

        });

        html +=

        `
        <div
        class="calendar-cell">

            <div
            class="calendar-date">

                ${day}

            </div>
        `;

        dayCompetitions.forEach(comp=>{

            html +=

            `
            <div
            class="calendar-event"
            onclick="showCompetitionDetailByName('${comp["대회명"]}')">

                ${comp["대회명"]}

            </div>
            `;

        });

        html +=
        `
        </div>
        `;

    }

    html +=

    `
        </div>
    </div>
    `;

    competitionList.innerHTML =
    html;

    document
    .getElementById(
        "prevMonth"
    )
    .addEventListener(
        "click",
        ()=>{

            currentCalendarDate
            .setMonth(

                currentCalendarDate
                .getMonth()-1

            );

            renderCalendar();

        }
    );

    document
    .getElementById(
        "nextMonth"
    )
    .addEventListener(
        "click",
        ()=>{

            currentCalendarDate
            .setMonth(

                currentCalendarDate
                .getMonth()+1

            );

            renderCalendar();

        }
    );

}

/* =========================
   달력 상세보기
========================= */

function showCompetitionDetailByName(
    competitionName
){

    const competition =

    competitions.find(item=>

        item["대회명"]
        ===
        competitionName

    );

    if(!competition)
        return;

    showCompetitionDetail(
        competition
    );

}
