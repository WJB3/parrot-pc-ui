
import Dialog from './Dialog';
import confirm ,{
    withWarning,
    withInfo,
    withSuccess,
    withError
} from './confirm';

export const destroyFns=[];

Dialog.confirm=confirm;
Dialog.warning=function(props){
    return confirm(withWarning(props));
}
Dialog.info=function(props){
    return confirm(withInfo(props));
}
Dialog.success=function(props){
    return confirm(withSuccess(props));
}
Dialog.error=function(props){
    return confirm(withError(props));
}

Dialog.destroyAll=function(){
    while(destroyFns.length){
        const close = destroyFns.pop();
        if (close) {
            close();
        }
    }
};
export default Dialog;