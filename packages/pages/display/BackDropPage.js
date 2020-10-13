import React, { useEffect, useState } from 'react';
import BackDrop from '@packages/core/BackDrop';
import Button from '@packages/core/Button';
import Tooltip from '@packages/core/Tooltip';
import { Popover, Checkbox } from 'antd'; 
 
const Page = React.forwardRef((props, ref) => {

    const [visible, setVisible] = useState(false);
    const [options, setOptions] = useState([]);

    useEffect(() => {
      
    }, [])

    console.log(options.map((item) => item.label))

    return <React.Fragment>
       
        <BackDrop visible={visible} onClick={() => setVisible(!visible)}>
            {"A"}
        </BackDrop>
    </React.Fragment>
});

export default Page;