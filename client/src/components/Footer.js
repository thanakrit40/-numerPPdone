import React, { Component } from "react";
import { Typography } from 'antd';

const { Text } = Typography;

class Footer extends Component{
    
    render(){
        return(
            <div>
                <Text code style={{color: "##f0f5ff" , backgroundColor: "#f5f5f5"}}>จัดทำโดย : นาย ธนกฤต วิวัฒน์สถิตวงศ์ | เสนอ ผู้ช่วยศาสตราจารย์ ดร.สุวัจชัย กมลสันติโรจน์</Text>
            </div>
        );
    }
}
export default Footer;
