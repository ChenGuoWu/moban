//加密
function urlRequest(value) {
    const SM4 = require("gm-crypt").sm4;
    let sm4Config = {
        //配置sm4参数
        key: "JeF8U9wHFOMfs2Y8", //这里这个key值是跟后端要的
        mode: "ecb", // 加密的方式有两种，ecb和cbc两种，也是看后端如何定义的，不过要是cbc的话下面还要加一个iv的参数，ecb不用
        cipherType: "base64", //
        iv: "UISwD9fW6cFh9SNS",
    };
    let sm4 = new SM4(sm4Config); //这里new一个函数，将上面的sm4Config作为参数传递进去。然后就可以开心的加密了
    let encryption = sm4.encrypt(value); //密码加密
    return encryption
}
//解密
function urlResonponse(value) {
    const SM4 = require('gm-crypt').sm4;
    let sm4Config = {
        key: 'JeF8U9wHFOMfs2Y8',//这里这个key值是跟后端要的
        mode: 'ecb', // 加密的方式有两种，ecb和cbc两种，也是看后端如何定义的，不过要是cbc的话下面还要加一个iv的参数，ecb不用
        cipherType: 'base64' // default is base64
    }
    let sm4 = new SM4(sm4Config);
    return  sm4.decrypt(value)
}

export default { urlRequest, urlResonponse};