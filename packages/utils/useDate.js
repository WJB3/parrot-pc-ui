
function transformWeek(number) {
    switch (number) {
        case 0:
            return "星期天";
        case 1:
            return "星期一";
        case 2:
            return "星期二";
        case 3:
            return "星期三";
        case 4:
            return "星期四";
        case 5:
            return "星期五";
        case 6:
            return "星期六";
        default:
            return "星期？";
    }
}

export function transformMonth(number) {
    let num;
    if(typeof number==="number"){
        num=number;
    }else if(typeof number==="string"){
        num=Number(number);
    }
    switch (num) {
        case 1:
            return "一月";
        case 2:
            return "二月";
        case 3:
            return "三月";
        case 4:
            return "四月";
        case 5:
            return "五月";
        case 6:
            return "六月";
        case 7:
            return "七月";
        case 8:
            return "八月";
        case 9:
            return "九月";
        case 10:
            return "十月";
        case 11:
            return "十一月";
        case 12:
            return "十二月"; 
        default:
            return "？月";
    }
}

function transformYear(number){
    return `${number}年`
}

export function complete(number) {
    if (!number) {
        return "";
    }
    if (String(number).length === 1) {
        return `0${number}`
    }
    return number;
}

export const weekEnum=['日','一','二','三','四','五','六']; 

export function generateDate(date){
    
    const { startOfMonth,daysOfMonth }=useDate(date);
    const { week }=useDate(startOfMonth);

 

    let arr=[];

    for(let i=0;i<week;i++){
        //星期一往前面添加一个"" 以此类推
        arr.push("");
    }

    for(let i=1;i<=daysOfMonth;i++){
        arr.push(i);
    }

    //总共五行 一行7个 所以数组总数应该为5*7=35
    const restNum=35-arr.length;

    //6行
    if(restNum>0){
        if(arr.length>28){
            for(let i=0;i<restNum;i++){
                arr.push("");
            }
        }
    }else if(restNum<0){
        //7行
        for(let i=0;i<7+restNum;i++){
                arr.push("");
        }
    }

    return arr;
}

export const chunk=(date,size)=>{ 
    return generateDate(date).reduce((arr,item,idx)=>{
        return idx%size===0
        ?[...arr,[item]]
        :[...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
    },[])
}

export const chunkInput=(input,size)=>{ 
    return input.reduce((arr,item,idx)=>{
        return idx%size===0
        ?[...arr,[item]]
        :[...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
    },[])
}
 

export const  getPrevMonth=(date)=>{
    const { year,month}=useDate(date);

    if(month>1&&month<=12){
        return `${year}-${complete(Number(month)-1)}-01`;
    }

    return `${year-1}-12-01`;

}

export const getNextMonth=(date)=>{
    const { year,month }=useDate(date);
 
    
    if(month>0 && month<12){
        return `${year}-${complete(Number(month)+1)}-01`;
    }
    return `${year+1}-01-01`;
}

/**
 * 传进来一个date对象或者一个时间字符串
 * @param {}} date 
 */
export default function useDate(date) {
    //如果date是字符串 如果date是日期对象
    const newDate = date && typeof date==="string" 
        ? new Date(date) 
        : date && date instanceof Date
        ? date
        : new Date();

    let year = newDate.getFullYear();
    let month = complete(newDate.getMonth()+1);
    let day = complete(newDate.getDate());
    let week = newDate.getDay();
    let monthday = `${month}-${day}`;
    let startOfMonth=`${year}-${month}-01`;
    let endOfMonth=`${year}-${month}-${new Date(year,month,0).getDate()}`;
    let daysOfMonth=`${new Date(year,month,0).getDate()}`;
    let time=newDate.getTime();

 
    return {
        date:newDate,
        fullDate:`${year}-${month}-${day}`,
        time:time,
        year: year,
        month: month,
        day: day,
        week: week,
        monthday: monthday,
        weekTransform: transformWeek(week),
        monthTransform:transformMonth(month),
        yearTransform:transformYear(year),
        //每月的第一天
        startOfMonth:startOfMonth,
        //每月的最后一天
        endOfMonth:endOfMonth,
        //每个月的天数
        daysOfMonth:daysOfMonth,
    }
}