
import Notification,{ notice } from './Notification';

["error","success","warning","info","danger"].forEach(status=>Notification[status]=(args)=>notice({...args,color:status}))

export default Notification;