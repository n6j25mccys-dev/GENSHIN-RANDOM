// キャラクターのリスト
const characters = [
    { 
        name: "胡桃", 
        element: "炎",
        rarity:5

    },

    {
         name: "香菱",
         element: "炎",
         rarity:4
     },

    {
         name: "宵宮",
         element: "炎", 
         rarity:5 
        
        },
    { 
        name: "クレー",
        element: "炎",
        rarity:5

    },
    
    {
        name: "行秋", 
        element: "水",
        rarity:4

    },

    { 
        name: "夜蘭", 
        element: "水", 
        rarity:5 
    
    },

    { 
        name: "フリーナ", 
        element: "水", 
        rarity:5
     
    },
    
    { 
        name: "モナ", 
        element: "水", 
        rarity:5
     },

    { 
        
        name: "雷電将軍", 
        element: "雷",
        rarity:5

     },

    { 
        name: "刻晴", 
        element: "雷", 
        rarity:5
    },
    
    { 
        name: "八重神子", 
        element: "雷", 
        rarity:5
    },

    { 
        name: "フィッシュル", 
        element: "雷",
        rarity:4
    },

    { 
        name: "ナヒーダ", 
        element: "草" ,
        rarity:5   
    },

    { 
        name: "ティナリ", 
        element: "草",
        rarity:5    
    },
    
    { 
        name: "コレイ", 
        element: "草",
        rarity:4
    },

    { 
        name: "ヨォーヨ", 
        element: "草",
        rarity:4
    },

    { 
        name: "甘雨", 
        element: "氷" ,
        rarity:5

    },

    { 
        name: "神里綾華", 
        element: "氷" ,
        rarity:5
    },

    { 
        name: "七七", 
        element: "氷" ,
        rarity:5
    },

    { 
        name: "ディオナ", 
        element: "氷" ,
        rarity:4
    },

    { 
        name: "楓原万葉", 
        element: "風", 
        rarity:5
     },

    { 
        name: "ウェンティ", 
        element: "風", 
        rarity:5
    
    },
    
    { 
        name: "魈", 
        element: "風", 
        rarity:5 },
    { 
        name: "放浪者", 
        element: "風", 
        rarity:5 
    },

    { 
        name: "鍾離", 
        element: "岩", 
        rarity:5 
    },
    { 
        name: "荒瀧一斗", 
        element: "岩", 
        rarity:5 
    },
    { 
        name: "アルベド", 
        element: "岩", 
        rarity:5 
    },
    { 
        name: "ゴロー", 
        element: "岩", 
        rarity:4 
    }
];

// ボスのリスト
const bosses = [
    "黄金王獣",
    "アビスの使徒・激流",
    "無相の雷",
    "無相の炎",
    "若陀龍王",
    "雷音権現"
];

// ランダムに1つ選ぶ
function randomChoice(list) {
    const index = Math.floor(Math.random() * list.length);
    return list[index];
}

// ボタンと結果表示エリア
const button = document.querySelector("#random-button");
const result = document.querySelector("#result");

// ボタンを押したとき
button.addEventListener("click", function() {

// チェックされた元素を取得
const selectedElements = Array.from(
    document.querySelectorAll('input[name="element"]:checked')
).map(checkbox => checkbox.value);

// チェックされたレアリティを取得
const selectedRarities = Array.from(
    document.querySelectorAll('input[name="rarity"]:checked')
).map(checkbox => Number(checkbox.value));

let filteredCharacters = characters;

// 元素で絞る
if (selectedElements.length > 0) {
    filteredCharacters = filteredCharacters.filter(
        character => selectedElements.includes(character.element)
    );
}

// レアリティで絞る
if (selectedRarities.length > 0) {
    filteredCharacters = filteredCharacters.filter(
        character => selectedRarities.includes(character.rarity)
    );
}

// 4人選べるか確認
if (filteredCharacters.length < 4) {
    result.innerHTML = `
        <h2>⚠️ キャラクターが足りません</h2>
        <p>選択した条件では4人以上のキャラクターがいません。</p>
    `;
    return;
}

    // 被りなしで4人選ぶ
    const party = [];

    const availableCharacters = [...filteredCharacters];

    for (let i = 0; i < 4; i++) {

        const index = Math.floor(
            Math.random() * availableCharacters.length
        );

        party.push(availableCharacters[index]);

        availableCharacters.splice(index, 1);
    }

    // ボスをランダムで選ぶ
    const boss = randomChoice(bosses);

    // 結果を表示
result.classList.remove("show");

result.innerHTML = `
    <h2>✨ RESULT ✨</h2>

    <div class="party-cards">

       <div class="character-card element-${party[0].element}">
    <div class="element">${party[0].element}</div>
    <div class="character-name">${party[0].name}</div>
    <div class="rarity">★${party[0].rarity}</div>
</div>

<div class="character-card element-${party[1].element}">
    <div class="element">${party[1].element}</div>
    <div class="character-name">${party[1].name}</div>
    <div class="rarity">★${party[1].rarity}</div>
</div>

<div class="character-card element-${party[2].element}">
    <div class="element">${party[2].element}</div>
    <div class="character-name">${party[2].name}</div>
    <div class="rarity">★${party[2].rarity}</div>
</div>

<div class="character-card element-${party[3].element}">
    <div class="element">${party[3].element}</div>
    <div class="character-name">${party[3].name}</div>
    <div class="rarity">★${party[3].rarity}</div>
</div>

</div>

<div class="boss-card">
    <div class="boss-title">👑 BOSS</div>
    <div class="boss-name">${boss}</div>
</div>

`;

result.classList.add("show");

});