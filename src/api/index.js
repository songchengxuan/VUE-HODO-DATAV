import request from '../utils/request';
let backurl = 'http://172.31.101.15'

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};

//-------大屏-------
export const l1_list = query => {
    return request({
        url: `${backurl}/screen/l1/`,
        method: 'get',
        params: query
    });
};

export const l2_list = query => {
    return request({
        url: `${backurl}/screen/l2/`,
        method: 'get',
        params: query
    });
};

export const l3_list = query => {
    return request({
        url: `${backurl}/screen/l3/`,
        method: 'get',
        params: query
    });
};

export const m1_list = query => {
    return request({
        url: `${backurl}/screen/m1/`,
        method: 'get',
        params: query
    });
};

export const m2_list = query => {
    return request({
        url: `${backurl}/screen/m2/`,
        method: 'get',
        params: query
    });
};

export const r1_list = query => {
    return request({
        url: `${backurl}/screen/r1/`,
        method: 'get',
        params: query
    });
};

export const r2_list = query => {
    return request({
        url: `${backurl}/screen/r2/`,
        method: 'get',
        params: query
    });
};