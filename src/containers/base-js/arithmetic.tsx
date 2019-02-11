import * as React from 'react';

export default class Arithmetic extends React.PureComponent<any, any> {
    constructor(public props: any) {
        super(props);

        const arr: number[] = [3,44,38,5,47,15,36,26,27,44,46,38,19,50,48];

        this.bubbleSort(arr);
    }

    /**
     * 冒泡排序
     */
    public bubbleSort = (arr: number[]) => {
        
    }

    public render() {
        return <p>
            算法
        </p>
    }
}
