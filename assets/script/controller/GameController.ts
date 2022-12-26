import { _decorator, Component, Node, instantiate, RigidBody2D } from 'cc';
import { GameModel } from '../model/GameModel';
import { Card } from '../object/Card';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    //1. tinh diem + hien thi diem: 10d
    //2. Finish len level-> co box thong bao co nut de next level, level 1: 6 cap, level 2 8 cap, level 3 10
    //3. Vi tri random, va co dinh 
    gameModel: GameModel;
    oldCard: Card;
    //
    start() {

    }
    startGame(gameModel: GameModel) {
        this.gameModel = gameModel;
        this.beginLevel();
    }
    beginLevel() {
        //load background
        this.gameModel.setGameBackground();
        this.gameModel.levelLb.string = 'Level 01';
        let count = 0;
        //get card back
        for (let i = 0; i < this.gameModel.NUM_OF_ROW; i++) {
            for (let j = 0; j < this.gameModel.NUM_OF_COL; j++) {
                let type = this.gameModel.CARD_TYPE_LIST[count];
                let newCard = instantiate(this.gameModel.cardPrefab);
                newCard.getComponent(Card).setUp(type, this.gameModel.cardSpriteFrameList[type], this.gameModel.cardBackSpriteFrame, (card: Card) => {
                    this.touchCard(card);
                });
                this.gameModel.gamePlay.addChild(newCard);
                count++;  //
            }
        }
    }

    private touchCard(card: Card) {
        if (card == this.oldCard) {
            card.closeCard();
            this.oldCard = null;
        } else {
            if (this.oldCard == null) {
                card.openCard(()=>{
                    this.oldCard = card;
                })
            } else {
                //check card type
                //the same
                card.openCard(() => {
                    //the same
                    if (card.cardType == this.oldCard.cardType) {
                        //remove two
                        console.log('The same.....   ');
                        card.node.destroy();
                        this.oldCard.node.destroy();
                        this.oldCard = null;
                    } else {
                        //not the same
                        console.log('Not The same.....');
                        card.closeCard();
                        this.oldCard.closeCard();
                        this.oldCard = null;
                    }
                });
            }


        }

    }
    update(deltaTime: number) {

    }
}


