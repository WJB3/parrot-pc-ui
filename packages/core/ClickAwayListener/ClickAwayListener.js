import React ,{useRef} from 'react';
import PropTypes from 'prop-types';
import useForkRef from '@packages/hooks/useForkRef';
import ownerDocument from '@packages/utils/ownerDocument';

function mapEventPropToEvent(eventProp){
    return eventProp.substring(2).toLowerCase();
}
 

const ClickAwayListener = React.forwardRef((props, ref) => {
    const {
        children,
        mouseEvent = "onClick",
        onClickAway,
        //虽然在内部 但是需要作为为元素外部的元素
        externalNode=[],
        stopListen=false,
        ...restProps
    } = props;

    const nodeRef=useRef(null);

    const handleRef=useForkRef(children.ref,ref,nodeRef);

    const childrenProps={ref:handleRef}

    const createHandleSynthetic=(handlerName)=>(event)=>{
        const childrenPropsHandler=children.props[handlerName];
        if(childrenPropsHandler){
            childrenPropsHandler(event);
        }
    }

    if(mouseEvent!==false){
        childrenProps[mouseEvent]=createHandleSynthetic(mouseEvent);
    }

    const handleClickAway=(event)=>{  
 
        if(!nodeRef.current){
            return ;
        }

        //是否点击在元素内部
        let insideDOM; 

        if(event.composedPath){ 
            insideDOM=event.composedPath().indexOf(nodeRef.current)>-1;
        }else{ 
            insideDOM=nodeRef.current.contains(event.target);
        }  

        if(!insideDOM || externalNode?.indexOf(event.target)>-1){
            onClickAway(event)
        } 
    }

    React.useEffect(()=>{
        if(mouseEvent!==false){
            const mappedMouseEvent=mapEventPropToEvent(mouseEvent);

            const doc=ownerDocument(nodeRef.current);  

            //当不监听时，监听点击事件
            if(!stopListen){
                doc.addEventListener(mappedMouseEvent,handleClickAway);
            }

            //禁用监听时 应该移除监听事件
            if(stopListen){
                doc.removeEventListener(mappedMouseEvent,handleClickAway);
            }

            return ()=>{
                doc.removeEventListener(mappedMouseEvent,handleClickAway);
            }

        }
    },[handleClickAway,mouseEvent,stopListen]); 

    return <React.Fragment>
        {React.cloneElement(children, {...childrenProps,...restProps})}
    </React.Fragment>

});

ClickAwayListener.propTypes = {
    children: PropTypes.any,
    onClickAway: PropTypes.func.isRequired,
    mouseEvent:PropTypes.string
};


export default ClickAwayListener;
