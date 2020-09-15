

import React, { useEffect,useState } from 'react';
import ConfigProvider from '@packages/core/ConfigProvider';
import axios from 'axios'; 


const Page=(props)=>{

    const [url,setUrl]=useState('');

    useEffect(()=>{
//         axios('http://116.85.13.76:3636/getpaypic?id=2', { responseType: 'arraybuffer' }).then(res => {
//             console.log(res);
//             setUrl('data:image/png;base64,' +
// btoa(new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), '')))
//             // this.wechatUrl =
//             //   'data:image/png;base64,' +
//             //   btoa(new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), ''))
//         });
    },[]);

    return(
        <ConfigProvider componentSize={"large"}>
            <img src={url}/>
        </ConfigProvider>
    )
}

export default Page;