import championList from './tftChampionObject.js';
const championDic = {}
const championBox = document.querySelector('#championBox');
const arrangementBox = document.querySelector('#arrangementBox')
const SynergyBox = document.querySelector('#SynergyBox')
const SynergyCount = {}
const SynergyTabCheck = {}
const SynergyTab = {}
let jobTabCheck = 0
let lineTabCheck = 0
const lineBox = ['공허', '그림자군도', '녹서스', '다르킨', '데마시아', '방랑자', '슈리마', '아이오니아', '요들', '자운', '타곤', '프렐요드', '필트오버']
const jobBox = ['구원자', '기원자', '난동꾼', '도전자', '마법사', '발명의대가', '백발백중', '불한당', '사수', '여제', '연쇄마법사', '요새', '전쟁기계', '책략가', '학살자']
for (let i = 0; i < championList.length; i++) {
    championDic[championList[i].koreanName] = championList[i]
}

// event 발생 -> data UPDATE -> UI UPDATE


// click -> 
function clickEventHandler(championObject, arrangementBox) {
    return () => {
        const championClone = document.createElement('div');
        championClone.className = 'clone';
        championClone.id = championObject.koreanName;
        championClone.textContent = championObject.koreanName;
        arrangementBox.appendChild(championClone)
        const arrangementBoxChampion = document.querySelectorAll('.clone')
        championClone.addEventListener("click", function () {

            championClone.remove();
            SynergyBox.replaceChildren()
            const cloneObject = championDic[championClone.id]

            for (let x = 0; x < cloneObject.line.length; x++)
                SynergyTab[cloneObject.line[x]] = SynergyTab[cloneObject.line[x]] - 1
            for (let x = 0; x < cloneObject.job.length; x++)
                SynergyTab[cloneObject.job[x]] = SynergyTab[cloneObject.job[x]] - 1
            SynergyTabCheck[cloneObject.koreanName] = 0


            const SynergyKeys = Object.keys(SynergyTab)
            const SynergyDiv = document.createElement('div')
            let SynergyText = ''
            for (let y = 0; y < SynergyKeys.length; y++) {
                if (SynergyTab[SynergyKeys[y]] !== 0)
                    SynergyText = SynergyText + SynergyKeys[y] + ':' + SynergyTab[SynergyKeys[y]] + '\n'
            }
            SynergyDiv.textContent = SynergyText
            SynergyBox.appendChild(SynergyDiv)
        })

        SynergyBox.replaceChildren()

        for (let k = 0; k < arrangementBoxChampion.length; k++) {
            const cloneObject = championDic[arrangementBoxChampion[k].id]
            if (!(cloneObject.koreanName in SynergyTabCheck)) {
                for (let x = 0; x < cloneObject.line.length; x++) {
                    if (!(cloneObject.line[x] in SynergyTab))
                        SynergyTab[cloneObject.line[x]] = 1
                    else
                        SynergyTab[cloneObject.line[x]] = SynergyTab[cloneObject.line[x]] + 1
                }
                for (let x = 0; x < cloneObject.job.length; x++) {
                    if (!(cloneObject.job[x] in SynergyTab))
                        SynergyTab[cloneObject.job[x]] = 1
                    else
                        SynergyTab[cloneObject.job[x]] = SynergyTab[cloneObject.job[x]] + 1
                }
            }
            SynergyTabCheck[cloneObject.koreanName] = 1
        }


        const SynergyKeys = Object.keys(SynergyTab)
        const SynergyDiv = document.createElement('div')
        let SynergyText = ''
        for (let y = 0; y < SynergyKeys.length; y++) {
            if (SynergyTab[SynergyKeys[y]] !== 0)
                SynergyText = SynergyText + SynergyKeys[y] + ':' + SynergyTab[SynergyKeys[y]] + '\n'
        }
        SynergyDiv.textContent = SynergyText
        SynergyBox.appendChild(SynergyDiv)
    }
}

function replace() {
    for (let i = 0; i < championList.length; i++) {
        const champion = document.createElement('div');
        champion.id = championList[i].name;
        champion.className = 'champion';
        champion.textContent = championList[i].koreanName;
        champion.addEventListener("click", clickEventHandler(championList[i], arrangementBox))
        championBox.appendChild(champion);
    }
}

function removeChampionDiv() {
    for (let i = 0; i < championList.length; i++) {
        const removeChampion = document.getElementById(championList[i].name);
        removeChampion.remove();
    }
}

function removeJobTabDiv() {
    for (let i = 0; i < jobBox.length; i++) {
        const removejobTab = document.getElementById(jobBox[i]);
        removejobTab.remove();
    }
}

function removeLineTabDiv() {
    for (let i = 0; i < lineBox.length; i++) {
        const removeLineTab = document.getElementById(lineBox[i]);
        removeLineTab.remove();
    }
}

function replaceByName() {
    championList.sort((a, b) => {
        return a.koreanName < b.koreanName ? -1 : a.koreanName > b.koreanName ? 1 : 0;
    });
    if (jobTabCheck === 1) {
        removeJobTabDiv();
        jobTabCheck = 0
        replace();
        return
    }
    if (lineTabCheck === 1) {
        removeLineTabDiv();
        lineTabCheck = 0
        replace();
        return
    }

    removeChampionDiv();
    replace();
}

function replaceByCost() {
    championList.sort((a, b) => a.cost - b.cost);
    if (jobTabCheck === 1) {
        removeJobTabDiv();
        jobTabCheck = 0
        replace();
        return
    }

    if (lineTabCheck === 1) {
        removeLineTabDiv();
        lineTabCheck = 0
        replace();
        return
    }
    removeChampionDiv();
    replace();
}

function replaceByLine() {
    removeChampionDiv();
    for (let i = 0; i < lineBox.length; i++) {
        const lineTab = document.createElement('div');
        lineTab.className = 'lineTab';
        lineTab.id = lineBox[i]
        lineTab.textContent = lineBox[i];
        championBox.appendChild(lineTab);
    }
    if (jobTabCheck === 1) {
        removeJobTabDiv();
        jobTabCheck = 0
    }
    if (lineTabCheck === 1) {
        removeLineTabDiv();
        lineTabCheck = 0
    }
    lineTabCheck = 1

    for (let i = 0; i < championList.length; i++) {
        for (let j = 0; j < championList[i].line.length; j++) {
            const champion = document.createElement('div');
            champion.id = championList[i].name;
            champion.className = 'champion';
            champion.textContent = championList[i].koreanName;
            champion.addEventListener("click", clickEventHandler(championList[i], arrangementBox))
            const lineTabDiv = document.getElementById(championList[i].line[j])
            lineTabDiv.appendChild(champion);
        }
    }
}

function replaceByJob() {
    removeChampionDiv();
    for (let i = 0; i < jobBox.length; i++) {
        const jobTab = document.createElement('div');
        jobTab.className = 'jobTab';
        jobTab.id = jobBox[i]
        jobTab.textContent = jobBox[i];
        championBox.appendChild(jobTab);
    }
    if (jobTabCheck === 1) {
        removeJobTabDiv();
        jobTabCheck = 0
    }
    if (lineTabCheck === 1) {
        removeLineTabDiv();
        lineTabCheck = 0
    }
    jobTabCheck = 1
    for (let i = 0; i < championList.length; i++) {
        for (let j = 0; j < championList[i].job.length; j++) {
            const champion = document.createElement('div');
            champion.id = championList[i].name;
            champion.className = 'champion';
            champion.textContent = championList[i].koreanName;
            champion.addEventListener("click", clickEventHandler(championList[i], arrangementBox))
            const jobTabDiv = document.getElementById(championList[i].job[j])
            jobTabDiv.appendChild(champion);
        }
    }
}

replace()

document.getElementById("nameButton").addEventListener('click', replaceByName);
document.getElementById("costButton").addEventListener('click', replaceByCost);
document.getElementById("jobButton").addEventListener('click', replaceByJob);
document.getElementById("lineButton").addEventListener('click', replaceByLine);