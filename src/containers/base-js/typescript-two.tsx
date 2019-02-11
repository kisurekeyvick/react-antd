import * as React from 'react';

export default class TypescriptTwo extends React.PureComponent<any, any> {
    constructor(public props: any) {
        super(props);

        this.emunTest();
    }

    public emunTest = () => {
        enum week {
            sun=7,
            mon=1,
            tue,
            wed,
            thu,
            fri,
            sat
        };

        console.log(`这是一个枚举,当前枚举的值为：  
            ${week.mon} // 1 
            ${week.sun} // 7
            ${week[2]}  // tue`);

        /*
            -------------------------------总结------------------------------------
            - 在实际应用中，有的变量只有几种可能取值。例如人的性别，星期只有7种。
                所谓的枚举是指将变量的值一一举例出来，变量只限于举例出来的值范围内取值

            - 枚举成员必须具有初始化表达式
                也就是说枚举里面的成员要统一类型，如果是字符串字面量，那么其余的成员都必须是字符串类型
        */
    }

    /* 
        回调和高阶函数
        - 回调：在ts中，函数可以作为参数传递给其他函数。被传递给其他函数的函数叫做回调。
                函数也可以被另一个函数返回。
        - 高阶函数：接收函数作为参数(回调)或返回另一个函数的函数被称为高阶函数

        例如：const foo = () => { console.log('hello') };       // foo 是一个回调函数
              function bar(cd: () => void) {    // function bar 是一个高阶函数
                console.log('bar');
                cb();
              }
              bar(foo); 
    */


    public render() {
        return <div>
            Typescript demo two
        </div> 
    }
}
