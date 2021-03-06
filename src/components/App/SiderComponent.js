import React from "react";
import { connect } from "react-redux";
import { Layout, Menu, Icon } from "antd";
import { Link } from "react-router-dom";
//import './Dashboard.css';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SiderComponent extends React.Component {
  logout = () => { };
  render() {
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.props.sidebar.isCollapsed}
        width={240}
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        style={{
          position: "relative",
          zIndex: 10,
          minHeight: "100vh",
          boxShadow: "2px 0 6px rgba(0,21,41,.35)"
        }}
      >

        <div className="logo" >Defect Tracker</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
        >
          {/* Dashboard Menu -----------------------------------------------------------------*/}
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="pie-chart" />
                <span>Dashboard</span>
              </span>
            }
          >
            <Menu.Item key="1">
              <Link to="/">Company</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/dashboard/defect">Defect</Link>
            </Menu.Item>
            
            <Menu.Item key="4">
              <Link to="/dashboard/projectmanager">Project Manager</Link>
            </Menu.Item>
           
          </SubMenu>

          {/* Company Administration Menu -----------------------------------------------------------------*/}

          <Menu.Item key="7">
            <Link to="/companyadministration">
              <Icon type="project" /><span>Company Administration</span></Link>
          </Menu.Item>

          {/* Company Menu -----------------------------------------------------------------*/}
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="appstore" />
                <span>Company</span>
              </span>
            }
          >
            <Menu.Item key="8">
              <Link to="/company">Company</Link>
            </Menu.Item>
            <Menu.Item key="9">
              <Link to="/company/hrallocation">HR Allocation</Link>
            </Menu.Item>
            <Menu.Item key="10">
              <Link to="/company/employee">Employee</Link>
            </Menu.Item>
          </SubMenu>

          {/* Module Menu -----------------------------------------------------------------*/}

          <Menu.Item key="11">
            <Link to="/module">
              <Icon type="code-sandbox" /><span>Module</span></Link>
          </Menu.Item>

          {/* Project Allocation Menu -----------------------------------------------------------------*/}

          <Menu.Item key="12">
            <Link to="/projectallocation">
              <Icon type="project" /><span>Project Allocation</span></Link>
          </Menu.Item>

          {/* Project Menu -----------------------------------------------------------------*/}

          <Menu.Item key="13">
            <Link to="/project">
              <Icon type="project" /><span>Manage Project</span></Link>
          </Menu.Item>


          {/* Defect Menu -----------------------------------------------------------------*/}
          <SubMenu
            key="sub3"
            title={
              <span>
                <Icon type="alert" />
                <span>Defect</span>
              </span>
            }
          >
            <Menu.Item key="14">
              <Link to="/defect">Defect</Link>
            </Menu.Item>
          </SubMenu>

          {/* Setting Menu -----------------------------------------------------------------*/}
          <SubMenu
            key="sub4"
            title={
              <span>
                <Icon type="setting" />
                <span>Setting</span>
              </span>
            }
          >

            <SubMenu
              key="sub5"
              title={
                <span>
                  <Icon type="setting" />
                  <span>General Configuration</span>
                </span>
              }
            >
              <Menu.Item key="21">
                <Link to="/config/defectstatus">Designation Config</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub7"
              title={
                <span>
                  <Icon type="user" />
                  <span>Privileges</span>
                </span>
              }
            >

              <Menu.Item key="26">
                <Link to="/privilege/techlead">Tech Lead Privileges</Link>
              </Menu.Item>

            </SubMenu>

          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

function mapStateToProps(state) {
  return {
    sidebar: state.isCollapsed
  };
}

export default connect(mapStateToProps)(SiderComponent);
