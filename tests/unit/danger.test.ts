import {expect,test} from 'vitest';
import {advanceDanger} from '../../src/game/domain/danger';
const empty={elapsedMsByFruit:{},shouldEnd:false};const fruit={id:'a',topY:100,speedPxPerSecond:0,ageMs:5000};
test('FR-06 1999 versus 2000 continuous milliseconds',()=>{const s=advanceDanger(empty,[fruit],1999,'playing');expect(s.shouldEnd).toBe(false);expect(advanceDanger(s,[fruit],1,'playing').shouldEnd).toBe(true);});
test('grace crossing only counts eligible fraction',()=>{expect(advanceDanger(empty,[{...fruit,ageMs:1000}],20,'playing').elapsedMsByFruit.a).toBeUndefined();expect(advanceDanger(empty,[{...fruit,ageMs:1001}],20,'playing').elapsedMsByFruit.a).toBe(1);expect(advanceDanger(empty,[{...fruit,ageMs:1010}],20,'playing').elapsedMsByFruit.a).toBe(10);});
test.each([{topY:140},{speedPxPerSecond:25},{topY:200}])('condition break resets existing timer %j',change=>{const old={elapsedMsByFruit:{a:1999},shouldEnd:false};expect(advanceDanger(old,[{...fruit,...change}],10,'playing').elapsedMsByFruit.a).toBeUndefined();});
test('pause freezes, removal clears, resume continues',()=>{const s=advanceDanger(empty,[fruit],1000,'playing');expect(advanceDanger(s,[],10000,'paused')).toEqual(s);expect(advanceDanger(s,[],10,'playing')).toEqual(empty);expect(advanceDanger(s,[fruit],1000,'playing').shouldEnd).toBe(true);});
test.each([-1,NaN,Infinity])('rejects delta %s',delta=>expect(()=>advanceDanger(empty,[fruit],delta,'playing')).toThrow());
