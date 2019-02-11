import * as React from 'react';
import { Spin, Button, Row, Col, message, Icon, Avatar } from 'antd';
import { KISUREPage, IPageInfo } from 'src/components/pagination/pagination-component';
import KISUREBrandModal from '../saas-customer-setting-modal/saas-customer-setting-modal-brand/saas-customer-setting-modal-brand';
import { api } from 'src/_mock/api';
import './saas-customer-setting-service-brand.scss';

export default class SaaSCustomerSettingServiceBrand extends React.PureComponent<any, any> {
    public config: any;
    public pageInfo: IPageInfo;
    public brandTypeList: any[] = [];
    
    constructor(public props: any) {
        super(props);

        this.state = {
            isLoading: false,
            saving: false,
            brandTypeVisible: false
        };

        this.pageInfo = {
            currentPage: 1,
            pageCount: 0,
            pageSize: 5,
            rowCount: 0,
            totalCount: 0,
            pageSizeOptions: ['5', '10', '15']
        };
    }

    public componentDidMount() {
        this.page(this.pageInfo.currentPage, this.pageInfo.pageSize);
    }

    /**
     * 加载服务品牌
     */
    public loadBrandTypeList = (param?: any) => {
        this.setState({ 
            isLoading: true
        });

        api.getBrandTypeListByStore(param).then((res: any) => {
            if (res && res.status === 200) {
                const { list, pageInfo } = res.data.result;

                this.brandTypeList = this.mapTableList(list);
    
                this.pageInfo = {...this.pageInfo, ...{ totalCount: pageInfo.totalCount }};
            }

            this.setState({
                isLoading: false
            });
        });
    }

    /**
     * 映射列表数据
     * @param list 
     */
    public mapTableList = (list: any[]): any[] => {
        return list;
    }

    /**
     * 分页回调
     * @param currentPage 
     * @param pageSize 
     */
    public page = (currentPage:number, pageSize: number, isSearchCallBack: boolean = false) => {
        this.pageInfo = {...this.pageInfo, ...{
            currentPage: currentPage === 0 ? 1 : currentPage,
            pageSize
        }};

        const params: any = {
            pageInfo: {
                currentPage: currentPage === 0 ? 1 : currentPage,
                pageSize
            }
        };

        this.loadBrandTypeList(params);
    }

    /**
     * 新增brand
     */
    public toggleBrandModal = (e:any, bool: boolean) => {
        this.setState({
            brandTypeVisible: bool
        });
    }

    /**
     * 删除brand
     */
    public deleteBrand = (type: string, item?: any) => {
        this.setState({ 
            isLoading: true
        });

        const brandTypeIdList: number[] =  type === 'all' ? this.brandTypeList.map((list: any) => {
            return list.brandTypeId;
        }) : [item.brandTypeId];
        
        api.deleteBrandTypeListByStore({brandTypeIdList}).then((res: any) => {
            if (res && res.status === 200)
                message.success('删除品牌成功');
            else
                message.error('删除品牌失败');

            this.setState({
                isLoading: false
            });
        });
    }

    public render() {
        const brandProps = {
            visible: this.state.brandTypeVisible,
            title: '品牌选择',
            handleCancel: this.toggleBrandModal,
            handleOk: this.toggleBrandModal
        };

        return (
            <div className='kisure-saas-customer-setting-brand'>
                <Spin tip='Loading...' spinning={this.state.isLoading}>
                    <div className='kisure-saas-customer-setting-brand-list'>
                        <Row>
                            <Col>
                                {
                                    this.brandTypeList.map((item: any, index: number) => {
                                        return <div className='brand-list-div' key={`div-`+ item.brandTypeId}>
                                            <Avatar src={item.imgSrc} />
                                            <span>{item.brandTypeName}</span>
                                            <span onClick={() => this.deleteBrand('single', item)} className='close-span'><Icon type="close" /></span>
                                        </div>
                                    })
                                }
                            </Col>
                        </Row>
                    </div>
                    <div className='kisure-saas-customer-setting-brand-page'>
                        <KISUREPage pageChange={this.page} {...this.pageInfo}/>
                    </div>
                    <div className='kisure-saas-customer-setting-brand-button'>
                        <Row>
                            <Col>
                                <Button key='submit' type='primary' onClick={(e: any) => this.toggleBrandModal(e, true)}>新增</Button>
                                <Button key='delete' type='primary' onClick={() => this.deleteBrand('all')}>全部清除</Button>
                            </Col>
                        </Row>

                        <p>说明：摄像头扫到的车辆中，只有属于选定的品牌才会创建车辆任务、续保期内的会推送通知</p>
                    </div>
                    <div className='kisure-saas-customer-setting-brand-modal'>
                        { this.state.brandTypeVisible && <KISUREBrandModal {...brandProps}/> }
                    </div>
                </Spin>
            </div>
        )
    }
}
