import Message ,{ notice } from './Message';

["error","success","warning","info","danger"].forEach(status=>Message[status]=(args)=>notice({...args,color:status}))

export default Message;