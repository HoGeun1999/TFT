import championList from './tftChampionObject.js';
console.log(championList)
const championDiv = {}

for(let i=0;i<championList.length;i++){
    const champion = document.createElement('div');
    champion.id = championList[i].name
    champion.className = 'champion'
    champion.textContent = championList[i].koreanName
    championDiv[championList[i].name] = champion
    const championBox = document.querySelector('#championBox')
    championBox.appendChild(champion)

    document.getElementById(championList[i].name).style.marginLeft = String(10+60*(i%8)) +'px'
    
    document.getElementById(championList[i].name).style.marginTop = String(10+60*(parseInt(i/8))) +'px'
}
