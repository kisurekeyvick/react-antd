export interface ISettingFormItems {
    label: string;
    id: number;
    key: string;
    type: string;
    [key: string]: any;
    config?: any
};

export interface ITableColumns {
    title: string;
    key: string;
    id: number;
    dataIndex?: string; 
    [key: string]: any;
};