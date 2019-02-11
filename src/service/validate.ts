/**
 * 车牌号验证
 * @param value 
 */
const validateCarNumber = (value: string, required: boolean = true): boolean => {
    if (!value && !required)
        return true;

    const reg =  /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
    const isValid = reg.test(value);
    return isValid;
}

/**
 * 车架号验证
 * @param value 
 */
const validateVinNumber = (value: string, required: boolean = true): boolean => {
    if (!value && !required)
        return true;

    const reg =  /^[a-zA-Z0-9]{17}$/;
    const isValid = reg.test(value);
    return isValid;
}

/**
 * 验证车主证件号
 * @param value 
 * @param max 最大位数
 * @param min 最小位数
 * @param required 
 */
const validatRestCertNum = (value: string, max: number = 16, min: number = 1, required: boolean = true): boolean => {
    if (!value && !required)
        return true;

    const reg = new RegExp('^.{'+min+','+max+'}$');
    const isValid = reg.test(value);
    return isValid;
}

/**
 * 限制输入数字大小
 * @param value 
 * @param max 
 * @param min 
 * @param required 是否是必须的
 */
const limitNumber = (value: number, required: boolean = true, min: number = 0, max?: number): boolean => {
    if (!value && !required)
        return true;

    if (min !== undefined && min !== null && value < min)
        return false;

    if (max !== undefined && max !== null && value > max)
        return false;

    return true;
}

/**
 * 手机号验证
 * @param value
 */
const validTelePhone = (value: string, required: boolean = true): boolean => {
    if (!value && !required)
        return true;

    const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    const isValid = reg.test(value);
    return isValid;
}

/**
 * 邮箱验证
 * @param value
 */
const vaildEmail = (value: string, required: boolean = true): boolean => {
    if (!value && !required)
        return true;

    const reg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
    const isValid = reg.test(value);
    return isValid;
}

export {
    validateCarNumber,
    validateVinNumber,
    validatRestCertNum,
    limitNumber,
    validTelePhone,
    vaildEmail
}