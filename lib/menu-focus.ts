// Safari does not focus tapped buttons, so a blur with no next target is a tap inside the menu; outside taps close via pointerdown.
export const blurLeavesMenu=(menu:{contains(node:Node|null):boolean},next:EventTarget|null)=>next!==null&&!menu.contains(next as Node);
