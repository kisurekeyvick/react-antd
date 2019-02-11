import {api} from 'src/_mock/api';

/**
 * 获取菜单
 */
export const SAASMENU = 'SAASMENU';

/**
 * 获取saas词典
 */
export const SAASDICTIONARY = 'SAASDICTIONARY';

/**
 * 获取菜单 func
 */
export const getGlobalData = () => {
    return async (dispatch: any) => {
        try {
            const [menu, dictionary]: any = await Promise.all([
                api.getSaaSMenuData(),
                api.getSaaSDictionary()
            ]);

            dispatch({
                type: SAASMENU,
                menu: menu && menu.data.result
            });

            dispatch({
                type: SAASDICTIONARY,
                dictionary: dictionary && dictionary.data.result
            });
        } catch (error) {
            throw new Error(error);
        }
    }
};