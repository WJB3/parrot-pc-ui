import React ,{ useContext,useState,useMemo } from 'react';
import NoticeBase from './NoticeBase';
import ReactDOM from 'react-dom';
import classNames from '@packages/utils/classNames'; 
import {
    ConfigContext
} from '@packages/core/ConfigProvider';

let seed = 0;
const now = Date.now();

function getNoticeUuid() {
    return `Parrot-Notice_${now}_${seed++}`;
}

const Notices=React.forwardRef((props,ref)=>{

    const {
        prefixCls:customizePrefixCls,
        className,
        //最大显示数, 超过限制时，最早的消息会被自动关闭
        maxCount,
        visible
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Notices",customizePrefixCls);

    const [notices,setNotices]=useState([]);

    const [ domRender,setDomRender ]=useState(visible);

    const addNotice=(notice)=>{
        console.log("addNotices")
        const key = notice.key || getNoticeUuid();
        //要添加的notice是否存在
        const noticeIndex = notices.map((v) => v.key).indexOf(key);
        //使用concat()来复制notice数组
        const updatedNotices = notices.concat();
        //如果要加的notice已经存在
        if (noticeIndex !== -1) {
            //删除已存在的notice，加入要添加的notice
            updatedNotices.splice(noticeIndex, 1, notice);
        }else{
             //如果设置了maxCount，且notices中的数量已达到maxCount的限制，那么移除第一个notice
            if (maxCount && notices.length >= maxCount) {
                //updateKey设置为最初移除的key，最要是为了利用已存在的组件
                notice.updateKey = updatedNotices[0].updateKey || updatedNotices[0].key;
                updatedNotices.shift();
            }
            //加入的要添加的notice
            updatedNotices.push({...notice,key});
        }
        setNotices(updatedNotices);
    }
    
    React.useImperativeHandle(ref,()=>({
        addNotice
    }));

    const { Component }=useMemo(()=>{

        let Component=null;

        console.log(notices)

        if(notices.length>0){
            Component=notices.map((notice, index)=>{
                return (
                    <NoticeBase 
                        message={notice.content}
                        key={notice.key}
                    />
                )
            })
        } 

        return {
            Component
        }
    },[notices]);  

    return (
        <div className={classNames(prefixCls,className)}> 
            {Component}
        </div>
    )

});

 

export default function notice(config,callback){ 

    const div = document.createElement('div');

    document.body.appendChild(div);  

    let currentConfig = { ...config, visible: true };

    let called=false;

    function render({visible,...props}){
        ReactDOM.render(
            <Notices  
                ref={(instance)=>{
                    if(called){
                        return ;
                    }
                    called=true;
                    callback(instance);
                }}
                visible={visible}
            />,
            div
        );
    }

    render(currentConfig);
    
};