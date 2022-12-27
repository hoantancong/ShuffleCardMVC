import { _decorator, Component, Node, instantiate, RigidBody2D, game, director, Vec3, VideoPlayer } from 'cc';
import { GameModel } from '../model/GameModel';
import { Card } from '../object/Card';
import { button } from '../button';
import { DataController } from './DataController';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    gameModel: GameModel;
    oldCard: Card;
    cardcount;
    COL = 0;
    ROW = 1;
    score = 0;
    //
    start() {
        //get from save

    }
    startGame(gameModel: GameModel) {
        this.gameModel = gameModel;
        this.beginLevel();
    }
    beginLevel() {
        let gameLevel = DataController.instant.gameLevel;
        console.log('game level',)
        let colrow = this.gameModel.COLROWS[gameLevel] //4,2 [4,2]
        //load background
        this.gameModel.setGameBackground();
        this.gameModel.levelLb.string = 'Level ' + (gameLevel + 1);
        let count = 0;
        this.cardcount = colrow[0] * colrow[1] //4x2
        let needCard = this.cardcount;
        let newArr = this.gameModel.CARD_TYPE_LIST.slice(0, needCard);
        console.log('len1:', newArr);
        this.shuffle(newArr);
        console.log('len:', newArr);
        //get card back
        for (let i = 0; i < colrow[this.ROW]; i++) {
            for (let j = 0; j < colrow[this.COL]; j++) {
                let type = newArr[count];
                let newCard = instantiate(this.gameModel.cardPrefab);
                newCard.setPosition(new Vec3((115 * j) - 280, 135 * i))
                newCard.getComponent(Card).setUp(type, this.gameModel.cardSpriteFrameList[type], this.gameModel.cardBackSpriteFrame, (card: Card) => {
                    this.touchCard(card);
                });
                this.gameModel.gamePlay.addChild(newCard);
                count++;  //
            }
        }
    }
    private shuffle(array) {

        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        //return array;
    }
    private touchCard(card: Card) {
        if (card == this.oldCard) {
            card.closeCard();
            this.oldCard = null;
        } else {
            if (this.oldCard == null) {
                card.openCard(() => {
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
                        this.cardcount -= 2;
                        this.score++;
                        //update score
                        this.gameModel.stepsLabel.string = 'Score :' + this.score;
                        if (this.cardcount == 0) {
                            this.gamefinish();
                        }

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
    gamefinish() {
        console.log('game over')
        let gameOver = instantiate(this.gameModel.gameOver)
        gameOver.getComponent(button).setup(this.score, () => {
            //khi player an reload
            this.reloadGame();
        },
            () => {
                //khi player an next
                this.nextLevel();
            })
        gameOver.setParent(this.gameModel.uiNode)

    }
    reloadGame() {
        director.loadScene("game")
    }
    nextLevel() {
        DataController.instant.gameLevel++;
        //save game level
        //
        director.loadScene("game")
    }
    update(deltaTime: number) {

    }
}


