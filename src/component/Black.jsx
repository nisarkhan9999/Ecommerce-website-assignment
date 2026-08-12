import para from "../images/prada-logo-1 1.svg"
import gucci from "../images/gucci-logo-1 1.png"
import zara from "../images/zara-logo-1 1.svg"
import calvin from "../images/Group (1).svg"
import vers from "../images/Group.svg"
import "./black.css"

const Black =()=>{
return(
<div className="query">
<div ><img src={para} alt="" style={{width:"120px", marginTop:"10px"}} /></div>
<div><img src={gucci} alt=""style={{width:"100px", marginTop:"10px"}} /></div>
<div><img src={zara} alt="" style={{width:"60px", marginTop:"10px"}}/></div>
<div><img src={calvin} alt=""style={{width:"150px", marginTop:"10px"}} /></div>
<div ><img src={vers} alt=""style={{width:"100px", marginTop:"10px"}} /></div>
</div>
)}
export default Black