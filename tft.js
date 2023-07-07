import championList from './tftChampionObject.js';
const championDic = {}
const championBox = document.querySelector('#championBox');
const arrangementBox = document.querySelector('#arrangementBox')
const SynergyBox = document.querySelector('#SynergyBox')
const SynergyTabCheck = {}
const SynergyTab = {}
let jobTabCheck = 0
let lineTabCheck = 0
const lineBox = ['공허', '그림자군도', '녹서스', '다르킨', '데마시아', '방랑자', '슈리마', '아이오니아', '요들', '자운', '타곤', '프렐요드', '필트오버']
const jobBox = ['구원자', '기원자', '난동꾼', '도전자', '마법사', '발명의대가', '백발백중', '불한당', '사수', '여제', '연쇄마법사', '요새', '전쟁기계', '책략가', '학살자']
for (let i = 0; i < championList.length; i++) {
    championDic[championList[i].koreanName] = championList[i]
}

const arrangementData = [];

function onClickArrangementBoxChampionClone(championObject) {
    return () => {
        // update DATA
        console.log(arrangementData )
        // arrangementData 에서 champion Object에 해당하는 것을 지운다. 
        // TODO(geunho): write down

        for (let x = 0; x < championObject.line.length; x++)
            SynergyTab[championObject.line[x]] = SynergyTab[championObject.line[x]] - 1
        for (let x = 0; x < championObject.job.length; x++)
            SynergyTab[championObject.job[x]] = SynergyTab[championObject.job[x]] - 1
        SynergyTabCheck[championObject.koreanName] = 0


        renderArrangementBoxUI(arrangementData);
        renderSynergyBoxUI(SynergyTab);           
    }
}

function renderArrangementBoxUI(arrangementData) {
    arrangementBox.replaceChildren()
    for (const championObject of arrangementData) {
        const championClone = document.createElement('div');
        championClone.className = 'clone';
        championClone.id = championObject.koreanName;
        championClone.textContent = championObject.koreanName;
        championClone.addEventListener("click", onClickArrangementBoxChampionClone(championObject));

        arrangementBox.appendChild(championClone);
    }
}


function renderSynergyBoxUI(SynergyTab) {
    const SynergyKeys = Object.keys(SynergyTab)
    const SynergyDiv = document.createElement('div')
    SynergyBox.replaceChildren()
    let SynergyText = ''
    for (let y = 0; y < SynergyKeys.length; y++) {
        if (SynergyTab[SynergyKeys[y]] !== 0)
            SynergyText = SynergyText + SynergyKeys[y] + ':' + SynergyTab[SynergyKeys[y]] + '\n'
    }
    SynergyDiv.textContent = SynergyText
    SynergyBox.appendChild(SynergyDiv)
}

function updateSynergyData() {
    for (let i = 0; i < arrangementData.length; i++) {
        const arrangementChampionObject = arrangementData[i];
        if (!(arrangementChampionObject.koreanName in SynergyTabCheck)) {
            for (let j = 0; j < arrangementChampionObject.line.length; j++) {
                if (!(arrangementChampionObject.line[j] in SynergyTab))
                    SynergyTab[arrangementChampionObject.line[j]] = 1
                else
                    SynergyTab[arrangementChampionObject.line[j]] = SynergyTab[arrangementChampionObject.line[j]] + 1
            }
            for (let j = 0; j < arrangementChampionObject.job.length; j++) {
                if (!(arrangementChampionObject.job[j] in SynergyTab))
                    SynergyTab[arrangementChampionObject.job[j]] = 1
                else
                    SynergyTab[arrangementChampionObject.job[j]] = SynergyTab[arrangementChampionObject.job[j]] + 1
            }
        }
        SynergyTabCheck[arrangementChampionObject.koreanName] = 1
    }
}
//// arrangementBox 안씀?
function onClickChampionBoxChampion(championObject, arrangementBox) {
    return () => {
        arrangementData.push(championObject);
        updateSynergyData();
        renderArrangementBoxUI(arrangementData);
        renderSynergyBoxUI(SynergyTab);
    }
}

function renderChampionBoxUI() {
    for (let i = 0; i < championList.length; i++) {
        const champion = document.createElement('div');
        champion.id = championList[i].name;
        champion.className = 'champion';
        champion.textContent = championList[i].koreanName;
        champion.addEventListener("click", onClickChampionBoxChampion(championList[i], arrangementBox))
        championBox.appendChild(champion);
    }
}


function onClickNameButton() {
    championList.sort((a, b) => {
        return a.koreanName < b.koreanName ? -1 : a.koreanName > b.koreanName ? 1 : 0;
    });
    championBox.replaceChildren()
    renderChampionBoxUI();
}

function onClickCostButton() {
    championList.sort((a, b) => a.cost - b.cost);
    championBox.replaceChildren()
    renderChampionBoxUI();
}

function onClickLineButton() {
    championBox.replaceChildren()
    renderChampionBoxLineUI()
}

function onClickJobButton() {
    championBox.replaceChildren()
    renderChampionBoxJobUI()
}

function renderChampionBoxLineUI(){
    for (let i = 0; i < lineBox.length; i++) {
        const lineTab = document.createElement('div');
        lineTab.className = 'lineTab';
        lineTab.id = lineBox[i]
        lineTab.textContent = lineBox[i];
        championBox.appendChild(lineTab);
    }

    for (let i = 0; i < championList.length; i++) {
        for (let j = 0; j < championList[i].line.length; j++) {
            const champion = document.createElement('div');
            champion.id = championList[i].name;
            champion.className = 'champion';
            champion.textContent = championList[i].koreanName;
            champion.addEventListener("click", onClickChampionBoxChampion(championList[i], arrangementBox))
            const lineTabDiv = document.getElementById(championList[i].line[j])
            lineTabDiv.appendChild(champion);
        }
    }
}

function renderChampionBoxJobUI(){
    for (let i = 0; i < jobBox.length; i++) {
        const jobTab = document.createElement('div');
        jobTab.className = 'jobTab';
        jobTab.id = jobBox[i]
        jobTab.textContent = jobBox[i];
        championBox.appendChild(jobTab);
    }
    for (let i = 0; i < championList.length; i++) {
        for (let j = 0; j < championList[i].job.length; j++) {
            const champion = document.createElement('div');
            champion.id = championList[i].name;
            champion.className = 'champion';
            champion.textContent = championList[i].koreanName;
            champion.addEventListener("click", onClickChampionBoxChampion(championList[i], arrangementBox))
            const jobTabDiv = document.getElementById(championList[i].job[j])
            jobTabDiv.appendChild(champion);
        }
    }
}
renderChampionBoxUI()

document.getElementById("nameButton").addEventListener('click', onClickNameButton);
document.getElementById("costButton").addEventListener('click', onClickCostButton);
document.getElementById("jobButton").addEventListener('click', onClickLineButton);
document.getElementById("lineButton").addEventListener('click', onClickJobButton);