class CookieService {
    constructor() {

    }

    /**
     * 获取cookie中的某个字段的值
     */
    public getCookie(key: string): any {
        if (!key)
            return null;

        return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1'));
    }

    /**
     * 设置cookie
     * @param key       键名
     * @param value     值
     * @param endTime   结束时间
     */
    public setCookie(key: string, value: string, endTime?: Date): boolean {
        if (!key)
            return false;

        let expires: string = '';

        if (endTime)
            expires = '; expires=' + endTime.toUTCString();

        document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value) + expires;
        return true;
    }

    /**
     * 移除某个cookie
     */
    public removeCookie(key: string): boolean {
        if (!this.hasCookie(key))
            return false;

        document.cookie = `${encodeURIComponent(key)}=; expires=${new Date(0).toUTCString()}`;
        return true;
    }

    /**
     * 判断某个字段是否存在于cookie中
     */
    public hasCookie(key: string): boolean {
        if (!key)
            return false;

        return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
    }

    /**
     * 清空所有的cookie
     */
    public clearCookie() {
        const cookies = document.cookie.match(/[^ =;]+(?=\=)/g);

        if (cookies)
            cookies.forEach(cookie => {
                document.cookie = `${cookie}=0;expires=${new Date(0).toUTCString()}`;
            });
    }
}

export {
    CookieService
}