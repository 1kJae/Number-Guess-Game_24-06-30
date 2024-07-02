// 랜덤번호 지정 O
// 유저가 번호를 입력한다. 그리고 go 라는 버튼을 누름 O
// 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다! O
// 랜덤번호가 < 유저번호 Down!!! O
// 랜덤번호가 > 유저번호 Up!! O
// Reset버튼을 누르면 게임이 리셋된다. O
// 5번의 기회를 다 쓰면 게임이 끝난다. (더이상 추측 불가, 버튼이 disable) O
// 유저가 1~100 범위 밖의 숫자를 입력하면 알려준다. 기회를 깎지 않는다. O
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깎지 않는다. O


//1. 게임 도전 횟수 제한 3회로 줄여주세요!:ok_손_모양: ( 5번 , 심지어 10번 까지 시도 가능하게 해두시면 실패 케이스 테스트 할 때 너무 힘듭니다!:피곤한_얼굴::피곤한_얼굴: ) O
//2. 정답을 화면에 표시해주세요! ( 매번 콘솔열어서 정답확인하기가 힘들어요! 심지어 표시안해주면 계속 맞을떄까지 테스트해야하는... ㅠㅠ:폭발하는_머리: )

// 1. 리셋 기능 O
// 2. 남은 기회 소진시 게임오버 메세지 보여주기 + 버튼 클릭 못하게 막기 O
// 3. input 창에 포커스를 두면 바로 그전에 입력한 값이 지워지기 O
// 4. 범위 밖에 숫자를 입력 시  에러 메세지가 나오는가? (남은 기회는 소진되면 안됨) O
// 5. 이미 입력한 숫자를 한 번 더 입력하면 이미 입력한 숫자라고 메세지 보여주기 ( 기회 소진되면 안됨) O
// 6. UI디자인 ( 반응형 까지되면 플러스 포인트 )
// 7. 그동안 입력한 숫자들을 보여준다면 플러스 포인트

let computerNum = 0
let playButton = document.getElementById("play-button")
let userInput = document.getElementById("user-input")
let resultArea = document.getElementById("result-area")
let resetButton = document.getElementById("reset-button")
let chanceArea = document.getElementById("chance-area")
let historyNum1 = document.getElementById("hes-num1")
let historyNum2 = document.getElementById("hes-num2")
let historyNum3 = document.getElementById("hes-num3")
let answer = document.getElementById("answer-area")
let chances = 3
let gameOver = false
let history = []


playButton.addEventListener("click", play)
resetButton.addEventListener("click", reset)
userInput.addEventListener("focus", function(){userInput.value = ""})

function pickRandomNum() {
    computerNum = Math.floor(Math.random() * 100) + 1;
    answer.textContent = computerNum
    console.log("정답", computerNum);
}

function play() {
    let userValue = userInput.value
    
    if (userValue < 1 || userValue > 100) {
        resultArea.textContent = "1과 100 사이 숫자를 입력해 주세요."
        return;
    }

    if(history.includes(userValue)) {
        resultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요."
        return;
    }

    chances --
    chanceArea.textContent = `남은 기회 : ${chances}번`
    console.log("chance" , chances)

    if (userValue < computerNum) 
    {
        resultArea.textContent = "Up!!!"
    }
    else if (userValue > computerNum) 
    {
        resultArea.textContent = "Down!!!"
    }
    else if (userValue == computerNum) 
    {
        resultArea.textContent = "맞췄습니다!!!"
        gameOver = true
    }

    history.push(userValue)
    
    if (history.length === 1) {
        historyNum1.textContent = history[0];
      } else if (history.length === 2) {
        historyNum2.textContent = history[1];
      } else if (history.length === 3) {
        historyNum3.textContent = history[2];
      }
    
    if (userValue > computerNum || userValue < computerNum) {
        if (chances < 1) {
            resultArea.textContent = "GameOver"
            gameOver = true
        }
    }

    if (gameOver == true) {
        playButton.disabled = true
    }
}

function reset() {
    userInput.value = ""
    resultArea.textContent = "결과값이 여기 나옵니다!"
    gameOver = false
    playButton.disabled = false
    chances = 3
    chanceArea.innerHTML = `남은 기회 : ${chances}번`
    history = []
    historyNum1.textContent = " "
    historyNum2.textContent = " "
    historyNum3.textContent = " "
    pickRandomNum();
}
pickRandomNum(); 
