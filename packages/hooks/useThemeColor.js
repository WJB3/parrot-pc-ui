export default function useThemeColor(color,opacity=1){
 
    let typeArr={
        "primary":`rgba(0,189,170,${opacity})`,
        "second":`rgba(64,0,130,${opacity})`,
        "warning":`rgba(252,227,138,${opacity})`,
        "info":`rgba(7,121,228,${opacity})`,
        "danger":`rgba(255,46,99,${opacity})`,
        "success":`rgba(107,198,0,${opacity})`
    };

    return React.useMemo(()=>{
        return  typeArr[color]?`${typeArr[color]}`:color;
    },[color,opacity])

}