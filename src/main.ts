import Phaser from 'phaser';
import {config} from './game/config';
import {BootScene} from './game/scenes/BootScene';
import {GameScene} from './game/scenes/GameScene';
import {mountHud} from './ui/hud';
import './ui/styles.css';
if(new URLSearchParams(location.search).get('view')==='sizes'){
 void import('./ui/size-diagnostics').then(({mountSizeDiagnostics})=>mountSizeDiagnostics());
}else{
 mountHud();
 new Phaser.Game({type:Phaser.AUTO,parent:'game',width:config.width,height:config.height,transparent:true,antialias:true,physics:{default:'matter',matter:{gravity:{x:0,y:1},autoUpdate:false}},scene:[BootScene,GameScene],scale:{mode:Phaser.Scale.NONE}});
}
