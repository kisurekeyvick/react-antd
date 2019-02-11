import * as React from 'react';
import * as PropTypes from 'prop-types';
// import { ThemeContext } from './context';

export default class ReactJsOneChildContext extends React.Component<any, any> {
    /* 
        子组件需要声明一个静态的属性【contextTypes】: 属性中声明你需要的Context属性
        注意！！子组件需要经过静态属性contextTypes声明后，才能够访问父组件Context对象的属性
        否则，即使你属性名字没有写错，也获取不到context中的内容，返回的是undefined
    */
    static contextTypes = {
        theme: PropTypes.object
    }
    
    constructor(public props: any) {
        super(props);
    }

    public componentDidMount() {
        const { theme } = this.context;
        console.log(`子组件加载完成：${theme}`);
    }

    public componentWillReceiveProps(nextProps: any, nextContext: any) {
        console.log(`子组件接收context参数: ${nextContext}`);
    }

    public render() {
        return (
            <p>
                {
                    // <ThemeContext.Consumer>
                    //     {
                    //         (context: any) => {
                    //             const { theme } = context;
                    //             console.log(`Ract 的 Context，这里是ReactJsOne的子组件，这里获取父组件提供的context：theme，它的值为${theme}`);
                    //             return <p>这是ReactJsOne的子组件</p>
                    //         }
                    //     }
                    // </ThemeContext.Consumer>
                }
                这是ReactJsOne的子组件
            </p>
        )
    }
}
