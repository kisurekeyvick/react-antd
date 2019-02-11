export interface IFormItems {
    key: string;
    id: number;
    label: string;
    type: string;
    [key: string]: any
}

export interface ITableColumns {
    title: string;
    key: string;
    id: number;
    dataIndex?: string; 
    [key: string]: any;
}