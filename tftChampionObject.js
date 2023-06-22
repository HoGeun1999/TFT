const championList = [
{
    name: 'garen',
    koreanName: '가렌',
    cost: 3,
    line: '데마시아',
    job: '전쟁기계'
},
{
    name: 'galio',
    koreanName: '갈리오',
    cost: 2,
    line: '데마시아',
    job: '기원자'
},
{
    name: 'gwen',
    koreanName: '그웬',
    cost: 4,
    line: '그림자군도',
    job: '학살자'
},
{
    name: 'nasus',
    koreanName: '나서스',
    cost: 4,
    line: '슈리마',
    job: '전쟁기계'
},
{
    name: 'darius',
    koreanName: '다리우스',
    cost: 3,
    line: '녹서스',
    job: '전쟁기계'
},
{
    name: 'ryze',
    koreanName: '라이즈',
    cost: 5,
    line: '방랑자',
    job: '기원자'
},
{
    name: 'rux',
    koreanName: '럭스',
    cost: 4,
    line: '데마시아',
    job: '마법사'
},
{
    name: 'renekton',
    koreanName: '레넥톤',
    cost: 1,
    line: '슈리마',
    job: '난동꾼' 
},
{
    name: 'reksai',
    koreanName: '렉사이',
    cost: 3,
    line: '공허',
    job: '난동꾼'
},
{
    name: 'lissandre',
    koreanName: '리산드라',
    cost: 3,
    line: '프렐요드',
    job: '기원자'
},
{
    name: 'maokai',
    koreanName: '마오카이',
    cost: 1,
    line: '그림자군도',
    job: '요새'
},
{
    name: 'malzahar',
    koreanName: '말자하',
    cost: 1,
    line: '공허',
    job: '마법사'
},
{
    name: 'vi',
    koreanName: '바이',
    cost: 2,
    line: '필트오버',
    job: '난동꾼'
},
{
    name: 'belveth',
    koreanName: '벨베스',
    cost: 5,
    line: '공허',
    job: '여제'
},
{
    name: 'velkoz',
    koreanName: '벨코즈',
    cost: 3,
    line: '공허',
    job: ['마법사','연쇄마법사']
},
{
    name: 'viego',
    koreanName: '비에고',
    cost: 1,
    line: '그림자군도',
    job: '불한당'
},
{
    name: 'poppy',
    koreanName: '뽀삐',
    cost: 1,
    line: ['요들','데마시아'],
    job: '요새'
},
{
    name: 'sion',
    koreanName: '사이온',
    cost: 5,
    line: '녹서스',
    job: '난동꾼'
},
{
    name: 'senna',
    koreanName: '세나',
    cost: 5,
    line: '그림자군도',
    job: '사수'
},
{
    name: 'sejuani',
    koreanName: '세주아니',
    cost: 4,
    line: '프렐요드',
    job: '난동꾼'
},
{
    name: 'sett',
    koreanName: '세트',
    cost: 2,
    line: '아이오니아',
    job: '전쟁기계'
},
{
    name: 'sona',
    koreanName: '소나',
    cost: 3,
    line: '데마시아',
    job: '연쇄마법사'
},
{
    name: 'soraka',
    koreanName: '소라카',
    cost: 2,
    line: '타곤',
    job: '기원자'
},
{
    name: 'shen',
    koreanName: '쉔',
    cost: 4,
    line: '아이오니아',
    job: ['기원자','요새']
},
{
    name: 'swain',
    koreanName: '스웨인',
    cost: 2,
    line: '녹서스',
    job: ['마법사','책략가']
},
{
    name: 'ahri',
    koreanName: '아리',
    cost: 5,
    line: '아이오니아',
    job: '마법사'
},
{
    name: 'azir',
    koreanName: '아지르',
    cost: 4,
    line: '슈리마',
    job: '책략가'
},
{
    name: 'akshan',
    koreanName: '아크샨',
    cost: 3,
    line: '슈리마',
    job: '백발백중'
},
{
    name: 'aatrox',
    koreanName: '아트록스',
    cost: 5,
    line: '다르킨',
    job: ['전쟁기계','학살자']
},
{
    name: 'aphelios',
    koreanName: '아펠리오스',
    cost: 4,
    line: '타곤',
    job: '백발백중'
},
{
    name: 'ashe',
    koreanName: '애쉬',
    cost: 2,
    line: '프렐요드',
    job: '백발백중'
},
{
    name: 'yasuo',
    koreanName: '야스오',
    cost: 4,
    line: '아이오니아',
    job: '도전자'
},
{
    name: 'ekko',
    koreanName: '에코',
    cost: 3,
    line: ['필트오버','자운'],
    job: '불한당'
},
{
    name: 'orianna',
    koreanName: '오리아나',
    cost: 1,
    line: '필트오버',
    job: '마법사'
},
{
    name: 'urgot',
    koreanName: '우르곳',
    cost: 4,
    line: '자운',
    job: '백발백중'
},
{
    name: 'warwick',
    koreanName: '워윅',
    cost: 2,
    line: '자운',
    job: ['도전자','전쟁기계']
},
{
    name: 'irelia',
    koreanName: '이렐리아',
    cost: 1,
    line: '아이오니아',
    job: '도전자'
},
{
    name: 'jarvanIV',
    koreanName: '자르반4세',
    cost: 4,
    line: '데마시아',
    job: '책략가'
},
{
    name: 'zed',
    koreanName: '제드',
    cost: 2,
    line: '아이오니아',
    job: ['학살자','불한당']
},
{
    name: 'zeri',
    koreanName: '제리',
    cost: 4,
    line: '자운',
    job: '사수'
},
{
    name: 'jayce',
    koreanName: '제이스',
    cost: 3,
    line: '필트오버',
    job: '사수'
},
{
    name: 'jhin',
    koreanName: '진',
    cost: 1,
    line: '아이오니아',
    job: '백발백중'
},
{
    name: 'jinx',
    koreanName: '징크스',
    cost: 2,
    line: '자운',
    job: '사수'
},
{
    name: 'chogath',
    koreanName: '초가스',
    cost: 1,
    line: '공허',
    job: '난동꾼'
},
{
    name: 'karma',
    koreanName: '카르마',
    cost: 3,
    line: '아이오니아',
    job: '기원자'
},
{
    name: 'kassadin',
    koreanName: '카사딘',
    cost: 2,
    line: '공허',
    job: '요새'
},
{
    name: 'cassiopeia',
    koreanName: '카시오페아',
    cost: 1,
    line: ['녹서스','슈리마'],
    job: '기원자'
},
{
    name: 'kaisa',
    koreanName: '카이사',
    cost: 4,
    line: '공허',
    job: '도전자'
},
{
    name: 'katarina',
    koreanName: '카타리나',
    cost: 3,
    line: '녹서스',
    job: '불한당'
},
{
    name: 'kalista',
    koreanName: '칼리스타',
    cost: 3,
    line: '그림자군도',
    job: '도전자'
},
{
    name: 'kayle',
    koreanName: '케일',
    cost: 1,
    line: '데마시아',
    job: '학살자'
},
{
    name: 'ksante',
    koreanName: '크샨테',
    cost: 5,
    line: '슈리마',
    job: '요새'
},
{
    name: 'kled',
    koreanName: '클레드',
    cost: 2,
    line: ['녹서스','요들'],
    job: '학살자'
},
{
    name: 'taric',
    koreanName: '타릭',
    cost: 3,
    line: '타곤',
    job: ['마법사','요새']
},
{
    name: 'taliyah',
    koreanName: '탈리야',
    cost: 2,
    line: '슈리마',
    job: '연쇄마법사'
},
{
    name: 'tristana',
    koreanName: '트리스타나',
    cost: 1,
    line: '요들',
    job: '사수'
},
{
    name: 'teemo',
    koreanName: '티모',
    cost: 2,
    line: '요들',
    job: ['연쇄마법사','책략가']
},
{
    name: 'heimerdinger',
    koreanName: '하이머딩거',
    cost: 3,
    line: ['요들','필트오버'],
    job: ['발명의대가']
},
]

export default championList