import { _decorator, Component, director, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('button')
export class button extends Component {
    @property(Label)
    scoreLb:Label;
    reloadCallback;
    nextCallback;
    start() {

    }
    setup(score,reloadCallback,nextCallback){
        this.reloadCallback = reloadCallback;
        this.nextCallback = nextCallback;
        this.scoreLb.string = 'Score :'+score
    }
    update(deltaTime: number) {
        
    }
    
    public onReload() {
        this.reloadCallback();
    }
    public onNext(){
        this.nextCallback();
    }
}


