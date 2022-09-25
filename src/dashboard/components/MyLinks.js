
import React,{ useContext } from "react";
import { Context } from './DashboardHome';
import Cards from "./Cards";

function MyLinks() {
    const props = React.useContext(Context);
   
    return (
        <>
        <div className='mid-bar'>
                <div className="un-title-default">
                    <div className="text">
                        <h2 className="m-0">My Links</h2>
                    </div>
                    <div className="un-block-right">
                    
                    </div>
                </div>
            </div>
        <div className="discover-nft-random bg-white py-3">
          <div className="content-NFTs-body">
               {props.map((item)=>{
                    return <Cards key={item.id} socialMedia={item} />
                 })}
          </div>
        </div>
        </>
    );
  }
  
  export default MyLinks;