class Deck {
    constructor() {
        this.cardArray = []
        const suits = ["heart", "diamond", "club", "spade"]
        suits.forEach( suit => {
            ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "J", "Q", "K"].forEach( value => {
                this.cardArray.push({
                    suit: suit,
                    value: value
                })
            })
        })
        // console.log(this.cardArray)
    }

    shuffle() {
        for(let i = 0; i < 500; i++) {
            let index1 = Math.floor(Math.random() * this.cardArray.length)
            let index2 = Math.floor(Math.random() * this.cardArray.length)
            let card1 = this.cardArray[index1]
            let card2 = this.cardArray[index2]

            this.cardArray[index1] = card2
            this.cardArray[index2] = card1
        }
        this.cardArray
    }

    getCard() {
        const card = this.cardArray.pop()
        // if(card.dealt) {
        //     console.log("Alre")
        // }
        return(card)
    }
}

class Player {
    constructor() {
        this.hand = []
    }

    addCard(card) {
        this.hand.push(card)
    }

    getCards(){
        return(this.hand)
    }
}

module.exports = { Deck, Player }