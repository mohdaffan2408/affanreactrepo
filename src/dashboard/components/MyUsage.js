import  React from 'react';
import Chart from "react-apexcharts";
import Dropdown from 'react-bootstrap/Dropdown';

class MyUsage extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [{
          name: 'series1',
          data: [31, 40, 28, 51, 42, 109, 100]
        }],
        options: {
          chart: {
            height: 350,
            type: 'area'
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
            type: 'datetime',
            categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy HH:mm'
            },
          },
        },
      
      
      };
    }

  

    render() {
      return (
        

            <React.Fragment>
                <div className='mid-bar'>
                    <div className="un-title-default">
                        <div className="text">
                        <h2 className="m-0">Overview</h2>
                        </div>
                        <div className="un-block-right">
               
                        <Dropdown className='btn-group'>
                          <Dropdown.Toggle variant="default" id="dropdown-basic">
                            Last 7 days <span className="next-2"></span>
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item href="#/">Last 14 days</Dropdown.Item>
                            <Dropdown.Item href="#/">Last 21 days</Dropdown.Item>
                            <Dropdown.Item href="#/">Last 1 month</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        </div>
                    </div>
                    </div>
                    <div className="myUsage-chart">
                      <Chart options={this.state.options} series={this.state.series} type="area" height={350} />
                    </div>
                    


            </React.Fragment>


      );
    }
  }

export default MyUsage;