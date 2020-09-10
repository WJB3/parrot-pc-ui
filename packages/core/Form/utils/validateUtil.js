

import RawAsyncValidator from 'async-validator';

async function finishOnAllFailed(rulePromises){
    return Promise.all(rulePromises).then((errorsList)=>{
        const errors=[].concat(...errorsList);

        return errors;
    })
}

async function finishOnFirstFailed(rulePromises){
    let count=0;

    return new Promise(resolve=>{
        rulePromises.forEach(promise=>{
            promise.then(errors=>{
                if(errors.length){
                    resolve(errors);
                }

                count+=1;

                if(count===rulePromises.length){
                    resolve([]);
                }
            })
        })
    })
}

async function validateRule(name,value,rule,options){
    const cloneRule={...rule};
  
    const validator=new RawAsyncValidator({
        [name]:[cloneRule]
    }); 

    validator.messages({
        ...options.validateMessages
    })

    let result=[];

    try{
        await Promise.resolve(validator.validate({
            [name]:value
        },{...options})); 
    }catch(errObj){
        if(errObj.errors){
            result=errObj.errors.map(({message})=>
                message
            );
        }else{
            console.error(errObj);
            result=[];
        }
    }
    
    return result;
}


export function validateRules(
    namePath,
    value,
    rules,
    options,
    validateFirst
){
    const name=namePath.join('.');

    const filledRules=rules.map(currentRule=>{

        const originValidatorFunc=currentRule.validator;
        //如果没有自定义校验
        if(!originValidatorFunc){
            return currentRule;
        }
    })

    let summaryPromise;

    if(validateFirst===true){
        summaryPromise=new Promise(async (resolve,reject)=>{
            for(let i=0;i<filledRules.length;i+=1){
                const errors=await validateRule(name,value,filledRules[i],options)
                if(errors.length){
                    reject(errors);
                    return ;
                }
            }

            resolve([]);
        });
    }else{
        const rulePromises=filledRules.map(rule=>
            validateRule(name,value,rule,options),    
        );

        summaryPromise=(validateFirst
            ?finishOnFirstFailed(rulePromises)
            :finishOnAllFailed(rulePromises)
        ).then((errors)=> {
            if (!errors.length) {
              return [];
            }
      
            return Promise.reject(errors);
        });

    }

    summaryPromise.catch(e=>e);
    return summaryPromise;
}