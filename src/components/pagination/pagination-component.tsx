import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Pagination } from 'antd';
import './pagination-componnet.scss';

export interface IPageInfo {
    currentPage: number;
    pageCount: number;
    pageSize: number;
    rowCount: number;
    totalCount: number;
    pageSizeOptions?: string[];
}

export class KISUREPage extends React.Component<any, any> {
    static propTypes = {
        totalCount: PropTypes.number.isRequired,
        currentPage: PropTypes.number.isRequired,
        pageSize: PropTypes.number.isRequired,
        pageChange: PropTypes.func.isRequired,
        defaultCurrent: PropTypes.number,
        showSizeChanger: PropTypes.bool,
        showQuickJumper: PropTypes.bool,
        pageSizeOptions: PropTypes.array,
        showPageInfo: PropTypes.bool,
        size: PropTypes.string
    }

    static defaultProps = {
        defaultCurrent: 1,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        showPageInfo: true,
        size: ''
    }

    constructor(public props: any) {
        super(props);
    }

    /**
     * 点击分页控件触发回调给父级
     * @param page 当前页
     * @param pageSize 当前页数量
     */
    public pageChange = (page: number, pageSize: number) => {
        this.props.pageChange(page, pageSize);
    }

    public render() {
        const multiply = (num?: number) => (this.props.currentPage-(num ? num : 0))*(this.props.pageSize) + (num ? num : 0);
        const start: number = this.props.totalCount === 0 ? 0 : multiply(1);
        const end: number = multiply() > this.props.totalCount ? this.props.totalCount : multiply();

        return (
            <div className='kisure-pagination-component'>
                {
                    this.props.showPageInfo ? <span className='kisure-pagination-pageInfo'>【第{start}-{end} 条，共{this.props.totalCount}条】</span> : ''
                }
                <Pagination
                    showSizeChanger={this.props.showSizeChanger} 
                    showQuickJumper={this.props.showQuickJumper}
                    total={this.props.totalCount} 
                    defaultCurrent={this.props.currentPage}
                    pageSize={this.props.pageSize} 
                    pageSizeOptions={this.props.pageSizeOptions}
                    onChange={this.pageChange}
                    onShowSizeChange={this.pageChange}
                    size={this.props.size}/>
            </div>
        );
    }
}