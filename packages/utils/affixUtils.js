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

export function getFixedTop(placeholderReact,targetRect,offsetTop){
    if(offsetTop!==undefined && targetRect.top>placeholderReact.top-offsetTop){
        return offsetTop+targetRect.top;
    }
    return undefined;
}

export function getFixedBottom(placeholderReact,targetRect,offsetBottom){
    if (offsetBottom !== undefined && targetRect.bottom < placeholderReact.bottom + offsetBottom) {
        const targetBottomOffset = window.innerHeight - targetRect.bottom;
        return offsetBottom + targetBottomOffset;
      }
      return undefined;
}

export function getTargetRect(target){
    return target!==window
        ?target.getBoundingClientRect()
        :({top:0,bottom:window.innerHeight})
}

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
                    targetAffix.updatePosition();
                })
            });
        });
    }
}

export function removeObserveTarget(affix){
 

    const observerEntity=observerEntities.find(oriObserverEntity=>{
        const hasAffix=oriObserverEntity.affixList.some(item=>item===affix);
        if(hasAffix){
            oriObserverEntity.affixList=oriObserverEntity.affixList.filter(item=>item!==affix)
        }
        return hasAffix;
    })

    if(observerEntity && observerEntity.affixList.length===0){
        observerEntities=observerEntities.filter(item=>item!==observerEntity);

        TRIGGER_EVENTS.forEach(eventName => {
            const handler = observerEntity.eventHandlers[eventName];
            if (handler && handler.remove) {
              handler.remove();
            }
        });
    }

   
}