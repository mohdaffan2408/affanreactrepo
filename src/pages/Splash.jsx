import { Component } from "react";
import React from "react";
import classes from "../components/Styles.module.css";
import {getURLandredirect} from '../helper/api';
import "../css/splash.css";
import logo from "../assets/logo.png";
import appopener_text from "../assets/ac.png"
//import splash_adv from "../assets/splash/splash_adv.png";


class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = { intentvalue : "",original_url:"", ostype:"" }
    }
  
    componentDidMount(){
        let apptag = this.props.match.params.apptype;
        let shortstring = this.props.match.params.shorturl;
        getURLandredirect(apptag,shortstring).then(res =>{
         
           // console.log(res);
           // console.log(res.data.app_intend);
           // console.log(res.data.originalURL);
            this.setState({intentvalue : res.data.app_intend});
            this.setState({original_url : res.data.originalURL});
            this.setState({ostype : res.data.os_type});
            let app_intend = this.state.intentvalue;
                let originalURL = this.state.original_url;
            
                const click_link = document.getElementById("abcd");
                if(app_intend === "Desktop" || app_intend ==="Mobile"){
                    app_intend = originalURL;
                }
                if(this.state.ostype == "windows"){
                    click_link.setAttribute("href", app_intend);
                    click_link.click();
                    //console.log("hello")

                }
                else{
                    click_link.setAttribute("href", app_intend);
                    window.location.assign(app_intend);

                }

        });
        
    }

    
   
    render() { 
        return ( <>
         <div className={classes.mainContainer}> 
        
        {/* <h1>Splash page - {this.props.match.params.apptype}</h1>
        <a href={this.state.intentvalue}>{this.state.intentvalue}</a> */}
        <center>
            <br />
            <a href="https://www.appopener.com/open">
                <img src={logo} style={{"width": "50px"}} alt="AppOpener" />
            </a>
        </center>
        <center style={{"margin-top": "100px"}}>
            <a href="https://www.appopener.com/open">
                <img class="rotate" id="sticker" src={appopener_text} alt="AppOpener" />
            </a>
        </center>

        <center>
            <p class="text" style={{"margin-top": "50px"}}>Boosting Your Link ...</p>
        </center>
       
        {/* <div class="poster_container">
        <center>
        <a href="https://yellowdiary.appopener.com/" target="_blank">
                <img class="splash_poster img-responsive" src={splash_adv} alt="AppOpener" />
            </a>
            </center>
        </div> */}
      

        <center>
            <p class="footer">
                <a id="abcd" target="_blank" style={{"text-decoration": "none", "color": "rgb(14, 113, 226)", "font-size": "20px", "font-family": "system-ui"}}>CLICK HERE</a>
                <br /><br />
                if this page doesn't redirect you automatically
            </p>
        </center>
        </div>

        </> );
    }
}
 
export default Splash;