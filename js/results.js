/* =========================
   경기결과 찾기
========================= */

function getMaleResult(
    competition
){

    return maleResults.find(

        result =>

        result["대회명"]
        ===
        competition["대회명"]

    );

}

function getFemaleResult(
    competition
){

    return femaleResults.find(

        result =>

        result["대회명"]
        ===
        competition["대회명"]

    );

}

/* =========================
   결과 카드
========================= */

function createResultCard(
    title,
    html
){

    return `

    <div class="result-card">

        <h4>
            ${title}
        </h4>

        <div>
            ${html}
        </div>

    </div>

    `;

}

/* =========================
   남자 결과
========================= */

function createMaleResultHTML(
    result
){

    if(!result){

        return `
        <div class="result-card">
            경기결과 없음
        </div>
        `;

    }

    return `

    <div class="result-section">

        <h3>
            남자 경기결과
        </h3>

        ${createResultCard(
            "500M",
            `
            1위 ${result["남자 500M 1위"]}<br>
            2위 ${result["남자 500M 2위"]}<br>
            3위 ${result["남자 500M 3위"]}<br>
            4위 ${result["남자 500M 4위"]}<br>
            5위 ${result["남자 500M 5위"]}
            `
        )}

        ${createResultCard(
            "1000M",
            `
            1위 ${result["남자 1000M 1위"]}<br>
            2위 ${result["남자 1000M 2위"]}<br>
            3위 ${result["남자 1000M 3위"]}<br>
            4위 ${result["남자 1000M 4위"]}<br>
            5위 ${result["남자 1000M 5위"]}
            `
        )}

        ${createResultCard(
            "1500M",
            `
            1위 ${result["남자 1500M 1위"]}<br>
            2위 ${result["남자 1500M 2위"]}<br>
            3위 ${result["남자 1500M 3위"]}<br>
            4위 ${result["남자 1500M 4위"]}<br>
            5위 ${result["남자 1500M 5위"]}<br>
            6위 ${result["남자 1500M 6위"]}<br>
            7위 ${result["남자 1500M 7위"]}
            `
        )}

        ${createResultCard(
            "계주 5000M",
            `
            1위 ${result["남자계주 5000M 1위"]}<br>
            2위 ${result["남자계주 5000M 2위"]}<br>
            3위 ${result["남자계주 5000M 3위"]}<br>
            4위 ${result["남자계주 5000M 4위"]}
            `
        )}

        ${createResultCard(
            "1500M SF",
            result["남자 1500M SF"] || "-"
        )}

        ${createResultCard(
            "3000M SF",
            result["남자 3000M SF"] || "-"
        )}

    </div>

    `;

}

/* =========================
   여자 결과
========================= */

function createFemaleResultHTML(
    result
){

    if(!result){

        return `
        <div class="result-card">
            경기결과 없음
        </div>
        `;

    }

    return `

    <div class="result-section">

        <h3>
            여자 경기결과
        </h3>

        ${createResultCard(
            "500M",
            `
            1위 ${result["여자 500M 1위"]}<br>
            2위 ${result["여자 500M 2위"]}<br>
            3위 ${result["여자 500M 3위"]}<br>
            4위 ${result["여자 500M 4위"]}<br>
            5위 ${result["여자 500M 5위"]}
            `
        )}

        ${createResultCard(
            "1000M",
            `
            1위 ${result["여자 1000M 1위"]}<br>
            2위 ${result["여자 1000M 2위"]}<br>
            3위 ${result["여자 1000M 3위"]}<br>
            4위 ${result["여자 1000M 4위"]}<br>
            5위 ${result["여자 1000M 5위"]}
            `
        )}

        ${createResultCard(
            "1500M",
            `
            1위 ${result["여자 1500M 1위"]}<br>
            2위 ${result["여자 1500M 2위"]}<br>
            3위 ${result["여자 1500M 3위"]}<br>
            4위 ${result["여자 1500M 4위"]}<br>
            5위 ${result["여자 1500M 5위"]}<br>
            6위 ${result["여자 1500M 6위"]}<br>
            7위 ${result["여자 1500M 7위"]}
            `
        )}

        ${createResultCard(
            "계주 3000M",
            `
            1위 ${result["여자계주 3000M 1위"]}<br>
            2위 ${result["여자계주 3000M 2위"]}<br>
            3위 ${result["여자계주 3000M 3위"]}<br>
            4위 ${result["여자계주 3000M 4위"]}
            `
        )}

        ${createResultCard(
            "1500M SF",
            result["여자 1500M SF"] || "-"
        )}

        ${createResultCard(
            "3000M SF",
            result["여자 3000M SF"] || "-"
        )}

    </div>

    `;

}

/* =========================
   종료대회 상세
========================= */

function buildEndedCompetitionDetail(
    competition
){

    const male =
    getMaleResult(
        competition
    );

    const female =
    getFemaleResult(
        competition
    );

    return `

    <div class="detail-title">
        ${competition["대회명"]}
    </div>

    <div class="detail-row">
        <div class="detail-label">일정</div>
        <div class="detail-value">
            ${getSchedule(competition)}
        </div>
    </div>

    <div class="detail-row">
        <div class="detail-label">장소</div>
        <div class="detail-value">
            ${competition["장소"]}
        </div>
    </div>

    <div class="detail-row">
        <div class="detail-label">구분</div>
        <div class="detail-value">
            ${competition["구분"]}
        </div>
    </div>

    <div class="detail-row">
        <div class="detail-label">참가대상</div>
        <div class="detail-value">
            ${competition["참가대상"]}
        </div>
    </div>

    <div class="detail-row">
        <div class="detail-label">분류</div>
        <div class="detail-value">
            ${competition["분류"]}
        </div>
    </div>

    <div class="detail-row">
        <div class="detail-label">비고</div>
        <div class="detail-value">
            ${competition["비고"]}
        </div>
    </div>

    ${createMaleResultHTML(male)}

    ${createFemaleResultHTML(female)}

    `;

}

/* =========================
   예정대회 상세
========================= */

function buildUpcomingCompetitionDetail(
    competition
){

    return `

    <div class="detail-title">
        ${competition["대회명"]}
    </div>

    <div class="detail-row">
        <div class="detail-label">일정</div>
        <div class="detail-value">
            ${getSchedule(competition)}
        </div>
    </div>

    <div class="detail-row">
        <div class="detail-label">장소</div>
        <div class="detail-value">
            ${competition["장소"]}
        </div>
    </div>

    <div class="detail-row">
        <div class="detail-label">구분</div>
        <div class="detail-value">
            ${competition["구분"]}
        </div>
    </div>

    <div class="detail-row">
        <div class="detail-label">참가대상</div>
        <div class="detail-value">
            ${competition["참가대상"]}
        </div>
    </div>

    <div class="detail-row">
        <div class="detail-label">분류</div>
        <div class="detail-value">
            ${competition["분류"]}
        </div>
    </div>

    <div class="detail-row">
        <div class="detail-label">비고</div>
        <div class="detail-value">
            ${competition["비고"]}
        </div>
    </div>

    `;

}
