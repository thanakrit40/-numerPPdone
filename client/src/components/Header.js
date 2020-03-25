import React, { Component } from "react";

class Header extends Component{
  
    render(){
        return (
        <div className="container-fluid ">
            <div className="row">
                <div className="col-md-8 text left mt-2">
                    <h3><img style={{height : 70}} src="/images/logo/logooo.jpg" alt="" />  NUMERICAL METHOD</h3>
                </div>
            </div> 
            <hr />   
        </div>
        )
    }
}


export default Header;