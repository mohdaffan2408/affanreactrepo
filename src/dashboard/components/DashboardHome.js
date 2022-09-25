import React,{useEffect,useState, createContext } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import {   Link,    Outlet  } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import GeneratedLink from './GeneratedLink';
import '../css/style.css';
import "bootstrap/dist/js/bootstrap.min.js";
import {getUserDashboard} from "../../helper/api";
import MyLinks from './MyLinks';
import Loader from "react-loader-spinner";
import MyUsage from './MyUsage';


export const Context = React.createContext([{}]);
let routes = (
  <Switch>
    
    <Route exact path="/myUsage" component={MyUsage} />
    
    <Route component={MyLinks} />
  </Switch>
);

function DashboardHome(props) {
  let auth_token = localStorage.getItem("aop_token");
  
  const [userData, setuserData] = useState([]);
  const [total_link, settotal_link] = useState(0);
  const [total_youtube, settotal_youtube] = useState(0);
  const [total_insta, settotal_insta] = useState(0);
  const [data_array, setdata_array] = useState([]);
  const [loading,setloading] = useState(false);


  const apicall = ()=>{
      getUserDashboard(auth_token).then((res) => {
        if(res){
         if(res === "Invalid Token"){
             alert ("Invalid request please login again ");

         }
         else{
          //console.log(res.data);
          const countsByTag = {};

          res.data.user_arr.forEach(({ tag }) => {
            countsByTag[tag] = (countsByTag[tag] || 0) + 1;
            });

          const user_array = Object.entries(countsByTag)
              .map(([ tag, count]) => ({ tag, count }))
              .sort((a, b) => b.count - a.count);
              user_array.push({ tag: 'Total Links', count: res.data.user_arr.length});
              console.log(user_array.sort((a, b) => b.count - a.count));
          setuserData(user_array);
          setdata_array(res.data.user_arr);
          settotal_link(res.data.user_arr.length);
          //calculate_total(res.data.user_arr);
          setloading(true);

         }}
         else{
           alert("Dashboard in maintenance mode, Plz try after sometime");
           props.history.push("/");
         }
      });

  }
  const calculate_total =(data)=>{
       let total_count_yt = 0;
       let total_count_insta = 0;
      for (let i = 0; i < data.length; i++) {
          if(data[i].tag === "Youtube"){
              total_count_yt = total_count_yt+1;
          }
          if(data[i].tag === "Instagram"){
              total_count_insta = total_count_insta+1;
          }
          
          
      }
      settotal_youtube(total_count_yt);
      settotal_insta(total_count_insta);

      const sortedActivities = data.sort((a, b) => b.created_at - a.created_at);
      //console.log(sortedActivities);

  }
  
    
  useEffect(() => {
      apicall();
    },[]);
    return (
      (loading) ?
      <BrowserRouter>
    <div className='dashboardClass'>
     
    <DashboardHeader userData={userData} />
      <div className="mid-bar-outer">
        <div className="mid-bar">
          <div className="un-title-default">
            <div className="candlestick-text">
              <span className="candlestick-1"></span>
            </div>
            <div className="un-block-right">
              <a href='/'>
                <span className="interface-2"></span>
              </a>
              <span className="next-1"></span>
            </div>
          </div>
        </div>
      </div>
      <div className="section"> 
      <Context.Provider value={data_array}>
        {/* <Outlet /> */}
        {routes}
      </Context.Provider>
        
        {/* <MyLinks /> */}
        <div className="detail-bar">
          <div className="icon-bar">
            <div className="my">
              <span className="links"></span>
            </div>
            <div className="my">
              <span className="data"></span>
            </div>
            <div className="my">
              <span className="usage"></span>
            </div>
          </div>
          <div className="text-bar">
            <div className="my-text">
              <Link to="/dashboard">My Links</Link>
            </div>
            <div className="my-text">
              <Link to="/dashboard">My Data</Link>
            </div>
            <div className="my-text">
              <Link to="/myUsage">My Usage</Link>
            </div>
          </div>
        </div>
        <button type="button" className="btn btn-md-size bg-primary text-white rounded-pill  bottom-button" data-bs-toggle="modal" data-bs-target="#mdllAddETH">Generate Link</button>
      </div>
      <GeneratedLink />
    </div>
    </BrowserRouter>
        : (<center><Loader type="Puff" color="skyblue" height={100} width={100} className="loader"/>  </center>)
      
    );
  }
  
  export default DashboardHome;