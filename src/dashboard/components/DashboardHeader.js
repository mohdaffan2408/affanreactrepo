
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  FaInstagram,FaYoutube } from 'react-icons/fa';
import { RiNotification2Fill } from 'react-icons/ri';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Logout from "../../components/logout";

//function DashboardHeader(props){
class DashboardHeader extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            aop_email:localStorage.getItem('aop_email'),
            options : {
                loop: true,
                margin: 10,
                autoplay: true,
                autoplayHoverPause: true,
                responsive: false,
                dotsEach: true
              },
            userData: this.props.userData
        }
        
    }
    
    // static getDerivedStateFromProps(props, state){
    //     return {
    //         userData: props.userData
    //     }
    // }
     
     render(){
    return(
        <React.Fragment>
            <div className="site-section bg-left-half mb-5">
                <div className="un-title-default">
                <div className="text"></div>
                <div className="un-block-right">
                    <span className="bell-icon">
                        <span className="aop_email">{ this.state.aop_email }</span>
                        <RiNotification2Fill />
                        <Logout />
                    </span>
                </div>
                
                </div>
                <div className="container owl-2-style">              
                    <OwlCarousel className='owl-carousel owl-2' {...this.state.options}>
                               
                        {this.state.userData.map((user, index)=>{
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
}

export default DashboardHeader;