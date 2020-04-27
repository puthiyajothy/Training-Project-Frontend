import React from 'react';
import {Layout} from 'antd';
import {Route, Switch} from 'react-router-dom'
import './index.css';
import HeaderComponent from '../HeaderComponent';
import SiderComponent from '../SiderComponent';

// Dashboard Components
import DefectDashboard from '../../DashboardComponent/DefectDashboard';
import CompanyDashboard from '../../DashboardComponent/CompanyDashboard';
import ProjectManagerDashboard from '../../DashboardComponent/ProjectManagerDashboard';
import CompanyComponent from '../../CompanyComponent';
import DefectComponent from '../../DefectComponent';
import HRAllocationComponent from '../../HRAllocationComponent';
import EmployeeComponent from '../../EmployeeComponent';
import ModuleComponent from '../../ModuleComponent';
import ProjectManageAllocation from '../../ProjectAllocationComponent';
import ProjectComponent from '../../ProjectComponent';
import TechLeadPrivilege from '../../PrivilegeComponent/TechLeadPrivilege';
import DefectStatusConfig from '../../SettingComponent/Config/StatusConfig';
import CompanyAdministration from '../../CompanyAdministrationComponent/';
import DefectStatusConfigcom from '../../CompanyComponent/ConfigTable/StatusConfig';
// import DesignationConfig from '../../SettingComponent/GeneralConfiguration/DesignationConfig';

// Company Components


const {Content, Footer} = Layout;

class Dashboard extends React.Component {

    render() {
        return (
            <Layout style={{
                minHeight: '100vh'
            }}>
                
                <Route exact path="/">
                    <SiderComponent/>
                </Route>

                <Layout>

                    <Route path="/">
                        <HeaderComponent/>
                    </Route>

                    <Content
                        style={{
                        margin: '24px 16px 0'
                    }}>

                        <Switch>
                            
                            {/* Dashboard Route*/}
                            <Route exact path='/'>
                                <CompanyDashboard/>
                            </Route>
                            <Route path='/dashboard/defect'>
                                <DefectDashboard/>
                            </Route>
                            <Route path='/dashboard/projectmanager'>
                                <ProjectManagerDashboard/>
                            </Route>
                           
                            
                            {/* Company Administration Route*/}
                            <Route path='/companyadministration'>
                                <CompanyAdministration/>
                            </Route>

                            {/* Defect Route*/}
                            <Route path='/defect'>
                                <DefectComponent/>
                            </Route>

                            {/* Company Route*/}
                            <Route exact path='/company'>
                                <CompanyComponent/>
                            </Route> 
                            <Route exact path='/Status'>
                                <DefectStatusConfigcom/>
                            </Route>

                            {/* Company Route*/}
                            <Route exact path='/project'>
                                <ProjectComponent/>
                            </Route> 
                            
                            {/* HR Allocation Route*/}
                            <Route path='/company/hrallocation'>
                                <HRAllocationComponent/>
                            </Route>

                            {/* Employee Route*/}
                            <Route path='/company/employee'>
                                <EmployeeComponent/>
                            </Route>

                            {/* Module Route*/}
                            <Route path='/module'>
                                <ModuleComponent/>
                            </Route>

                            {/* Module Route*/}
                            <Route path='/projectallocation'>
                                <ProjectManageAllocation/>
                            </Route>

                          

                                {/* General configuration -----------------------------------*/}
                                {/* Setting -> General configuration -> Defect status Route*/}
                                <Route path='/config/defectstatus'>
                                    <DefectStatusConfig/>
                                </Route>

                                {/* Setting -> Privilege -> Tech Lead Route*/}
                                <Route path='/privilege/techlead'>
                                    <TechLeadPrivilege/>
                                </Route>

                                {/* <Route path='/GeneralConfiguration/DesignationConfig'>
                                    <DesignationConfig/>
                                </Route> */}


                        </Switch>

                    </Content>
                    <Footer
                        style={{
                        textAlign: 'center'
                    }}>
                        Defect Tracker 
                    </Footer>
                </Layout>
            </Layout>

        );

    }
}

export default Dashboard;
