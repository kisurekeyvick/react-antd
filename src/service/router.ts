/**
 * 2018/11/19
 */
import * as moment from 'moment';

interface IRouteParams {
    history: any;
    location: any;
    match: any;
    otherParam: Array<{key: string, value: any, type: string}>;
}

interface IurlParams {
    key: string;
    value: any;
    type: string;
}

class KisureSearchFormRoute {
    public history: any;
    public location: any;
    public match: any;

    constructor({
        history,
        location,
        match
    }: any) {
        this.history = history;
        this.location = location;
        this.match = match;
    }

    /**
     * 改变url
     * @param urlParams 字段参数 
     * @param bool  是否replace history 默认false
     */
    public changeUrl = (urlParams: IurlParams[] = [], bool: boolean = false) => {
        let to: string = '';

        if(urlParams.length === 0)
            return;

        urlParams.forEach((item, index: number) => {
            let paramStr: string = '';

            switch(item.type) {
                case 'rangePicker':
                    paramStr = `${item.key}=${moment(new Date(item.value[0])).format('YYYY-MM-DD HH:mm:ss')}&${item.key}=${moment(new Date(item.value[1])).format('YYYY-MM-DD HH:mm:ss')}`;
                    break;
                default: 
                    paramStr = `${item.key}=${item.value}`;
                    break;
            }

            to += `${index === 0 ? '?' : '&'}${paramStr}`;
        });

        if (bool)
            this.history.replace(to);
        else
            this.history.push(to);
    }

    /**
     * 解析url
     * @param formItem  配置searchForm字段信息
     */
    public urlAnalysis = (formItem: any[]) => {
        const params: any[] = [];

        const format = (key: string, value: any) => {
            let formatVal = value;
            const target = formItem && formItem.find(item => item.key === key);

            if (target) {
                switch(target.type) {
                    case 'datePicker':
                    case 'rangePicker': formatVal = moment(new Date(value.replace('%20', ' '))); 
                        break;
                    case 'checkbox': formatVal = true;
                        break;
                    case 'inputNumber': formatVal = +(value);
                        break;
                    case 'select': formatVal = (+(value) || value);
                        break;
                    default: formatVal = value;
                        break;
                }
            }

            return formatVal;
        }
        
        this.location.search.replace('?', '').split('&').forEach((param: any) => {
            const arr: string[] = param.split('=');
            const key = arr[0];
            const value = format(key, arr[1]);
            const target = params.find(i => i.key === key);

            if (target) {
                target.value = [target.value, value];
            } else {
                params.push({
                    key,
                    value
                });
            }
        });

        return params;
    }
}

export {
    IRouteParams,
    IurlParams,
    KisureSearchFormRoute
}