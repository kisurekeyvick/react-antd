interface IConfig {
    rule: any[];
    initialValue: any;
    [key: string]: any;
    options?: any[];
    format?: string;
}

interface IForm {
    label: string;
    id: number;
    key: string;
    type: string;
    config: IConfig;
    hasFeedback ?: boolean;
    placeholder?: string;
}

export {
    IConfig,
    IForm
}