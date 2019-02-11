import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Modal, Button, Row, Col, Form, Input, Spin, Table, message } from 'antd'; 
import { KISUREPage, IPageInfo } from 'src/components/pagination/pagination-component';
import { ISettingFormItems, formItems, tableColumns } from './saas-customer-setting-modal-brand-config';
import { api } from 'src/_mock/api';
import './saas-customer-setting-modal-brand.scss';

const FormItem = Form.Item;
const Search = Input.Search;

class SaaSCustomerSettingModalBrand extends React.PureComponent<any, any> {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        handleCancel: PropTypes.func.isRequired,
        handleOk: PropTypes.func.isRequired,
    };
    
    public config: any;
    public pageInfo: IPageInfo;
    public brandTypeList: any[] = [];
    public selectedBrand: any[] = [];
    
    constructor(public props: any) {
        super(props);

        this.state = {
            isLoading: false
        };

        this.config = {
            formItem: formItems,
            tableColumn: tableColumns
        };

        this.pageInfo = {
            currentPage: 1,
            pageCount: 0,
            pageSize: 5,
            rowCount: 0,
            totalCount: 0,
            pageSizeOptions: ['5', '10', '15', '20']
        };
    }

    public componentDidMount() {
        this.search();
    }

    /**
     * 创建formItem
     * @param item 
     */
    public createForm = (form: ISettingFormItems, getFieldDecorator:any): any => {
        let formItem: any;
        
        switch(form.type) {
            case 'searchInput':
                formItem = getFieldDecorator(form.key, {
                    initialValue: form.config.initialValue,
                    rules: form.config.rule || []
                })( <Search placeholder={form.config.placeholder} onSearch={this.search} enterButton={true}/> )
                break;
            default:
                formItem = null;
                break;
        }

        return formItem;
    }

    /**
     * 查询
     */
    public search = () => {
        this.page(this.pageInfo.currentPage, this.pageInfo.pageSize);
    }

    /**
     * 取消
     */
    public handleCancel = () => {
        this.props.handleCancel('cancel', false);
    }

    /**
     * 确认
     */
    public handleOk = () => {
        this.setState({
            isLoading: true
        });

        const params: any[] = this.selectedBrand.map((item: any) => {
            return item.brandTypeId
        });

        api.saveBrandTypeByLike(params).then((res: any) => {
            this.setState({
                isLoading: false
            });
            
            if (res && res.status === 200) {
                message.success('品牌保存成功');
                this.props.handleCancel('success', false);
            }
        });
    }

    /**
     * 加载品牌
     */
    public loadBrandTypeByLike = (param?: any) => {
        this.setState({ 
            isLoading: true
        });

        const { getFieldsValue } = this.props.form;

        const searchControl =  getFieldsValue(['searchInput']);

        param = {...param, ...{
            searchContent: searchControl && searchControl['searchInput']
        }};

        api.getBrandTypeByLike(param).then((res: any) => {
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
        return list.map((item: any, index: number) => {
            const result = {...item, ...{
                key: `${item.brandTypeId}`
            }};
            
            return result;
        });
    }

    /**
     * table处checkbox联动选择框
     */
    public rowSelection: any = {
        onChange: (selectedRowKeys: string[], selectedRows: any[]) => {
            const initArr:any[] = [...this.selectedBrand, ...selectedRows];
            const formatArr: any[] = [];

            selectedRowKeys.forEach(item => {
                const target = initArr.find(i => {
                    return i['brandTypeId'] === +(item);
                });
                formatArr.push(target);
            });

            this.selectedBrand = formatArr;
        }
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

        this.loadBrandTypeByLike(params);
    }

    public render() {
        const { getFieldDecorator } = this.props.form;

        const pageProps = {
            size: 'small'
        };

        return (
            <Modal
                visible={this.props.visible}
                title={this.props.title}
                onCancel={this.handleCancel}
                footer={null}
                maskClosable={false}
                width={'650px'}>
                <Spin tip='Loading...' spinning={this.state.isLoading}>
                    <div className='kisure-saas-customer-modal-brand-search'>
                        <Form layout='inline'>
                            <Row>
                                <Col>
                                    {
                                        this.config.formItem.map((item: ISettingFormItems, index: number) => {
                                            return <Col key={index} xs={24}>
                                                        <FormItem
                                                            key={item.key + '' + item.id}
                                                            {...item.config.formItemLayout}>
                                                            { this.createForm(item, getFieldDecorator) }
                                                        </FormItem>
                                                    </Col>
                                        })
                                    }
                                </Col>
                            </Row> 
                        </Form>
                    </div>
                    <div className='kisure-saas-customer-modal-brand-table'>
                        <Table 
                            rowSelection={this.rowSelection}
                            columns={this.config.tableColumn} 
                            dataSource={this.brandTypeList}
                            pagination={false} />
                    </div>
                    <div className='kisure-saas-customer-modal-brand-page'>
                        <KISUREPage pageChange={this.page} {...this.pageInfo} {...pageProps}/>
                    </div>
                    <div className='kisure-saas-customer-modal-brand-button'>
                        <Row>
                            <Col>
                                <Button key='cancel' onClick={this.handleCancel}>取消</Button>
                                <Button key='submit' className='red' type='primary' loading={this.state.loading} onClick={this.handleOk}>确认</Button>
                            </Col>
                        </Row>
                    </div>
                </Spin>
            </Modal>
        )
    }
}

export default Form.create()(SaaSCustomerSettingModalBrand);
