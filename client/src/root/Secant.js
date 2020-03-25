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

class Secant extends Component{

    state = {
        size: 'default',
      };
    
      handleSizeChange = e => {
        this.setState({ size: e.target.value });
      };
    

    constructor(props){
        super(props);
        this.state ={
            proptions:[],
            eq:[],
            calculateeq:"",
            Xinitial:null,
            Xinitialminus1:null,
            result:null,
            datatable:[]
        };
    }


    componentDidMount()
    {
        axios.get('http://localhost:8080/Dsecant.php') //docker//
        // axios.get("http://localhost/Webnumer/server/Dsecant.php")
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
    
    Secant=()=>{
        console.log(this.state);
        var Eq = this.state.calculateeq;
        var xi_inmain = parseFloat(this.state.Xinitial);
        var xi_minus1_inmain = parseFloat(this.state.xi_minus1_inmain);
        var xi_plus1;
        let tableArrData = [];
        var er = 1; 
        var fixer = 0.00001;
        var i = 0;
        console.log("WHAT IS VARIBLE: "+Eq+"  "+xi_inmain+"  "+xi_minus1_inmain);
                while (er >= fixer) {
                    
                    xi_plus1=xi_inmain-((this.Equet(Eq,xi_inmain)*(xi_minus1_inmain-xi_inmain))/(this.Equet(Eq,xi_minus1_inmain)-this.Equet(Eq,xi_inmain)));

                    er=this.err(xi_plus1,xi_inmain);

                        let tableObjData = {};
                        tableObjData.index = i;
                        tableObjData.xi_plus1 = xi_plus1;
                        tableObjData.er = er;
                        tableArrData.push(tableObjData);
                        xi_inmain=xi_plus1;
                        i++;

                        //console.log("XMVALUE = ", xm);
                }

            this.setState({
                result:xi_plus1,
                datatable:tableArrData
            })
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
                title: 'X',
                dataIndex: 'xi_plus1',
                key: 'xi_plus1',
              },
              {
                title: 'Error',
                dataIndex: 'er',
                key: 'er'
              },
          ];
          
          if(this.state.result != null){
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
                        <div className="body col-md-5 text center mt-2" style={{marginLeft: 400 }}>
                            <br />
                            <br />
                            <Text mark>Secant</Text>
                            <div>
                                <Select defaultValue="Select your Equations" style={{ width: 490 }} onChange={this.handleChange}>
                                {this.state.eq.map(e=>{
                                    console.log(e);
                                    return <Option value={e.Equation}>{e.Equation}</Option>
                                })}
                                </Select>
                                
                            </div>
                        <br />
                        <Input type="number"placeholder="Input X1" required value={this.state.Xinitial} style={{ width: 490 }} onChange={e=> this.setState({ Xinitial:e.target.value})}/>
                        <br />
                        <br />
                        <Input type="number"placeholder="Input X2" required value={this.state.xi_minus1_inmain} style={{ width: 490 }} onChange={e=> this.setState({ xi_minus1_inmain:e.target.value})}/>
                        <br />
                        <br />
                        <input type="submit" value="Submit" onClick={this.Secant}/>
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

export default Secant;