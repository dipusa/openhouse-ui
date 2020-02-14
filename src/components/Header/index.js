import React from "react";
import { Menu, Dropdown, Button, Icon } from 'antd';
import Card from "../../components/Card"
import "./styles.css"

const Header = props => {
    const menu = (
      <Menu>
        <Menu.Item onClick={props.logout}>
          <Icon type="logout"/> <span style={{paddingLeft: '10px'}}>Logout</span>
        </Menu.Item>
      </Menu>
    );

    return (
        <Card cardHeight={50}>
            <div className="header">
                <div>
                    <span>Welcome <b>{localStorage.getItem('username')}</b></span>
                </div>
                <Dropdown overlay={menu} className="actions">
                  <Icon type="setting"/>
                </Dropdown>
            </div>
        </Card>
        )
}
export default Header