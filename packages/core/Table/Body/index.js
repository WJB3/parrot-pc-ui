

import React ,{useContext} from 'react';
import TableContext from '../context/TableContext';
import BodyContext from '../context/BodyContext';
import ResizeContext from '../context/ResizeContext';

const Body=(props)=>{

    const {
        data
    }=props;

    const { getComponent }=useContext(TableContext);

    return React.useMemo(()=>{

        const WrapperComponent=getComponent(['body','wrapper'],'tbody');
        const trComponent=getComponent(['body','row'],'tr');
        const tdComponent=getComponent(['body','cell'],'td');

        let rows;
        
    })


};

export default Body;