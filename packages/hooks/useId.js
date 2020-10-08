

import React from 'react';

export default function useId(idOverride,component="component"){
    
    const defaultId=`parrot-ui-${component}-${Math.round(Math.random()* (10 ** 5))}`;

    const id=idOverride || defaultId;
  
    return id;
}

