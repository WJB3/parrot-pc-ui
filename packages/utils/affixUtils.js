import addEventListener from './addEventListener';

const TRIGGER_EVENTS=[
    'resize',
    'scroll',
    'touchstart',
    'touchmove',
    'touchend',
    'pageshow',
    'load'
];

let observerEntities=[];

export function addObserveTarget(target,affix){
    if(!target) return ;

    let entity=observerEntities.find(item=>item.target===target);

    if(entity){
        entity.affixList.push(affix);
    }else{
        entity={
            target,
            affixList:[affix],
            eventHandlers:{}
        }

        observerEntities.push(entity);

        TRIGGER_EVENTS.forEach(eventName=>{
            entity.eventHandlers[eventName]=addEventListener(target,eventName,()=>{
                entity.affixList.forEach(targetAffix=>{
                    targetAffix.lazyUpdatePosition();
                })
            });
        });
    }
}