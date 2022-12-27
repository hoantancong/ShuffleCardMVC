import { _decorator, Component, Node, Label, Prefab, SpriteFrame, Sprite, Asset } from 'cc';
import { GameController } from '../controller/GameController';
import { Configs } from '../utils/Configs';
import { ResourceUtils } from '../utils/ResourceUtils';
const { ccclass, property } = _decorator;

@ccclass('GameModel')
export class GameModel extends Component {
    //property
    //ui
    @property(Node)
    uiNode: Node;
    @property(Node)
    gamePlay: Node;
    @property(Label)
    levelLb: Label;
    @property(Sprite)
    gamebackground: Sprite;
    @property(Prefab)
    gameOver: Prefab;
    @property({type: Label})
    public stepsLabel: Label|null = null;
    
    //
    cardSpriteFrameList: SpriteFrame[] = [];
    cardBackSpriteFrame: SpriteFrame;

    @property(Node)
    gameController: Node;
    //=end property


    //prefab
    COLROWS = [[4,2],[5,2],[6,2],[7,2],[8,2]]

    //constant
    NUM_OF_COL = 6;
    NUM_OF_ROW = 2;
    CARD_TYPE_LIST = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9];
    //variable
    gameScore = 0;
    gameLevel;
    cardPrefab: Prefab;


    start() {
 

        //load sprite texture
        ResourceUtils.loadDirSprite(Configs.CARDLIST_SPRITE_PATH, (spriteFrameList: SpriteFrame[]) => {
            this.cardSpriteFrameList = spriteFrameList;
            console.log(this.cardSpriteFrameList);
            //get card back
            ResourceUtils.loadSprite(Configs.CARD_BACK_STR, (spriteFame: SpriteFrame) => {
                this.cardBackSpriteFrame = spriteFame;
                //
                //load card prefab
                //load card prefab => finish => start game
                ResourceUtils.loadPrefab(Configs.CARD_PATH, (prefab) => {
                    this.cardPrefab = prefab;
                    this.gameController.getComponent(GameController).startGame(this);
                });
                //
            })

        })
    }
    public setGameBackground() {
        ResourceUtils.loadImageFromURL(Configs.BACKGROUND_IMG_URL, (sp) => {
            this.gamebackground.spriteFrame = sp;
        })
    }
}


