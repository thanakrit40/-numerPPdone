import React, { Component } from 'react';
import { Input } from 'antd';
import { parse } from 'mathjs';
import Header from "../components/Header.js";
import Sidebar from "../components/Sidebar.js";
import Footer from "../components/Footer.js";
import axios from 'axios';
import { Menu, Dropdown, Button } from 'antd';
import { Select, Radio ,Table} from 'antd';
import { Typography } from 'antd';

const { Text } = Typography;

const { Option } = Select;



class Falseposition extends Component{


    state = {
        size: 'default',
      };
    
      handleSizeChange = e => {
        this.setState({ size: e.target.value });
      };
    

    constructor(props){
        super(props);
        this.state ={
            eq:[],
            calculateeq:"",
            xl:"",
            xr:"",
            Xm:null,
            datatable:[]
        };
    }
    

    componentDidMount()
    {
        axios.get('http://localhost:8080/Dfalseposition.php') //docker//
        //axios.get("http://localhost/Webnumer/server/Dfalseposition.php")
        .then(res=>{
          console.log(res.data);
          this.setState({eq:res.data});
        })
    }


   Equet(EqForSloveFuntion,xvalueforSlove) {
   
        const NodeEqua = parse(EqForSloveFuntion); 
        
        const Equa = NodeEqua.compile();
    
         
        
        let scope = {
            x:xvalueforSlove
        }
        return Equa.eval(scope);
         
    }
    
    err(xmold, xmnew){
        var er = ((Math.abs((xmnew - xmold) / xmnew)) * 100) / 100;
        return er;
    }
    


    falsecal=()=>{
        console.log(this.state);
        var Eq = this.state.calculateeq;
        var xl = parseFloat(this.state.xl);
        var xr = parseFloat(this.state.xr);
        var xm = (xl + xr) / 2;
        let tableArrData = [];
        //console.log(Eq+"  "+xl+"  "+xr+"  "+xm);
            var xmold = xm;
            var fxl=this.Equet(xl);
            var fxr=this.Equet(xr);
            var fxm;
            var i = 0;
            var es = 0.00001;
            var er = 1; 
                while (er >= es) {
                    fxl = this.Equet(Eq,xl);
                    fxr = this.Equet(Eq,xr);
                    if (i != 0) {
                        xm = xr - ((fxr * (xl - xr)) / (fxl - fxr));
                    }
                    fxm = this.Equet(Eq,xm);
                    if ((fxm * fxl) > 0) {
                        xl = xm;
                    }
                    else {
                        xr = xm;
                        console.log("I value =", i);
                        console.log("This is er = ", er);
                        console.log("This is es = ", es);
                    }
                        if (i != 0) {
                            er = this.err(xmold, xm);
                            xmold = xm;
                            console.log("If Work");
                        }
                        let tableObjData = {};
                        tableObjData.index = i;
                        tableObjData.xl = xl;
                        tableObjData.xr = xr;
                        tableObjData.xm = xm;
                        tableObjData.errorvalue = er;
                
                        tableArrData.push(tableObjData);
                        i++;

                        console.log("XMVALUE = ", xm);
                }

            this.setState({Xm : xm,datatable:tableArrData})
    }


     handleChange = (value) => {
        console.log(`Selected: ${value}`);
        this.setState({
            calculateeq:value
        })
      }

    showgraph = () =>{
        const columns = [
            {
                title: 'No',
                dataIndex: 'index',
                key: 'index',
              },
              {
                title: 'Xl',
                dataIndex: 'xl',
                key: 'xl',
              },
              {
                title: 'Xr',
                dataIndex: 'xr',
                key: 'xr',
              },
              {
                title: 'Xm',
                dataIndex: 'xm',
                key: 'xm',
              },
              {
                title: 'Error',
                dataIndex: 'errorvalue',
                key: 'errorvalue'
              },
          ];
          
          if(this.state.Xm != null){
            return <Table dataSource={this.state.datatable} columns={columns} />;
          }

          
    }
    render(){
        return(

                <div>
                    <div className ="header">
                        <Header/>
                    </div>     
                    <div className ="sidebar row col-md-8">
                        <Sidebar/>            
                        <div className="body col-md-5 text center mt-2" style={{marginLeft: 400}}>
                            <br />
                            <br />
                            <Text mark>False-Position</Text>
                            <div>
                                <Select defaultValue="Select your Equations" style={{ width: 490 }} onChange={this.handleChange}>
                                {this.state.eq.map(e=>{
                                    console.log(e);
                                    return <Option value={e.Equation}>{e.Equation}</Option>
                                })}
                                </Select>
                            </div>
                        <br />
                        <Input type="number"placeholder="Input Xl" required value={this.state.xl} onChange={e=> this.setState({ xl:e.target.value})}/>
                        <br />
                        <br />
                        <Input type="number"placeholder="Input Xr" required value={this.state.xr} onChange={e=> this.setState({ xr:e.target.value})}/>
                        <br />
                        <br />
                        <input type="submit" value="Submit" onClick={this.falsecal}/>
                        <br />
                        <br />
                           {this.showgraph()}
                        </div>
                    </div>
                    <Footer/>
                </div>

        );
    }

}

export default Falseposition;