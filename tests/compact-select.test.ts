import test from 'node:test';
import assert from 'node:assert/strict';
import {blurLeavesMenu} from '../lib/menu-focus.ts';
// Regression: on iPhone Safari, tapping a country option blurred the menu with no next target and closed it before the click landed.
const inside={},outside={};
const menu={contains:(node:unknown)=>node===inside};
test('a blur without a next focus target keeps the menu open so Safari taps reach the option',()=>{
 assert.equal(blurLeavesMenu(menu,null),false);
});
test('focus moving inside the menu keeps it open',()=>{
 assert.equal(blurLeavesMenu(menu,inside as EventTarget),false);
});
test('focus moving outside the menu closes it',()=>{
 assert.equal(blurLeavesMenu(menu,outside as EventTarget),true);
});
