

import { matchNamePath } from './valueUtil';

class NameMap{
    list=[];

    set(key,value){
        const index=this.list.findIndex(item=>matchNamePath(item.key,key));
        if(index!==-1){
            this.list[index].value=value;
        }else{
            this.list.push({
                key,
                value
            })
        }
    }

    get(key){
        const result=this.list.find(item=>matchNamePath(item.key,key));
        return result && result.value;
    }

    update(key,updater){
        const origin=this.get(key);
        const next=updater(origin);

        if(!next){
            this.delete(key);
        }else{
            this.set(key,next);
        }
    }

    delete(key){
        this.list=this.list.filter(item=>!matchNamePath(item.key,key));
    }

    map(callback){
        return this.list.map(callback);
    }

    toJSON(){
        const json={};
        this.map(({key,value})=>{
            json[key.join(".")]=value;
            return null;
        });
        return json;
    }
}

export default NameMap;