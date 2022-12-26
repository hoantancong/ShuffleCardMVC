import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('button')
export class button extends Component {
    reloadCallback;
    nextCallback;
    start() {

    }
    setup(score,reloadCallback,nextCallback){
        this.reloadCallback = reloadCallback;
        this.nextCallback = nextCallback;
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


