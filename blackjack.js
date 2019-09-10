
const readlineSync = require('readline-sync');
const classes = require('./blackjackClasses.js')

let userInput = readlineSync.question('Welcome to BlackJack. Press 1 to deal or 0 to quit');

function aceChange(card){
    if(card.value = "11"){
        card.value = "1"
    }
}

function checkAce(user){
    user.hand.forEach(card=>{
        if(card.value === "11"){
            return true
        }
        else{
            return false
        }
    })
}
function countCards(cards) {
    let total = 0;
    let value;
    cards.forEach( card => {
        value = Number(card.value)
        if(!value) {
            // Character cards are 10
            value = 10
        }
        total = total + value
    })
    return total
}

function displayCards(userCards, dealerCards) {
    console.log(`   Player Cards (${countCards(userCards)}):`)
    console.table(userCards)
    console.log(`   Dealer Cards (${countCards(dealerCards)}):`)
    console.table(dealerCards)
}


while (userInput != 0) {
    //create deck and initialise
    console.log(classes)
    const deck = new classes.Deck()
    //shuffle deck
    deck.shuffle()
    // console.log(deck.cardArray)
    //create user and dealer
    user = new classes.Player()
    dealer = new classes.Player()

    //deal cards to player and dealer

    //   card = deck.getCard() ( * 4 times)
    const card1 = deck.getCard()
    const card2 = deck.getCard()
    const card3 = deck.getCard()
    const card4 = deck.getCard()

    user.addCard(card1) 
    user.addCard(card2) 
    console.log(user.hand)

    dealer.addCard(card3)
    dealer.addCard(card4)
    //display cards
    displayCards(user.getCards(), new Array(dealer.getCards()[0]))
    if(countCards(user.getCards()) == 21) {
        //win
        console.log("   You got 21 - You Win!!")
        displayCards(user.getCards(), dealer.getCards())
        userInput = 0
    }
    //  "Player cards"
    //   user.displayCards
    //  "Dealer Cards"
    //  dealer.displayOneCard
    while(userInput != 0) {
        userInput = readlineSync.question('Hit or Stand? (please type "hit", "stand", or enter 0 to exit)');

        switch(userInput) {
            case "hit":
                const card = deck.getCard()
                console.log(`You chose to Hit, you got card:`)
                console.log(card)
                user.addCard(card)
                //if hand is bust, exit loop and game                
                let userCards = user.getCards()
                console.log()
                let cardTotal = countCards(userCards)
                if(cardTotal == 21) {
                    //win
                    console.log("   You got 21 - You Win!!")
                    displayCards(user.getCards(), dealer.getCards())
                    userInput = 0
                } 
                else if(cardTotal > 21 && checkAce(user)) {
                    user.hand.forEach(card => {
                        if(card.value == "11"){
                            card.value = "1"
                        }
                    })
                    displayCards(user.getCards(), new Array(dealer.getCards()[0]))
                }
                else if(cardTotal > 21) {
                    // lose
                    console.log(`   You've busted!! You're score is ${cardTotal} Dealer wins`)
                    userInput = 0
                    displayCards(user.getCards(), dealer.getCards())
                } //
                else {
                    displayCards(user.getCards(), new Array(dealer.getCards()[0]))
                }
                break;
            case "stand":
                console.log("You chose to stand, dealer reveals cards and plays")
                // disply dealer cards (dealer.displayCards)
                displayCards(user.getCards(), dealer.getCards())
                // dealer hits until they are over 17
                while(countCards(dealer.getCards()) < 17) {
                    dealer.addCard(deck.getCard())
                }
                console.log(`${
                    countCards(dealer.getCards()) <= countCards(user.getCards()) ? "You" : "Dealer"
                } WINS !!!!!`)
                displayCards(user.getCards(), dealer.getCards())
                userInput = 0

                break;
            default:
                console.log("Invalid Choice")
                break;
        }
    }

    //EVALUATE WINNER
    // check if user has gone bust, break loop and tell them they lost if so
    // check if user has hit 21, because then he has won
}

console.log("See ya!")
