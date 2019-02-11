import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as XLSX from 'xlsx';
import * as _ from 'lodash';
import { Modal, Button, Row, Col, Steps, Icon, Upload, message } from 'antd';
import './saas-customer-modal-batch-import.scss';
import { api } from 'src/_mock/api';

const Step = Steps.Step;
const Dragger = Upload.Dragger;

interface IUploadInfo {
    totalCount: number;
    failCount: number;
}

export default class SaaSCustomerModalBatchImport extends React.PureComponent<any, any> {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        handleCancel: PropTypes.func.isRequired,
        handleOk: PropTypes.func.isRequired,
        rule: PropTypes.object,  
        keywords: PropTypes.object.isRequired,
        templateTitle: PropTypes.string.isRequired,
        errorKeywords: PropTypes.object.isRequired,
        errorTemplateTitle: PropTypes.string.isRequired,
        excelInstructions: PropTypes.object.isRequired, // 文件的规则说明
    }

    static defaultProps = {
        rule: {
            maxCount: 1000,
            maxSize: 1024 * 1024,
            fileCount: 1,
            fileType: ['xlsx']
        }
    }
    
    public config: any;
    public fileList: any[] = [];
    public uploadInfo: IUploadInfo;
    public charPixel: number = 10;  // 字符像素
    public errorInfo: any[] = [];
    public isPassRule: boolean = false;

    constructor(public props: any) {
        super(props);

        this.state = {
            loading: false,
            upload: 'wait', 
            import: 'wait', 
            over: 'wait'
        };

        this.config = {
            steps: [
                { title: '上传文件', icon: 'upload', statusKey: 'upload', progressIcon: 'loading', errorIcon: 'exclamation' },
                { title: '开始导入', icon: 'arrow-down', statusKey: 'import', progressIcon: 'loading', errorIcon: 'exclamation' },
                { title: '完成', icon: 'check', statusKey: 'over', errorIcon: 'exclamation' }
            ]
        };

        this.uploadInfo = {
            totalCount: 0,
            failCount:0
        };
    }

    /**
     * 下载模板
     * @type 模板的类型
     */
    public downloadTemplate = (e: any, type?: string) => {
        e.stopPropagation();
        let keyword: any;
        let excelName: string = '';
        let data: any[] =[];

        if (type === 'template') {
            keyword = this.props.keywords;
            excelName = this.props.templateTitle; 
        } else if (type === 'error') {
            keyword = this.props.errorKeywords;
            excelName = this.props.errorTemplateTitle;
            data =  this.errorInfo;
        }

        let wscols: any;
        let headerInstructions: any;
        let ws: XLSX.WorkSheet;

        const header = Object.keys(keyword);

        ws = XLSX.utils.json_to_sheet(data, {header});

        if (data.length === 0 && this.props.excelInstructions) {
            headerInstructions = Object.keys(this.props.excelInstructions);

            const result: any = {};

            for (const i in this.props.excelInstructions) {
                const Ikey = i;
                const Ivalue = this.props.excelInstructions[i];
                
                for (const j in keyword) {
                    const Jkey = j;
                    const Jvalue = keyword[j];

                    if (Ivalue === Jvalue) {
                        result[Ikey] = Jkey;

                        break;
                    }
                }
            }

            data.push(result);

            ws = XLSX.utils.json_to_sheet(data, {header: headerInstructions});
        }

        // 计算单元格宽度
        if (headerInstructions && _.isArray(headerInstructions))
            wscols = headerInstructions.map(item => {
                return {wpx: this.dataLength(item) * this.charPixel};
            });
        else if (_.isArray(header))
            wscols = header.map(item => {
                return { wpx: this.dataLength(item) * this.charPixel };
            });

        ws["!cols"] = wscols;
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, excelName);
    }

    public formatErrorExcelData = (data: any, fileKeyWordsError: any) => {
        const result: any[]= [];
        const head: any[] = Object.keys(fileKeyWordsError);
        
        data.forEach((item: any) => {
            const tmp: any = {};
            if (item) {
                head.forEach(subItem => {
                    tmp[subItem] = item[fileKeyWordsError[subItem]];
                });
            }
            result.push(tmp);
        });

        return result;
    }

    /**
     * @description 判断字数
     */
    public dataLength = (fData: any) => {
        let intLength = 0;
        for (let i = 0; i < fData.length; i++) {
            if (fData.charCodeAt(i) < 0 || fData.charCodeAt(i) > 255) intLength = intLength + 2;
            else intLength = intLength + 1;
        }
        return intLength;
    }

    /**
     * 上传附件前的限制
     */
    public beforeUpload = (file: File):boolean => {
        const sizeBool: boolean = file.size <= this.props.rule.maxSize;
        const countBool: boolean = this.fileList.length <= (this.props.rule.fileCount - 1);
        
        const ruleFileType: any[] = this.props.rule.fileType;
        const currentFileType = file.name.slice(file.name.lastIndexOf('.')+1);
        const typeBool: boolean = ruleFileType.findIndex(i => i === currentFileType) > -1;

        if (!sizeBool)
            message.error('文件太大，上传失败');

        if (!countBool)
            message.error(`当前仅限传入${this.props.rule.fileCount}个文件`);

        if (!typeBool)
            message.error(`当前仅限上传${this.props.rule.fileType.join('、')}类型的文件`);

        this.isPassRule = sizeBool && countBool && typeBool;
        return this.isPassRule;
    }

    /**
     * 正对于附件的相关操作
     */
    public handleChange = ({file, fileList}: any): void => {
        const status = file.status;
        let uploadStatus = 'process';

        if (this.isPassRule || status === 'removed')
            this.fileList = fileList || [];

        switch(status) {
            case 'done': 
                uploadStatus = 'finish';
                break;
            case 'removed': 
                uploadStatus = fileList.length === 0 ? 'wait' : 'finish';
                break;
            case 'error': 
                uploadStatus = 'error';
                break;
            case 'uploading':
                uploadStatus = 'process';
                break;
            default:
                uploadStatus = 'wait';
                break;
        }

        this.setState({
            upload: uploadStatus
        });
    }

    public handleCancel = (e: any, type?: string) => {
        this.props.handleCancel(`${type ? type : 'cancel'}`, false);
    }

    /**
     * 模拟上传附件(假)
     */
    public customRequest = (item: any) => {
        api.customRequest().then((res: any) => {
            if (res && res.status === 200)
                item.onSuccess(); 
            else
                item.onError();
        });
    }

    /**
     * 点击上传附件(真实)
     */
    public upLoad = () => {
        this.setState({
            loading: true,
            upload: 'finish'
        });

        this.fileList.forEach((file: any) => {
            const reader: FileReader = new FileReader();
            reader.readAsBinaryString(file.originFileObj);
            reader.onload = (e: any): any => {
                const bstr: string = e.target.result;
                const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
                const wsname: string = wb.SheetNames[0];
                const ws: XLSX.WorkSheet = wb.Sheets[wsname];
                let target: any = XLSX.utils.sheet_to_json(ws, { dateNF: 'YYYY/MM/DD', header: 1, });

                if (target && target instanceof Array && target.length>0) {
                    target = target.filter((res: any) => res && res.length > 0);
                    
                    // let head: any[] = [];
                    let body: any[] = [];

                    if (this.props.excelInstructions) {
                        // head = target.slice(1, 2)[0];
                        body = target.slice(2, target.length);
                    } else {
                        // head = target.slice(0, 1)[0];
                        body = target.slice(1, target.length);
                    }

                    if (body.length > this.props.rule.maxCount) {
                        message.error(`一次性只能导入${this.props.rule.maxCount}条数据`)
                        this.setState({
                            loading: false
                        });
                        return false;
                    }

                    this.uploadInfo.totalCount = body.length;

                    this.setState({
                        import: 'process'
                    });

                    api.upload().then((res: any) => {
                        if (res && res.status === 200) {
                            this.uploadInfo.failCount = res.data.result.failCount;
                            this.errorInfo = this.formatErrorExcelData((res.data.result.list|| []), this.props.errorKeywords);
                        } else
                            message.error('导入失败');

                        this.setState({
                            loading: false,
                            import: res && res.status === 200 ? 'finish' : 'error', 
                            over: res && res.status === 200 ? 'finish' : 'wait'
                        });
                    });
                }
            }
        });
    }

    public render() {
        const draggerProps = {
            name: 'name',
            multiple: true,
            customRequest: this.customRequest,
            beforeUpload: this.beforeUpload,
            onChange: (info: any) => this.handleChange(info),
            fileList: this.fileList
        }; 

        return (
            <Modal
                visible={this.props.visible}
                title={this.props.title}
                onCancel={this.handleCancel}
                footer={null}
                maskClosable={false}
                width={800}>
                <div className='kisure-saas-customer-modal-batch-import-content'>
                    <div className='kisure-saas-customer-modal-batch-import-steps'>
                        <Steps>
                            {
                                this.config.steps.map((item: any, index: number) => {
                                    return <Step key={`step-` + index} status={this.state[item.statusKey]} title={item.title} icon={<div className={this.state[item.statusKey] === 'finish' ? 'setp-box step-finish' : 'setp-box'}>
                                        <Icon type={
                                            this.state[item.statusKey] === 'process' ? item.progressIcon : this.state[item.statusKey] === 'error' ? item.errorIcon : item.icon
                                        } />
                                    </div>} />
                                })
                            }
                        </Steps>
                    </div>

                    <div className='kisure-saas-customer-modal-batch-import-explain'>
                        {
                            this.state.over !== 'finish' ?
                            <div className='kisure-saas-customer-modal-batch-import-explain-upload'>
                                <div className='upload-box'>
                                    <p className='upload-title'>1.<a onClick={(e) => this.downloadTemplate(e, 'template')}>点击下载导入模板</a>,将要导入的数据填入模板文件中：</p>
                                    <p className="upload-content">注意事项：</p>
                                    <p className="upload-content">1)表头标注 "*"  的列为必填项；表头不可更改，删除。</p>
                                    <p className="upload-content">2)单次导入的数据不能超过{this.props.rule.maxCount}条</p>
                                </div>

                                <div className='upload-box'>
                                    <p className="upload-title">2. 选择要导入的文件：</p>
                                    <div className='upload-control'>
                                        <Dragger {...draggerProps}>
                                            <p className="ant-upload-drag-icon">
                                                <Icon type="inbox" />
                                            </p>
                                            <p className="ant-upload-text">单击或拖动文件到此区域以上传。</p>
                                            <p className="ant-upload-hint">支持单个或批量上传。严禁上传公司数据或其他的文件。</p>
                                        </Dragger>
                                    </div>
                                </div>
                            </div>:
                            this.state.over === 'finish' ?
                            <div className='kisure-saas-customer-modal-batch-import-result'>
                                <p>导入完成，共{this.uploadInfo.totalCount}条，成功<span className="success">{this.uploadInfo.totalCount-this.uploadInfo.failCount}</span>条，失败<span className='error'>{this.uploadInfo.failCount}</span>条。</p>
                                {
                                    this.uploadInfo.failCount > 0 ? 
                                    <p><a onClick={(e) => this.downloadTemplate(e, 'error')}>下载错误报告</a>，查看失败数据与失败原因 </p>: 
                                    null
                                }
                            </div>:
                            null
                        }
                    </div>
                </div>

                <Row className='kisure-saas-customer-modal-batch-import-button'>
                    <Col>
                        {
                            this.state.over !== 'finish' ? (
                                [
                                    <Button key='cancel' onClick={this.handleCancel}>取消</Button>,
                                    <Button key='submit' type='primary' disabled={this.state.upload === 'error' || this.fileList.length === 0} loading={this.state.loading} onClick={this.upLoad}>开始导入</Button>
                                ]
                            ) :
                            this.state.over === 'finish' ? 
                            <Button key='cancel' onClick={(e: any) => this.handleCancel(e, 'success')}>关闭</Button> : null
                        }
                        
                    </Col>
                </Row>
            </Modal>
        );
    }
}

/**
 * 2018/11/30
 * js.xlsx插件配合fileReader解析excel，但fileReader不兼容ie9
 * 
 * FileReader共有4种读取方法：
 *  1.readAsArrayBuffer(file)：将文件读取为ArrayBuffer。
 *  2.readAsBinaryString(file)：将文件读取为二进制字符串
 *  3.readAsDataURL(file)：将文件读取为Data URL
 *  4.readAsText(file, [encoding])：将文件读取为文本，encoding缺省值为'UTF-8'
 */