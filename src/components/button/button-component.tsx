import * as React from 'react';
import * as PropTypes from 'prop-types';

export default class ButtonComponent extends React.Component<any, any> {
    public divRef: any;
    
    static propTypes = {
        clickCallBack: PropTypes.func,
        text: PropTypes.string,
        className: PropTypes.string,
    };
    
    constructor(public props: any) {
        super(props);

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMousUp = this.handleMousUp.bind(this);
    }

    public handleMouseDown() {
        this.divRef.style.opacity = '0.3';
    }

    public handleMousUp() {
        this.divRef.style.opacity = '1';
        this.props.clickCallBack();
    }

    public render() {
        return (
            <div className={`btn-con ${this.props.className}`} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMousUp} ref={ele=> this.divRef= ele}>
                {this.props.text || '确认'}
            </div>
        );
    }
}

/**
 * react 的ref
 * 
 * 1.react提供的ref属性，表示为对组件真正实例的引用，其实就是ReactDOM.render()返回组件的实例
 * (1)  ReactDOM.render()渲染组件时返回的组件实例
 * (2)  渲染dom元素时候，返回具体的dom节点
 * 
 * 2.ref可以挂载到组件上也可以是dom元素
 * (1)  挂载到dom元素上时表示具体的dom元素节点
 * (2)  挂到组件(class声明的组件)上的ref表示对组件实例的引用。不能再函数式的组件上使用ref属性，因为函数式的组件是没有实例的
 * 
 * 3.ref属性可以设置为一个回调函数
 *      react支持给任意组件添加特殊属性，ref属性接收一个回调函数，它在组件被加载或者卸载的时候会立即执行。
 *      ref回调会在 componentDidMount 或 componentDidUpdate 这些生命周期回调之前执行
 *      当给html元素添加了ref属性时，ref回调接收了底层的DOM元素作为参数
 * 
 * 4.当给组件，H5标签添加ref属性后，此实例只能在当前组件中被访问到，父组件中的refs中是没有此引用的
 *      (1)给h5元素设置ref <a ref="update">更新</a>后，可以拿到它的真实dom:<a>更新</a>
 *      (2)给组件设置ref<Child ref="child">后，会拿到组件的实例
 *          constructor { 
 *              context: {....},
 *              porps: {...}
 *          }
 */ 
