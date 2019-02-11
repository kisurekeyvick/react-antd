import * as React from 'react';
import { Icon } from 'antd';
import './message-component.scss';

export const KISUREMessage = (props: any) => {
    return (
        <div className="kisure-message-box">
            <p className="kisure-message-content">
                <Icon type="info-circle" />
                {
                    !props.hideSelectCount ? 
                    <span>
                        共找到
                        <span className='blue'>{props.totalCount}</span>
                        条符合条件的查询记录 (已选择
                        <span className='blue'>{props.assignlength}</span>
                        条)
                    </span> :
                    <span>
                        共找到
                        <span className='blue'>{props.totalCount}</span>
                        条符合条件的查询记录
                    </span>
                }
            </p>
        </div>
    );
}

/**
 * 2018/11/16
 * 函数式组件，这边需要导入 import * as React from 'react';否则tslint会提示错误
 */
