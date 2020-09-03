
import React from 'react';
import {
    getNamePath,
    getValue
} from './utils/valueUtil';
import { getValue } from '../form3/field-form/utils/valueUtil';

export class FormStore{

    forceRootUpdate;//强制更新
    
    constructor(forceRootUpdate){
        this.forceRootUpdate=forceRootUpdate;
    }


    getFieldValue=(name)=>{
        const namePath=getNamePath(name);
        return getValue(this.store,namePath);
    };

    
    getForm=()=>({
        getFieldValue:this.getFieldValue,
    });

}



function useForm(form){
    const formRef=React.useRef();

    const [,forceUpdate]=React.useState();

    if(!formRef.current){
        if(form){
            formRef.current=form;
        }else{
            const forceReRender=()=>{
                forceUpdate({})
            };

            const formStore = new FormStore(forceReRender);

            formRef.current=formStore.getForm();
        }
    }

    return [formRef.current];
}

export default useForm;