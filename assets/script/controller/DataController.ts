import { _decorator, Component, director, game, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DataController')
export class DataController extends Component {
    public static instant:DataController;
    gameLevel=0;
    start() {
        //giu lai node o trong game
        if(DataController.instant==null){
            DataController.instant = this;
            director.addPersistRootNode(this.node);
        }
    
    }

    update(deltaTime: number) {
        
    }
}


