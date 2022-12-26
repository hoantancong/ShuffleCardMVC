import { _decorator, Component, Node, SpriteFrame, Sprite, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Card')
export class Card extends Component {
    cardType;
    cardSpriteFrame:SpriteFrame;
    cardBackSpriteFame:SpriteFrame;
    @property(Sprite)
    cardSprite:Sprite;
    touchCallback;
    start() {

    }
    setUp(cardType:number,cardSpriteFrame:SpriteFrame,cardBackSpriteFrame:SpriteFrame,touchCallback){
        this.cardType = cardType;
        this.cardSpriteFrame = cardSpriteFrame;
        this.cardBackSpriteFame = cardBackSpriteFrame;
        this.touchCallback = touchCallback;
        this.cardSprite.spriteFrame = cardBackSpriteFrame;
    }
    onTouchCard(){
        if(this.touchCallback){
            this.touchCallback(this);
        }
    }
    closeCard(finishCallback=null){
        tween(this.cardSprite.node).sequence(
            tween(this.cardSprite.node).to(0.2,{scale:new Vec3(0,1,0)}),
            tween(this.cardSprite.node).call(()=>{
                this.cardSprite.spriteFrame = this.cardBackSpriteFame;
            }),
            tween(this.cardSprite.node).to(0.2,{scale:new Vec3(1,1,0)}),
            tween(this.cardSprite.node).call(()=>{
                if(finishCallback) finishCallback();
            })
        ).start();

    }
    openCard(finishCallback=null){
        tween(this.cardSprite.node).sequence(
            tween(this.cardSprite.node).to(0.2,{scale:new Vec3(0,1,0)}),
            tween(this.cardSprite.node).call(()=>{
                this.cardSprite.spriteFrame = this.cardSpriteFrame;
            }),
            tween(this.cardSprite.node).to(0.2,{scale:new Vec3(1,1,0)}),
            tween().call(()=>{
                if(finishCallback) finishCallback();
            })
        ).start();
    }
    update(deltaTime: number) {
        
    }
}


