import React, { Component } from "react";
import { Table, Button } from "antd"
import "./styles.scss"

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
    }
]
class AvailableCourses extends Component {
    componentDidMount() {
        this.props.getAvlCourses()
    }

    render() {
        const { selectedRowKeys, avlCourses } = this.props
        //console.log(avlCourses)
        let coursePrice = 2500
        let totalPrice = 0
        const rowSelection = {
          selectedRowKeys,
          onChange: (record, selected, selectedRows) => {
                this.props.saveSelectedCourses(record)
            }
        };
        if(selectedRowKeys.length === 2) {
            coursePrice = 2250
        }
        if(selectedRowKeys.length >= 3) {
            coursePrice = 2000
        }
        let gst = 0
        totalPrice = selectedRowKeys.length*coursePrice
        gst = totalPrice*0.18
        totalPrice += gst

        return (
            <div>
                <div className="cost-and-btn">
                    <span className="cost-details">
                        <b>Estimated Cost(per Month) is :</b> {selectedRowKeys.length}*{coursePrice} + {gst}(18% GST) = <b>Rs. </b>{totalPrice} </span>
                    <Button type="primary" onClick={this.props.enrolledForCourses}disabled={selectedRowKeys.length > 0 ? false: true}>Enroll Now</Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={avlCourses}
                    rowKey={record => record.course_teacher_id}
                    selections={true}
                    selectedRowKeys={this.props.selectedRowKeys}
                    rowSelection={rowSelection}
                    //selectedRows={this.props.selectedRows}
                />

            </div>
        );
    }
}

export default AvailableCourses