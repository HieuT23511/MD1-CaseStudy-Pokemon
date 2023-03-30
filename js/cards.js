// Khai bao doi tuong the bai:
class Cards {
    name;
    status;

    constructor(name) {
        this.name = name;
        this.status = false
    }
}

// Tao mang 2 chieu la cac doi tuong cards:
let listCards = [];
let level = 2;
function chooseLevel(){
    level = +document.getElementById('levelGame').value;
    console.log(level)

}
// Giao dien the = table:
function gameInterface() {
    let tablePlay = '<table class="table">'
    for (let l = 0; l < listCards.length; l++) {
        tablePlay += '<tr class="table">'
        for (let m = 0; m < listCards[0].length; m++) {
            let urlCard;
            if (listCards[l][m].status === true) {
                urlCard = "image/" + listCards[l][m].name + ".png";
            } else {
                urlCard = "image/giphy.gif"
            }
            tablePlay += `<td class="table"> <img src= ${urlCard} alt="error" onclick="clickCard(${l},${m})"></td>`
        }
    }
    document.getElementById('display').innerHTML = tablePlay;
}

// Xu li khi onclick vao the:
let checkMatch = [];
let matchCount = 0;

function clickCard(l, m) {
    listCards[l][m].status = true;
    gameInterface()
    checkMatch.push(listCards[l][m]);
    if (checkMatch.length === 2){
        if (checkMatch[0].name === checkMatch[1].name) {
            checkMatch[0].status = true;
            checkMatch[1].status = true;
            matchCount++;
            checkMatch = [];
            console.log(matchCount)//Cho mảng trở về là rỗng để giữ điệu kiện so sánh 2 phần tử của mảng checkMatch được liên tục
        } else {
            checkMatch[0].status = false;
            checkMatch[1].status = false;
            checkMatch = [];
        }
    }
    // Điều kiện khi click nhiều hơn 2 thẻ, trong trường hợp click nhanh mà timeout delay k kịp chạy
    else if (checkMatch.length > 2) {
        checkMatch[0].status = false;
        checkMatch[1].status = false;
        checkMatch = [];
    }
    // Cài đặt timeout delay khi mở 2 thẻ unmatch sẽ in lại thẻ trắng sau 1s.
    setTimeout(() => {
        gameInterface();
    }, 800)
    // Điều kiện end game : mở full thẻ bài match.
    setTimeout(() => {
        if (matchCount === (listCards.length * listCards[0].length)/2) {
            // alert(`Nice! You win`)
            if (confirm('Nice. You win! Do you want play again?')) {

                location.reload();
            } else {
                alert('Thanks. See yaa!')
            }
        }
    }, 300)
}
function startGame(){
    let name8Cards =['buom', 'chim', 'chuot', 'coc', 'ghost', 'nuoc', 'rong', 'sau'];
    let nameCardNotDup = [];
    if (level===2){
        for (let a = 0; a < level; a++) {
            nameCardNotDup.push(name8Cards[a]);
        }
    }else {
        for (let a = 0; a < level*2; a++) {
            nameCardNotDup.push(name8Cards[a]);
        }
    }
    let nameCardNotRandom = nameCardNotDup.concat(nameCardNotDup)

    console.log(nameCardNotDup);
    console.log(nameCardNotRandom);

    listCards = []
    let nameCards = nameCardNotRandom.sort(() => Math.random() - 0.5); // Random nameCards
    let count = 0;
    for (let i = 0; i < level; i++) {
        listCards.push([]);
        for (let j = 0; j < level; j++) {
            listCards[i][j] = new Cards(nameCards[count]);
            count++;
        }
    }
    gameInterface()
}


