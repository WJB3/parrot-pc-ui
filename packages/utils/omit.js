
//去除props上除fields外的其他属性

export default function omit(object,fields){

    let copy=Object.assign({},object);

    for(let i=0;i<fields.length;i++){
        let field=fields[i];
        delete copy[field];
    }

    return copy;

}