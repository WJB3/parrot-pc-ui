import React from 'react';
import InfoSvg from '../svg/Info';

import ParrotIcon from '../components/ParrotIcon';

const Error=(props,ref)=><ParrotIcon {...props} ref={ref} icon={InfoSvg} />;

export default React.forwardRef(Error);