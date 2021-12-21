import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { DEPARTMENTS, STAFFS } from '../shared/staffs';
import Home from './home';
import StaffList from './StaffList';
import StaffInfo from './StaffInfo';
import Header from './Header';
import Footer from './Footer';
import Room from './Room';
import Salary from './salary';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

class Main extends Component {
  constructor(props){
    super(props);

    this.state = {
      staffs : STAFFS,
      departments : DEPARTMENTS, 
      };
      this.updateState = this.updateState.bind(this);
  }
  // componentDidMount thực thi khi 1 component được render trên client side.
  componentDidMount() {
    const data = localStorage.getItem("Staffs");
    if (data) {
      this.setState({ staffs: JSON.parse(data) });
    } else {
      localStorage.setItem("Staffs", JSON.stringify(STAFFS));
    }
  }

  updateState(staff) {
    const currentStaffs = this.state.staffs;
    this.setState({
      staffs: currentStaffs.concat([staff]),
    });
    localStorage.setItem("Staffs", JSON.stringify(currentStaffs.concat([staff])));
  }
 
  onStaffSelected(staffId) {
    this.setState({ staffSelected: staffId });
  }
  
    render(){
      const StaffWithId = ({match})=>{
        return(
          <StaffInfo
           staffSelected ={ this.state.staffs.filter((staff) => staff.id === parseInt(match.params.staffId, 10))[0]}
           />
      );
        }

      return (
        <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={Home} />
          <Route exact path="/StaffList" component={() =>  (<StaffList staffs={this.state.staffs}
          updateState={(newStaff) => this.updateState(newStaff)}/> )} />
          <Route path="/menu/:staffId" component={StaffWithId} />
          <Route exact path='/room' component={() => <Room rooms={this.state.departments} />} />
          <Route exact path='/salary' component={() => <Salary salary={this.state.staffs}/>} /> 
          <Redirect to="/home" />
        </Switch>
        <Footer /> 
      </div>
      </BrowserRouter>
    );
  }
}

export default Main;