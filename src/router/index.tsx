import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserLayout from '../layouts/user/user';
import GuardRoute from './guardsRouter';
import './router.scss';

export default class RouteMap extends React.Component<any, any> {
    constructor(public props: any){
        super(props);
    }

    public render() {
        return (
            <Router>
                <Switch>
                    <Route exact={true} path='/user/login' component={UserLayout}/>
                    <GuardRoute/>
                </Switch>
            </Router>
        );
    }
}

/**
 * 组件 BrowserRouter
 * 
 * BrowserRouter 是html5高阶路由组件，能够保证UI和URL保持同步,这个组件拥有以下属性：
 * (1) basename：
 *     作用：为所有位置添加一个基准URL
 *     使用场景：在需要把页面部署到服务器的二级目录中，可以使用basename来设置到次目录 
 *     当你的主页面前是由一级目录的时候，使用basename时候，同样会显示主页内容。它常常配合Link使用
 * 
 *      <BrowserRouter basename="/minooo" />
 *          <Link to="/react" />                    // 最终渲染成：<a href="/minooo/react">
 * 
 * (2) Route:
 *     Route是路由的一个原材料，它是控制路径对应显示的组件。我们经常用：exact,path和component属性
 *     I:   exact 控制匹配到的路径时候，不会再继续向下匹配
 *          例如：path 为'/one'的路由将不能匹配'/one/two'
 *          
 *          strict  对路径末尾斜杠的匹配
 *          例如：path 为'/one/'将不能匹配'/one'，但是却可以匹配'/one/two'
 * 
 *     II:  path 标识路由的路径
 *     III: component 表示路径对应显示的组件
 * 
 * (3) Link 和 NavLink
 *     I: link 的主要api是to，to可以接受 string 或者一个 object
 *        例如:<Link to='/courses' />
 *             <Link to={{pathname:'/courses', search: '?sort=name'}} />
 * 
 *     II: NavLink 可以为当前选中的路由设置类名，样式以及回调函数
 *          activeClassName 是选中状态的类名，所以可以通过这个class为其添加样式
 * 
 * (4) match
 *     match是在使用router之后被放入props中的一个属性，在class创建的组件中我们需要通过this.porps.match来获取
 *     match之中的信息，match的信息包含以下：
 *      {   isExact: true,
 *          params: {
 *              id: '1234',
 *              path: '/second/:id',
 *              url: '/second/1234'
 *          }
 *      }
 * 
 * (5) Switch
 *     switch常常会用来包裹Route，它里面不能放其他元素，只能用来显示一个路由。
 *     swicth下的子节点只能是：<Route>或者<Redirect>元素。只会渲染出第一个与当前访问地址匹配的 <Route> 或者 <Redirect>
 * 
 * (6) Redirect
 *     <Redirect>渲染时，将导航到一个新的地址，这个新地址覆盖在访问历史信息里面的本该访问的那个地址
 *  
 *     to:重定向的URL字符串
 * 
 *     form:匹配需要被重定向的路径，如果匹配到当前浏览器的pathname，那么就会触发Redirect。如果没有from这个属性值，那么
 *          他们将匹配任何当前访问的地址
 * 
 * 关于 Route
 * Route 自带三个 render 方法 和 三个porps
 * 
 * (1) render
 *     <Route component>
 *     <Route render>
 *     <Route children>
 *     同一个Router只使用一种render方法，大部分情况下使用 component
 * 
 * (2) porps
 *     只有当访问地址和路由匹配的时候，一个react componennt才会被渲染。此时的组件会接受 路由的porps:match,location,history
 *     当使用 component 时，router 将使用 React.createElement 根据给定的 component 创建一个新的React元素。
 *     
 *     I:match
 *      match存在4个属性 
 *      match.path  指的是卸载<Route>中的path参数
 *      match.url   值得是在浏览器中显示的真实的URL
 * 
 *     II:location
 * 
 *     III:history
 */

 /**
  * 关于React-router 和 React-router-dom 之间的区别
  * 
  * React-router提供了一些router的核心api，包括：Router,Route,Switch,但是它没有提供dom操作跳转api
  * 
  * React-router-dom提供了BrowserRouter, Route, Link等api,我们可以通过dom的事件控制路由，例如：
  *     点击一个按钮进行跳转
  *     我们在开发中更多的是使用React-router-dom
  */