import { _decorator, Component, Node, AudioSource, AudioClip } from 'cc';
import { ResourceUtils } from '../utils/ResourceUtils';
const { ccclass, property } = _decorator;

@ccclass('AudioController')
export class AudioController extends Component {
    @property(AudioSource)
    audioSource:AudioSource;
    start() {
        this.playBGMusic();
    }
    playBGMusic(){
        ResourceUtils.loadAudio('audio/bgm',(clip:AudioClip)=>{
            this.audioSource.clip = clip;
            this.audioSource.play();
            console.log('clip',clip);
        })
    }
    update(deltaTime: number) {
        
    }
}


