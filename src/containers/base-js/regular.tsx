import * as React from 'react';

export default class Regular extends React.PureComponent<any, any> {
    constructor(public props: any) {
        super(props);

        this.regExp_one();
        this.stringRegParamsTest();
        this.replaceTest();
    }

    public regExp_one = () => {
        const reg = new RegExp('a');
        const reg_two =  new RegExp(/a|b/);     // /a|b/; 
        const reg_three = new RegExp(/[ab]/);
        // 检查一个字符串： 开头是a，结尾是c，中间任意字符串
        const reg_four = new RegExp(/^a[A-z]c$/);
        // 除了ab，如果存在其他的，那么允许通过
        const reg_five = new RegExp(/[^ab]/);
        // 检查一个字符串中是否存在连续3个a后面紧跟着一个b
        const reg_six = new RegExp(/a{3}b/);
        // ()代表的是一个整体 这里检查一个字符串中是否存在连续1次到2次的abc，(也就是说最低要求的至少有一个连续的abc)
        const reg_seven = new RegExp(/(abc){1,2}/);
        /* 
            这是一个手机号的正则表达式
            (1)以1为开头
            (2)第二位3-9任意数字
            (3)三位以后任意9个数字

            ^1  [3-9]  [0-9]{9}$
            其中： [0-9]{9}$ 代表的是一共9位数字，并且只能是以这九位数字结尾
        */
        const reg_eight = new RegExp(/^1[3-9][0-9]{9}$/);

        // \s 表示的是存在空格    \S 表示不存在空格
        const reg_nine = new RegExp(/\s/);
        const reg_ten = new RegExp(/\S/);

        // 取出开头和结尾的空格
        const reg_eleven = /^\s*|\s*$/g;

        console.log(`创建正则表达式：new RegExp()，创建以后的值为${reg}`);
        console.log(`这个正则表达式的作用是判断字符串中是否包含a或者b，${reg_two.test('abc')}`);
        console.log(`这个正则表达式的作用是判断字符串中是否包含a或者b，这里使用[]，[]里面的内容就是或的意思 ${reg_three.test('abc')}`);
        console.log(`检查一个字符串： 开头是a，结尾是c，中间任意字符串 ${reg_four.test('abc')}`);
        console.log(`检查一个字符串：除了ab这2个字符串，其他的都可以 ${reg_five.test('abc')}`);
        console.log(`检查一个字符串：是否含有连续3个a加上一个b，${reg_six.test('aaabc')}`);
        console.log(`检查一个字符串：是否含有连续3个abc的字符串：${reg_seven.test('abcabcabc')}`);
        console.log(`检查一个字符串：这个字符串的规则是手机号：${reg_eight.test(`13795654341`)}`);
        console.log(`检查一个字符串：\在字符串中代表的是转义，如果我们要在字符串中表示\就需要写成: \\ ${new RegExp(/\\\\/).test('\\\\')}`);
        console.log(`检查一个字符串：检查一个字符串中是否存在空格：${reg_nine.test('ab c')}`);
        console.log(`检查一个字符串：检查一个字符串中不存在空格：${reg_ten.test('abc')}`);
        console.log(`取出字符串中的前后空格：${'     ad min    '.replace(reg_eleven, '')}`)
    }

    public interviewQuestions = () => {
        /* 这是一道面试题 */
        const str: string = "123#abc";
        const re = /abc/ig;

        console.log(re.test(str)); // 输出ture
        console.log(re.lastIndex); // 输出7
        console.log(re.test(str)); // 输出false
        console.log(re.lastIndex); // 输出0
        console.log(re.test(str)); // 输出ture
        console.log(re.lastIndex); // 输出7
        console.log(re.test(str)); // 输出false
        console.log(re.lastIndex); // 输出0

        /* 
            出现这样子的原因：
            - 正则表达式的模式设置为i和g,i代表的是忽略大小写，g代表的是全局模式
              全局模式下，可以进行重复的匹配。并且每一次的匹配都会更新lastIndex
              而所谓的lastIndex就是正则表达式匹配字符串的时候，所更新的当前匹配到最后一位字符串的下标
              这个下标默认初始值为0，当匹配到符合要求的字符串的时候，就会更新lastIndex。如果匹配不到，那么就不会。
        */
    }

    public stringRegParamsTest = () => {
        const str: string = '1a2b3c4d';
        const reg = new RegExp(/[a-z]/);
        console.log(`使用正则表达式来分割字符串(当匹配到字母的时候，就进行字符串的分割): ${str.split(reg)}`);
        console.log(`使用正则表达式来拍查找字符串中是否有指定的内容,字符串的search方法会返回满足要求的字符串的下标：${str.search(reg)}`);

        // 使用match，来讲符合要求的字符串返回出来
        const reg_six = '1a2b3c4d5e6f7g'.match(/[a-z]/ig);
        console.log(`检查一个字符串：使用match，来讲符合要求的字符串返回出来 ${reg_six}`);

        /* 
            -------------------------------总结------------------------------------
            split
            - 可以将字符串拆分成数组
            - 方法中可以传递一个正则表达式作为参数，这样方法就会根据正则表达式去进行字符串的分割

            search
            - 可以搜索字符串中是否含有指定的内容
            - 如果搜到指定的内容，则会返回第一次出现的索引。如果没有搜索到，那么就会返回-1

            match
            - 可以根据正则表达式，从一个字符串中将符合条件的内容提取出来
              存放匹配结果的数组。该数组的内容依赖于 regexp 是否具有全局标志 g

            replace
            - 可以将字符串中指定的内容替换成新的内容
            - 参数：
                1. 被替换的内容
                2. 新的内容
            - 
        */
    }

    public replaceTest = () => {
        const str: string = '尊敬的{carNumber}的车主您好，您的车险即将到期，建议您及时续保，防止脱保。{carNumber}在本店续保更有保养，钣喷等海量优惠任你挑选。专属顾问{salesman}({salesmanPhoneNumber}) 竭诚为您服务。';
        const reg = new RegExp(/{[a-z]+}/, 'ig');
        console.log(`这个是短信模板，其中或过滤某些字段：${str.match(reg)}`);
    }

    /* 
        -------------------------------总结------------------------------------
        正则表达式的作用：定义一些字符串的规则
        计算机可以通过正则表达式来检查一个字符串是否符合规则

        创建正则表达式对象
        -  方法1： const reg = new RegExp('正则表达式', '匹配模式');
        - 使用字面量来创建正则表达式：
            const reg = /正则表达式/匹配模式
            例如： const reg = /a/i;

            两者达到的效果是一样的，字面量的话更加方便，但是如果是第一种方式，new RegExp()会更加的灵活，因为这个方法中的第一个参数
            是字符串，也就是说我们可以使用变量进去 

        匹配模式
        - i 忽略大小写
            例如： new RegExp('a', 'i') 它的意思就是，查找a，并且忽略大小写，也就是说A或者a都是可以的 

        - g 全局匹配模式
            在全局的模式下可以对指定要查找的字符串执行多次匹配。每一次匹配使用当前正则对象的lastIndex属性的值作为在目标字符串中开始查找的起始位置
            lastIndex属性的初始值为0,当找到符合要求的，那么lastIndex就会更新为匹配内容的下一个字符在字符串中的位置索引。
            如果找不到匹配的值，那么lastIndex就会被设置为0

        正则表达式的方法
        - test()
            使用这个方法可以用来检测一个字符串是否符合正则表达式的规则
            如果符合，则返回true，如果不符合，则返回false

        正则
        - | 表示或的意思
        - [] 中括号里面的内容也是或的意思   
            也就是说：[ab] = [a|b];
            [a-z]：表示任意小写字母
            [A-Z]：表示任意大写字母
            [A-z]：拜师任意字母
            [^ ]： 除了，也就是说除了[^]里面的内容，都是可以的
            [0-9]：任意的数字

        量词
        - 通过量词可以设置一个内容出现的次数
        - 量词只对出现在前边的一个内容起作用
        - {n} 代表的是正好出现n此
        - {m,n} 代表的是出现m-n次
        - {m,} 代表的是出现至少m次
        - + 等用于{1,}也就是说至少1个以上
        - * 等用于{0,}也就是说0或者0个以上
        - ? 等用于{0,1}也就是说0-1个
        
        整体
        - () 代表的是一个整体

        检查一个字符串中以**为开头
        - ^

        检查一个字符串中以**为结尾
        - $

        /^a$/
        - 如果一个正则表达式以^ $，则要求字符串必须完全符合正则表达式
            例如：/^a$/ 代表的是，字符串只能是a 

        .
        - . 表示的是任意字符
        - 如果我们想单纯的标识字符串. 我们可以使用转移字符'\'来表示
            注意\是字符串中的转移字符，如果需要使用\那么就需要转义，使用：\\
            \. 表示的是字符串.
            \\ 表示的是字符串\
            案例：new RegExp(/\\/)
            
        \类的转义
        - \w   
            代表的是任意的字母，数字，_ 
            等同于：[A-z0-9_]
        
        - \W
            和\w相反
            等同于：[^A-z0-9_]

        - \d
            表示任意的数字
            等同于：[0-9]

        - \D
            表示出了数字
            等同于：[^0-9]

        - \s
            表示空格 也就是说是否存在：" "

        - \S
            表示除了空格

        - \b
            表示单词边界
            例如：/\bchild\b/.test('child') // true
                 /\bchild\b/.test('children') // false

        - \B
            除了单词边界
    */

    public render() {
        return <div>
                正则表达式的使用
            </div>
    }
}