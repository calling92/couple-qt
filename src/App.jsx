import { useState, useEffect } from "react";

// ✦ 365일 연간 부부 큐티 본문 계획표
const ANNUAL_PLAN = {
  1:[
    {day:1,book:"창세기",chapter:1,verses:"1-5",theme:"태초에 하나님이 창조하시니라",topic:"창조와 정체성"},
    {day:2,book:"창세기",chapter:1,verses:"6-13",theme:"궁창과 땅과 바다를 나누심",topic:"창조와 정체성"},
    {day:3,book:"창세기",chapter:1,verses:"14-19",theme:"빛의 근원을 만드심",topic:"창조와 정체성"},
    {day:4,book:"창세기",chapter:1,verses:"20-25",theme:"생물을 종류대로 창조하심",topic:"창조와 정체성"},
    {day:5,book:"창세기",chapter:1,verses:"26-31",theme:"하나님의 형상대로 사람을 창조하심",topic:"창조와 정체성"},
    {day:6,book:"창세기",chapter:2,verses:"1-9",theme:"안식과 에덴동산",topic:"창조와 정체성"},
    {day:7,book:"시편",chapter:8,verses:"1-9",theme:"주의 이름이 온 땅에 어찌 그리 아름다운지요",topic:"창조와 정체성"},
    {day:8,book:"창세기",chapter:2,verses:"10-17",theme:"에덴동산의 삶",topic:"창조와 정체성"},
    {day:9,book:"창세기",chapter:2,verses:"18-25",theme:"돕는 배필을 지으심",topic:"창조와 정체성"},
    {day:10,book:"시편",chapter:139,verses:"1-12",theme:"하나님이 나를 아시나이다",topic:"창조와 정체성"},
    {day:11,book:"시편",chapter:139,verses:"13-18",theme:"내 형질을 이루심",topic:"창조와 정체성"},
    {day:12,book:"이사야",chapter:43,verses:"1-7",theme:"너는 내 것이라",topic:"창조와 정체성"},
    {day:13,book:"에베소서",chapter:1,verses:"3-10",theme:"창세전에 우리를 택하심",topic:"창조와 정체성"},
    {day:14,book:"에베소서",chapter:1,verses:"11-14",theme:"기업의 보증이 되신 성령",topic:"창조와 정체성"},
    {day:15,book:"창세기",chapter:3,verses:"1-7",theme:"타락의 시작",topic:"창조와 정체성"},
    {day:16,book:"창세기",chapter:3,verses:"8-13",theme:"하나님의 물음",topic:"창조와 정체성"},
    {day:17,book:"창세기",chapter:3,verses:"14-19",theme:"심판 속의 약속",topic:"창조와 정체성"},
    {day:18,book:"창세기",chapter:3,verses:"20-24",theme:"가죽옷을 지어 입히심",topic:"창조와 정체성"},
    {day:19,book:"로마서",chapter:5,verses:"12-17",theme:"아담과 그리스도",topic:"창조와 정체성"},
    {day:20,book:"로마서",chapter:5,verses:"18-21",theme:"은혜가 더욱 넘쳤느니라",topic:"창조와 정체성"},
    {day:21,book:"고린도후서",chapter:5,verses:"14-21",theme:"새로운 피조물",topic:"창조와 정체성"},
    {day:22,book:"요한복음",chapter:1,verses:"10-18",theme:"하나님의 자녀가 되는 권세",topic:"창조와 정체성"},
    {day:23,book:"로마서",chapter:8,verses:"14-17",theme:"하나님의 자녀인 증거",topic:"창조와 정체성"},
    {day:24,book:"갈라디아서",chapter:4,verses:"4-7",theme:"아들의 영을 보내심",topic:"창조와 정체성"},
    {day:25,book:"베드로전서",chapter:2,verses:"9-10",theme:"왕 같은 제사장",topic:"창조와 정체성"},
    {day:26,book:"요한일서",chapter:3,verses:"1-3",theme:"하나님의 자녀라 일컬음을 받았도다",topic:"창조와 정체성"},
    {day:27,book:"빌립보서",chapter:3,verses:"7-11",theme:"그리스도를 아는 것의 탁월함",topic:"창조와 정체성"},
    {day:28,book:"골로새서",chapter:3,verses:"1-4",theme:"위의 것을 생각하라",topic:"창조와 정체성"},
    {day:29,book:"이사야",chapter:40,verses:"28-31",theme:"새 힘을 얻으리니",topic:"창조와 정체성"},
    {day:30,book:"예레미야",chapter:29,verses:"11-14",theme:"내가 아는 계획",topic:"창조와 정체성"},
    {day:31,book:"시편",chapter:90,verses:"12-17",theme:"우리의 날을 세는 법을 가르치소서",topic:"창조와 정체성"},
  ],
  2:[
    {day:1,book:"창세기",chapter:2,verses:"18-24",theme:"결혼을 제정하신 하나님",topic:"언약과 사랑"},
    {day:2,book:"말라기",chapter:2,verses:"13-16",theme:"여호와가 증인이 되신 언약",topic:"언약과 사랑"},
    {day:3,book:"에베소서",chapter:5,verses:"22-24",theme:"아내와 남편의 도리 I",topic:"언약과 사랑"},
    {day:4,book:"에베소서",chapter:5,verses:"25-28",theme:"아내를 사랑하라",topic:"언약과 사랑"},
    {day:5,book:"에베소서",chapter:5,verses:"29-33",theme:"한 몸의 신비",topic:"언약과 사랑"},
    {day:6,book:"골로새서",chapter:3,verses:"18-19",theme:"부부의 도리",topic:"언약과 사랑"},
    {day:7,book:"베드로전서",chapter:3,verses:"1-7",theme:"부부의 삶",topic:"언약과 사랑"},
    {day:8,book:"아가",chapter:1,verses:"1-4",theme:"사랑의 노래",topic:"언약과 사랑"},
    {day:9,book:"아가",chapter:2,verses:"10-13",theme:"일어나 함께 가자",topic:"언약과 사랑"},
    {day:10,book:"아가",chapter:8,verses:"6-7",theme:"사랑은 죽음같이 강하고",topic:"언약과 사랑"},
    {day:11,book:"호세아",chapter:2,verses:"14-20",theme:"다시 나를 내 남편이라 부르리라",topic:"언약과 사랑"},
    {day:12,book:"고린도전서",chapter:13,verses:"1-7",theme:"사랑의 정의",topic:"언약과 사랑"},
    {day:13,book:"고린도전서",chapter:13,verses:"8-13",theme:"사랑은 영원히",topic:"언약과 사랑"},
    {day:14,book:"신명기",chapter:7,verses:"7-9",theme:"오직 사랑하심으로",topic:"언약과 사랑"},
    {day:15,book:"예레미야",chapter:31,verses:"31-34",theme:"새 언약",topic:"언약과 사랑"},
    {day:16,book:"요한복음",chapter:3,verses:"16-17",theme:"하나님이 세상을 이처럼 사랑하사",topic:"언약과 사랑"},
    {day:17,book:"로마서",chapter:8,verses:"35-39",theme:"하나님의 사랑에서 끊을 수 없나니",topic:"언약과 사랑"},
    {day:18,book:"요한일서",chapter:4,verses:"7-12",theme:"사랑은 하나님께 속하였나니",topic:"언약과 사랑"},
    {day:19,book:"요한일서",chapter:4,verses:"13-21",theme:"사랑 안에 두려움이 없고",topic:"언약과 사랑"},
    {day:20,book:"시편",chapter:103,verses:"1-14",theme:"인자하심이 크시도다",topic:"언약과 사랑"},
    {day:21,book:"시편",chapter:103,verses:"15-22",theme:"영원한 인자하심",topic:"언약과 사랑"},
    {day:22,book:"마태복음",chapter:18,verses:"21-27",theme:"일곱 번을 일흔 번까지",topic:"언약과 사랑"},
    {day:23,book:"마태복음",chapter:18,verses:"28-35",theme:"용서하지 않는 자의 비유",topic:"언약과 사랑"},
    {day:24,book:"에베소서",chapter:4,verses:"29-32",theme:"서로 용서하기를",topic:"언약과 사랑"},
    {day:25,book:"골로새서",chapter:3,verses:"12-14",theme:"사랑을 더하라",topic:"언약과 사랑"},
    {day:26,book:"잠언",chapter:17,verses:"9-17",theme:"허물을 덮는 자",topic:"언약과 사랑"},
    {day:27,book:"미가",chapter:7,verses:"18-20",theme:"죄악을 사하시는 하나님",topic:"언약과 사랑"},
    {day:28,book:"요한복음",chapter:15,verses:"12-17",theme:"서로 사랑하라",topic:"언약과 사랑"},
  ],
  3:[
    {day:1,book:"잠언",chapter:15,verses:"1-4",theme:"부드러운 대답",topic:"소통과 신뢰"},
    {day:2,book:"잠언",chapter:16,verses:"20-24",theme:"선한 말은 꿀송이 같고",topic:"소통과 신뢰"},
    {day:3,book:"야고보서",chapter:1,verses:"19-21",theme:"듣기는 속히 말하기는 더디",topic:"소통과 신뢰"},
    {day:4,book:"야고보서",chapter:3,verses:"1-6",theme:"혀는 불이요",topic:"소통과 신뢰"},
    {day:5,book:"야고보서",chapter:3,verses:"7-12",theme:"같은 입에서 찬송과 저주",topic:"소통과 신뢰"},
    {day:6,book:"에베소서",chapter:4,verses:"15-16",theme:"사랑 안에서 참된 것을",topic:"소통과 신뢰"},
    {day:7,book:"에베소서",chapter:4,verses:"25-32",theme:"덕을 세우는 말",topic:"소통과 신뢰"},
    {day:8,book:"골로새서",chapter:4,verses:"2-6",theme:"소금으로 맛을 낸 말",topic:"소통과 신뢰"},
    {day:9,book:"잠언",chapter:31,verses:"10-20",theme:"현숙한 여인의 신뢰",topic:"소통과 신뢰"},
    {day:10,book:"잠언",chapter:31,verses:"21-31",theme:"그 입에는 지혜의 법이",topic:"소통과 신뢰"},
    {day:11,book:"시편",chapter:19,verses:"7-14",theme:"내 입의 말과 마음의 묵상",topic:"소통과 신뢰"},
    {day:12,book:"잠언",chapter:3,verses:"1-6",theme:"마음을 다하여 여호와를 신뢰하라",topic:"소통과 신뢰"},
    {day:13,book:"시편",chapter:37,verses:"1-9",theme:"여호와를 의뢰하라",topic:"소통과 신뢰"},
    {day:14,book:"마태복음",chapter:7,verses:"1-5",theme:"비판하지 말라",topic:"소통과 신뢰"},
    {day:15,book:"빌립보서",chapter:2,verses:"1-11",theme:"같은 마음을 품으라",topic:"소통과 신뢰"},
    {day:16,book:"로마서",chapter:12,verses:"9-18",theme:"사랑에는 거짓이 없나니",topic:"소통과 신뢰"},
    {day:17,book:"히브리서",chapter:10,verses:"23-25",theme:"서로 돌아보아 사랑과 선행을",topic:"소통과 신뢰"},
    {day:18,book:"갈라디아서",chapter:6,verses:"1-5",theme:"짐을 서로 지라",topic:"소통과 신뢰"},
    {day:19,book:"잠언",chapter:14,verses:"1-3",theme:"지혜로운 여인은 집을 세우고",topic:"소통과 신뢰"},
    {day:20,book:"시편",chapter:141,verses:"1-5",theme:"내 입에 파수꾼을 세우소서",topic:"소통과 신뢰"},
    {day:21,book:"마태복음",chapter:5,verses:"33-37",theme:"옳다 옳다 아니라 아니라",topic:"소통과 신뢰"},
    {day:22,book:"잠언",chapter:17,verses:"27-28",theme:"말을 아끼는 자",topic:"소통과 신뢰"},
    {day:23,book:"골로새서",chapter:3,verses:"12-17",theme:"사랑으로 완전하게",topic:"소통과 신뢰"},
    {day:24,book:"로마서",chapter:15,verses:"1-7",theme:"강한 자는 약한 자를 담당하라",topic:"소통과 신뢰"},
    {day:25,book:"마태복음",chapter:7,verses:"7-12",theme:"구하라 찾으라 두드리라",topic:"소통과 신뢰"},
    {day:26,book:"잠언",chapter:12,verses:"4-7",theme:"어진 여인",topic:"소통과 신뢰"},
    {day:27,book:"시편",chapter:37,verses:"23-31",theme:"의인의 발걸음",topic:"소통과 신뢰"},
    {day:28,book:"에베소서",chapter:4,verses:"1-7",theme:"부르심에 합당하게 행하라",topic:"소통과 신뢰"},
    {day:29,book:"빌립보서",chapter:2,verses:"14-18",theme:"원망과 시비가 없이",topic:"소통과 신뢰"},
    {day:30,book:"잠언",chapter:3,verses:"7-12",theme:"여호와를 경외하라",topic:"소통과 신뢰"},
    {day:31,book:"골로새서",chapter:4,verses:"5-6",theme:"외인에게 대하여 지혜롭게",topic:"소통과 신뢰"},
  ],
  4:[
    {day:1,book:"시편",chapter:22,verses:"1-11",theme:"나의 하나님 어찌 나를 버리셨나이까",topic:"고난과 부활"},
    {day:2,book:"이사야",chapter:53,verses:"1-6",theme:"그가 우리의 허물을 인하여",topic:"고난과 부활"},
    {day:3,book:"이사야",chapter:53,verses:"7-12",theme:"여호와의 뜻이 그로 말미암아",topic:"고난과 부활"},
    {day:4,book:"야고보서",chapter:1,verses:"1-8",theme:"시험을 만나거든 기쁘게 여기라",topic:"고난과 부활"},
    {day:5,book:"베드로전서",chapter:1,verses:"3-9",theme:"불로 연단하는 믿음",topic:"고난과 부활"},
    {day:6,book:"로마서",chapter:5,verses:"1-5",theme:"환난 중에도 즐거워하나니",topic:"고난과 부활"},
    {day:7,book:"로마서",chapter:8,verses:"18-25",theme:"현재의 고난은 비교할 수 없도다",topic:"고난과 부활"},
    {day:8,book:"마태복음",chapter:26,verses:"36-46",theme:"겟세마네의 기도",topic:"고난과 부활"},
    {day:9,book:"마태복음",chapter:27,verses:"45-56",theme:"십자가의 죽음",topic:"고난과 부활"},
    {day:10,book:"마태복음",chapter:28,verses:"1-10",theme:"그가 살아나셨다",topic:"고난과 부활"},
    {day:11,book:"요한복음",chapter:11,verses:"17-27",theme:"나는 부활이요 생명이니",topic:"고난과 부활"},
    {day:12,book:"요한복음",chapter:20,verses:"1-18",theme:"막달라 마리아와 부활의 주님",topic:"고난과 부활"},
    {day:13,book:"고린도전서",chapter:15,verses:"1-11",theme:"복음의 핵심",topic:"고난과 부활"},
    {day:14,book:"고린도전서",chapter:15,verses:"50-58",theme:"사망을 이기는 승리",topic:"고난과 부활"},
    {day:15,book:"빌립보서",chapter:3,verses:"10-14",theme:"그리스도를 아는 지식",topic:"고난과 부활"},
    {day:16,book:"시편",chapter:46,verses:"1-11",theme:"하나님은 우리의 피난처",topic:"고난과 부활"},
    {day:17,book:"히브리서",chapter:12,verses:"1-4",theme:"믿음의 주를 바라보자",topic:"고난과 부활"},
    {day:18,book:"히브리서",chapter:12,verses:"5-11",theme:"주께서 사랑하시는 자를 징계하시나니",topic:"고난과 부활"},
    {day:19,book:"로마서",chapter:8,verses:"28-39",theme:"모든 것이 합력하여 선을 이루느니라",topic:"고난과 부활"},
    {day:20,book:"요한복음",chapter:16,verses:"16-22",theme:"잠깐이면 나를 보리라",topic:"고난과 부활"},
    {day:21,book:"골로새서",chapter:3,verses:"1-4",theme:"위의 것을 찾으라",topic:"고난과 부활"},
    {day:22,book:"베드로전서",chapter:4,verses:"12-19",theme:"불같은 시험을 이상히 여기지 말고",topic:"고난과 부활"},
    {day:23,book:"나훔",chapter:1,verses:"7-8",theme:"여호와는 선하시도다",topic:"고난과 부활"},
    {day:24,book:"시편",chapter:22,verses:"22-31",theme:"찬양으로 마치는 시",topic:"고난과 부활"},
    {day:25,book:"고린도후서",chapter:4,verses:"16-18",theme:"날마다 새롭도다",topic:"고난과 부활"},
    {day:26,book:"야고보서",chapter:1,verses:"9-18",theme:"인내의 온전한 역사",topic:"고난과 부활"},
    {day:27,book:"로마서",chapter:8,verses:"26-27",theme:"성령이 우리의 연약함을 도우시나니",topic:"고난과 부활"},
    {day:28,book:"골로새서",chapter:2,verses:"12-15",theme:"그리스도와 함께 살리심",topic:"고난과 부활"},
    {day:29,book:"시편",chapter:30,verses:"1-12",theme:"슬픔이 변하여 기쁨이 되게 하심",topic:"고난과 부활"},
    {day:30,book:"요한복음",chapter:20,verses:"19-29",theme:"평강이 있을지어다",topic:"고난과 부활"},
  ],
  5:[
    {day:1,book:"신명기",chapter:6,verses:"4-9",theme:"네 자녀에게 부지런히 가르치라",topic:"가정과 사명"},
    {day:2,book:"시편",chapter:127,verses:"1-5",theme:"자식은 여호와의 기업",topic:"가정과 사명"},
    {day:3,book:"시편",chapter:128,verses:"1-6",theme:"복된 가정",topic:"가정과 사명"},
    {day:4,book:"에베소서",chapter:6,verses:"1-4",theme:"자녀와 부모의 도리",topic:"가정과 사명"},
    {day:5,book:"잠언",chapter:4,verses:"1-9",theme:"지혜를 얻으라",topic:"가정과 사명"},
    {day:6,book:"여호수아",chapter:24,verses:"14-15",theme:"오직 나와 내 집은 여호와를 섬기겠노라",topic:"가정과 사명"},
    {day:7,book:"룻기",chapter:1,verses:"14-18",theme:"어머니의 하나님이 나의 하나님",topic:"가정과 사명"},
    {day:8,book:"룻기",chapter:4,verses:"13-17",theme:"하나님의 섭리 속의 가정",topic:"가정과 사명"},
    {day:9,book:"마태복음",chapter:28,verses:"18-20",theme:"지상대명령",topic:"가정과 사명"},
    {day:10,book:"마태복음",chapter:5,verses:"13-16",theme:"세상의 소금과 빛",topic:"가정과 사명"},
    {day:11,book:"마태복음",chapter:5,verses:"1-12",theme:"팔복",topic:"가정과 사명"},
    {day:12,book:"마태복음",chapter:6,verses:"25-34",theme:"먼저 그의 나라를 구하라",topic:"가정과 사명"},
    {day:13,book:"갈라디아서",chapter:5,verses:"22-26",theme:"성령의 열매",topic:"가정과 사명"},
    {day:14,book:"요한복음",chapter:15,verses:"1-8",theme:"포도나무와 가지",topic:"가정과 사명"},
    {day:15,book:"요한복음",chapter:15,verses:"9-17",theme:"서로 사랑하라",topic:"가정과 사명"},
    {day:16,book:"요한복음",chapter:17,verses:"20-26",theme:"하나가 되게 하옵소서",topic:"가정과 사명"},
    {day:17,book:"디모데전서",chapter:3,verses:"1-7",theme:"가정을 잘 다스리는 지도자",topic:"가정과 사명"},
    {day:18,book:"빌립보서",chapter:1,verses:"27-30",theme:"복음에 합당하게 생활하라",topic:"가정과 사명"},
    {day:19,book:"골로새서",chapter:3,verses:"12-17",theme:"사랑으로 완전하게",topic:"가정과 사명"},
    {day:20,book:"디도서",chapter:2,verses:"1-8",theme:"건전한 교훈에 합당한 삶",topic:"가정과 사명"},
    {day:21,book:"사도행전",chapter:1,verses:"6-8",theme:"땅 끝까지 증인이 되리라",topic:"가정과 사명"},
    {day:22,book:"갈라디아서",chapter:6,verses:"7-10",theme:"심은 대로 거두리라",topic:"가정과 사명"},
    {day:23,book:"잠언",chapter:22,verses:"6",theme:"아이를 마땅히 행할 길로",topic:"가정과 사명"},
    {day:24,book:"신명기",chapter:6,verses:"10-15",theme:"여호와를 잊지 말라",topic:"가정과 사명"},
    {day:25,book:"디모데후서",chapter:3,verses:"14-17",theme:"성경은 능히 구원에 이르는 지혜가",topic:"가정과 사명"},
    {day:26,book:"베드로전서",chapter:2,verses:"11-12",theme:"나그네와 행인 같은 자",topic:"가정과 사명"},
    {day:27,book:"로마서",chapter:10,verses:"13-17",theme:"전파하는 자가 없이 어찌 들으리요",topic:"가정과 사명"},
    {day:28,book:"요한복음",chapter:17,verses:"1-5",theme:"아버지께 영광을",topic:"가정과 사명"},
    {day:29,book:"고린도전서",chapter:9,verses:"19-23",theme:"모든 것이 복음을 위함이라",topic:"가정과 사명"},
    {day:30,book:"룻기",chapter:2,verses:"1-12",theme:"보아스의 은혜",topic:"가정과 사명"},
    {day:31,book:"골로새서",chapter:3,verses:"20-21",theme:"자녀들아 부모에게 순종하라",topic:"가정과 사명"},
  ],
  6:[
    {day:1,book:"마태복음",chapter:6,verses:"5-13",theme:"주기도문",topic:"믿음과 기도"},
    {day:2,book:"누가복음",chapter:18,verses:"1-8",theme:"항상 기도하고 낙망하지 말라",topic:"믿음과 기도"},
    {day:3,book:"누가복음",chapter:18,verses:"9-14",theme:"바리새인과 세리의 기도",topic:"믿음과 기도"},
    {day:4,book:"빌립보서",chapter:4,verses:"4-7",theme:"아무 것도 염려하지 말고",topic:"믿음과 기도"},
    {day:5,book:"시편",chapter:63,verses:"1-8",theme:"새벽에 주를 찾습니다",topic:"믿음과 기도"},
    {day:6,book:"로마서",chapter:8,verses:"26-27",theme:"성령이 우리를 위하여 간구하시나니",topic:"믿음과 기도"},
    {day:7,book:"에베소서",chapter:6,verses:"18-20",theme:"항상 성령 안에서 기도하라",topic:"믿음과 기도"},
    {day:8,book:"데살로니가전서",chapter:5,verses:"16-22",theme:"쉬지 말고 기도하라",topic:"믿음과 기도"},
    {day:9,book:"야고보서",chapter:5,verses:"13-18",theme:"의인의 간구는 역사하는 힘이 크니라",topic:"믿음과 기도"},
    {day:10,book:"히브리서",chapter:11,verses:"1-6",theme:"믿음은 바라는 것들의 실상",topic:"믿음과 기도"},
    {day:11,book:"히브리서",chapter:11,verses:"7-16",theme:"믿음의 선진들",topic:"믿음과 기도"},
    {day:12,book:"히브리서",chapter:12,verses:"1-3",theme:"믿음의 주요 온전하게 하시는 이",topic:"믿음과 기도"},
    {day:13,book:"요한복음",chapter:14,verses:"1-7",theme:"내가 곧 길이요 진리요 생명이니",topic:"믿음과 기도"},
    {day:14,book:"요한복음",chapter:14,verses:"12-18",theme:"내 이름으로 구하라",topic:"믿음과 기도"},
    {day:15,book:"에베소서",chapter:2,verses:"1-10",theme:"은혜로 구원을 받았나니",topic:"믿음과 기도"},
    {day:16,book:"시편",chapter:121,verses:"1-8",theme:"나의 도움이 어디서 올까",topic:"믿음과 기도"},
    {day:17,book:"시편",chapter:62,verses:"1-8",theme:"나의 영혼이 잠잠히 하나님만 바람",topic:"믿음과 기도"},
    {day:18,book:"마가복음",chapter:11,verses:"22-26",theme:"하나님을 믿으라",topic:"믿음과 기도"},
    {day:19,book:"갈라디아서",chapter:2,verses:"20-21",theme:"내가 그리스도와 함께 십자가에",topic:"믿음과 기도"},
    {day:20,book:"요한일서",chapter:5,verses:"13-15",theme:"그 이름을 믿는 자들에게",topic:"믿음과 기도"},
    {day:21,book:"시편",chapter:5,verses:"1-8",theme:"아침의 기도",topic:"믿음과 기도"},
    {day:22,book:"요한복음",chapter:14,verses:"25-31",theme:"평안을 너희에게 끼치노라",topic:"믿음과 기도"},
    {day:23,book:"히브리서",chapter:11,verses:"32-40",theme:"더 좋은 부활을 얻고자",topic:"믿음과 기도"},
    {day:24,book:"이사야",chapter:26,verses:"3-4",theme:"주께서 심지가 견고한 자를 평강으로",topic:"믿음과 기도"},
    {day:25,book:"빌립보서",chapter:4,verses:"8-9",theme:"이것들을 생각하라",topic:"믿음과 기도"},
    {day:26,book:"골로새서",chapter:4,verses:"2-4",theme:"기도에 항상 힘쓰라",topic:"믿음과 기도"},
    {day:27,book:"시편",chapter:143,verses:"1-8",theme:"아침에 인자하심을 듣게 하소서",topic:"믿음과 기도"},
    {day:28,book:"로마서",chapter:1,verses:"16-17",theme:"복음에는 하나님의 의가",topic:"믿음과 기도"},
    {day:29,book:"마태복음",chapter:7,verses:"7-11",theme:"구하라 찾으라 두드리라",topic:"믿음과 기도"},
    {day:30,book:"히브리서",chapter:4,verses:"14-16",theme:"은혜의 보좌 앞에 담대히",topic:"믿음과 기도"},
  ],
  7:[
    {day:1,book:"잠언",chapter:1,verses:"1-7",theme:"여호와를 경외하는 것이 지식의 근본",topic:"지혜와 말씀"},
    {day:2,book:"잠언",chapter:2,verses:"1-11",theme:"지혜를 얻으면",topic:"지혜와 말씀"},
    {day:3,book:"잠언",chapter:3,verses:"13-20",theme:"지혜는 생명나무",topic:"지혜와 말씀"},
    {day:4,book:"잠언",chapter:4,verses:"20-27",theme:"마음을 지키라",topic:"지혜와 말씀"},
    {day:5,book:"전도서",chapter:3,verses:"1-8",theme:"범사에 기한이 있고",topic:"지혜와 말씀"},
    {day:6,book:"전도서",chapter:12,verses:"9-14",theme:"하나님을 경외하고 명령을 지키라",topic:"지혜와 말씀"},
    {day:7,book:"시편",chapter:1,verses:"1-6",theme:"복 있는 사람",topic:"지혜와 말씀"},
    {day:8,book:"시편",chapter:119,verses:"1-8",theme:"말씀을 지키는 복",topic:"지혜와 말씀"},
    {day:9,book:"시편",chapter:119,verses:"9-16",theme:"주의 말씀을 내 마음에 두었나이다",topic:"지혜와 말씀"},
    {day:10,book:"시편",chapter:119,verses:"105-112",theme:"말씀은 내 발의 등이요",topic:"지혜와 말씀"},
    {day:11,book:"요한복음",chapter:1,verses:"1-5",theme:"태초에 말씀이 계시니라",topic:"지혜와 말씀"},
    {day:12,book:"요한복음",chapter:1,verses:"14-18",theme:"말씀이 육신이 되어",topic:"지혜와 말씀"},
    {day:13,book:"디모데후서",chapter:3,verses:"14-17",theme:"성경은 하나님의 감동으로",topic:"지혜와 말씀"},
    {day:14,book:"히브리서",chapter:4,verses:"12-13",theme:"하나님의 말씀은 살아 있고",topic:"지혜와 말씀"},
    {day:15,book:"야고보서",chapter:1,verses:"22-25",theme:"말씀을 행하는 자가 되라",topic:"지혜와 말씀"},
    {day:16,book:"마태복음",chapter:13,verses:"1-9",theme:"씨 뿌리는 자의 비유",topic:"지혜와 말씀"},
    {day:17,book:"마태복음",chapter:13,verses:"18-23",theme:"좋은 땅에 뿌려진 자",topic:"지혜와 말씀"},
    {day:18,book:"느헤미야",chapter:8,verses:"1-12",theme:"율법책을 낭독하니라",topic:"지혜와 말씀"},
    {day:19,book:"신명기",chapter:8,verses:"1-6",theme:"사람이 떡으로만 살 것이 아니요",topic:"지혜와 말씀"},
    {day:20,book:"여호수아",chapter:1,verses:"7-9",theme:"이 율법책을 네 입에서 떠나지 말게 하라",topic:"지혜와 말씀"},
    {day:21,book:"이사야",chapter:55,verses:"8-11",theme:"내 말이 헛되이 돌아오지 않겠고",topic:"지혜와 말씀"},
    {day:22,book:"시편",chapter:33,verses:"4-12",theme:"여호와의 말씀은 정직하며",topic:"지혜와 말씀"},
    {day:23,book:"시편",chapter:19,verses:"7-14",theme:"여호와의 율법은 완전하여",topic:"지혜와 말씀"},
    {day:24,book:"잠언",chapter:8,verses:"1-11",theme:"지혜가 부르짖으며",topic:"지혜와 말씀"},
    {day:25,book:"잠언",chapter:8,verses:"22-31",theme:"창조 전에 있었던 지혜",topic:"지혜와 말씀"},
    {day:26,book:"전도서",chapter:3,verses:"9-15",theme:"하나님의 때",topic:"지혜와 말씀"},
    {day:27,book:"잠언",chapter:30,verses:"5-6",theme:"하나님의 말씀은 다 순전하며",topic:"지혜와 말씀"},
    {day:28,book:"베드로후서",chapter:1,verses:"20-21",theme:"성경의 영감",topic:"지혜와 말씀"},
    {day:29,book:"신명기",chapter:17,verses:"18-20",theme:"평생 토록 말씀을 읽으라",topic:"지혜와 말씀"},
    {day:30,book:"시편",chapter:19,verses:"1-6",theme:"하늘이 하나님의 영광을",topic:"지혜와 말씀"},
    {day:31,book:"잠언",chapter:4,verses:"1-9",theme:"지혜를 얻으라",topic:"지혜와 말씀"},
  ],
  8:[
    {day:1,book:"마태복음",chapter:20,verses:"20-28",theme:"섬기는 자가 크니라",topic:"섬김과 겸손"},
    {day:2,book:"요한복음",chapter:13,verses:"1-17",theme:"제자들의 발을 씻기심",topic:"섬김과 겸손"},
    {day:3,book:"빌립보서",chapter:2,verses:"1-11",theme:"종의 형체를 가지사",topic:"섬김과 겸손"},
    {day:4,book:"로마서",chapter:12,verses:"1-13",theme:"은사대로 섬기라",topic:"섬김과 겸손"},
    {day:5,book:"마태복음",chapter:25,verses:"31-40",theme:"지극히 작은 자에게 한 것이",topic:"섬김과 겸손"},
    {day:6,book:"미가",chapter:6,verses:"6-8",theme:"정의와 인자함과 겸손히 행하는 것",topic:"섬김과 겸손"},
    {day:7,book:"잠언",chapter:11,verses:"2-6",theme:"겸손한 자에게는 지혜가",topic:"섬김과 겸손"},
    {day:8,book:"마태복음",chapter:18,verses:"1-5",theme:"어린 아이와 같이 되지 않으면",topic:"섬김과 겸손"},
    {day:9,book:"누가복음",chapter:14,verses:"7-11",theme:"자기를 낮추는 자는 높아지리라",topic:"섬김과 겸손"},
    {day:10,book:"야고보서",chapter:4,verses:"6-10",theme:"하나님은 겸손한 자에게 은혜를",topic:"섬김과 겸손"},
    {day:11,book:"베드로전서",chapter:5,verses:"5-7",theme:"서로 겸손으로 허리를 동이라",topic:"섬김과 겸손"},
    {day:12,book:"마태복음",chapter:11,verses:"28-30",theme:"나는 마음이 온유하고 겸손하니",topic:"섬김과 겸손"},
    {day:13,book:"골로새서",chapter:3,verses:"12-14",theme:"긍휼과 자비와 겸손을 옷 입으라",topic:"섬김과 겸손"},
    {day:14,book:"고린도후서",chapter:12,verses:"9-10",theme:"약할 때 강함이라",topic:"섬김과 겸손"},
    {day:15,book:"갈라디아서",chapter:5,verses:"13-15",theme:"사랑으로 서로 종 노릇 하라",topic:"섬김과 겸손"},
    {day:16,book:"로마서",chapter:12,verses:"14-21",theme:"서로 마음을 같이하며",topic:"섬김과 겸손"},
    {day:17,book:"이사야",chapter:66,verses:"1-2",theme:"내가 돌아볼 자는 마음이 겸손한 자",topic:"섬김과 겸손"},
    {day:18,book:"시편",chapter:131,verses:"1-3",theme:"겸손한 영혼",topic:"섬김과 겸손"},
    {day:19,book:"요한복음",chapter:21,verses:"15-19",theme:"내 양을 먹이라",topic:"섬김과 겸손"},
    {day:20,book:"고린도전서",chapter:12,verses:"12-20",theme:"몸은 하나이나 지체가 많으니",topic:"섬김과 겸손"},
    {day:21,book:"마가복음",chapter:10,verses:"35-45",theme:"인자가 섬기러 왔느니라",topic:"섬김과 겸손"},
    {day:22,book:"에베소서",chapter:4,verses:"1-6",theme:"부르심에 합당하게 행하라",topic:"섬김과 겸손"},
    {day:23,book:"고린도전서",chapter:4,verses:"1-5",theme:"그리스도의 일꾼",topic:"섬김과 겸손"},
    {day:24,book:"갈라디아서",chapter:6,verses:"1-5",theme:"온유한 심령으로 바로잡고",topic:"섬김과 겸손"},
    {day:25,book:"누가복음",chapter:22,verses:"24-27",theme:"섬기는 자가 되라",topic:"섬김과 겸손"},
    {day:26,book:"잠언",chapter:16,verses:"18-20",theme:"교만은 패망의 선봉",topic:"섬김과 겸손"},
    {day:27,book:"로마서",chapter:15,verses:"1-7",theme:"강한 자는 약한 자를 담당하라",topic:"섬김과 겸손"},
    {day:28,book:"고린도전서",chapter:12,verses:"24-27",theme:"서로 돌아보라",topic:"섬김과 겸손"},
    {day:29,book:"빌립보서",chapter:2,verses:"14-18",theme:"원망과 시비가 없이",topic:"섬김과 겸손"},
    {day:30,book:"마태복음",chapter:23,verses:"11-12",theme:"너희 중에 큰 자는 섬기는 자",topic:"섬김과 겸손"},
    {day:31,book:"로마서",chapter:12,verses:"1-5",theme:"산 제사를 드리라",topic:"섬김과 겸손"},
  ],
  9:[
    {day:1,book:"사도행전",chapter:2,verses:"42-47",theme:"초대 교회의 공동체",topic:"공동체와 교회"},
    {day:2,book:"에베소서",chapter:2,verses:"19-22",theme:"하나님의 권속이라",topic:"공동체와 교회"},
    {day:3,book:"에베소서",chapter:4,verses:"11-16",theme:"몸을 자라게 하사",topic:"공동체와 교회"},
    {day:4,book:"마태복음",chapter:16,verses:"13-20",theme:"이 반석 위에 내 교회를",topic:"공동체와 교회"},
    {day:5,book:"히브리서",chapter:10,verses:"19-25",theme:"서로 돌아보아 사랑과 선행을",topic:"공동체와 교회"},
    {day:6,book:"시편",chapter:122,verses:"1-9",theme:"여호와의 집에 올라가자",topic:"공동체와 교회"},
    {day:7,book:"시편",chapter:133,verses:"1-3",theme:"형제가 연합하여 동거함이",topic:"공동체와 교회"},
    {day:8,book:"로마서",chapter:14,verses:"1-8",theme:"믿음이 연약한 자를 받으라",topic:"공동체와 교회"},
    {day:9,book:"고린도후서",chapter:8,verses:"1-9",theme:"연보의 은혜",topic:"공동체와 교회"},
    {day:10,book:"고린도후서",chapter:9,verses:"6-11",theme:"즐겨 내는 자를 사랑하시느니라",topic:"공동체와 교회"},
    {day:11,book:"갈라디아서",chapter:6,verses:"9-10",theme:"기회 있는 대로 선을 행하되",topic:"공동체와 교회"},
    {day:12,book:"골로새서",chapter:1,verses:"24-29",theme:"그리스도의 몸인 교회를 위하여",topic:"공동체와 교회"},
    {day:13,book:"요한복음",chapter:17,verses:"20-23",theme:"저희도 하나가 되게 하옵소서",topic:"공동체와 교회"},
    {day:14,book:"사도행전",chapter:4,verses:"32-37",theme:"한 마음과 한 뜻으로",topic:"공동체와 교회"},
    {day:15,book:"이사야",chapter:58,verses:"6-9",theme:"하나님이 기뻐하시는 금식",topic:"공동체와 교회"},
    {day:16,book:"아모스",chapter:5,verses:"21-24",theme:"공의를 물 같이 흘리게 하라",topic:"공동체와 교회"},
    {day:17,book:"빌립보서",chapter:4,verses:"10-19",theme:"나의 하나님이 공급하시리라",topic:"공동체와 교회"},
    {day:18,book:"히브리서",chapter:13,verses:"1-3",theme:"형제 사랑하기를 계속하라",topic:"공동체와 교회"},
    {day:19,book:"히브리서",chapter:13,verses:"15-17",theme:"선한 일을 행하고 나누어 주기를",topic:"공동체와 교회"},
    {day:20,book:"고린도전서",chapter:1,verses:"10-13",theme:"같은 마음으로 합하라",topic:"공동체와 교회"},
    {day:21,book:"에베소서",chapter:3,verses:"14-21",theme:"충만하신 이로 충만하게",topic:"공동체와 교회"},
    {day:22,book:"로마서",chapter:15,verses:"4-7",theme:"서로 받으라",topic:"공동체와 교회"},
    {day:23,book:"마태복음",chapter:18,verses:"15-20",theme:"두세 사람이 내 이름으로",topic:"공동체와 교회"},
    {day:24,book:"데살로니가전서",chapter:5,verses:"12-15",theme:"서로 화목하라",topic:"공동체와 교회"},
    {day:25,book:"고린도전서",chapter:3,verses:"9-17",theme:"하나님의 밭이요 하나님의 집이라",topic:"공동체와 교회"},
    {day:26,book:"요한삼서",chapter:1,verses:"5-8",theme:"나그네를 접대함이 옳도다",topic:"공동체와 교회"},
    {day:27,book:"요한계시록",chapter:2,verses:"1-7",theme:"에베소 교회에 주신 말씀",topic:"공동체와 교회"},
    {day:28,book:"요한계시록",chapter:3,verses:"14-22",theme:"라오디게아 교회에 주신 말씀",topic:"공동체와 교회"},
    {day:29,book:"디모데전서",chapter:3,verses:"14-16",theme:"하나님의 교회에서 어떻게 행할 것",topic:"공동체와 교회"},
    {day:30,book:"로마서",chapter:14,verses:"13-19",theme:"화평의 일과 덕을 세우는 일",topic:"공동체와 교회"},
  ],
  10:[
    {day:1,book:"시편",chapter:100,verses:"1-5",theme:"감사함으로 그 문에 들어가라",topic:"감사와 만족"},
    {day:2,book:"데살로니가전서",chapter:5,verses:"16-18",theme:"범사에 감사하라",topic:"감사와 만족"},
    {day:3,book:"빌립보서",chapter:4,verses:"10-13",theme:"자족하기를 배웠노라",topic:"감사와 만족"},
    {day:4,book:"디모데전서",chapter:6,verses:"6-10",theme:"자족하는 마음이 큰 이익이 되느니라",topic:"감사와 만족"},
    {day:5,book:"히브리서",chapter:13,verses:"5-6",theme:"있는 바를 족한 줄로 알라",topic:"감사와 만족"},
    {day:6,book:"누가복음",chapter:17,verses:"11-19",theme:"열 명 중 한 명만 돌아와",topic:"감사와 만족"},
    {day:7,book:"골로새서",chapter:3,verses:"15-17",theme:"무엇을 하든지 주 예수의 이름으로",topic:"감사와 만족"},
    {day:8,book:"시편",chapter:23,verses:"1-6",theme:"여호와는 나의 목자시니",topic:"감사와 만족"},
    {day:9,book:"시편",chapter:34,verses:"1-10",theme:"내가 여호와를 항상 송축하리로다",topic:"감사와 만족"},
    {day:10,book:"시편",chapter:103,verses:"1-14",theme:"내 영혼아 여호와를 송축하라",topic:"감사와 만족"},
    {day:11,book:"욥기",chapter:1,verses:"20-22",theme:"주신 이도 여호와시요",topic:"감사와 만족"},
    {day:12,book:"하박국",chapter:3,verses:"17-19",theme:"무화과나무가 무성치 못할지라도",topic:"감사와 만족"},
    {day:13,book:"누가복음",chapter:1,verses:"46-55",theme:"마리아의 찬양",topic:"감사와 만족"},
    {day:14,book:"이사야",chapter:12,verses:"1-6",theme:"구원의 우물에서 물을 길으리라",topic:"감사와 만족"},
    {day:15,book:"느헤미야",chapter:8,verses:"9-12",theme:"이 날의 기쁨이 너희의 힘이니라",topic:"감사와 만족"},
    {day:16,book:"로마서",chapter:11,verses:"33-36",theme:"만물이 주에게서 나와 주로 말미암고",topic:"감사와 만족"},
    {day:17,book:"신명기",chapter:8,verses:"10-18",theme:"먹고 배부른 후에 여호와를 찬송하라",topic:"감사와 만족"},
    {day:18,book:"시편",chapter:145,verses:"1-9",theme:"대대로 주의 이름을 찬양하리이다",topic:"감사와 만족"},
    {day:19,book:"시편",chapter:150,verses:"1-6",theme:"호흡이 있는 자마다 여호와를 찬양하라",topic:"감사와 만족"},
    {day:20,book:"골로새서",chapter:2,verses:"6-7",theme:"감사함을 넘치게 하라",topic:"감사와 만족"},
    {day:21,book:"고린도후서",chapter:9,verses:"12-15",theme:"감사의 제사",topic:"감사와 만족"},
    {day:22,book:"시편",chapter:107,verses:"1-9",theme:"그 인자하심이 영원함이로다",topic:"감사와 만족"},
    {day:23,book:"시편",chapter:136,verses:"1-9",theme:"인자하심이 영원함이로다",topic:"감사와 만족"},
    {day:24,book:"시편",chapter:40,verses:"1-5",theme:"새 노래를 내 입에 두셨도다",topic:"감사와 만족"},
    {day:25,book:"시편",chapter:92,verses:"1-8",theme:"감사와 찬양이 아름답도다",topic:"감사와 만족"},
    {day:26,book:"빌립보서",chapter:4,verses:"14-20",theme:"내게 능력 주시는 자 안에서",topic:"감사와 만족"},
    {day:27,book:"마태복음",chapter:6,verses:"19-24",theme:"보물을 하늘에 쌓아 두라",topic:"감사와 만족"},
    {day:28,book:"에베소서",chapter:5,verses:"15-20",theme:"시와 찬송으로 찬양하며",topic:"감사와 만족"},
    {day:29,book:"요한복음",chapter:10,verses:"10",theme:"풍성한 생명을 주려 함이라",topic:"감사와 만족"},
    {day:30,book:"시편",chapter:34,verses:"11-22",theme:"여호와를 경외하는 자에게는",topic:"감사와 만족"},
    {day:31,book:"신명기",chapter:26,verses:"10-11",theme:"기쁨으로 여호와 앞에 드리라",topic:"감사와 만족"},
  ],
  11:[
    {day:1,book:"시편",chapter:51,verses:"1-7",theme:"다윗의 회개 기도",topic:"갱신과 회복"},
    {day:2,book:"시편",chapter:51,verses:"8-17",theme:"정한 마음을 창조하소서",topic:"갱신과 회복"},
    {day:3,book:"요엘",chapter:2,verses:"12-14",theme:"마음을 다하여 내게로 돌아오라",topic:"갱신과 회복"},
    {day:4,book:"이사야",chapter:1,verses:"18-20",theme:"주홍 같을지라도 눈과 같이",topic:"갱신과 회복"},
    {day:5,book:"누가복음",chapter:15,verses:"11-19",theme:"잃은 아들의 회개",topic:"갱신과 회복"},
    {day:6,book:"누가복음",chapter:15,verses:"20-24",theme:"아버지의 달려옴",topic:"갱신과 회복"},
    {day:7,book:"누가복음",chapter:15,verses:"25-32",theme:"큰아들의 마음",topic:"갱신과 회복"},
    {day:8,book:"요한일서",chapter:1,verses:"5-10",theme:"죄를 자백하면",topic:"갱신과 회복"},
    {day:9,book:"에스겔",chapter:36,verses:"25-28",theme:"새 영을 너희 속에 두어",topic:"갱신과 회복"},
    {day:10,book:"로마서",chapter:12,verses:"1-2",theme:"마음을 새롭게 함으로 변화를 받으라",topic:"갱신과 회복"},
    {day:11,book:"고린도후서",chapter:4,verses:"16-18",theme:"날마다 새롭도다",topic:"갱신과 회복"},
    {day:12,book:"에베소서",chapter:4,verses:"22-24",theme:"새 사람을 입으라",topic:"갱신과 회복"},
    {day:13,book:"이사야",chapter:40,verses:"1-5",theme:"위로하라 위로하라",topic:"갱신과 회복"},
    {day:14,book:"이사야",chapter:55,verses:"6-9",theme:"여호와를 만날 만한 때에 찾으라",topic:"갱신과 회복"},
    {day:15,book:"요한계시록",chapter:2,verses:"4-5",theme:"처음 사랑을 회복하라",topic:"갱신과 회복"},
    {day:16,book:"요한계시록",chapter:3,verses:"15-20",theme:"문 밖에 서서 두드리노니",topic:"갱신과 회복"},
    {day:17,book:"룻기",chapter:4,verses:"14-17",theme:"회복의 하나님",topic:"갱신과 회복"},
    {day:18,book:"요나",chapter:2,verses:"1-9",theme:"물고기 뱃속의 기도",topic:"갱신과 회복"},
    {day:19,book:"시편",chapter:32,verses:"1-7",theme:"사죄의 복",topic:"갱신과 회복"},
    {day:20,book:"시편",chapter:32,verses:"8-11",theme:"내가 너를 가르쳐 인도하리라",topic:"갱신과 회복"},
    {day:21,book:"히브리서",chapter:4,verses:"14-16",theme:"은혜의 보좌 앞에 담대히",topic:"갱신과 회복"},
    {day:22,book:"호세아",chapter:6,verses:"1-3",theme:"여호와께로 돌아가자",topic:"갱신과 회복"},
    {day:23,book:"잠언",chapter:28,verses:"13-14",theme:"자복하고 버리는 자는",topic:"갱신과 회복"},
    {day:24,book:"고린도후서",chapter:7,verses:"8-11",theme:"하나님의 뜻대로 하는 근심",topic:"갱신과 회복"},
    {day:25,book:"골로새서",chapter:3,verses:"9-11",theme:"새 사람을 입었으니",topic:"갱신과 회복"},
    {day:26,book:"이사야",chapter:40,verses:"28-31",theme:"새 힘을 얻으리니",topic:"갱신과 회복"},
    {day:27,book:"베드로후서",chapter:3,verses:"8-10",theme:"아무도 멸망하지 않기를 원하사",topic:"갱신과 회복"},
    {day:28,book:"요한계시록",chapter:21,verses:"1-5",theme:"보라 내가 만물을 새롭게 하노라",topic:"갱신과 회복"},
    {day:29,book:"시편",chapter:23,verses:"1-6",theme:"회복의 목자",topic:"갱신과 회복"},
    {day:30,book:"이사야",chapter:43,verses:"18-19",theme:"새 일을 행하리니",topic:"갱신과 회복"},
  ],
  12:[
    {day:1,book:"이사야",chapter:9,verses:"2-7",theme:"한 아기가 우리에게 났고",topic:"소망과 완성"},
    {day:2,book:"이사야",chapter:11,verses:"1-9",theme:"이새의 줄기에서 나온 싹",topic:"소망과 완성"},
    {day:3,book:"이사야",chapter:40,verses:"3-8",theme:"광야에 외치는 자의 소리",topic:"소망과 완성"},
    {day:4,book:"미가",chapter:5,verses:"2-5",theme:"베들레헴에서 나올 자",topic:"소망과 완성"},
    {day:5,book:"말라기",chapter:3,verses:"1-4",theme:"내 사자를 보내리라",topic:"소망과 완성"},
    {day:6,book:"누가복음",chapter:1,verses:"26-38",theme:"수태고지",topic:"소망과 완성"},
    {day:7,book:"누가복음",chapter:1,verses:"39-45",theme:"마리아와 엘리사벳의 만남",topic:"소망과 완성"},
    {day:8,book:"누가복음",chapter:1,verses:"46-55",theme:"마리아의 찬양",topic:"소망과 완성"},
    {day:9,book:"누가복음",chapter:1,verses:"67-79",theme:"사가랴의 노래",topic:"소망과 완성"},
    {day:10,book:"마태복음",chapter:1,verses:"18-25",theme:"임마누엘 — 하나님이 우리와 함께",topic:"소망과 완성"},
    {day:11,book:"누가복음",chapter:2,verses:"1-7",theme:"구유에 뉘어 계시니라",topic:"소망과 완성"},
    {day:12,book:"누가복음",chapter:2,verses:"8-14",theme:"목자들에게 전해진 기쁜 소식",topic:"소망과 완성"},
    {day:13,book:"누가복음",chapter:2,verses:"15-20",theme:"목자들의 경배",topic:"소망과 완성"},
    {day:14,book:"마태복음",chapter:2,verses:"1-12",theme:"동방박사의 경배",topic:"소망과 완성"},
    {day:15,book:"요한복음",chapter:1,verses:"1-14",theme:"말씀이 육신이 되어 우리 가운데",topic:"소망과 완성"},
    {day:16,book:"요한복음",chapter:1,verses:"16-18",theme:"은혜 위에 은혜",topic:"소망과 완성"},
    {day:17,book:"빌립보서",chapter:2,verses:"5-11",theme:"자기를 비우사 종의 형체를",topic:"소망과 완성"},
    {day:18,book:"갈라디아서",chapter:4,verses:"4-7",theme:"때가 차매 하나님이 그 아들을",topic:"소망과 완성"},
    {day:19,book:"로마서",chapter:8,verses:"18-25",theme:"장래의 영광과 현재의 소망",topic:"소망과 완성"},
    {day:20,book:"로마서",chapter:15,verses:"13",theme:"소망의 하나님",topic:"소망과 완성"},
    {day:21,book:"고린도전서",chapter:15,verses:"50-58",theme:"사망아 너의 승리가 어디 있느냐",topic:"소망과 완성"},
    {day:22,book:"데살로니가전서",chapter:4,verses:"13-18",theme:"주 안에서 자는 자를 슬퍼하지 않음",topic:"소망과 완성"},
    {day:23,book:"데살로니가전서",chapter:5,verses:"1-11",theme:"빛의 아들들로서 깨어 있으라",topic:"소망과 완성"},
    {day:24,book:"요한계시록",chapter:21,verses:"1-7",theme:"새 하늘과 새 땅 — 성탄 전야",topic:"소망과 완성"},
    {day:25,book:"누가복음",chapter:2,verses:"1-20",theme:"기쁨의 좋은 소식 — 성탄절",topic:"소망과 완성"},
    {day:26,book:"요한계시록",chapter:21,verses:"22-27",theme:"하나님이 빛이 되시리라",topic:"소망과 완성"},
    {day:27,book:"요한계시록",chapter:22,verses:"1-5",theme:"생명수의 강",topic:"소망과 완성"},
    {day:28,book:"요한계시록",chapter:22,verses:"12-17",theme:"주 예수여 오시옵소서",topic:"소망과 완성"},
    {day:29,book:"베드로후서",chapter:3,verses:"11-14",theme:"그날을 바라보고 준비하라",topic:"소망과 완성"},
    {day:30,book:"이사야",chapter:65,verses:"17-25",theme:"새 창조의 약속",topic:"소망과 완성"},
    {day:31,book:"요한계시록",chapter:22,verses:"18-21",theme:"마라나타 — 아멘 주 예수여 오시옵소서",topic:"소망과 완성"},
  ],
};

const TOPIC_COLORS = {
  "창조와 정체성":{bg:"rgba(100,160,220,0.15)",border:"rgba(100,160,220,0.4)",text:"#7ab0e0"},
  "언약과 사랑":{bg:"rgba(220,100,150,0.15)",border:"rgba(220,100,150,0.4)",text:"#e07aa0"},
  "소통과 신뢰":{bg:"rgba(100,200,180,0.15)",border:"rgba(100,200,180,0.4)",text:"#60c8b0"},
  "고난과 부활":{bg:"rgba(200,130,80,0.15)",border:"rgba(200,130,80,0.4)",text:"#e09060"},
  "가정과 사명":{bg:"rgba(150,200,100,0.15)",border:"rgba(150,200,100,0.4)",text:"#90c860"},
  "믿음과 기도":{bg:"rgba(180,140,220,0.15)",border:"rgba(180,140,220,0.4)",text:"#b090e0"},
  "지혜와 말씀":{bg:"rgba(200,170,80,0.15)",border:"rgba(200,170,80,0.4)",text:"#c8a840"},
  "섬김과 겸손":{bg:"rgba(80,180,200,0.15)",border:"rgba(80,180,200,0.4)",text:"#50b8c8"},
  "공동체와 교회":{bg:"rgba(220,160,100,0.15)",border:"rgba(220,160,100,0.4)",text:"#e0a060"},
  "감사와 만족":{bg:"rgba(120,200,120,0.15)",border:"rgba(120,200,120,0.4)",text:"#70c870"},
  "갱신과 회복":{bg:"rgba(160,120,200,0.15)",border:"rgba(160,120,200,0.4)",text:"#a080d0"},
  "소망과 완성":{bg:"rgba(200,170,100,0.15)",border:"rgba(200,170,100,0.4)",text:"#c8aa64"},
};

const getTodayPassage = () => {
  const t = new Date(); const m = t.getMonth()+1; const d = t.getDate();
  const plan = ANNUAL_PLAN[m];
  return (plan && plan.find(p=>p.day===d)) || ANNUAL_PLAN[1][0];
};
const formatDate = () => {
  const t = new Date(); const days=["일","월","화","수","목","금","토"];
  return `${t.getFullYear()}년 ${t.getMonth()+1}월 ${t.getDate()}일 (${days[t.getDay()]}요일)`;
};

// ✦ 최종 확정 프롬프트
const buildPrompt = (p) => `당신은 장로교 통합측 목사 부부의 하루 큐티를 돕는 도우미입니다.

[상황]
- 남편: 장로교 목사, 중등부 목회
- 아내: 동네 교회에서 말씀을 듣는 중, 공동체 신앙생활 초입 단계
- 사용 방식: 아침 8시 각자 폰으로 읽고, 저녁에 함께 나눔과 기도

오늘의 대주제: ${p.topic}
본문: ${p.book} ${p.chapter}장 ${p.verses}절 (개역개정)
소주제: ${p.theme}

[강해 원칙]
- 이 말씀이 오늘 우리에게 무엇을 말하는가를 한 문장으로 먼저 제시
- 본문의 핵심 단어와 흐름 중심으로 해석
- 신학 용어 없이 따뜻하고 명확하게
- 주석가 인용 없이, 말씀 자체가 직접 말하도록

[아침 묵상 — 각자]
- 남편: 목회와 가정 사이에서 오늘 이 말씀이 어떻게 살아있을지
- 아내: 오늘 일상의 구체적 장면에서 이 말씀이 어떻게 느껴질지
- 하루를 보내며 마음에 품을 핵심 한 문장 포함

[저녁 나눔 — 함께]
- 오늘 하루 이 말씀이 어느 순간 떠올랐는지 나누는 질문
- 정답 없이 각자의 하루 이야기를 자연스럽게 꺼낼 수 있는 질문
- 신앙 지식 없이도 누구나 대답할 수 있는 질문
- 세 번째 질문은 오늘 저녁 함께 실천할 작고 구체적인 것 제안

[저녁 기도 — 함께]
- 오늘 각자 받은 말씀을 함께 하나님 앞에 올려드리는 기도
- 남편이 아내를 위해 먼저 기도
- 아내가 남편을 위해 기도
- 주기도문으로 번갈아가며 마무리

JSON만 반환하세요:
{"title":"오늘 큐티 제목","summary":"이 말씀이 오늘 우리에게 말하는 것 한 문장","mainVerse":"핵심 구절 개역개정 원문","context":"본문 배경 2문장","exposition":"본문 강해 4문장 — 말씀이 직접 말하도록","husbandMorning":"남편 아침 묵상 3문장 + 오늘 품을 한 문장","wifeMorning":"아내 아침 묵상 3문장 + 오늘 품을 한 문장","eveningQ1":"저녁 나눔 질문1 — 오늘 하루 이야기 꺼내기","eveningQ2":"저녁 나눔 질문2 — 서로의 마음 열기","eveningQ3":"저녁 나눔 질문3 — 오늘 저녁 함께 실천할 것","prayerGuide":"저녁 기도 안내 — 남편 먼저, 아내 다음, 주기도문 번갈아 마무리 순서 안내"}`;

export default function CouplesQT() {
  const [passage] = useState(getTodayPassage());
  const [dateStr] = useState(formatDate());
  const [qtData, setQtData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("morning");
  const [prayerStep, setPrayerStep] = useState(0);
  const tc = TOPIC_COLORS[passage?.topic] || TOPIC_COLORS["소망과 완성"];

  const fetchQT = async () => {
    setLoading(true); setError(null); setQtData(null); setActiveTab("morning"); setPrayerStep(0);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({model:"claude-sonnet-4-20250514", max_tokens:1500,
          messages:[{role:"user", content:buildPrompt(passage)}]})
      });
      const data = await res.json();
      const text = (data.content||[]).map(i=>i.text||"").join("");
      setQtData(JSON.parse(text.replace(/```json|```/g,"").trim()));
    } catch { setError("생성 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."); }
    finally { setLoading(false); }
  };

  useEffect(()=>{ fetchQT(); },[]);

  const prayerSteps = [
    { icon:"👔", label:"남편 기도", desc:"아내를 위해 먼저 기도합니다.\n오늘 말씀으로 받은 은혜와 함께\n아내를 하나님 앞에 올려드리세요." },
    { icon:"👗", label:"아내 기도", desc:"남편을 위해 기도합니다.\n오늘 하루 목회와 가정 사이에서\n수고한 남편을 위해 기도하세요." },
    { icon:"🙏", label:"주기도문", desc:"함께 번갈아가며 주기도문으로\n오늘의 큐티를 마무리합니다.\n\n하늘에 계신 우리 아버지여\n이름이 거룩히 여김을 받으시오며\n나라가 임하시오며\n뜻이 하늘에서 이루어진 것같이\n땅에서도 이루어지이다\n오늘 우리에게 일용할 양식을 주시옵고\n우리가 우리에게 죄 지은 자를\n사하여 준 것 같이\n우리 죄를 사하여 주시옵고\n우리를 시험에 들게 하지 마시옵고\n다만 악에서 구하시옵소서\n나라와 권세와 영광이\n아버지께 영원히 있사옵나이다 아멘" },
  ];

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#0f1923 0%,#1a2744 50%,#0f1923 100%)",fontFamily:"'Noto Serif KR','Georgia',serif",color:"#e8dcc8"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;600;700&family=Cinzel:wght@400;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        .tab{transition:all .25s;background:transparent;border:none;cursor:pointer;font-family:inherit;}
        .tab:hover{background:rgba(200,170,100,.1)!important;}
        .tab-on{background:rgba(200,170,100,.2)!important;border-bottom:2px solid #c8aa64!important;color:#c8aa64!important;}
        .card{animation:fi .5s ease;}
        @keyframes fi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .pulse{animation:pu 2s infinite;}
        @keyframes pu{0%,100%{opacity:1}50%{opacity:.4}}
        .gbtn{background:linear-gradient(135deg,#c8aa64,#a08840);color:#0f1923;border:none;cursor:pointer;font-family:inherit;transition:all .25s;}
        .gbtn:hover{transform:translateY(-1px);box-shadow:0 4px 15px rgba(200,170,100,.4);}
        .sbtn{background:transparent;border:1px solid rgba(200,170,100,.4);color:#c8aa64;cursor:pointer;font-family:inherit;transition:all .25s;border-radius:8px;}
        .sbtn:hover{background:rgba(200,170,100,.1);}
        hr.dv{border:none;border-top:1px solid rgba(200,170,100,.18);margin:16px 0;}
        .summary-box{background:rgba(200,170,100,.08);border:1px solid rgba(200,170,100,.3);border-radius:10px;padding:14px 16px;margin-bottom:16px;text-align:center;}
        .prayer-step{background:rgba(140,100,180,.1);border:1px solid rgba(140,100,180,.3);border-radius:12px;padding:16px;text-align:center;}
      `}</style>

      {/* 헤더 */}
      <div style={{background:"linear-gradient(180deg,rgba(200,170,100,.12) 0%,transparent 100%)",borderBottom:"1px solid rgba(200,170,100,.2)",padding:"18px 20px",textAlign:"center"}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:"10px",letterSpacing:"4px",color:"#c8aa64",opacity:.8,marginBottom:"5px"}}>COUPLES DEVOTION · 부부 큐티</div>
        <h1 style={{fontFamily:"'Cinzel',serif",fontSize:"21px",fontWeight:600,color:"#e8dcc8",letterSpacing:"2px"}}>✦ 말씀의 뜰 ✦</h1>
        <div style={{fontSize:"11px",color:"#8a9bb5",marginTop:"4px"}}>{dateStr}</div>
      </div>

      {/* 본문 배너 */}
      <div style={{margin:"12px 14px",background:tc.bg,border:`1px solid ${tc.border}`,borderRadius:"12px",padding:"13px 16px",display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div>
          <div style={{fontSize:"10px",color:tc.text,letterSpacing:"2px",marginBottom:"3px"}}>📅 오늘의 본문</div>
          <div style={{fontSize:"18px",fontWeight:700,color:"#e8dcc8"}}>{passage.book} {passage.chapter}:{passage.verses}</div>
          <div style={{fontSize:"11px",color:"#c5b99a",marginTop:"3px"}}>{passage.theme}</div>
        </div>
        <div style={{background:tc.bg,border:`1px solid ${tc.border}`,borderRadius:"20px",padding:"3px 10px",whiteSpace:"nowrap"}}>
          <span style={{fontSize:"9px",color:tc.text}}>{passage.topic}</span>
        </div>
      </div>

      {/* 탭 — 아침/저녁/기도 */}
      <div style={{display:"flex",margin:"0 14px",borderBottom:"1px solid rgba(200,170,100,.2)"}}>
        {[{k:"morning",l:"🌅 아침 말씀"},{k:"evening",l:"🌙 저녁 나눔"},{k:"prayer",l:"🙏 기도"}].map(t=>(
          <button key={t.k} className={`tab ${activeTab===t.k?"tab-on":""}`}
            onClick={()=>setActiveTab(t.k)}
            style={{flex:1,padding:"10px 4px",borderBottom:"2px solid transparent",color:activeTab===t.k?"#c8aa64":"#8a9bb5",fontSize:"11px"}}>
            {t.l}
          </button>
        ))}
      </div>

      <div style={{padding:"14px",paddingBottom:"90px"}}>

        {loading && (
          <div style={{textAlign:"center",padding:"70px 20px"}}>
            <div className="pulse" style={{fontSize:"30px",marginBottom:"14px"}}>✦</div>
            <div className="pulse" style={{color:"#c8aa64",fontSize:"13px",marginBottom:"6px"}}>오늘의 말씀을 준비하고 있습니다...</div>
            <div style={{color:"#8a9bb5",fontSize:"11px",marginTop:"10px"}}>{passage.book} {passage.chapter}:{passage.verses}</div>
          </div>
        )}

        {error && (
          <div style={{background:"rgba(200,60,60,.1)",border:"1px solid rgba(200,60,60,.3)",borderRadius:"8px",padding:"14px",color:"#e8a0a0",fontSize:"13px"}}>
            {error}
            <button onClick={fetchQT} className="gbtn" style={{display:"block",marginTop:"10px",padding:"8px 16px",borderRadius:"6px",fontSize:"12px"}}>다시 시도</button>
          </div>
        )}

        {/* ── 아침 말씀 탭 ── */}
        {qtData && activeTab==="morning" && (
          <div className="card">
            {/* 오늘의 한 문장 */}
            <div className="summary-box">
              <div style={{fontSize:"10px",color:"#c8aa64",letterSpacing:"2px",marginBottom:"8px"}}>오늘 이 말씀이 말하는 것</div>
              <p style={{fontSize:"14px",color:"#e8dcc8",lineHeight:1.8,fontStyle:"italic"}}>{qtData.summary}</p>
            </div>

            {/* 핵심 구절 */}
            <div style={{background:"rgba(200,170,100,.08)",borderLeft:"3px solid #c8aa64",borderRadius:"0 8px 8px 0",padding:"14px",marginBottom:"16px"}}>
              <div style={{fontSize:"10px",color:"#c8aa64",letterSpacing:"2px",marginBottom:"8px"}}>핵심 구절 (개역개정)</div>
              <p style={{fontSize:"14px",lineHeight:1.9,color:"#e8dcc8",fontStyle:"italic"}}>{qtData.mainVerse}</p>
            </div>

            {/* 본문 배경 */}
            <div style={{marginBottom:"14px"}}>
              <div style={{fontSize:"10px",color:"#8a9bb5",letterSpacing:"2px",marginBottom:"7px"}}>📌 본문 배경</div>
              <p style={{fontSize:"13px",lineHeight:1.9,color:"#c5b99a"}}>{qtData.context}</p>
            </div>

            <hr className="dv"/>

            {/* 강해 */}
            <div style={{marginBottom:"14px"}}>
              <div style={{fontSize:"10px",color:"#8a9bb5",letterSpacing:"2px",marginBottom:"7px"}}>📖 말씀 강해</div>
              <p style={{fontSize:"13px",lineHeight:1.9,color:"#c5b99a"}}>{qtData.exposition}</p>
            </div>

            <hr className="dv"/>

            {/* 개인 묵상 */}
            <div style={{fontSize:"11px",color:"#8a9bb5",marginBottom:"10px",textAlign:"center"}}>오늘 하루 각자 마음에 품으세요</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginBottom:"14px"}}>
              <div style={{background:"rgba(74,111,165,.12)",border:"1px solid rgba(74,111,165,.3)",borderRadius:"8px",padding:"12px"}}>
                <div style={{fontSize:"10px",color:"#7a9fd4",marginBottom:"7px"}}>👔 남편 묵상</div>
                <p style={{fontSize:"12px",lineHeight:1.8,color:"#b8cce0",whiteSpace:"pre-line"}}>{qtData.husbandMorning}</p>
              </div>
              <div style={{background:"rgba(180,100,140,.12)",border:"1px solid rgba(180,100,140,.3)",borderRadius:"8px",padding:"12px"}}>
                <div style={{fontSize:"10px",color:"#d47aaa",marginBottom:"7px"}}>👗 아내 묵상</div>
                <p style={{fontSize:"12px",lineHeight:1.8,color:"#e0b8cc",whiteSpace:"pre-line"}}>{qtData.wifeMorning}</p>
              </div>
            </div>

            {/* 저녁 나눔 안내 */}
            <div style={{background:"rgba(100,180,100,.08)",border:"1px solid rgba(100,180,100,.25)",borderRadius:"8px",padding:"12px",textAlign:"center"}}>
              <div style={{fontSize:"10px",color:"#7ac87a",marginBottom:"5px"}}>🌙 오늘 저녁 함께</div>
              <p style={{fontSize:"12px",color:"#b8e0b8",lineHeight:1.7}}>저녁에 만나면 저녁 나눔 탭으로 함께 이야기를 나눠보세요</p>
            </div>
          </div>
        )}

        {/* ── 저녁 나눔 탭 ── */}
        {qtData && activeTab==="evening" && (
          <div className="card">
            <p style={{fontSize:"12px",color:"#8a9bb5",marginBottom:"16px",lineHeight:1.8,textAlign:"center"}}>
              오늘 하루 어떠셨나요?<br/>말씀과 함께한 하루를 함께 나누어 보세요.
            </p>

            {/* 나눔 질문 */}
            {[
              {q:qtData.eveningQ1, icon:"💬", label:"오늘 하루 이야기"},
              {q:qtData.eveningQ2, icon:"❤️", label:"서로의 마음"},
              {q:qtData.eveningQ3, icon:"✨", label:"오늘 저녁 함께"},
            ].map((item,i)=>(
              <div key={i} style={{background:"rgba(200,170,100,.06)",border:"1px solid rgba(200,170,100,.2)",borderRadius:"10px",padding:"14px",marginBottom:"10px"}}>
                <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}>
                  <span style={{fontSize:"14px"}}>{item.icon}</span>
                  <span style={{fontSize:"9px",color:"#c8aa64",letterSpacing:"1px"}}>{item.label}</span>
                </div>
                <p style={{fontSize:"13px",lineHeight:1.8,color:"#c5b99a"}}>{item.q}</p>
              </div>
            ))}

            <hr className="dv"/>

            {/* 기도로 넘어가기 */}
            <button onClick={()=>setActiveTab("prayer")} className="gbtn"
              style={{width:"100%",padding:"12px",borderRadius:"10px",fontSize:"13px",fontWeight:600,marginTop:"4px"}}>
              🙏 나눔 후 함께 기도하기 →
            </button>
          </div>
        )}

        {/* ── 기도 탭 ── */}
        {qtData && activeTab==="prayer" && (
          <div className="card">
            <p style={{fontSize:"12px",color:"#8a9bb5",marginBottom:"16px",lineHeight:1.8,textAlign:"center"}}>
              오늘 받은 말씀을 함께<br/>하나님 앞에 올려드립니다.
            </p>

            {/* 기도 안내 */}
            <p style={{fontSize:"13px",lineHeight:1.9,color:"#c5b99a",marginBottom:"16px",padding:"0 4px"}}>{qtData.prayerGuide}</p>

            <hr className="dv"/>

            {/* 단계별 기도 */}
            <div style={{display:"flex",gap:"8px",marginBottom:"14px"}}>
              {prayerSteps.map((s,i)=>(
                <button key={i} onClick={()=>setPrayerStep(i)}
                  className={prayerStep===i?"gbtn":"sbtn"}
                  style={{flex:1,padding:"8px 4px",fontSize:"11px",fontWeight:600,
                    borderRadius:"8px",border:prayerStep===i?"none":"1px solid rgba(200,170,100,.4)"}}>
                  {s.icon} {s.label}
                </button>
              ))}
            </div>

            <div className="prayer-step">
              <div style={{fontSize:"20px",marginBottom:"10px"}}>{prayerSteps[prayerStep].icon}</div>
              <div style={{fontSize:"13px",color:"#c8aa64",fontWeight:600,marginBottom:"12px"}}>{prayerSteps[prayerStep].label}</div>
              <p style={{fontSize:"13px",color:"#c5b99a",lineHeight:1.9,whiteSpace:"pre-line"}}>{prayerSteps[prayerStep].desc}</p>

              <div style={{display:"flex",gap:"8px",marginTop:"16px",justifyContent:"center"}}>
                {prayerStep > 0 && (
                  <button onClick={()=>setPrayerStep(p=>p-1)} className="sbtn"
                    style={{padding:"8px 16px",fontSize:"12px"}}>← 이전</button>
                )}
                {prayerStep < prayerSteps.length-1 && (
                  <button onClick={()=>setPrayerStep(p=>p+1)} className="gbtn"
                    style={{padding:"8px 20px",fontSize:"12px",borderRadius:"8px",fontWeight:600}}>다음 →</button>
                )}
                {prayerStep === prayerSteps.length-1 && (
                  <div style={{fontSize:"13px",color:"#c8aa64",marginTop:"8px"}}>✦ 오늘의 큐티를 마칩니다 ✦</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 하단 버튼 */}
      {!loading && (
        <div style={{position:"fixed",bottom:0,left:0,right:0,background:"linear-gradient(0deg,#0f1923 60%,transparent)",padding:"14px"}}>
          <button onClick={fetchQT} className="gbtn"
            style={{width:"100%",padding:"12px",borderRadius:"10px",fontSize:"13px",fontWeight:600}}>
            🔄 오늘의 큐티 새로 받기
          </button>
        </div>
      )}
    </div>
  );
}
