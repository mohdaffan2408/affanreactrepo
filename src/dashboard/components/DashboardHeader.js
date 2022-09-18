
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaCopy, FaGlobe, FaGlobeAsia, FaInstagram,FaRegCopy,FaYoutube } from 'react-icons/fa';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


function DashboardHeader(props){
    const options = {
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayHoverPause: true,
        responsive: false
      };
      
     // console.log(props.userData);
    return(
        <React.Fragment>
            <div className="site-section bg-left-half mb-5">
                <div className="un-title-default">
                <div className="text"></div>
                <div className="un-block-right">
                    <span className="bell-icon">
                    <i className="ri-notification-2-fill"></i>
                    </span>
                </div>
                </div>
                <div className="container owl-2-style">              
                    <OwlCarousel className='owl-carousel owl-2' {...options}>
                               
                        {props.userData.map((user, index)=>{
                            const socialIcon = 
                            (user.tag == 'Youtube' ? <FaYoutube size="24px" style={{"color":"red"}}/>: 
                            user.tag =='Instagram' ? <FaInstagram size="24px" style={{"color":"red"}}/> :
                            user.tag =='Total Links'? `` : ``);

                            return (
                            
                                <div className="media-29101 item" key={index}>
                                    
                               
                                    <span>{user.count}</span>
                                    <br />
                                    <span>{socialIcon}{user.tag}</span>
                                        
                                    
                                </div>
                            
                            )
                        })}
                        
                    </OwlCarousel>
               
                </div>
            </div>
        </React.Fragment>
    )
}

export default DashboardHeader;