import * as React from 'react';
import { Layout, Menu, Icon } from 'antd';
import * as PropTypes from 'prop-types';
import { NavLink} from 'react-router-dom';
import { config } from '../../environment/environment';
import { connect } from 'react-redux';
import { getGlobalData } from 'src/actions/saas-common-action';
import KISUREBreadcrumb from 'src/components/breadcrumb/breadcrumb-component';
import './sider.scss';

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

class SlideLayout extends React.Component<any, any> {
    static propTypes = {
        getGlobalData: PropTypes.func.isRequired,
        location: PropTypes.object
    };
    
    constructor(public props: any) {
        super(props);

        this.state = {
            collapsed: false
        };
    }

    public componentDidMount() {
        this.loadMenu();
    }

    /**
     * 加载菜单
     */
    public loadMenu() {
        this.props.getGlobalData();
    }

    public toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    public render() {
        const { menu, location } = this.props;
        const slideMenu: any[] = menu && menu.slideMenu || [];
        const buildSubMenu = (item: any) => {
            if (item.child) {
                const subTitle = <span><Icon type={item.tags} />{item.title}</span>;

                return <SubMenu key={item.key} title={subTitle}>
                    {
                        item.child.map((children: any) => {
                            return children.child && children.child.length > 0 ? 
                                    children.child.map((child: any) => {
                                        return buildSubMenu(child)
                                    }) : 
                                    <Menu.Item key={children.key}>
                                        <Icon type={children.tags || "tags"} />
                                        <span className="span-link">
                                            <NavLink className="selected" to={children.path}>{children.title}</NavLink>
                                        </span>
                                    </Menu.Item>
                        })
                    }
                </SubMenu>
            } else {
                return <Menu.Item key={item.key}>
                            <Icon type={item.tags || "tags"} />
                            <span className="span-link">
                                <NavLink className="selected" to={item.path}>{item.title}</NavLink>
                            </span>
                        </Menu.Item>
            }
        };

        return (
            <Layout>
                <Sider trigger={null} collapsible={true} collapsed={this.state.collapsed}>
                    <div className="logo">
                        <img alt="logo" src={config.siderLogo} />
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['3']}>
                        {
                            slideMenu && slideMenu.length >0 ? slideMenu.map(item => {
                                return buildSubMenu(item)
                            }) : <Menu.Item key="1">
                                    <Icon type="home" />
                                    <span className="span-link">
                                        <NavLink className="selected" to='/'>home</NavLink>
                                    </span>
                                </Menu.Item>
                        }
                    </Menu>
                </Sider>

                <Layout className={this.props.collapse ? 'kisure-ant-layout-main-collapse' : 'kisure-ant-layout-main'}>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <div className="header-icon">
                            <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                            />
                        </div>
                    </Header>
                    <Content style={{height:'86vh',overflow:'auto',textAlign:'center'}}>
                        <KISUREBreadcrumb className='kisure-breadcrumb' menu={slideMenu} location={location}/>
                        {this.props.children}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2019 kisure
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}

function mapStateToProps(state: any) {
    return {
        menu: state.saasCommon.menu
    }
}

function mapDispatchToProps() {
    return {
        getGlobalData
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps()
)(SlideLayout);
