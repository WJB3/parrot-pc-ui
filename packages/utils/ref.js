 

import {
    isMemo
} from '@packages/utils/reactIs';
import setRef from './setRef';


export function supportRef(nodeOrComponent){
    let _type$prototype,_nodeOrComponent$prototype;

    let type=isMemo(nodeOrComponent)?nodeOrComponent.type.type:nodeOrComponent.type;

    if (typeof type === 'function' && !((_type$prototype = type.prototype) === null || _type$prototype === void 0 ? void 0 : _type$prototype.render)) {
        return false;
    } // Class component

    if (typeof nodeOrComponent === 'function' && !((_nodeOrComponent$prototype= nodeOrComponent.prototype) === null || _nodeOrComponent$prot === void 0 ? void 0 : _nodeOrComponent$prot.render)) {
        return false;
    }

    return true;

}

export function composeRef(){
    let len=arguments.length;
    let refs=new Array(len);
    for(key=0;key<len;key++){
        refs[key]=arguments[key];
    }

    return function(node){
        refs.forEach(function(ref){
            setRef(ref,node);
        })
    }
}