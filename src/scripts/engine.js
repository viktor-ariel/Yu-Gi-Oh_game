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