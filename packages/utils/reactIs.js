//https://www.jianshu.com/p/a12db80bdad1



const hasSymbol=typeof Symbol==='function' && Symbol.for;
var REACT_ELEMENT_TYPE=hasSymbol?Symbol.for("react.element"):0xeac7;
var REACT_MEMO_TYPE=hasSymbol?Symbol.for("react.memo"):0xead3;

function typeOf(object){
    if(typeof object==="object" && object!==null){
        var $$typeof=object.$$typeof;

        switch($$typeof){
            case REACT_ELEMENT_TYPE:
                var type=object.type;

                switch(type){
                    default:
                        var $$typeofType=type&&type.$$typeof;

                        switch($$typeofType){
                            case REACT_MEMO_TYPE: 
                                return $$typeofType;
                        }
                }

            case REACT_PORTAL_TYPE:
                    return $$typeof;        
        }
        
    }
}

function isMemo(object){
    return typeof(object)===REACT_MEMO_TYPE;
}

export {
    isMemo
}