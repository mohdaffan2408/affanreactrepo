
import React,{ Component, useState} from "react";
import {generateOpenShortLink,generateUserLink,checkIfUserExist,} from "../../helper/api";
import {Row,Col,Nav,Navbar,NavDropdown,Container,Form,FormControl,Button,} from "react-bootstrap";
import {FaCircleNotch,FaClosedCaptioning,FaCopy,FaSleigh,FaSpinner,FaTimesCircle,FaYoutube,} from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { get_Tag, validURL } from "../../helper/helperfn";
import {loadCaptchaEnginge,LoadCanvasTemplate,LoadCanvasTemplateNoReload,validateCaptcha,} from "react-simple-captcha";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ShareButton from "react-web-share-button";
import ShareButtons from "../../components/share";
import { RiCactusFill, RiCloseCircleFill, RiCloseLine } from 'react-icons/ri';
//import "../css/profile.css";

import InApp from "detect-inapp";

class GeneratedLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      appname: "",
      old_original_url: "",
      errortext: "",
      loadingicon: false,
      urlexist: false,
      errortext_url: "",
      captchadone: false,
      copied: false,
      generatedlink: "",
      isLogin: false,
      googleuserID: "",
      GoogleAuthToken: "",
      displayemail: "",
      displayImage: "",
      displayname: "",
      showResults: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getLoginDetails = this.getLoginDetails.bind(this);
  }
  componentDidMount() {
    //this.getLoginDetails()
  }
   
  getLoginDetails(val) {
    // alert("hi");
    // do not forget to bind getData in constructor
    //console.log("hello - ",val);
    //console.log("userID herosection - ", val.googleId);
    // console.log("email herosection - ",val.profileObj.email);
    if (val.googleId) {
      this.setState({
        googleuserID: val.googleId,
        isLogin: true,
        displayemail: val.profileObj.email,
        displayImage: val.profileObj.imageUrl,
        displayname: val.profileObj.name,
        GoogleAuthToken: val.tokenObj.id_token,
      });
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value });

    let appnames = "";
    appnames = get_Tag(event.target.value);
    this.setState({ appname: appnames });
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.value == "") {
      this.setState({ errortext_url: "Please enter your link" });
    } else if (this.state.appname == "" || this.state.appname == " ") {
      this.setState({ errortext_url: "Invalid Link" });
    } else {
      this.setState({ urlexist: true, errortext_url: "",showResults: true });
      this.openModal();
      // if (this.state.isLogin) {
      //   //user is loginned then no captcha
      //   this.openModal();
      // } else {        
      //   this.openCaptchaModal();
      // }
    }
    
    //alert('A name was submitted: ' + this.state.value);
    
  }
  openModal() {
    this.setState({ visible: true, loadingicon: true });

    //check if same link is clicked again & again

    if (this.state.value === this.state.old_original_url) {
      this.setState({
        loadingicon: false,
        generatedlink: this.state.generatedlink,
      });
    } else {
      //check if user is login or not
      if (this.state.isLogin) {
        this.setState({ generatedlink: "", copied: false });
        //check first whether to create new user account or not
        checkIfUserExist(
          this.state.displayname,
          this.state.displayemail,
          this.state.googleuserID
        );

        generateUserLink(
          this.state.appname,
          this.state.value,
          this.state.GoogleAuthToken
        ).then((res) => {
          //console.log("status");
          //console.log(res.status);
          if(res.status == 401){
            alert("Invalid Token Please try again");
            window.location.reload();
            return;
          }
          let tag = res.data.tag.toLowerCase();
          //console.log(tag);
          let original_url = res.data.originalURL;

          if (tag === "youtube") {
            tag = "yt";
          } else if (tag === "instagram") {
            tag = "ig";
          } else {
            tag = "web";
          }
          let generated_url = "https://appopener.com/" + tag + "/" + res.data.url;
          this.setState({
            loadingicon: false,
            old_original_url: original_url,
            generatedlink: generated_url,
          });
        });
      } else {
        this.setState({ generatedlink: "" });
        generateOpenShortLink(this.state.appname, this.state.value).then(
          (res) => {
            //console.log(res);
            let tag = res.data.tag.toLowerCase();
            if (tag === "youtube") {
              tag = "yt";
            } else if (tag === "instagram") {
              tag = "ig";
            } else {
              tag = "web";
            }
            let original_url = res.data.originalURL;
            let generated_url =
              "https://appopener.com/" + tag + "/" + res.data.url;
            //this.setState({intentvalue : res.data.app_intend});
            this.setState({
              loadingicon: false,
              old_original_url: original_url,
              generatedlink: generated_url,
            });
          }
        );
      }
    }
  }
  openCaptchaModal() {
    this.setState({
      visible_captcha: true,
      errortext: "",
      loadingicon: false,
    });
    loadCaptchaEnginge(4, "black", "white");
  }
  closeCaptchaModal() {
    this.setState({
      visible_captcha: false,
    });
  }

  closeModal() {
    this.setState({
      visible: false,
    });
    this.closeCaptchaModal();
  }

  verifyCaptcha = () => {
    this.setState({
      errortext: "",
      loadingicon: false,
    });
    let user_captcha = document.getElementById("user_captcha_input").value;
    if (user_captcha === "" || user_captcha === " ") {
      this.setState({
        errortext: "Please enter captcha value",
      });
    } else {
      if (validateCaptcha(user_captcha) == true) {
        this.setState({
          errortext: "Verified Please wait ... ",
          loadingicon: true,
        });
        loadCaptchaEnginge(4, "black", "white");
        document.getElementById("user_captcha_input").value = "";

        this.openModal();
      } else {
        this.setState({
          errortext: "Captcha not matched, Plz try again",
        });
        document.getElementById("user_captcha_input").value = "";
      }
    }
  };


    // let generatedLink = 'https://appopener.com/yt/6p1pmuqap';
    // const [showResults, setShowResults] = useState(false);
    // const onClick = () => setShowResults(true);
    
    render(){
      //let showResults = true;
      const useragent = navigator.userAgent || navigator.vendor || window.opera;
      const inapp = new InApp(useragent);

      const handleCLick = (event) => {
        this.setState({ value: "" });
      };

    return (
      
        <div className="modal transition-bottom screenFull defaultModal mdlladd__rate fade" id="mdllAddETH" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog">
         <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="title-modal">Smart & Secure Links</h1>
              <RiCloseCircleFill size="30px" data-bs-dismiss="modal" aria-label="Close" style={{cursor: 'pointer'}} />
            </div>
            <div className="modal-body">
              <div className="content-upload-item">
                <div className="text-center icon-svg" style={{display: this.state.showResults === true ? 'block': 'none' }}>

                  {inapp.isMobile ? (
                              <ShareButton className="" title="AppOpener Smartlink" url={this.state.generatedlink}/>
                            ) : (
                              <>
                                <center>
                                  <ShareButtons
                                    title="AppOpener Smartlink"
                                    url={this.state.generatedlink}
                                    tags="#appopener"
                                  />
                                </center>
                              </>
                            )}
                </div>
                <div className="un-navMenu-default margin-t-30 p-0">
                  <ul className="nav flex-column">
                    <li className="nav-item">
                      
                      <Form>
                        <div className="form-group form-with-select glink-form-div">
                          <div className="input_group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="paste your link here"
                              style={{ padding: "10px" }}
                              value={this.state.value}
                              onChange={this.handleChange}
                            />

                            <div className="input-group-append">
                              <button
                                className="btn btn-primary"
                                type="button"
                                style={{ padding: "11px" }}
                                onClick={handleCLick}
                              >
                                {this.state.appname === "Youtube" ? (
                                  <FaYoutube size="25px" />
                                ) : this.state.appname === "Instagram" ? (
                                  <FaInstagram size="25px" />
                                ) : (
                                  <FaLink size="25px" />
                                )}
                              </button>
                            </div>
                            
                          </div>
                          
                          <Button
                              className="btn btn-md-size bg-primary text-white rounded-pill glink-btn"
                              variant="primary"
                              type="submit"
                              onClick={this.handleSubmit}
                            >
                              Generate Link
                            </Button>
                            
                      </div>
                    </Form>
                    <p style={{ color: "red", paddingLeft: "10px" }}>
                            {this.state.errortext_url}
                          </p>
                    </li>
                    <li className="nav-item" style={{display: this.state.showResults === true ? 'block': 'none' }}>
                      {/* <button type="button" className="btn nav-link bg-snow " onClick={()=> {navigator.clipboard.writeText(generatedLink)}}> <div className="item-content-link">
                          <div className="icon-svg">
                            <img src={require("../../assets/icons/links-line.svg").default} alt="" />
                          </div>
                          <div className="item-content-text">
                            <h3 className="link-title">{generatedLink}</h3>
                          </div>
                        </div>
                        <div className="other-cc">
                          <span className="badge-text"></span>
                          <div className="icon-arrow">
                            <i className="ri-file-copy-2-line"></i>
                          </div>
                        </div>
                      </button> */}
                      <div className="input-group mt-3">
                              <button
                                className="btn btn-secondary"
                                disabled={true}
                                type="button"
                                style={{ padding: "10px" }}
                                onClick={handleCLick}
                              >
                                <FaLink size="20px" />
                              </button>
                              <input
                                type="text"
                                className="form-control"
                                style={{ padding: "10px" }}
                                value={this.state.generatedlink}
                                disabled={true}
                              />
                              <div className="input-group-append">
                                {this.state.loadingicon ? (
                                  <>
                                    {" "}
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      style={{ padding: "11px" }}
                                    >
                                      <FaCircleNotch
                                        // className={classes.spinner}
                                      />{" "}
                                      Please wait
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <CopyToClipboard
                                      text={this.state.generatedlink}
                                      onCopy={() =>
                                        this.setState({ copied: true })
                                      }
                                    >
                                      <button
                                        className="btn btn-primary"
                                        type="button"
                                        style={{ padding: "11px" }}
                                      >
                                        <FaCopy size="25px" /> Copy Link
                                      </button>
                                    </CopyToClipboard>
                                  </>
                                )}
                              </div>
                            </div>
                            {this.state.copied ? (
                              <p style={{ color: "red", padding: "5px" }}>
                                link copied
                              </p>
                            ) : (
                              ""
                            )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    );
  }
}
export default GeneratedLink;

