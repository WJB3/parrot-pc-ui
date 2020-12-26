import Message ,{ notice } from './Message';

["error","success","warning","info"].forEach(status=>Message[status]=(args)=>notice({...args,color:status}))

export default Message;