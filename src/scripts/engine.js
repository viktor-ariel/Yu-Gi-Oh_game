const state= {
    score:{
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    cardSprites:{
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards:{
        player: document.getElementById("player-fiel-card"),
        computer: document.getElementById("computer-fiel-card"),
    },
    playerSide : {
    player1: "player-cards",
    player1BOX: document.querySelector("#computer-cards"),
    computer: "computer-cards",
    computerBOX: document.querySelector("#player-cards"),
    
},
    actions:{
        button: document.getElementById("next-duel"),
    },
};
const pathImages = "./src/assets/icons/";
const cardData = [
    {
        id:0,
        name:"Blue Dragon",
        type:"Paper",
        img:`${pathImages}dragon.png`,
        WinOf:[1],
        LoseOf:[2],
    },
    {
        id:1,
        name:"Dark Magician",
        type:"Rock",
        img:`${pathImages}magician.png`,
        WinOf:[2],
        LoseOf:[0],
    },
    {
        id:2,
        name:"Exodia",
        type:"Scissors",
        img:`${pathImages}exodia.png`,
        WinOf:[0],
        LoseOf:[1],
    },
];
const playerSide = {
    player1: "player-cards",
    computer: "computer-cards",
};

async function getRadomCardId(){
    const randomIndex = Math.floor(Math.random() * cardData.length)
    return cardData[randomIndex].id
}

async function createCardImage(IdCard,fieldSide){
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", IdCard);
    cardImage.classList.add("card");
    
    if(fieldSide === playerSide.player1){

        cardImage.addEventListener("mouseover", () =>{
            drawSelectCard(IdCard);
        });
        
        cardImage.addEventListener("click", ()=> {
            setCardsField(cardImage.getAttribute("data-id"));
        });
    }

 
    return cardImage;
}

async function setCardsField(cardId){
    await removeAllcardsImages();

    let computerCardId = await getRadomCardId()
    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";

    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;

    let duelResults = await checkDuelResults(cardId, computerCardId);

    await updateScore();
    await drawButton(duelResults);

}

async function updateScore(){
    state.score.scoreBox.innerText = `Win ${state.score.playerScore} | Lose: ${state.score.computerScore}`
}

async function drawButton(text){
    state.actions.button.innerText = text;
    state.actions.button.style.display = "block";
}

async function checkDuelResults(playerCardId, computerCardId){
    let duelResults = "Empate";
    let playerCard = cardData[playerCardId];

    if(playerCard.WinOf.includes(computerCardId)){
        duelResults = "Ganhou";
        state.score.playerScore++;
    }
     if(playerCard.LoseOf.includes(computerCardId)){
        duelResults = "Perdeu";
        state.score.computerScore++;
    }
    return duelResults;
}

async function removeAllcardsImages() {
    let {computerBOX, player1BOX } = state.playerSide;
    let imgElements = computerBOX.querySelectorAll("img");
    imgElements.forEach((img)=> img.remove());

    imgElements = player1BOX.querySelectorAll("img");
    imgElements.forEach((img)=> img.remove());
}

async function drawSelectCard(index){
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = "Atribute : " + cardData[index].type;

}

async function drawCards(cardNumbers, fieldSide){
    for(let i = 0; i < cardNumbers; i++){
        const randomIdCard = await getRadomCardId();
        const cardImage = await createCardImage(randomIdCard,fieldSide);
        document.getElementById(fieldSide).appendChild(cardImage);
    }
}



function init(){
    drawCards(5, playerSide.player1);
    drawCards(5,playerSide.computer);
}
init();