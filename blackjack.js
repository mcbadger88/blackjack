
const readlineSync = require('readline-sync');
const classes = require('./blackjackClasses.js')

let userInput = readlineSync.question('Welcome to BlackJack. Press 1 to deal or 0 to quit');


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
    console.log(`Player Cards (${countCards(userCards)}):`)
    console.log(userCards)
    // console.log(`Dealer Cards (${countCards(dealerCards)}):`)
    console.log(`Dealer Cards:`)
    console.log(dealerCards)
}


while (userInput != 0) {
    //create deck and initialise
    console.log(classes)
    const deck = new classes.Deck()
    //shuffle deck
    deck.shuffle()
    console.log(deck.cardArray)
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

    dealer.addCard(card3)
    dealer.addCard(card4)
    //display cards
    displayCards(user.getCards(), dealer.getCards()[0])
    //  "Player cards"
    //   user.displayCards
    //  "Dealer Cards"
    //  dealer.displayOneCard
    while(userInput != 0) {
        userInput = readlineSync.question('Hit or Stand? (enter 0 to exit)');

        switch(userInput) {
            case "hit":
                const card = deck.getCard()
                user.addCard(card)
                //if hand is bust, exit loop and game
                let userCards = user.getCards()
                console.log()
                let cardTotal = countCards(userCards)
                if(cardTotal == 21) {
                    //win
                    console.log("You got 21 - You Win!!")
                    userInput = 0
                } else if(cardTotal > 21) {
                    // lose
                    console.log(`You've busted!! You're score is ${cardTotal} Dealer wins`)
                    userInput = 0
                }
                displayCards(user.getCards(), dealer.getCards()[0])
                break;
            case "stand":
                // disply dealer cards (dealer.displayCards)
                //dealer.hitWhileLessThanUserAndUnder17
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
