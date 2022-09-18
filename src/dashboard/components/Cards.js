
import { FaCopy, FaGlobe, FaGlobeAsia, FaInstagram,FaRegCopy,FaYoutube } from 'react-icons/fa';
import { RiEyeFill } from 'react-icons/ri';
import { CopyToClipboard } from "react-copy-to-clipboard";
import Moment from 'react-moment';

function Cards(props) {
 
  //console.log(props);
    return (

      <div className="item-card-nft">
        <picture>
          <source src={ props.socialMedia.originalURL } type="image/jpg" />
          <img className="big-image" src={                
                (props.socialMedia.tag === "Youtube")?`https://img.youtube.com/vi/${props.socialMedia.originalURL.split('=')[1]}/0.jpg`: 
                (props.socialMedia.tag==="Instagram")?`https://appopener.com/ig/${props.socialMedia.id}`:
                (props.socialMedia.tag==="Other")?`https://appopener.com/web/${props.socialMedia.id}`:""
              } alt="" />

        </picture>
        <div className="counterdown">
          <a href={ props.socialMedia.originalURL } target="_blank" className="btn btn-social">
            {/* <img src={require(`../../assets/icons/${ props.tag }.svg`).default} alt="" /> */}
            <FaYoutube size="24px" style={{"color":"red"}}/>
          </a>

        </div>
        <div className="btn-like-click">
          <div className="btnLike">
            <input type="checkbox" defaultChecked={true} />
            <span className="count-likes"> { props.socialMedia.click_count }</span>
            <RiEyeFill size="18px" style={{"color":"red"}} />
          </div>
          
        </div>
        <div className="un-info-card">
          <div className="block-left">
            <h4>Short Url</h4>
            <div className="user">
              {/* <span className="social-media" onClick={()=> {navigator.clipboard.writeText(props.socialMedia.slink)}}> <i className="ri-file-copy-line"></i>
              </span> */}
              <CopyToClipboard text={                
                (props.socialMedia.tag === "Youtube")?`https://appopener.com/yt/${props.socialMedia.id}`: 
                (props.socialMedia.tag==="Instagram")?`https://appopener.com/ig/${props.socialMedia.id}`:
                (props.socialMedia.tag==="Other")?`https://appopener.com/web/${props.socialMedia.id}`:""
              }>
                <a title="copy link"><FaRegCopy size="18px" style={{color:"GrayText"}}/></a>
              </CopyToClipboard>   
              <span title={props.tag}>
              <a style={{textDecoration:"none", color:"#3366BB",marginLeft:"5px"}} href=
                    {
                    (props.socialMedia.tag === "Youtube")?`https://appopener.com/yt/${props.socialMedia.id}`: 
                    (props.socialMedia.tag==="Instagram")?`https://appopener.com/ig/${props.socialMedia.id}`:
                    (props.socialMedia.tag==="Other")?`https://appopener.com/web/${props.socialMedia.id}`:""
                  }
                    target="_blank">
                      {
                    (props.socialMedia.tag === "Youtube")?`https://appopener.com/yt/${props.socialMedia.id}`: 
                    (props.socialMedia.tag==="Instagram")?`https://appopener.com/ig/${props.socialMedia.id}`:
                    (props.socialMedia.tag==="Other")?`https://appopener.com/web/${props.socialMedia.id}`:""
                    }
                </a>
                {/* <a href={ props.socialMedia.slink } target="_blank">{ props.socialMedia.slink }</a> */}
              </span>
            </div>
          </div>
          <div className="block-right">
            <h6>Created On</h6>
            <p> <Moment format="DD/MM/YYYY"></Moment> </p>
          </div>
        </div>
      </div>
    );
  }
  
  export default Cards;