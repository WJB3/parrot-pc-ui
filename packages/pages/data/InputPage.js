

import React from 'react';
import InputText from '@packages/core/InputText';
import ConfigProvider from '@packages/core/ConfigProvider';

const Page=(props)=>{
    return (
        <ConfigProvider componentSize={"small"}>
            <InputText size="small" allowClear placeholder="Basic usage" maxLength={5} prefix={"A"} suffix={"A"} />
        </ConfigProvider>
    )
}

export default Page;    