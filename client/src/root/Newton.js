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

class NewtonRhop extends Component{
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
            EquationDiff:"",
            Xinitial:null,
            Eq:null,
            result:null,
            datatable:[]
        };
    }


    componentDidMount()
    {
        axios.get('http://localhost:8080/Dnewton.php') //docker//
        // axios.get("http://localhost/Webnumer/server/Dnewton.php")
        .then(res=>{
          console.log(res.data);
          this.setState({eq:res.data});
        })
    }

    Equet = (EqForSloveFuntion,xvalueforSlove) => {
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
    
    NewtonRhop=()=>{
        console.log(this.state);

        var Eq = this.state.calculateeq;
        var EqDiff = this.state.EquationDiff;
        var xi_inmain  = parseFloat(this.state.Xinitial); 
        //console.log(Eq+"  "+EqDiff+" "+xi_inmain+"  ");
    
            let tableArrData = [];
            var xiplus1_inmain;
            var fxi;
            var fxpi;
            var es = 0.0001;
            var er = 1;
            var i=0;
                while (er >= es) {
                    // console.log("xi_inmain = 1 : ", xi_inmain);
                    fxi=this.Equet(Eq,xi_inmain);
                    fxpi=this.Equet(EqDiff,xi_inmain);
                    console.log("fxi = : "+ fxi + " fxpi = : ", fxpi);

                    xiplus1_inmain=xi_inmain-(fxi/fxpi);
                    er = this.err(xiplus1_inmain,xi_inmain);

                        let tableObjData = {};
                        tableObjData.index = i;
                        tableObjData.xi_inmain = xi_inmain;
                        tableObjData.er = er;
                        tableArrData.push(tableObjData);

                        xi_inmain=xiplus1_inmain;
                        i++;

                        // console.log("xi_inmain = ", xi_inmain);
                }

            this.setState({
                result:xiplus1_inmain,
                datatable:tableArrData})
    }


     handleChange = (value) => {
        console.log(`Selected: ${value}`);
        this.setState({
            calculateeq:value
        })
      }

      handleChange2 = (value) => {
        console.log(`Selected: ${value}`);
        this.setState({
            EquationDiff:value
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
                dataIndex: 'xi_inmain',
                key: 'xi_inmain',
              },
              {
                title: 'Error',
                dataIndex: 'er',
                key: 'er',
              },
            ];
          
          if(this.state.result != null){
            return <Table dataSource={this.state.datatable} columns={columns}/>;
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
                    <Text mark>NewtonRhopson</Text>
                    <div id="input1">
                        <Select defaultValue="Select your Equations" style={{ width: 490 }} onChange={this.handleChange}>
                        {this.state.eq.map(e=>{
                            console.log(e);
                            return <Option value={e.Equation}>{e.Equation}</Option>
                        })}
                        </Select>
                    </div>
                    <br />
                    <div id="input2">
                        <Select defaultValue="Select your Equations Diff" style={{ width: 490 }} onChange={this.handleChange2}>
                        {this.state.eq.map(e=>{
                            console.log(e);
                            return <Option value={e.EquationDiff}>{e.EquationDiff}</Option>
                        })}
                        </Select>
                    </div>
                <br />
                <Input type="number"placeholder="Input Xinitial" style={{ width: '20%' }} required value={this.state.Xinitial} style={{ width: 490 }} onChange={e=> this.setState({ Xinitial:e.target.value})}/>
                <br />
                <br />
                <input type="submit" value="Submit" onClick={this.NewtonRhop}/>
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

export default NewtonRhop;