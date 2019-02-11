import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as moment from 'moment';
import { Button, Spin, Timeline, Alert, Icon, Popover } from 'antd';
import { KISUREPage, IPageInfo } from 'src/components/pagination/pagination-component';
import { AudioComponent } from 'src/components/audio/audio-component';
import { api } from 'src/_mock/api';
import './saas-customer-list-budget-record.scss';

interface IValue {
    name: string;
    value: string
}

interface IBtnGroup extends IValue {
    tag: string;
}

export default class SaaSCustomerListBudgetRecord extends React.PureComponent<any, any> {
    static propTypes = {
        customerInfo: PropTypes.object,
        history: PropTypes.any.isRequired
    };
    
    public config: any = {};
    public pageInfo: IPageInfo;
    
    constructor(public props: any) {
        super(props);

        this.state = {
            isLoading: false,
            tag: 'all',
            audioVisible: false
        };

        this.config = {
            buttonGroup: [
                { name: '全部', value: '', tag: 'all' },
                { name: '客户状态', value: '', tag: 'status' },
                { name: '跟进', value: '', tag: 'follow' },
                { name: '报价', value: '', tag: 'offer' },
                { name: '通话', value: '', tag: 'conversation' },
                { name: '修改客户信息', value: '', tag: 'modify' },
                { name: '战败', value: '', tag: 'defeat' },
                { name: '重新分配续保员', value: '', tag: 'reassign' },
            ],
            recordList: []
        };

        this.pageInfo = {
            currentPage: 1,
            pageCount: 0,
            pageSize: 10,
            rowCount: 0,
            totalCount: 0,
            pageSizeOptions: ['10', '20', '30', '40', '50']
        };
    }

    public componentDidMount(){
        this.page(this.pageInfo.currentPage, this.pageInfo.pageSize);
    }

    public loadRecord = (params: any) => {
        this.setState({
            isLoading: true
        });

        api.getCustomerHistoricalRecord(params).then((res: any) => {
            if (res && res.status === 200) {
                const { list, pageInfo, logStatusSum = {} } = res.data.result;

                this.config.recordList = this.formatRecordList(list);
                const group: IBtnGroup[] = this.config.buttonGroup;
                for(const key in logStatusSum) {
                    const target: any = group.find((i:IBtnGroup) => i.tag === key);
                    target['value'] = logStatusSum[key];
                }

                this.pageInfo = {...this.pageInfo, ...{ totalCount: pageInfo.totalCount }};
            }

            this.setState({
                isLoading: false
            }); 
        });
    }

    public formatRecordList = (records: any[]): any[] => {
        return records.map((record: any) => {
            record['logDisplay'] = record['logDisplay'].map((item: any) => {
                const result: IValue = {name: '', value: ''};

                for(const key in item) {
                    result.name = key;
                    result.value = item[key];
                }

                return result;
            });

            const operator: IValue = {name: '操作人', value: record.operator};

            if (record.operationName === '成单') {
                record['titleLink'] = {
                    name: '订单详情',
                    linkTo: `/saas/customer/policy/detail/${record.extId}`,
                    tag: 'link'
                };
            }

            if (record.operationName === '报价') {
                record['titleLink'] = {
                    name: '报价详情',
                    linkTo: `/saas/customer/budget/detail/${record.extId}`,
                    tag: 'link'
                };
            }

            if (record.operationName === '通话') {
                record['titleLink'] = {
                    name: '录音地址',
                    linkTo: record['audioUrl'],
                    tag: 'play-circle'
                };
            }

            record['logDisplay'].unshift(operator);

            record['updatedTime'] = record['updatedTime'] ? `${moment(new Date(record['updatedTime'])).format('YYYY-MM-DD HH:mm:ss')}` : '';

            return record;
        });
    }

    public selectBtnSearchRecord = (item: IBtnGroup) => {
        const params = {
            pageInfo: {
                currentPage: 1,
                pageSize: 10
            },
            type: item.tag
        };

        this.setState({
            tag: item.tag
        });

        this.loadRecord(params);
    }

    /**
     * 分页回调
     * @param currentPage 
     * @param pageSize 
     */
    public page = (currentPage:number, pageSize: number, isSearchCallBack: boolean = false) => {
        this.pageInfo = {...this.pageInfo, ...{
            currentPage,
            pageSize
        }};

        const params = {
            pageInfo: {
                currentPage,
                pageSize
            }
        };

        this.loadRecord(params);
    }

    public createTimelineItem = (record: any, index: number) => {
        let Audio: any;
        if (record['titleLink'] && record['titleLink']['tag'] === 'play-circle')
            Audio = this.state.audioVisible && <AudioComponent {...{name: record.audioPerson, url: record.audioUrl, id: record.extId}}/>;

        return (
            <Timeline.Item key={`record-timeline-item-` + index}>
                <p key={`record-title-` + index} className='timeline-item-title'>
                    <span>{record.operationName}</span>
                    {
                        'titleLink' in record ? 
                        record['titleLink']['tag'] === 'play-circle' ? 
                        <Popover placement="left" content={Audio} trigger="click" onVisibleChange={this.popoverVisibleChange}>
                            <a href="javascript:;">
                                <Icon type='play-circle' /><span>{record['titleLink']['name']}</span>
                            </a> 
                        </Popover> :
                        <a href="javascript:;" onClick={(e) => this.skipPage(e, record['titleLink']['linkTo'])}>
                            <Icon type={record.tag || 'link'} /><span>{record['titleLink']['name']}</span>
                        </a> : null
                    }
                </p>
                <span key={`record-time-` + index} className='time'>{record.updatedTime}</span>
                {
                    (record.logDisplay || []).map((log: IValue, i: number) => {
                        return <p key={`record-log-p-` + i}>{log.name}：{log.value}</p>;
                    })
                }
            </Timeline.Item>
        );
    }

    /**
     * 跳转页面
     * @param url 
     */
    public skipPage = (e: any, url: string) => {
        e.preventDefault;
        const { history } = this.props;
        history.push(url);
    }

    /** 
     * 听录音
     */
    public popoverVisibleChange = (e: boolean) => {
        this.setState({
            audioVisible: e
        });
    }

    public render() {
        return (
            <div className='kisure-customer-list-budget-record'>
                <Spin tip='Loading...' spinning={this.state.isLoading}>
                    <div className='kisure-customer-list-budget-record-title'>
                        <p>跟进记录</p>
                    </div>
                    <div className='kisure-customer-list-budget-record-content'>
                        <div className='kisure-customer-list-budget-record-button'>
                            {
                                this.config.buttonGroup.map((item: IBtnGroup, index: number) => {
                                    return <Button key={`button-group-` + index} type={this.state.tag === item.tag ? 'primary' : 'default'} onClick={() => this.selectBtnSearchRecord(item)}>{item.name}{item.value ? item.value : ''}</Button>
                                })
                            }
                        </div>
                        <div className='kisure-customer-list-budget-record-list'>
                            {
                                this.config.recordList.length > 0 ? 
                                <div className='kisure-customer-list-budget-record-timeline'>
                                    <Timeline>
                                        {
                                            this.config.recordList.map((list: any, index: number) => {
                                                return this.createTimelineItem(list, index);
                                            })
                                        }
                                    </Timeline>
                                </div> : 
                                <div className='kisure-customer-list-budget-record-warn'>
                                    <Alert message="暂未存在跟进记录" type="warning" showIcon={true} />
                                </div>
                            }
                        </div>
                        <div className='kisure-customer-list-budget-pageInfo'>
                            <KISUREPage pageChange={this.page} {...this.pageInfo}/>
                        </div>
                    </div>
                </Spin>
            </div>
        )
    }
}
