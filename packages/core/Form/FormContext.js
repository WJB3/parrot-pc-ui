import React from 'react';

export const FormContext = React.createContext({
    registerForm: () => {},
    unregisterForm: () => {}
});