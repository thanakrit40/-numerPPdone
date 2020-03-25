import React,{Component} from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

class Main extends Component {
    render(){
        return(
            <div>
            <Header/>
            <Sidebar/>

            <Footer />
            </div>
            
        );
    }
}
export default Main;