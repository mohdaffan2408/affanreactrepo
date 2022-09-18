import React, { useState } from "react";
import { FaYoutube } from "react-icons/fa";
import classes from "./Styles.module.css";


const MultiImgSlider = () => {
  return (
    <>
     <div className={classes.sliderContainer}>
    

    <div className={classes.stakeHolderInfo}>
      <div className={classes.profileImg}>
        <img src={require("../assets/users/bhuvan.png").default} alt="Logo" />
      </div>
      <div className={classes.info}>
        <h4>Bhuvan Bam</h4>
        <a style={{textDecoration:"none"}} href="http://dhindora.appopener.com/" target="_blank">dhindora.appopener.com</a>
      </div>
      <div className={classes.twitterIcon}>
      <FaYoutube style={{color:"red"}}/>
      </div>
    </div>

    <div className={classes.stakeHolderInfo}>
      <div className={classes.profileImg}>
        <img src={require("../assets/users/midas.png").default} alt="Logo" />
      </div>
      <div className={classes.info}>
        <h4>Midas</h4>
        <a style={{textDecoration:"none"}} href="http://midas.appopener.com/" target="_blank">midas.appopener.com</a>
      </div>
      <div className={classes.twitterIcon}>
      <FaYoutube style={{color:"red"}}/>
      </div>
    </div>

    <div className={classes.stakeHolderInfo}>
      <div className={classes.profileImg}>
        <img src={require("../assets/users/Raftaar.png").default} alt="Logo" />
      </div>
      <div className={classes.info}>
        <h4>Raftaar</h4>
       
        <a style={{textDecoration:"none"}} href="http://ghanaKasoota.appopener.com/" target="_blank">ghanaKasoota.appopener.com</a>
      </div>
      <div className={classes.twitterIcon}>
      <FaYoutube style={{color:"red"}}/>
      </div>
    </div>

    <div className={classes.stakeHolderInfo}>
      <div className={classes.profileImg}>
        <img src={require("../assets/users/Rahul-dua.png").default} alt="Logo" />
      </div>
      <div className={classes.info}>
        <h4>Rahul Dua</h4>
        <a style={{textDecoration:"none"}} href="http://rahuldua.appopener.com/" target="_blank">rahuldua.appopener.com</a>
      </div>
      <div className={classes.twitterIcon}>
      <FaYoutube style={{color:"red"}}/>
      </div>
    </div>

    <div className={classes.stakeHolderInfo}>
      <div className={classes.profileImg}>
        <img src={require("../assets/users/two-sided-gamers.png").default} alt="Logo" />
      </div>
      <div className={classes.info}>
        <h4>Two sided gamers </h4>
        
        <a style={{textDecoration:"none"}} href="http://2sidedgamers.appopener.com/" target="_blank">2sidedgamers.appopener.com</a>
      </div>
      <div className={classes.twitterIcon}>
      <FaYoutube style={{color:"red"}}/>
      </div>
    </div>
    
  </div>
    
    

    </>
   
   
    
  );
};
export default MultiImgSlider;
