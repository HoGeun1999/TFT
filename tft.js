import championList from './tftChampionObject.js';
import lineSynergyData from './tftSynergyObject.js';
// import lineSynergyEffect from './tftSynergyObject.js';
const championDic = {}
const championBox = document.querySelector('#championBox');
const arrangementBox = document.querySelector('#arrangementBox')
const SynergyBox = document.querySelector('#SynergyBox')
const inputText = document.querySelector('#search')
const htmpWrap = document.querySelector('#wrap')
let SynergyTabCheck = {}
let SynergyTab = {}
const lineBox = ['공허', '그림자군도', '녹서스', '다르킨', '데마시아', '방랑자', '슈리마', '아이오니아', '요들', '자운', '타곤', '프렐요드', '필트오버']
const jobBox = ['구원자', '기원자', '난동꾼', '도전자', '마법사', '발명의대가', '백발백중', '불한당', '사수', '여제', '연쇄마법사', '요새', '전쟁기계', '책략가', '학살자']
let arrangementData = [];
let searchInputText = ''
let selectedChampionButton = 'nameButton'
let uniqueIdentifier = 0

for (let i = 0; i < championList.length; i++) {
    championDic[championList[i].koreanName] = championList[i]
}
function SynergyTabCheckReset(){
    for(let i = 0; i < championList.length; i++){
        SynergyTabCheck[championList[i].koreanName] = 0
    }
}


function searchChampionBox(){
    searchInputText = document.getElementById('search').value;
    if(selectedChampionButton === 'nameButton'){
        championBox.replaceChildren()
        renderChampionBoxUI()
    }
    else if(selectedChampionButton === 'costButton'){
        championBox.replaceChildren()
        renderChampionBoxUI()
    }
    else if(selectedChampionButton === 'lineButton'){
        championBox.replaceChildren()
        renderChampionBoxLineUI()
    }
    else if(selectedChampionButton === 'jobButton'){
        championBox.replaceChildren()
        renderChampionBoxJobUI()
    }

}

function onClickArrangementBoxChampionClone(championObject) {
    return () => {
        
        for (let i = 0; i < arrangementData.length; i++) {
            if (arrangementData[i][0].name === championObject[0].name && arrangementData[i][1] === championObject[1]) {
                arrangementData.splice(i, 1);
                i--;
                break
            }
        }
        if(SynergyTabCheck[championObject[0].koreanName] === 1){
            for (let x = 0; x < championObject[0].line.length; x++)
                if (SynergyTab[championObject[0].line[x]] !== 0)
                    SynergyTab[championObject[0].line[x]] = SynergyTab[championObject[0].line[x]] - 1
            for (let x = 0; x < championObject[0].job.length; x++)
                if (SynergyTab[championObject[0].job[x]] !== 0)
                    SynergyTab[championObject[0].job[x]] = SynergyTab[championObject[0].job[x]] - 1
            
        }
        SynergyTabCheck[championObject[0].koreanName] = SynergyTabCheck[championObject[0].koreanName] - 1
        renderArrangementBoxUI(arrangementData);
        renderSynergyBoxUI(SynergyTab);
    }
}

function renderArrangementBoxUI(arrangementData) {
    arrangementBox.replaceChildren()
    for (const championObject of arrangementData) {
        const championClone = document.createElement('div');
        championClone.className = 'clone';
        championClone.id = championObject[0].koreanName;
        championClone.textContent = championObject[0].koreanName;
        championClone.addEventListener("click", onClickArrangementBoxChampionClone(championObject));

        arrangementBox.appendChild(championClone);
    }
}

function updateSynergyData(championObject) {
    if (SynergyTabCheck[championObject.koreanName] === 0) {
        for (let j = 0; j < championObject.line.length; j++) {
            if (!(championObject.line[j] in SynergyTab))
                SynergyTab[championObject.line[j]] = 1
            else
                SynergyTab[championObject.line[j]] = SynergyTab[championObject.line[j]] + 1
        }
        for (let j = 0; j < championObject.job.length; j++) {
            if (!(championObject.job[j] in SynergyTab))
                SynergyTab[championObject.job[j]] = 1
            else
                SynergyTab[championObject.job[j]] = SynergyTab[championObject.job[j]] + 1
        }
        SynergyTabCheck[championObject.koreanName] = SynergyTabCheck[championObject.koreanName] + 1
    }
    else{
        SynergyTabCheck[championObject.koreanName] = SynergyTabCheck[championObject.koreanName] + 1
    }
}

function renderSynergyBoxUI(SynergyTab) {
    const SynergyKeys = Object.keys(SynergyTab)
    SynergyBox.replaceChildren()
    for (let y = 0; y < SynergyKeys.length; y++) {
        const SynergyDiv = document.createElement('div')
        SynergyDiv.className = 'synergy'
        SynergyDiv.id = SynergyKeys[y] + 'synergy'
        let SynergyText = ''
        if (SynergyTab[SynergyKeys[y]] !== 0)
            SynergyText = SynergyKeys[y] + ':' + SynergyTab[SynergyKeys[y]]
        SynergyDiv.textContent = SynergyText
        SynergyBox.appendChild(SynergyDiv)
        // SynergyDiv.addEventListener('mouseenter', renderSynergyExplationBox(SynergyKeys[y],SynergyDiv))
        const synergyExplanationBox = document.createElement('div')
        SynergyDiv.addEventListener('mouseenter', () => {
            if(lineBox.includes(SynergyKeys[y])){
                const synergyExplanationBoxId = SynergyKeys[y] + 'synergyExplanationBox'
                synergyExplanationBox.id = synergyExplanationBoxId
                synergyExplanationBox.textContent = lineSynergyData[SynergyKeys[y]][3]
                htmpWrap.appendChild(synergyExplanationBox)
                let rect = SynergyDiv.getBoundingClientRect();
                console.log("x: "+ rect.x); 
                console.log("y: "+ rect.y);
                document.getElementById(synergyExplanationBoxId).style.background = 'blue';
                document.getElementById(synergyExplanationBoxId).style.position = 'alsolute';
                document.getElementById(synergyExplanationBoxId).style.left = rect.x;
            }
        });
        SynergyDiv.addEventListener('mouseleave', () => {
            htmpWrap.removeChild(synergyExplanationBox)
        });
    }
}

// function renderSynergyExplationBox(lineOrJob,SynergyDiv){
//     console.log(1000)
//     if(lineBox.includes(lineOrJob)){
//         const synergyExplanationBox = document.createElement('div')
//         const synergyExplanationBoxId = lineOrJob + 'synergyExplanationBox'
//         synergyExplanationBox.id = synergyExplanationBoxId
//         synergyExplanationBox.textContent = lineSynergyData[lineOrJob][3]
//         htmpWrap.appendChild(synergyExplanationBox)
//         let rect = SynergyDiv.getBoundingClientRect();
//         console.log("x: "+ rect.x);
//         console.log("y: "+ rect.y);
//         document.getElementById(synergyExplanationBoxId).style.background = 'blue';
//         document.getElementById(synergyExplanationBoxId).style.left = rect.x;
//     }
// }

function renderChampionBoxUI() {
    const searchInputTextFilterChampion = []
    for (let i = 0; i < championList.length; i++){
        if (championList[i].koreanName.startsWith(searchInputText)){
            searchInputTextFilterChampion.push(championList[i])
        }
    }
    for (let i = 0; i < searchInputTextFilterChampion.length; i++) {
        const champion = document.createElement('div');
        champion.id = searchInputTextFilterChampion[i].name;
        champion.className = 'champion';
        champion.textContent = searchInputTextFilterChampion[i].koreanName;
        champion.addEventListener("click", onClickChampionBoxChampion(searchInputTextFilterChampion[i]))
        championBox.appendChild(champion);
    }

}
function onClickChampionBoxChampion(championObject) {
    return () => {
        uniqueIdentifier = uniqueIdentifier + 1
        arrangementData.push([championObject,uniqueIdentifier]);
        updateSynergyData(championObject);
        renderArrangementBoxUI(arrangementData);
        renderSynergyBoxUI(SynergyTab);
    }
}


function onClickNameButton() {
    selectedChampionButton = 'nameButton'
    championList.sort((a, b) => {
        return a.koreanName < b.koreanName ? -1 : a.koreanName > b.koreanName ? 1 : 0;
    });
    championBox.replaceChildren()
    renderChampionBoxUI();

}

function onClickCostButton() {
    selectedChampionButton = 'costButton'
    championList.sort((a, b) => a.cost - b.cost);
    championBox.replaceChildren()
    renderChampionBoxUI();

}

function onClickLineButton() {
    selectedChampionButton = 'lineButton'
    championBox.replaceChildren()
    renderChampionBoxLineUI()
}

function onClickJobButton() {
    selectedChampionButton = 'jobButton'
    championBox.replaceChildren()
    renderChampionBoxJobUI()
}

function   renderChampionBoxLineUI() {
    const searchInputTextFilterChampion = []
    const newlineBox = new Set()
    for (let i = 0; i < championList.length; i++){
        if (championList[i].koreanName.startsWith(searchInputText)){
            searchInputTextFilterChampion.push(championList[i])
            for(let j = 0; j < championList[i].line.length; j++){
                newlineBox.add(championList[i].line[j])
            }
        }
    }
    const newlineBoxtoArray = [...newlineBox]
    newlineBoxtoArray.sort(function(a,b){
        return a.localeCompare(b);
    })
    for (let i = 0; i < newlineBoxtoArray.length; i++) {
        const lineTab = document.createElement('div');
        lineTab.className = 'lineTab';
        lineTab.id = newlineBoxtoArray[i];
        lineTab.textContent = newlineBoxtoArray[i];
        championBox.appendChild(lineTab);
    }

    for (let i = 0; i < searchInputTextFilterChampion.length; i++) {
        for (let j = 0; j < searchInputTextFilterChampion[i].line.length; j++) {
            const champion = document.createElement('div');
            champion.id = searchInputTextFilterChampion[i].name;
            champion.className = 'champion';
            champion.textContent = searchInputTextFilterChampion[i].koreanName;
            champion.addEventListener("click", onClickChampionBoxChampion(searchInputTextFilterChampion[i]))
            const lineTabDiv = document.getElementById(searchInputTextFilterChampion[i].line[j])
            lineTabDiv.appendChild(champion);
        }
    }
}

function renderChampionBoxJobUI() {
    const searchInputTextFilterChampion = []
    const newJobBox = new Set()
    for (let i = 0; i < championList.length; i++){
        if (championList[i].koreanName.startsWith(searchInputText)){
            searchInputTextFilterChampion.push(championList[i])
            for(let j = 0; j < championList[i].job.length; j++){
                newJobBox.add(championList[i].job[j])
            }
        }
    }
    const newJobBoxtoArray = [...newJobBox]
    newJobBoxtoArray.sort(function(a,b){
        return a.localeCompare(b);
    })
    for (let i = 0; i < newJobBoxtoArray.length; i++) {
        const jobTab = document.createElement('div');
        jobTab.className = 'jobTab';
        jobTab.id = newJobBoxtoArray[i]
        jobTab.textContent = newJobBoxtoArray[i];
        championBox.appendChild(jobTab);
    }

    for (let i = 0; i < searchInputTextFilterChampion.length; i++) {
        for (let j = 0; j < searchInputTextFilterChampion[i].job.length; j++) {
            const champion = document.createElement('div');
            champion.id = searchInputTextFilterChampion[i].name;
            champion.className = 'champion';
            champion.textContent = searchInputTextFilterChampion[i].koreanName;
            champion.addEventListener("click", onClickChampionBoxChampion(searchInputTextFilterChampion[i]))
            const jobTabDiv = document.getElementById(searchInputTextFilterChampion[i].job[j])
            jobTabDiv.appendChild(champion);
        }
    }
}

function onClickClearButton() {
    arrangementData = []    
    SynergyTabCheckReset()
    SynergyTab = {}
    renderSynergyBoxUI(SynergyTab)
    renderArrangementBoxUI(arrangementData)
}


SynergyTabCheckReset()
renderChampionBoxUI()

document.getElementById("nameButton").addEventListener('click', onClickNameButton);
document.getElementById("costButton").addEventListener('click', onClickCostButton);
document.getElementById("lineButton").addEventListener('click', onClickLineButton);
document.getElementById("jobButton").addEventListener('click', onClickJobButton);
document.getElementById("clear").addEventListener('click', onClickClearButton);
inputText.addEventListener('input',searchChampionBox)