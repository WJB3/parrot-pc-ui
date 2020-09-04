
import React from 'react';
import {
    getNamePath,
    getValue,
    cloneByNamePathList
} from './utils/valueUtil'; 
import NameMap from './utils/NameMap';
import useForceUpdate from '@packages/hooks/useForceUpdate';

export const HOOK_MARK="FORM_INTERNAL_HOOKS";

export class FormStore {

    forceRootUpdate;//强制更新

    fieldEntities = [];

    formHooked=false;//是否调用了formHooked

    subscribable=true;//是否具有订阅能力

    constructor(forceRootUpdate) {
        this.forceRootUpdate = forceRootUpdate;
    }

    //=========== value =============//

    getFieldValue = (name) => {
        const namePath = getNamePath(name);
        return getValue(this.store, namePath);
    };

    getFieldsValue = (nameList, filterFunc) => {
        if (nameList === true && !filterFunc) {
            return this.store;
        }

        const fieldEntities = this.getFieldEntitiesForNamePathList(
            Array.isArray(nameList) ? nameList : null,
        );

        const filteredNameList = [];
        fieldEntities.forEach((entity) => {
            const namePath = 'INVALIDATE_NAME_PATH' in entity ? entity.INVALIDATE_NAME_PATH : entity.getNamePath();
            if (!filterFunc) {
                filteredNameList.push(namePath);
            } else {
                const meta = 'getMeta' in entity ? entity.getMeta() : null;
                if (filterFunc(meta)) {
                    filteredNameList.push(namePath);
                }
            }
        });

        return cloneByNamePathList(this.store,filteredNameList.map(getNamePath));

    }

    //=========== Fields ================//
    getFieldEntities = (pure = false) => {
        if (!pure) {
            return this.fieldEntities;
        }
        return this.fieldEntities.filter(field => field.getNamePath().length);
    }

    getFieldsMap = (pure = false) => {
        const cache = new NameMap();

        this.getFieldEntities(pure).forEach(field => {
            const namePath = field.getNamePath();
            cache.set(namePath, field);
        });
        return cache;
    }

    getFieldEntitiesForNamePathList = (nameList) => {
        if (!nameList) {
            return this.getFieldEntities(true);
        }
        const cache = this.getFieldsMap(true);
        return nameList.map(name => {
            const namePath = getNamePath(name);
            return cache.get(namePath) || { INVALIDATE_NAME_PATH: getNamePath(name) }
        })
    }


    getForm = () => ({
        getFieldValue: this.getFieldValue,
        getFieldsValue: this.getFieldsValue,

        getInternalHooks:this.getInternalHooks,
    });

    //====================Internal Hooks===============================
    getInternalHooks=(key)=>{
        if(key===HOOK_MARK){
            this.formHooked=true;

            return {
                dispatch:this.dispatch
            }
        }
    }

    dispatch=(action)=>{
        switch(action.type){
            case "updateValue":{
                const {namePath,value}=action;

            }
        }
    }

}



function useForm(form) {
    const formRef = React.useRef();

    const forceUpdate = useForceUpdate();

    if (!formRef.current) {
        if (form) {
            formRef.current = form;
        } else {
            const forceReRender = () => {
                forceUpdate()
            };

            const formStore = new FormStore(forceReRender);

            formRef.current = formStore.getForm();
        }
    }

    return [formRef.current];
}

export default useForm;