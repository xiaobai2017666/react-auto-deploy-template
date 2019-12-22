import React, { PureComponent, Component } from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home';
import Register from './components/Register';
import MessageManager from './components/Message';
import AddMessage from './components/AddMessage';
import OrderManager from './components/Order';
import UserManager from './components/User';
import TypeManager from './components/Type';

import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import { 
    HashRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom';

import './index.less';

const { Header, Content, Footer } = Layout;

class Main extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <Router>
                <Layout>
                    <Header>
                        <div className="logo">商品销售管理系统</div>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1">
                                <Link to="/">主页</Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/register">注册</Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to="/message">留言板</Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Link to="/order">订单管理</Link>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Link to="/user">用户管理</Link>
                            </Menu.Item>
                            <Menu.Item key="6">
                                <Link to="/type">种类管理</Link>
                            </Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{ padding: '20px 50px' }}   >
                        <Switch>
                            <Route path="/register" component={Register} />
                            <Route path="/message" component={MessageManager} />
                            <Route path="/addmessage" component={AddMessage} />
                            <Route path="/order" component={OrderManager} />
                            <Route path="/user" component={UserManager} />
                            <Route path="/type" component={TypeManager} />
                            <Route path="/" component={Home} />
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>商品销售管理系统 ©2019 created by 陈圣光 </Footer>
                </Layout>
            </Router>
        )
    }
}

ReactDOM.render(
    (
        <Main />
    ),
    document.getElementById('main'));