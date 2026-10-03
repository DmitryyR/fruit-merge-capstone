import {config} from '../config';
import type {FruitDefinition} from '../types';

export function fruitRadius(rank:number,innerWidth=config.right-config.left):number {
 if(!Number.isInteger(rank)||rank<1||rank>30||!Number.isFinite(innerWidth)||innerWidth<=0)throw new Error('Invalid fruit sizing input');
 return innerWidth*.035*Math.pow(.40/.035,(rank-1)/29);
}

/** Uniform texture scaling: main body, not texture padding or leaves, defines size. */
export function spriteGeometry(fruit:FruitDefinition){
 const {body,radius}=fruit;
 return {size:2*radius*body.sourceSize/body.diameter,originX:body.cx/body.sourceSize,originY:body.cy/body.sourceSize};
}
