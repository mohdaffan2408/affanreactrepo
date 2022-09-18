import React,{Component} from 'react';
import { FaFacebook, FaInstagram, FaMailBulk, FaMobile, FaPinterest, FaTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import classes from "./Styles.module.css";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  componentDidMount(){
      console.clear();
  }
  render() { 
    return (  <>
    <footer class="bg-white">
     <div class="container">
         <div class="row">
         <div class="col-lg-1 col-md-1 mb-4" ></div>
         <div class="col-lg-4 col-md-4 mb-4" >
          
         <img className={classes.logo} src={require("../assets/slogo.png").default} alt="Logo" />
                 <p class="text-muted mb-4" style={{width:"250px"}}>Loginskip . <br/>F-198, Beta - 2, Greater Noida, Gautam Buddh Nagar, Uttar Pradesh -201308</p>
               
             </div>
             <div class="col-lg-3 col-md-4 mb-4 mb-lg-0">
                 <h6 class="text-uppercase font-weight-bold mb-4">Contact Details</h6>
                 <ul class="list-unstyled mb-0">
                     <li class="mb-2"><FaMobile size="20px" style={{"color":"blue"}}/> <a href="#" style={{textDecoration:"none"}} class="text-muted"> 8882044912</a></li>
                     <li class="mb-2"><FaWhatsapp size="20px" style={{"color":"green"}}/><a href="#" style={{textDecoration:"none"}} class="text-muted"> 8882044912</a></li>
                     <li class="mb-2"><FaMailBulk size="20px" style={{"color":"orange"}}/><a href="#" style={{textDecoration:"none"}} class="text-muted"> support@appopener.com</a></li>
                    
                 </ul>
             </div>
             <div class="col-lg-3 col-md-3 mb-4 mb-lg-0">
                 <h6 class="text-uppercase font-weight-bold mb-4">Connect with us</h6>
                 <ul class="list-inline mt-4">
                    
                     <li class="list-inline-item"><a href="https://www.facebook.com/appopenerdotcom" target="_blank" title="facebook"><FaFacebook size="32px"/></a></li>
                     <li class="list-inline-item"><a href="https://www.instagram.com/appopener.com_/" target="_blank" title="instagram"><FaInstagram size="32px"/></a></li>
                     <li class="list-inline-item"><a href="https://www.youtube.com/channel/UCLjMKK2diNyhlTZ-H54Bjww" target="_blank" title="youtube"><FaYoutube size="32px"/></a></li>
                     <li class="list-inline-item"><a href="https://www.pinterest.com/appopener/" target="_blank" title="pinterest"><FaPinterest size="32px"/></a></li>
                     
                 </ul>
             </div>
             <div class="col-lg-1 col-md-1 mb-4" ></div>
           
           
         </div>
     </div>
    
 </footer>
    
    </>);
  }
}
 
export default Footer;