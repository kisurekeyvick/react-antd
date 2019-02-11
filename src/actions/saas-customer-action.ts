import { api } from 'src/_mock/api';

/**
 * 获取工作台数据
 */
export const CUSTOMERWORKSPACE = 'CUSTOMERWORKSPACE';

/**
 * 获取顾问
 */
export const RENEWALMAN = 'RENEWALMAN';

/**
 * 顾问
 */
export const SHOPSC = 'SHOPSC';

/**
 * 保险公司
 */
export const COMPANY = 'COMPANY';

/**
 * 地理位置获取省简称
 */
export const PLACESHORTNAME = 'PLACESHORTNAME';

/**
 * 所有省
 */
export const PROVINCES = 'PROVINCES';

/**
 * 获取工作台数据
 */
export const getCustomerWorkspaceData = () => {
    return async (dispatch: any) => {
        try {
            const result: any = await api.getCustomerWorkSpaceData();

            dispatch({
                type: CUSTOMERWORKSPACE,
                workspace: result.data.result
            });
        } catch (error) {
            throw new Error(error);
        }
    }
};

/**
 * 初始化数据
 * (1) 获取工作台数据
 * (2) 获取顾问
 */
export const getCustomerListInitData = () => {
    return async (dispatch: any) => {
        try {
            const [renewalMan, shopSc, company, placeShortName, provinces]: any = await Promise.all([
                api.getSubordinateRenewalMan(),
                api.getShopScUserRoleGroup(),
                api.getInsCompanyList(),
                api.getPlaceShortNameByLocation(),
                api.getPlaceAllShortName()
            ]);

            const fetchs: Array<{type: any, name: string, value: any}> = [
                {
                    type: RENEWALMAN,
                    name: 'renewalMan',
                    value: renewalMan.data.result
                },
                {
                    type: SHOPSC,
                    name: 'shopSc',
                    value: shopSc.data.result
                },
                {
                    type: COMPANY,
                    name: 'company',
                    value: company.data.result
                },
                {
                    type: PLACESHORTNAME,
                    name: 'placeShortName',
                    value: placeShortName.data.result
                },
                {
                    type: PROVINCES,
                    name: 'provinces',
                    value: provinces.data.result
                }
            ];

            const arr: any = fetchs.map((f: any) => {
                return dispatch({
                    type: f.type,
                    [f['name']]: f['value']
                });
            });

            Promise.all(arr);
            // dispatch({
            //     type: RENEWALMAN,
            //     renewalMan: renewalMan.data.result
            // });

            // dispatch({
            //     type: SHOPSC,
            //     shopSc: shopSc.data.result
            // });

            // dispatch({
            //     type:COMPANY,
            //     company: company.data.result
            // });

            // dispatch({
            //     type: PLACESHORTNAME,
            //     placeShortName: placeShortName.data.result
            // });

            // dispatch({
            //     type: PROVINCES,
            //     provinces: provinces.data.result
            // });
        } catch (error) {
            throw new Error(error);
        }
    }
}