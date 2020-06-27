import { JSEncrypt } from 'jsencrypt'
export function encriptPwd(object) {
    var encrypt = new JSEncrypt();
    var publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCAMVQ6xnNfDDLJ/FKpC40dhFxdKxg5dfC2Z97xloZ1s3Uq0oRjLOEmSm8rU80Yrk+asv+YsHGj5VutW2qdSgQbFY8kWVDhJth9GOPOIPVK8wxfspbP/+fWB1meVhpYtTHYWVv83X93peB4eBNJKlJyIPhwPcIzgXTvtJrgKXEVNwIDAQAB';
    encrypt.setPublicKey(publicKey);
    for (var i in object) {
        if (i.includes('Pwd')) {
            var value = object[i];
            if(value==null){
                delete object[i]
            }else if(value.length>117){
                alert(i + "密码长度超过限制，请重新设置");
                clearPwd(object);
                throw new Error("密码长度超过限制");
            }else if(value.length != 0){
                object[i] = encrypt.encrypt(value);
            }
        }
    }
    return object;
}
function clearPwd(object) {
    for (var i in object) {
        if (i.includes('Pwd')) {
            object[i] = "";
        }
    }
    return object;
}


