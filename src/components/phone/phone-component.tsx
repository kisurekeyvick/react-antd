import * as React from 'react';
import * as PropTypes from 'prop-types';
import { DragService } from 'src/service/drag';
import { Icon, Tooltip, message, Alert, Skeleton, Button } from 'antd';
import { api } from 'src/_mock/api';
import './phone-component.scss';

export default class PhoneComponent extends React.PureComponent<any, any> {
    static propTypes = {
        task: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired,
        close: PropTypes.func.isRequired,
    }

    public Emitter: any;
    public componentRef: any;
    public dragService: DragService;

    constructor( public props: any ) {
        super(props);

        this.state = {
            type: 'common',
            canCallCustomer: false,
            isLoading: true,
            style: {
                top: '200px',
                left: '200px',
                disX: 0,
                disY: 0
            }
        };

        this.componentRef = React.createRef();
        this.dragService = new DragService('phoneComponentMoveEvent', 300, this.componentRef);
    }

    public componentDidMount() {
        api.phoneCall().then((res: any) => {
            if (res.status === 200)
                message.success('电话连接成功');
            else
                message.error('电话连接失败');

            this.setState({
                canCallCustomer: res.status === 200 ? true : false,
                isLoading: false
            });
        });
        
        this.dragService.eventEmitter.addListener('phoneComponentMoveEvent', (msg: any) => {
            this.setState({
                style: {...this.state.style, ...msg}
            });
        });
    }

    /**
     * 关闭打电话界面
     */
    public close = () => {
        this.props.close(false);
    }

    /**
     * 切换打电话ui样子
     * @param type
     */
    public changeStatus = (type: string) => {
        this.setState({
            type
        });
    }

    /**
     * 挂断电话
     */
    public hangUp = () => {
        api.handUpPhone().then((res: any) => {
            if (res.status === 200) {
                this.props.close(false, null, 'success');
            }
        });
    }

    /**
     * 鼠标移动
     */
    public mouseDown = (e: any) => {
        this.dragService.mouseDown(e);
    }

    public render() {
        const { title } = this.props;

        return (
            <div className='kisure-antd-advanced-phone' ref={this.componentRef} style={{position: 'fixed', zIndex: 9999, top: this.state.style.top, left: this.state.style.left}} onMouseDown={this.mouseDown}>
                {
                    this.state.isLoading ? 
                    <div className='kisure-antd-advanced-phone-connecting'>
                        <p>电话连接中<Icon type="sync" spin={true} />...
                            <span className='span-close icon-box'>
                                <Tooltip title="关闭">
                                    <Icon type="close" onClick={this.close}/>
                                </Tooltip>    
                            </span> 
                        </p>
                        <Skeleton avatar={true} paragraph={{ rows: 2 }}/>
                    </div> : 
                    this.state.canCallCustomer ? 
                    this.state.type === 'common' ? 
                    <div className='kisure-antd-advanced-phone-common'>
                        <p>
                            {title}
                            <span className='span-close icon-box'>
                                <Tooltip title="关闭">
                                    <Icon type="close" onClick={this.close}/>
                                </Tooltip>    
                            </span> 

                            <span className='span-small icon-box'>
                                <Tooltip title="最小化">
                                    <Icon type="minus" onClick={() => this.changeStatus('small')}/> 
                                </Tooltip>    
                            </span>
                        </p>
                        <div className='phone-action'>
                            <Tooltip title="挂断">
                                <Icon type="phone" onClick={this.hangUp}/>
                            </Tooltip>
                            
                            <span className='phone-action-text'>
                                通话中<Icon type="sync" spin={true} />...(点击红色按钮挂断电话)
                            </span>
                        </div> 
                    </div> :
                    <div className='kisure-antd-advanced-phone-small'>
                        <p>
                            <span className='span-common icon-box'>
                                <Tooltip title="还原">
                                    <Icon type="switcher" onClick={() => this.changeStatus('common')}/>
                                </Tooltip>
                            </span>
                        </p>
                        <div className='phone-action'>
                            <Tooltip title="挂断">
                                <Icon type="phone" onClick={this.hangUp}/>
                            </Tooltip>
                        </div>
                    </div> :
                    <div className='kisure-antd-advanced-phone-fail'>
                        <Alert message="电话连接失败" type="error" showIcon={true} />
                        <div className='kisure-antd-advanced-phone-fail-cancel'>
                            <Button type="primary" size="small" onClick={this.close}>关闭</Button>
                        </div>
                    </div> 
                }
            </div>
        )
    }
}