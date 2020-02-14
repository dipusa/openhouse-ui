import React, { Component } from "react";
import { Table, Button, Popconfirm, Input, Form } from "antd";
//import RazorpayCheckout from 'react-native-razorpay';
//import RazorpayCheckout  from 'react-native-razorpay';

//import { TouchableHighlight } from "react-native"
import PaypalExpressBtn from 'react-paypal-express-checkout'
//import {Razorpay}  from "razorpay"
import "./styles.scss"
//var Razorpay = require('checkout')

const { TextArea } = Input;

class EnrolledCourses extends Component {
    state = {
        remarks_text_inputs: {},
        selectedRow: {}
    }
    componentDidMount() {
        this.props.getEnrolledCourses()
    }

    dlist = (row) => {
        let payload = {...this.state.remarks_text_inputs}
        //payload["course_teacher_id"] = row["course_teacher_id"]
        payload[row["course_teacher_id"]] = true
        //console.log(payload)
        //this.props.dlistCourse(payload)
        this.setState({remarks_text_inputs: payload, selectedRow: row})
    }

    cancelRemarks = (id) => {
        let tempDict = {...this.state.remarks_text_inputs}
        tempDict[id] = false
        this.setState({remarks_text_inputs: tempDict})
    }

    handleSubmit = (e, record) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            let state = {...this.state}
            //state["status"][record.id]["updated_status"] = state[record.id]
            //state["remarks"][record.id] = values["remarks"]
            //this.setState(state)
            //setTimeout(this.closeRemarks(record.id), 5)
            let payload = {}
            payload["remarks"] = values["remarks"]
            payload["course_teacher_id"] = this.state.selectedRow.course_teacher_id
            this.props.dlistCourse(payload)
          }
        });
      };
    
    onSuccess = (payment) => {
            // Congratulation, it came here means everything's fine!
                    console.log("The payment was succeeded!", payment);
                    // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
        }
 
    onCancel = (data) => {
            // User pressed "cancel" or close Paypal's popup!
            console.log('The payment was cancelled!', data);
            // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
        }
    onError = (err) => {
            // The main Paypal's script cannot be loaded or somethings block the loading of that script!
            console.log("Error!", err);
            // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
            // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
        }

    render() {
        const {getFieldDecorator} = this.props.form;
        const { enrolledCourses } = this.props
        const columns = [
            {
                "title": "Course Name",
                "dataIndex": "course_name",
            },
            {
                "title": "Teacher Name",
                "dataIndex": "teacher_name",
            },
            {
                "title": "Course Description",
                "dataIndex": "course_description",
            },
            {
                "title": "Payment Status",
                //"dataIndex": "course_description",
            },
            {
                "title": "Action",
                //"dataIndex": "course_description",
                render:(text, row) =>
                    <React.Fragment>
                        <Button type="primary" onClick={()=>this.dlist(row)}>Dlist</Button>

                    {this.state.remarks_text_inputs[row.course_teacher_id]?
                        <div className="remarkes">
                            <h3>Please provide us some feedback</h3>
                             <Form onSubmit={(e)=>this.handleSubmit(e, row)}>
                                <Form.Item>
                                  {getFieldDecorator('remarks', {
                                    rules: [{ required: true, message: 'Please Provide Feedback/Reason for dlistng' }],
                                  })(
                                    <TextArea placeholder="*Feedback" autosize={{ minRows: 2, maxRows: 6 }}/>,
                                  )}
                                </Form.Item>
                                <Form.Item>
                                    <div className="button-holder">
                                        <Button
                                          size="small"
                                          onClick={()=>this.cancelRemarks(row.course_teacher_id)}
                                          style={{ width: 60, marginRight: 8 }}
                                        >
                                          Cancel
                                        </Button>
                                        <Button
                                          type="primary"
                                          htmlType="submit"
                                          size="small"
                                          style={{ width: 60, marginRight: 8 }}
                                        >
                                          Ok
                                        </Button>
                                    </div>
                                </Form.Item>
                            </Form>
                        </div>
                        :null}
                    </React.Fragment>

            }
        ]
        let coursePrice = 2500
        let totalPrice = 0
        if(enrolledCourses.length === 2) {
            coursePrice = 2250
        }
        if(enrolledCourses.length >= 3) {
            coursePrice = 2000
        }
        let gst = 0
        totalPrice = enrolledCourses.length*coursePrice
        gst = totalPrice*0.18
        totalPrice += gst
        let env = 'sandbox';
        let currency = 'INR';
        let total = 1;
        const client = {
            sandbox:    'AT7xujB_QX8-4O6h5YCfw7dKXuhF36M_58s55tEXR497ssFE9GrHXUmFMqvDNhDmVhLB6svm_SHlcZ6y',
            production: 'AT7xujB_QX8-4O6h5YCfw7dKXuhF36M_58s55tEXR497ssFE9GrHXUmFMqvDNhDmVhLB6svm_SHlcZ6y',
        }
        return (
            <React.Fragment>
                <div className="button-holder">
                    <Button type="primary" onClick={this.payNow}>Pay Rs. {totalPrice}</Button>
                </div>

                <Table columns={columns} dataSource={enrolledCourses}/>
                <PaypalExpressBtn env={env} commit={true} client={client} currency={currency} total={total} onError={this.onError} onSuccess={this.onSuccess} onCancel={this.onCancel} />
            </React.Fragment>
        );
    }
}

export default Form.create({ name: 'remarks' })(EnrolledCourses)