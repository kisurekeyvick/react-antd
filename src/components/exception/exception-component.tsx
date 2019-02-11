import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Button } from 'antd';
import * as _ from 'lodash';
import { exceptionConfig, IExceptionConfig } from './exception-config';
import './exception-component.scss';

export default class ExceptionComponent extends React.PureComponent<any, any> {
    public config: any;

    /* 
        type 异常类别
    */
    static propTypes = {
        type: PropTypes.string.isRequired,
        linkTo: PropTypes.func.isRequired,
        backText: PropTypes.string,
        redirect: PropTypes.string
    };

    static defaultProps = {
        type: '404',
        backText: '返回首页',
        redirect: '/',
    };

    constructor(public props: any) {
        super(props);

        this.config = {
            exception: _.cloneDeep(exceptionConfig)
        };
    }

    public render() {
        const exception: IExceptionConfig = this.config.exception[this.props.type];

        return(
            <div className='expection'>
                <div className='expection-bgBox'>
                    <div className='expection-imgEle' style={{ backgroundImage: `url(${exception.img})` }}/>
                </div>
                <div className='expection-content'>
                    <h1>{exception.title}</h1>
                    <div className='expection-desc'>{exception.desc}</div>
                    <div className='expection-actions'><Button type='primary' onClick={() => this.props.linkTo(this.props.redirect)}>{this.props.backText}</Button></div>
                </div>
            </div>
        );
    }
}

/*
    export interface IExceptionProps {
        type?: '403' | '404' | '500';
        title?: React.ReactNode;
        desc?: React.ReactNode;
        img?: string;
        actions?: React.ReactNode;
        linkElement?: string | React.ComponentType;
        style?: React.CSSProperties;
        className?: string;
        backText?: React.ReactNode;
        redirect?: string;
    }

    export default class Exception extends React.Component<IExceptionProps, any> {}
*/
