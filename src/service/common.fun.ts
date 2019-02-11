/**
 * 返回映射值
 * @param source 映射数据源
 * @param value 要映射的值
 */
const mappingValue = (source: Array<{name: string, value: any}>, value: any) => {
    let find: boolean = false;

    if (!source)
        return value;

    for (let i = 0; i < source.length; i++) {
        if (value === source[i].value) {
            find = true;
            return source[i].name;
        }
    }

    if (!find)
        return value;
}

/**
 * 返回时间映射
 * @param timeSecond 时间(秒)
 */
const mappingTime = (timeSecond: number) => {
    let result = '';

    if (!timeSecond) {
        result = '0秒';
    } else if (timeSecond / 60 < 1) {
        result = `${timeSecond}秒`;
    } else if (timeSecond / 60 >= 1 && timeSecond / 60 < 60) {
        result = `${Math.floor(timeSecond / 60)}分
                  ${timeSecond - Math.floor(timeSecond / 60) * 60}秒`;
    } else if (timeSecond / (60 * 60) > 1 && timeSecond / (24 * 60 * 60) < 1) {
        result = `${Math.floor(timeSecond / 3600)}时
                  ${Math.floor((timeSecond - Math.floor(timeSecond / 3600) * 3600) / 60)}分
                  ${timeSecond - Math.floor(timeSecond / 3600) * 3600 - Math.floor((timeSecond - Math.floor(timeSecond / 3600) * 3600) / 60) * 60}秒`;
    }

    return result;
}

/**
 * 格式化金额
 * @param value 
 */
const formatPrice = (value: number): string => {
    if (value >= 10000 * 100) {
        return `${value * Math.pow(10, 4) / (100 * Math.pow(10, 8))}万`;
    }

    if (value < 10000 * 100) {
        return `${value / 100}元`;
    }

    return '';
}

export {
    mappingValue,
    mappingTime,
    formatPrice
}
