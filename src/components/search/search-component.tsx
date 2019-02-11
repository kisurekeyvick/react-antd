import * as React from 'react';
import { Form, Row, Col, Button, Icon, DatePicker, Checkbox, Input, InputNumber, Select, Cascader, Skeleton } from 'antd';
import { KisureSearchFormRoute } from 'src/service/router';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import './search-component.scss';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const Option = Select.Option;

class SearchComponent extends React.PureComponent<any, any> {
    static propTypes = {
        formItem: PropTypes.array.isRequired,
        submit: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        otherParam: PropTypes.array.isRequired,
        resetParam: PropTypes.func.isRequired
    };

    public formItem: any[];
    public searchFormRoute: any;
    public getFieldDecorator: any;
    public getFieldsValue: any;
    public setFieldsValue: any;
    public isloading: boolean = true;
    public hasHideConfig: boolean = true;   // 是否存在hide配置，以便展开收起

    constructor(public props: any) {
        super(props);

        this.state = {
            expand: false
        };

        this.formItem = this.props.formItem;
        this.searchFormRoute = new KisureSearchFormRoute({
            history: this.props.history,
            location: this.props.location,
            match: this.props.match,
        });
        this.getFieldDecorator = this.props.form.getFieldDecorator;
        this.getFieldsValue = this.props.form.getFieldsValue;
        this.setFieldsValue = this.props.form.setFieldsValue;
    }

    public componentWillReceiveProps(nextProps: any) {
        this.formItem = nextProps.formItem;
    }

    /**
     * 用于判断组件是否需要更新
     * @param nextProps 下一个props
     */
    public shouldcomponentupdate(nextProps: any, nextState: any) {
        if (_.isEqual(this.props, nextProps) || !_.isEmpty(this.props)) {
            return false
        }
        return true
    }

    /**
     * 展开/收起的开关
     */
    public toggle = () => {
        const { expand } = this.state;
        this.setState({
            expand: !expand
        });

        this.formItem.forEach(item => {
            if ('hide' in item)
                item['hide'] = !item['hide'];
        });
    }

    /**
     * 提交搜索数据
     */
    public handleSearch = (e: any) => {
        e.preventDefault();
        const fields = this.getFieldsValue();

        this.formItem.forEach(item => {
            if (item.type === 'rangePicker' && fields[item.key] && fields[item.key].length === 2) {
                fields[item.key] = [
                    fields[item.key][0].toDate(),
                    fields[item.key][1].toDate()
                ];
            } else if (item.type === 'datePicker' && fields[item.key]) {
                fields[item.key] = fields[item.key].toDate();
            }
        });

        let submitField = JSON.parse(JSON.stringify(fields));
        this.props.otherParam.forEach((item: any) => {
            submitField = {...submitField, ...{
                [item.key]: item.value
            }};
        });

        this.props.submit(submitField);
        this.browserPathChange(fields);
    }

    /**
     * 重置搜索数据
     */
    public handleReset = () => {
        const fields = this.getFieldsValue();

        for(const item in fields) {
            if ({}.hasOwnProperty.call(fields, item)) {
                if (fields[item] instanceof Array) {
                    fields[item] = [];
                } else {
                    fields[item] = undefined;
                }
            }
        }

        this.setFieldsValue(fields);
        this.browserPathChange(fields);
        this.props.resetParam();
    }

    /**
     * 改变浏览器的url
     * @param fields searchForm中的字段
     */
    public browserPathChange(fields: any) {
        const paramsArr: any[] = [];
        const searchValue: any = fields;

        for(const key in searchValue) {
            const target = this.formItem.find(item => item.key === key);

            if (searchValue[key] instanceof Array && searchValue[key].length > 0)
                paramsArr.push({
                    key,
                    value: searchValue[key],
                    type: target.type
                });
            else if (target && searchValue[key] && !(searchValue[key] instanceof Array)) {
                paramsArr.push({
                    key,
                    value: searchValue[key],
                    type: target.type
                });
            }
        }

        this.searchFormRoute.changeUrl([...paramsArr, ...this.props.otherParam], false);
    }

    public componentWillUnmount() {
        
    }

    public createForm = ()=> {
        const children: any[] =[];
        const formItem = this.formItem.filter((form) => (!('hide' in form) || !form['hide']));

        console.log('formItem:',formItem);

        if (formItem && formItem.length > 0) {
            this.isloading = false;

            for(let i =0;i<formItem.length;i++) {
                const item = formItem[i];
                let child: any;

                switch(item.type) {
                    case 'inputText': child = <Input key={`inputText-${i}`} placeholder={item.placeholder} />;
                        break;
                    case 'inputNumber': child = <InputNumber style={{width: '100%'}} key={`inputNumber-${i}`} placeholder={item.placeholder}/>;
                        break;
                    case 'select': child = <Select key={`select-${i}`} placeholder={item.placeholder}>
                                            {
                                                item.config.options.map((option: any, index: any) => {
                                                    return <Option key={`options-${i}-${index}`} value={option.value}>{option.name}</Option>
                                                })
                                            }
                                        </Select>;
                        break;
                    case 'checkbox': child = <Checkbox key={`checkbox-${i}`}>{item.label}</Checkbox>;
                        break;
                    case 'datePicker': child = <DatePicker key={`datePicker-${i}`} format={item && item.config && item.config.format || 'YYYY-MM-DD'}/>;
                        break;
                    case 'rangePicker': child = <RangePicker key={`rangePicker-${i}`} format={item && item.config && item.config.format || 'YYYY-MM-DD'}/>;
                        break;
                    case 'cascader': child = <Cascader options={item.config.options} onChange={item.config.onChange} placeholder={item.placeholder} />;
                        break;
                }

                const init: any = {
                    initialValue: item.config.initialValue
                };

                if (item.type === 'checkbox')
                    init.valuePropName = 'checked';

                children.push(
                    <Col key={i} xs={24} sm={12} lg={8} xl={6}>
                        <FormItem label={item.type !== 'checkbox' && item.label}>
                            <Col xs={24}>
                                { this.getFieldDecorator(`${item.key}`, init)(child) }
                            </Col>
                        </FormItem> 
                    </Col>
                );
            }
        } else {
            this.isloading = true;

            children.push(
                <Skeleton key={`Skeleton`} active={true}/>
            );
        }

        return children; 
    }

    public render(){
        this.hasHideConfig = this.formItem.some(form => 'hide' in form); 

        return (
            <Form className='kisure-antd-advanced-search-form' onSubmit={this.handleSearch}>
                <Row gutter={48}>
                    { this.createForm() }
                </Row>
                {
                    !this.isloading ? 
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit">查询</Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>重置</Button>
                            {
                                this.hasHideConfig ? 
                                <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                                    {this.state.expand ? '收起' : '展开'} <Icon type={this.state.expand ? 'up' : 'down'} />
                                </a> : null
                            }
                        </Col>
                    </Row> : null
                }
            </Form>
        );
    }
}

export default Form.create()(SearchComponent);
