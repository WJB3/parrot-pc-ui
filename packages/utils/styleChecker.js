export const isStyleSupport=(styleName)=>{
    
    if(typeof window!=='undefined' && window.document && window.document.documentElement){
        const styleNameList=Array.isArray(styleName)?styleName:[styleName];

        const {documentElement}=window.document;

        return styleNameList.every(name=>name in documentElement.style);
    }

    return false;
}