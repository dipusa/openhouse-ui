import React, { Component }  from "react";
import Card from "../../components/Card";
import AvailableCourses from "../../components/AvailableCourses";
import EnrolledCourses from "../../components/EnrolledCourses"
import * as actions from "../../store/actions/dashboardActions";
import { connect } from "react-redux";
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;

class Dashboard extends Component {
    state = {
        currentMenu: "1",
        selectedRowKeys: []
    }
    handleClick = value =>{
        console.log(value)
        this.setState({currentMenu: value["key"]})
    }

    saveSelectedCourses = selectedCourses => {
        this.setState({selectedRowKeys: selectedCourses})
    }
    enrolledForCourses = () => {
        let payload ={}
        payload["courses"] = this.state.selectedRowKeys
        this.props.enrolledForCourses(payload)
        this.setState({selectedRowKeys: []})
    }

    render() {
        const { currentMenu } = this.state
        //console.log(this.state)
        return (
            <Card cardWidth={700}>
                <Menu onClick={this.handleClick}  selectedKeys={[currentMenu]} mode="horizontal">
                    <Menu.Item key="1">
                      <Icon type="appstore" />
                      Available Courses
                    </Menu.Item>
                    <Menu.Item key="2">
                      <Icon type="appstore" />
                      Enrolled Courses
                    </Menu.Item>
                    <Menu.Item key="3">
                      <Icon type="appstore" />
                      Make Payment
                    </Menu.Item>
                </Menu>
                <div style={{paddingTop: "10px"}}>
                {currentMenu === "1" ? 
                    <AvailableCourses
                        getAvlCourses={this.props.getAvlCourses}
                        avlCourses= {this.props.avlCourses}
                        selectedRowKeys={this.state.selectedRowKeys}
                        saveSelectedCourses={this.saveSelectedCourses}
                        enrolledCourses={this.enrolledCourses}
                        enrolledForCourses= {this.enrolledForCourses}
                    /> : null
                }
                {currentMenu === "2" ? 
                    <EnrolledCourses
                        getEnrolledCourses={this.props.getEnrolledCourses}
                        enrolledCourses={this.props.enrolledCourses}
                        dlistCourse={payload=> this.props.dlistCourse(payload)}
                    /> : null
                }
                </div>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    avlCourses: state.dashboardReducer.avlCourses,
    enrolledCourses: state.dashboardReducer.enrolledCourses
  };
};
const mapDispatchToProps = dispatch => {
  return {
        getAvlCourses: () => dispatch(actions.getAvlCourses()),
        getEnrolledCourses: () => dispatch(actions.getEnrolledCourses()),
        enrolledForCourses: payload => dispatch(actions.enrolledForCourses(payload)),
        dlistCourse: payload => dispatch(actions.dlistCourse(payload))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)