

import React from 'react';

export default function useId(idOverride){
    
    const defaultId=`parrot-ui-${Math.round(Math.random()* (10 ** 5))}`;

    const id=idOverride || defaultId;
  
    return id;
}

