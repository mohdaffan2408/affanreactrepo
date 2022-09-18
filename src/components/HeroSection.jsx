import React from "react";
import classes from "./Styles.module.css";
import {generateOpenShortLink,generateUserLink,checkIfUserExist,} from "../helper/api";
import {Row,Col,Nav,Navbar,NavDropdown,Container,Form,FormControl,Button,} from "react-bootstrap";
import Header from "./Header";
import Login from "../components/login";
import Logout from "../components/logout";
import { Component } from "react";
import {FaCircleNotch,FaClosedCaptioning,FaCopy,FaSleigh,FaSpinner,FaTimesCircle,FaYoutube,} from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { get_Tag, validURL } from "../helper/helperfn";
import Modal from "react-awesome-modal";
import ShareButton from "react-web-share-button";
import ShareButtons from "../components/share";
import {loadCaptchaEnginge,LoadCanvasTemplate,LoadCanvasTemplateNoReload,validateCaptcha,} from "react-simple-captcha";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "../css/profile.css";

import InApp from "detect-inapp";

class HeroSection extends Component {
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
    if (this.state.value == "") {
      this.setState({ errortext_url: "Please enter your link" });
    } else if (this.state.appname == "" || this.state.appname == " ") {
      this.setState({ errortext_url: "Invalid Link" });
    } else {
      this.setState({ urlexist: true, errortext_url: "" });
      if (this.state.isLogin) {
        //user is loginned then no captcha
        this.openModal();
      } else {
        this.openCaptchaModal();
      }
    }

    //alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
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

  render() {
    const useragent = navigator.userAgent || navigator.vendor || window.opera;
    const inapp = new InApp(useragent);

    const handleCLick = (event) => {
      this.setState({ value: "" });
    };

    return (
      <>
        <div className={classes.heroBanner}>
          <div className={classes.overflowHidden}>
            <div className={classes.topHeader}>
              <div className="header">
                <Navbar
                  
                  expand="lg"
                  className={this.state.click ? classes.active : "navbar-dark"}
                >
                  <Container>
                    <div className="d-flex justify-content-start">
                    <Navbar.Brand href="#home" className="navbar-logo">
                      <img
                        className={classes.logo}
                        src={require("../assets/logo.png").default}
                        alt="Logo"
                      />
                     
                    </Navbar.Brand>
                   
                    <a
                      class="navbar-brand d-none d-lg-block"
                      href="#"
                      style={{
                        "font-family": "Roboto",
                        "font-weight": "900",
                        marginTop: "10px",
                        "font-size": "20px",
                      }}
                    >
                      APPOPENER
                    </a>
                    
                   
                   
                    </div>
                    <div className="d-flex justify-content-start">
                    {this.state.isLogin ? <Nav.Link href="/dashboard" style={{color:"white","font-family": "Roboto",
                        "font-weight": "400","font-size": "16px"}}>
                  Dashboard
                </Nav.Link> : ""}
                    </div>
                    
                  
                    <div className="d-flex justify-content-end">
                     <Nav>
                        <Form style={{ width: "100%" }}>
                          
                           
                           
                              <div className={classes.btnSignGrp}>
                                {this.state.isLogin ? (
                                  <>
                                    <div class="container d-flex flex-row">
                                      <div class="top-container">
                                        <img class="img-responsive"
                                          src={this.state.displayImage}
                                          class="img-fluid profile-image"
                                          width="70"
                                        />
                                        <div class="">
                                          <p class="name d-none d-lg-block">
                                            {this.state.displayemail}
                                          </p>
                                          <div class="mail">
                                            <Logout />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <center><Login sendData={this.getLoginDetails} /></center>
                                )}
                              </div>
                           
                         
                        </Form>
                      </Nav>
                      </div>
                   
                  </Container>
                </Navbar>
              </div>
            </div>
            <div>
              <div className={classes.stars}></div>
              <div className={classes.stars2}></div>
              <div className={classes.stars3}></div>
            </div>

            <div className={classes.innerContent}>
              <Container>
                <Row>
                  <Col xs={12} md={12} lg={6}>
                    <h1 className={classes.title}> Smarten <br/>Your Links </h1>
                    <br/>
                    <p className={classes.subTitle}>
                    Create smart links to open desired apps from url without login
                    </p>
                    <Form className={classes.signupForm} style={{marginBottom:"44px"}}>
                      <div class="input-group mt-3" style={{marginBottom:"20px"}}>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="paste your link here"
                          style={{ padding: "10px" }}
                          value={this.state.value}
                          onChange={this.handleChange}
                        />

                        <div class="input-group-append">
                          <button
                            class="btn btn-primary"
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
                      <div class="mt-3" style={{ marginLeft: "10px" }}>
                        <Button
                          className={classes.btnSignUp}
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
                    <div>
                      {/* -----Modal for Captcha---------- */}
                      <Modal style={{position:"absolute"}}
                        visible={this.state.visible_captcha}
                        width="500"
                        height="300"
                        effect="fadeInDown"
                        position="absolute"
                        onClickAway={() => this.closeCaptchaModal()}
                      >
                        <div class="modal-content" style={{ border: "0" }}>
                          <div class="modal-header text-center">
                            <h5 class="modal-title">Captcha verification</h5>
                            <a
                              href="javascript:void(0);"
                              onClick={() => this.closeCaptchaModal()}
                            >
                              <FaTimesCircle size="25px" />
                            </a>
                          </div>
                          <div className="modal-body">
                            <center>
                              <div>
                                {" "}
                                <LoadCanvasTemplate
                                  reloadText="Reload Captcha"
                                  reloadColor="green"
                                />
                                <input
                                  placeholder="Enter Captcha Value"
                                  id="user_captcha_input"
                                  className="form-control"
                                  name="user_captcha_input"
                                  type="text"
                                ></input>
                                <p className="text-danger">
                                  {this.state.errortext}
                                </p>
                                <button
                                  class="btn btn-primary"
                                  type="button"
                                  onClick={this.verifyCaptcha}
                                >
                                  Verify
                                  {this.state.loadingicon ? (
                                    <FaCircleNotch
                                      className={classes.spinner}
                                    />
                                  ) : (
                                    ""
                                  )}
                                </button>
                              </div>
                              <br></br>
                              <i>To avoid Captcha Please Login..</i>
                            </center>
                          </div>
                        </div>
                      </Modal>

                      {/* -----Modal for Captcha---END------- */}

                      <Modal style={{position:"absolute"}}
                        visible={this.state.visible}
                        width="90%"
                        height="50%"
                        effect="fadeInDown"
                        position="absolute"
                        onClickAway={() => this.closeModal()}
                      >
                        <div class="modal-content" style={{ border: "0" }}>
                          <div class="modal-header text-center">
                            <h5 class="modal-title">Smart Link</h5>
                            <a
                              href="javascript:void(0);"
                              onClick={() => this.closeModal()}
                            >
                              <FaTimesCircle size="25px" />
                            </a>
                          </div>
                          <div class="modal-body">
                            <div class="input-group mt-3">
                              <button
                                class="btn btn-secondary"
                                disabled="true"
                                type="button"
                                style={{ padding: "10px" }}
                                onClick={handleCLick}
                              >
                                <FaLink size="20px" />
                              </button>
                              <input
                                type="text"
                                class="form-control"
                                style={{ padding: "10px" }}
                                value={this.state.generatedlink}
                                disabled="true"
                              />
                              <div class="input-group-append">
                                {this.state.loadingicon ? (
                                  <>
                                    {" "}
                                    <button
                                      class="btn btn-primary"
                                      type="button"
                                      style={{ padding: "11px" }}
                                    >
                                      <FaCircleNotch
                                        className={classes.spinner}
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
                                        class="btn btn-primary"
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

                            <hr />
                          </div>
                          <div
                            class="modal-footer"
                            style={{ display: "block", "border-top": "0" }}
                          >
                            {inapp.isMobile ? (
                              <ShareButton class="" title="AppOpener Smartlink" url={this.state.generatedlink}/>
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
                        </div>
                      </Modal>
                    </div>
                  </Col>
                  <Col xs={12} md={12} lg={6} className="d-none d-lg-block">
                    <img className={classes.helmetanimate}
                      style={{
                        width: "350px",
                        right: "-24%",
                        bottom: "-12%",
                        position: "relative",
                      }}
                      src={require("../assets/helmet.png").default}
                      alt="company Logo"
                    />
                    {/* <div class="sketchfab-embed-wrapper"> 
                    <iframe title="Cool Astronaut - walk Anim ( Rigged - T pose )" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen;" width="640" height="480"  src="https://sketchfab.com/models/eb365931fa9245d19facf5e73e9871f3/embed?autostart=1&camera=0&dnt=1"> </iframe> 
                    
                    </div> */}
                
    
     
                  </Col>
                </Row>
              </Container>
            </div>
            <div className={classes.totalCount}>
              <Container>
                <div className={classes.separator}></div>
                <Row className="mt-3">
                  <Col xs={12} md={12} lg={7}>
                    <Row className="justify-content-center">
                      <Col xs={6} md={3} lg={3}>
                        <h3 className={classes.h3}>
                          200<span class="text-white-fade">+</span> thousand
                        </h3>
                        <p>Links</p>
                      </Col>
                      <Col xs={6} md={3} lg={3}>
                        <h3 className={classes.h3}>
                          75<span class="text-white-fade">+</span> thousand
                        </h3>
                        <p>Creators</p>
                      </Col>
                      <Col xs={6} md={3} lg={3} className={classes.xsNone}>
                        <h3 className={classes.h3}>
                          50<span class="text-white-fade">+</span> million
                        </h3>
                        <p>Clicks</p>
                      </Col>
                      <Col xs={6} md={3} lg={3} className={classes.xsNone}>
                        <h3 className={classes.h3}>
                          99.9<span class="text-white-fade">%</span>
                        </h3>
                        <p>Uptime</p>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={12} md={12} lg={5}></Col>
                </Row>
              </Container>
            </div>
            <div className={classes.displayFlex}>
              <img
                className={classes.bgImg}
                src={require("../assets/bg.svg").default}
                alt="bg transparent"
              />
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 1680 40"
              class="position-absolute width-full z-1"
            >
              <path
                d="M0 40h1680V30S1340 0 840 0 0 30 0 30z"
                fill="#fff"
              ></path>
            </svg>
          </div>
        </div>
        <div></div>
        {/* --------Calling Login component just to get state value google obj.profile----------- */}
        <div style={{ display: "none" }}></div>
      </>
    );
  }
}

export default HeroSection;
