import Phaser from 'phaser';
import {fruits} from '../catalog/catalog';
import {showError} from '../../ui/hud';
export class BootScene extends Phaser.Scene {
 private failed=false;
 constructor(){super('Boot');}
 preload(){this.load.on('loaderror',()=>{this.failed=true;showError('Не вдалося завантажити фрукти. Перевір з’єднання та онови сторінку.');});for(const fruit of fruits)this.load.svg(fruit.id,fruit.texture,{width:128,height:128});}
 create(){if(!this.failed)this.scene.start('Game');}
}
