import championList from './tftChampionObject.js';
import {lineSynergyData,lineSynergyEffect,jobSynergyData,jobSynergyEffect,lineBoxEnglish,jobBoxEnglish} from './tftSynergyObject.js';
import deck from './tftRecommendDeck.js';
const championDic = {}
const championBox = document.querySelector('#championBox');
const arrangementBox = document.querySelector('#arrangementBox')
const synergyBox = document.querySelector('#SynergyBox')
const inputText = document.querySelector('#search')
const recommendBox = document.querySelector('#recommendChampion')
const htmpWrap = document.querySelector('#wrap')
let SynergyTabCheck = {}
let SynergyTab = {}
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
        renderrecommendBoxUI(arrangementData)
    }
}

function renderArrangementBoxUI(arrangementData) {
    arrangementBox.replaceChildren()  
    for (const championObject of arrangementData) {
        const championClone = document.createElement('div');
        const championWrap = document.createElement('div');
        const championImg = document.createComment('div');
        championImg.className = 'img';
        championWrap.className = 'championWrap';
        championClone.className = 'championText';
        championClone.id = championObject[0].koreanName; 
        championClone.textContent = championObject[0].koreanName;
        const bgImg = new Image()
        bgImg.className = 'championImg'
        bgImg.src = "https://ddragon.leagueoflegends.com/cdn/13.13.1/img/champion/" + championObject[0].name + '.png'
        championWrap.addEventListener("click", onClickArrangementBoxChampionClone(championObject));
        championWrap.appendChild(bgImg)
        championWrap.appendChild(championClone)
        arrangementBox.appendChild(championWrap);
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

function updateAtivationLevel(synergyData,key,synergyKeySort,synergyTab){
    let avtivationSynergyLv = 0
    if(Object.keys(synergyData).includes(key)){
        for(let i = 0; i < Object.keys(synergyData[key]).length; i++){                  
            if(i === Object.keys(synergyData[key]).length -1){
                avtivationSynergyLv = i
                break
            }
            if(synergyTab[key] < Object.keys(synergyData[key])[i]){
                avtivationSynergyLv = i
                break
            }
        }
        synergyKeySort.push([avtivationSynergyLv,synergyTab[key],key])
    }        

}

function renderSynergyBoxUI(synergyTab) {
    const synergyKey = Object.keys(synergyTab)
    const synergyKeySort = []
    for(let j = 0; j <synergyKey.length; j++){
        const key = synergyKey[j]
        updateAtivationLevel(lineSynergyData,key,synergyKeySort,synergyTab)
        updateAtivationLevel(jobSynergyData,key,synergyKeySort,synergyTab)
    }
    synergyKeySort.sort((prev, cur) => {  
        if (prev[0] < cur[0]) return 1;
        if (prev[0] > cur[0]) return -1;
      });

    const synergyKeys = []
    for(let i = 0; i <synergyKeySort.length; i++){
        synergyKeys.push(synergyKeySort[i][2])
    }
    
    synergyBox.replaceChildren() 
    for (let y = 0; y < synergyKeys.length; y++) {
        if (synergyTab[synergyKeys[y]] === 0){
            continue
        }
        const synergyDiv = document.createElement('div')
        synergyDiv.className = 'synergyDiv'
        const synergyTextDiv = document.createElement('div')
        const synergyTextCountDiv = document.createElement('div')    
        if (synergyTab[synergyKeys[y]] !== 0){
            if(Object.keys(lineSynergyData).includes(synergyKeys[y])){
                for(let i = 0; i < Object.keys(lineSynergyData[synergyKeys[y]]).length; i++){                    
                    if(i === Object.keys(lineSynergyData[synergyKeys[y]]).length -1){
                        synergyTextDiv.textContent = synergyKeys[y]
                        synergyTextCountDiv.textContent = synergyTab[synergyKeys[y]] + '/' + Object.keys(lineSynergyData[synergyKeys[y]])[i]
                        break
                    }
                    if(synergyTab[synergyKeys[y]] < Object.keys(lineSynergyData[synergyKeys[y]])[i]){
                        synergyTextDiv.textContent = synergyKeys[y]
                        synergyTextCountDiv.textContent = synergyTab[synergyKeys[y]] + '/' + Object.keys(lineSynergyData[synergyKeys[y]])[i]
                        break
                    }
                }
                const textDiv = document.createElement('div')
                const synergyBoxImgDiv = document.createElement('div')
                const img = new Image()
                img.className = 'synergyBoxImg'
                img.src = 'tft-trait/Trait_Icon_9_' + lineBoxEnglish[synergyKeys[y]] + '.TFT_Set9.png'     
                synergyBoxImgDiv.appendChild(img)
                textDiv.appendChild(synergyTextDiv)   
                textDiv.appendChild(synergyTextCountDiv)
                synergyDiv.appendChild(synergyBoxImgDiv)
                synergyDiv.append(textDiv)
                synergyBox.appendChild(synergyDiv)
            }
   
            if(Object.keys(jobSynergyData).includes(synergyKeys[y])){
                for(let i = 0; i < Object.keys(jobSynergyData[synergyKeys[y]]).length; i++){
                    if(i === Object.keys(jobSynergyData[synergyKeys[y]]).length -1){
                        synergyTextDiv.textContent = synergyKeys[y]
                        synergyTextCountDiv.textContent = synergyTab[synergyKeys[y]] + '/' + Object.keys(jobSynergyData[synergyKeys[y]])[i]
                        break
                    }
                    if(synergyTab[synergyKeys[y]] < Object.keys(jobSynergyData[synergyKeys[y]])[i]){
                        synergyTextDiv.textContent = synergyKeys[y]
                        synergyTextCountDiv.textContent = synergyTab[synergyKeys[y]] + '/' + Object.keys(jobSynergyData[synergyKeys[y]])[i]
                        break
                    }
                }
                const textDiv = document.createElement('div')
                const synergyBoxImgDiv = document.createElement('div')
                const img = new Image()
                img.className = 'synergyBoxImg'
                img.src = 'tft-trait/Trait_Icon_9_' + jobBoxEnglish[synergyKeys[y]] + '.TFT_Set9.png'     
                synergyBoxImgDiv.appendChild(img)
                textDiv.appendChild(synergyTextDiv)   
                textDiv.appendChild(synergyTextCountDiv)
                synergyDiv.appendChild(synergyBoxImgDiv)
                synergyDiv.append(textDiv)
                synergyBox.appendChild(synergyDiv)
            }
        }
    

        const synergyExplanationBox = document.createElement('div')
        synergyDiv.addEventListener('mouseenter', () => {
            let rect = synergyDiv.getBoundingClientRect();
            let height = rect.y + 57
            let text = ''
            if(Object.keys(lineBoxEnglish).includes(synergyKeys[y])){
                const synergyExplanationBoxId = synergyKeys[y] + 'synergyExplanationBox'
                synergyExplanationBox.id = synergyExplanationBoxId
                synergyExplanationBox.className = 'synergyExplanation'
                text = lineSynergyEffect[synergyKeys[y]] +'\n'
                for(const synergyObjectKey of Object.keys(lineSynergyData[synergyKeys[y]])){
                    text = text + '(' + synergyObjectKey + ')' + lineSynergyData[synergyKeys[y]][synergyObjectKey] + '\n'    
                }
                synergyExplanationBox.textContent = text;
                synergyExplanationBox.style.top = height;
                synergyBox.appendChild(synergyExplanationBox)

            }
            if(Object.keys(jobBoxEnglish).includes(synergyKeys[y])){
                const synergyExplanationBoxId = synergyKeys[y] + 'synergyExplanationBox'
                synergyExplanationBox.id = synergyExplanationBoxId
                synergyExplanationBox.className = 'synergyExplanation'
                text = jobSynergyEffect[synergyKeys[y]] +'\n'
                for(const synergyObjectKey of Object.keys(jobSynergyData[synergyKeys[y]])){
                    text = text + '(' + synergyObjectKey + ')' +jobSynergyData[synergyKeys[y]][synergyObjectKey] + '\n'    
                }
                synergyExplanationBox.textContent = text;
                synergyExplanationBox.style.top = height;
                synergyBox.appendChild(synergyExplanationBox)
            }
        });
        synergyDiv.addEventListener('mouseleave', () => {
            synergyBox.removeChild(synergyExplanationBox)

        });
    }
}

function renderrecommendBoxUI(arrangementData){
    recommendBox.replaceChildren()
    const arrangementChampionSet = new Set()
    for(let i = 0; i < arrangementData.length; i++){
        arrangementChampionSet.add(arrangementData[i][0].koreanName)
    }
    const arrangementChampion = Array.from(arrangementChampionSet)
    if(arrangementChampion.length < 3){
        return
    }
    for (let i = 0; i < deck.length; i++){
        let count = 0
        for(let j = 0; j < arrangementChampion.length; j ++){
            if(deck[i].deckList.includes(arrangementChampion[j])){
                count = count + 1
            }       
        }        
        if(count > 3){
            const recommendDeckName = document.createElement('div')
            recommendDeckName.className = 'lineTab'
            recommendDeckName.textContent = deck[i].deckName
            recommendBox.appendChild(recommendDeckName)
            for(const champion of deck[i].deckList){
                if(arrangementChampion.includes(champion)){
                    const championImgDiv = championImgDivMake(championDic[champion])
                    recommendDeckName.appendChild(championImgDiv)
                    recommendBox.appendChild(championImgDiv)
                }
                else{
                    const championImgDiv = championImgDivMake(championDic[champion])
                    recommendDeckName.appendChild(championImgDiv)
                    recommendBox.appendChild(championImgDiv)
                    championImgDiv.style.opacity = 0.5;
                }
            }
        } 
    }
}

function championImgDivMake(champion){
    const championWrap = document.createElement('div')
    championWrap.className = 'championWrap'
    const ChampionImg = document.createElement('div')
    ChampionImg.className = 'img'
    const bgImg = new Image()
    bgImg.className = 'championImg'
    bgImg.src = "https://ddragon.leagueoflegends.com/cdn/13.13.1/img/champion/" + champion.name + '.png'
    const ChampionText = document.createElement('div')
    ChampionText.className = 'championText'
    ChampionText.textContent = champion.koreanName
    ChampionImg.appendChild(bgImg)
    championWrap.appendChild(ChampionImg)
    championWrap.appendChild(ChampionText)
    return championWrap
}

function renderChampionBoxUI() {
    const searchInputTextFilterChampion = []
    for (let i = 0; i < championList.length; i++){
        if (championList[i].koreanName.startsWith(searchInputText)){
            searchInputTextFilterChampion.push(championList[i])
        }
    }
    for (let i = 0; i < searchInputTextFilterChampion.length; i++) {
        const championWrap = championImgDivMake(searchInputTextFilterChampion[i])
        championWrap.addEventListener("click", onClickChampionBoxChampion(searchInputTextFilterChampion[i]))
        championBox.appendChild(championWrap);
    }

}
function onClickChampionBoxChampion(championObject) {
    return () => {
        uniqueIdentifier = uniqueIdentifier + 1
        arrangementData.push([championObject,uniqueIdentifier]);
        updateSynergyData(championObject);
        renderArrangementBoxUI(arrangementData);
        renderSynergyBoxUI(SynergyTab);
        renderrecommendBoxUI(arrangementData)
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

function renderChampionBoxLineUI() {
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
        const lineTabText = document.createElement('div')
        lineTabText.className = 'synergyTabText'
        lineTabText.textContent = newlineBoxtoArray[i];
        const lineTabWrap = document.createElement('div');
        const synergyImg = new Image()
        const synergyImgDiv = document.createElement('div');
        synergyImg.className = 'synergyImg';
        synergyImg.src = 'tft-trait/Trait_Icon_9_' + lineBoxEnglish[newlineBoxtoArray[i]] + '.TFT_Set9.png'
        lineTab.className = 'lineTab';
        synergyImgDiv.className = 'synergyImgDiv'
        lineTabWrap.id = newlineBoxtoArray[i];
        synergyImgDiv.appendChild(synergyImg) 
        lineTab.appendChild(synergyImgDiv)
        lineTab.appendChild(lineTabText)
        lineTabWrap.appendChild(lineTab);
        championBox.appendChild(lineTabWrap);
    }


    for (let i = 0; i < searchInputTextFilterChampion.length; i++) {
        for (let j = 0; j < searchInputTextFilterChampion[i].line.length; j++) {
            const championWrap = championImgDivMake(searchInputTextFilterChampion[i])
            championWrap.addEventListener("click", onClickChampionBoxChampion(searchInputTextFilterChampion[i])) 
            const lineTabDiv = document.getElementById(searchInputTextFilterChampion[i].line[j])
            lineTabDiv.appendChild(championWrap);
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
        const jobTabText = document.createElement('div')
        jobTabText.className = 'synergyTabText'
        jobTabText.textContent = newJobBoxtoArray[i];
        const jobTabWrap = document.createElement('div');
        const synergyImg = new Image()
        const synergyImgDiv = document.createElement('div');
        synergyImg.className = 'synergyImg';
        synergyImg.src = 'tft-trait/Trait_Icon_9_' + jobBoxEnglish[newJobBoxtoArray[i]] + '.TFT_Set9.png'
        jobTab.className = 'jobTab';
        synergyImgDiv.className = 'synergyImgDiv'
        jobTabWrap.id = newJobBoxtoArray[i];
        synergyImgDiv.appendChild(synergyImg)
        jobTab.appendChild(synergyImgDiv)
        jobTab.appendChild(jobTabText)
        jobTabWrap.appendChild(jobTab);
        championBox.appendChild(jobTabWrap);
    }

    for (let i = 0; i < searchInputTextFilterChampion.length; i++) {
        for (let j = 0; j < searchInputTextFilterChampion[i].job.length; j++) {
            const championWrap = championImgDivMake(searchInputTextFilterChampion[i])
            championWrap.addEventListener("click", onClickChampionBoxChampion(searchInputTextFilterChampion[i]))
            const jobTabDiv = document.getElementById(searchInputTextFilterChampion[i].job[j])
            jobTabDiv.appendChild(championWrap);
        }
    }
}

function onClickClearButton() {
    arrangementData = []    
    SynergyTabCheckReset()
    SynergyTab = {}
    renderSynergyBoxUI(SynergyTab)
    renderArrangementBoxUI(arrangementData)
    renderrecommendBoxUI(arrangementData)
}


SynergyTabCheckReset()
renderChampionBoxUI()

document.getElementById("nameButton").addEventListener('click', onClickNameButton);
document.getElementById("costButton").addEventListener('click', onClickCostButton);
document.getElementById("lineButton").addEventListener('click', onClickLineButton);
document.getElementById("jobButton").addEventListener('click', onClickJobButton);
document.getElementById("clear").addEventListener('click', onClickClearButton);
inputText.addEventListener('input',searchChampionBox)