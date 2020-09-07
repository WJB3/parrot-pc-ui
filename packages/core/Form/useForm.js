
import React from 'react';
import {
    getNamePath,
    getValue,
    cloneByNamePathList,
    setValue,
    containsNamePath,
    setValues
} from './utils/valueUtil'; 
import {
    allPromiseFinish
} from './utils/asyncUtil'
import NameMap from './utils/NameMap';
import useForceUpdate from '@packages/hooks/useForceUpdate';
import { defaultValidateMessages } from '../form3/field-form/utils/messages';
 

export const HOOK_MARK="FORM_INTERNAL_HOOKS";

export class FormStore {

    forceRootUpdate;//强制更新

    fieldEntities = [];

    store={};

    formHooked=false;//是否调用了formHooked

    subscribable=true;//是否具有订阅能力

    lastValidatePromise=null;

    initialValues = {};

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

    getDependencyChildrenFields=(rootNamePath)=>{
        const children=new Set();
        const childrenFields=[];

        const dependencies2fields=new NameMap();

        this.getFieldEntities().forEach(field=>{
            const {dependencies}=field.props;
            (dependencies || []).forEach(dependency=>{
                const dependencyNamePath=getNamePath(dependency);
                dependencies2fields.update(dependencyNamePath,(fields=new Set())=>{
                    fields.add(field);
                    return fields;
                })
            })
        });

        const fillChildren=(namePath)=>{
            const fields=dependencies2fields.get(namePath)||new Set();
            fields.forEach(field=>{
                if(!children.has(field)){
                    children.add(field);

                    const fieldNamePath=field.getNamePath();

                    if(field.isFieldDirty() && fieldNamePath.length){
                        childrenFields.push(fieldNamePath);
                        fillChildren(fieldNamePath);
                    }
                }
            })
        }

        fillChildren(rootNamePath);

        return childrenFields;

    }

    /**
   * First time `setInitialValues` should update store with initial value
   */
    setInitialValues = (initialValues, init) => {
        this.initialValues = initialValues || {};
        if (init) {
            this.store = setValues({}, initialValues, this.store);
        }
    }; 
 
    getForm = () => ({
        getFieldValue: this.getFieldValue,
        getFieldsValue: this.getFieldsValue,
        getInternalHooks:this.getInternalHooks,
    });

    //===================validateFields================================
    validateFields=(nameList,options)=>{
        const provideNameList=!!nameList;
        const namePathList=provideNameList?nameList.map(getNamePath):[];

        const promiseList=[];

        this.getFieldEntities(true).forEach((field)=>{
            if(!provideNameList){
                namePathList.push(field.getNamePath());
            }

            if(!field.props.rules||!field.props.rules.length){
                return ;
            }
            const fieldNamePath=field.getNamePath();

            if(!provideNameList||containsNamePath(namePathList,fieldNamePath)){
                const promise=field.validateRules({
                    validateMessages:{
                        ...defaultValidateMessages,
                        ...this.validateMessages
                    },
                    ...options,
                })

                promiseList.push(
                    promise
                        .then(()=>({name:fieldNamePath,errors:[]}))
                        .catch(errors=>
                            Promise.reject({
                                name:fieldNamePath,
                                errors
                            })
                        )
                )
            } 
        })
        const summaryPromise=allPromiseFinish(promiseList);
        this.lastValidatePromise=summaryPromise;

        summaryPromise
            .catch(results=>results)
            .then((results)=>{
                const resultNamePathList=results.map(({name})=>name);
                this.notifyObservers(this.store,resultNamePathList,{
                    type:"validateFinish"
                });
                this.triggerOnFieldsChange(resultNamePathList,result);
            });
        
        const returnPromise=summaryPromise
                .then(
                    ()=>{
                        if(this.lastValidatePromise===summaryPromise){
                            return Promise.resolve(this.getFieldsValue(namePathList));
                        }
                        return Promise.reject([]);
                    }
                )
                .catch((results)=>{
                    const errorList=results.filter(result=>result && result.errors.length);
                    return Promise.reject({
                        values:this.getFieldsValue(namePathList),
                        errorFields:errorList,
                        outOfDate:this.lastValidatePromise!==summaryPromise
                    })
                })

        returnPromise.catch(e=>e);
        return returnPromise;
    }

    //====================Internal Hooks===============================
    getInternalHooks=(key)=>{
        if(key===HOOK_MARK){
            this.formHooked=true;

            return {
                dispatch:this.dispatch,
                setInitialValues:this.setInitialValues,
            }
        }
    }

    dispatch=(action)=>{
        switch(action.type){
            case "updateValue":{
                const {namePath,value}=action;
                this.updateValue(namePath,value);
                break;
            }
            default:

        }
    }

    updateValue=(name,value)=>{
        const namePath=getNamePath(name);
        const prevStore=this.store;
        this.store=setValue(this.store,namePath,value);
        
        this.notifyObservers(prevStore,[namePath],{
            type:"valueUpdate",
            source:"internal"
        })

        //notify dependencies children with parent update
        const childrenFields=this.getDependencyChildrenFields(namePath);
        this.validateFields(childrenFields);

        this.notifyObservers(prevStore,childrenFields,{
            type:"dependenciesUpdate",
            relatedFields:[namePath,...childrenFields]
        });

        const {onValuesChange}=this.callbacks;

        if(onValuesChange){
            const changeValues=cloneByNamePathList(this.store,[namePath]);
            onValuesChange(changeValues,this.store);
        }

        this.triggerOnFieldsChange([namePath,...childrenFields]);


    }

    notifyObservers=(prevStore,namePathList,info)=>{
        if(this.subscribable){
            const mergedInfo={
                ...info,
                store:getFieldsValue(true)
            };
            this.getFieldEntities().forEach(({onStoreChange})=>{
                onStoreChange(prevStore,namePathList,mergedInfo);
            })  
        }else{
            this.forceRootUpdate();
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