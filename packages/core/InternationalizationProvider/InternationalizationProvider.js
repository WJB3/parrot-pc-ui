
import InternationalizationContext from './context';

const InternationalizationProvider=(props)=>{

    const {
        children,
        locale={}
    }=props;


    return (
        <InternationalizationContext.Provider
            value={{...locale,exist:true}}
        >
            {
                children
            }
        </InternationalizationContext.Provider>
    )
}

export default InternationalizationProvider;