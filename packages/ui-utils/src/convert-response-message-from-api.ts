import {get} from 'lodash';

const HTTP_ERROR_CODE: any = {
    "200": {
        client: "OK",
        server: "OK"
    },
    "201": {
        client: "Created",
        server: "Created"
    },
    "202": {
        client: "Accepted",
        server: "Accepted"
    },
    "203": {
        client: "Non-Authoritative Information",
        server: "Non-Authoritative Information"
    },
    "204": {
        client: "No Content",
        server: "No Content"
    },
    "205": {
        client: "Reset Content",
        server: "Reset Content"
    },
    "206": {
        client: "Partial Content",
        server: "Partial Content"
    },
    "207": {
        client: "Multi-Status",
        server: "Multi-Status"
    },
    "208": {
        client: "Already Reported",
        server: "Already Reported"
    },
    "226": {
        client: "IM Used",
        server: "IM Used"
    },
    "300": {
        client: "Multiple Choices",
        server: "Multiple Choices"
    },
    "301": {
        client: "Moved Permanently",
        server: "Moved Permanently"
    },
    "302": {
        client: `Found (Previously "Moved temporarily")`,
        server: `Found (Previously "Moved temporarily")`
    },
    "303": {
        client: "See Other",
        server: "See Other"
    },
    "304": {
        client: "Not Modified",
        server: "Not Modified"
    },
    "305": {
        client: "Use Proxy",
        server: "Use Proxy"
    },
    "306": {
        client: "Switch Proxy",
        server: "Switch Proxy"
    },
    "307": {
        client: "Temporary Redirect",
        server: "Temporary Redirect"
    },
    "308": {
        client: "Permanent Redirect",
        server: "Permanent Redirect"
    },
    "400": {
        client: "Yêu cầu cầu bạn tới máy chủ lỗi",
        server: "Bad Request"
    },
    "401": {
        client: "Token của bạn hết hạn vui lòng Ctrl +F5 hoặc đăng nhập lại",
        server: "Unauthorized"
    },
    "402": {
        client: "Payment Required",
        server: "Payment Required"
    },
    "403": {
        client: "Bạn không có quyền để truy cập api này",
        server: "Forbidden"
    },
    "404": {
        client: "Dữ liệu bạn đang yêu cầu không được tìm thấy",
        server: "Not Found"
    },
    "405": {
        client: "Method Not Allowed",
        server: "Method Not Allowed"
    },
    "406": {
        client: "Not Acceptable",
        server: "Not Acceptable"
    },
    "407": {
        client: "Proxy Authentication Required",
        server: "Proxy Authentication Required"
    },
    "408": {
        client: "Request Timeout",
        server: "Request Timeout"
    },
    "409": {
        client: "Conflict",
        server: "Conflict"
    },
    "410": {
        client: "Gone",
        server: "Gone"
    },
    "411": {
        client: "Length Required",
        server: "Length Required"
    },
    "412": {
        client: "Precondition Failed",
        server: "Precondition Failed"
    },
    "413": {
        client: "Payload Too Large",
        server: "Payload Too Large"
    },
    "414": {
        client: "URI Too Long",
        server: "URI Too Long"
    },
    "415": {
        client: "Unsupported Media Type",
        server: "Unsupported Media Type"
    },
    "416": {
        client: "Range Not Satisfiable",
        server: "Range Not Satisfiable"
    },
    "417": {
        client: "Expectation Failed",
        server: "Expectation Failed"
    },
    "418": {
        client: "I'm a teapot",
        server: "I'm a teapot"
    },
    "421": {
        client: "Misdirected Request",
        server: "Misdirected Request"
    },
    "422": {
        client: "Unprocessable Entity",
        server: "Unprocessable Entity"
    },
    "423": {
        client: "Locked",
        server: "Locked"
    },
    "424": {
        client: "Failed Dependency",
        server: "Failed Dependency"
    },
    "425": {
        client: "Too Early",
        server: "Too Early"
    },
    "426": {
        client: "Upgrade Required",
        server: "Upgrade Required"
    },
    "428": {
        client: "Precondition Required",
        server: "Precondition Required"
    },
    "429": {
        client: "Too Many Requests",
        server: "Too Many Requests"
    },
    "431": {
        client: "Request Header Fields Too Large",
        server: "Request Header Fields Too Large"
    },
    "451": {
        client: "Unavailable For Legal Reasons",
        server: "Unavailable For Legal Reasons"
    },
    "500": {
        client: "Internal Server Error",
        server: "Internal Server Error"
    },
    "501": {
        client: "Yêu cầu của bạn không được server hỗ trợ",
        server: "Not Implemented"
    },
    "502": {
        client: "Bad Gateway",
        server: "Bad Gateway"
    },
    "503": {
        client: "Service Unavailable",
        server: "Service Unavailable"
    },
    "504": {
        client: "Gateway Timeout",
        server: "Gateway Timeout"
    },
    "505": {
        client: "HTTP Version Not Supported",
        server: "HTTP Version Not Supported"
    },
    "506": {
        client: "Variant Also Negotiates",
        server: "Variant Also Negotiates"
    },
    "507": {
        client: "Insufficient Storage",
        server: "Insufficient Storage"
    },
    "508": {
        client: "Loop Detected",
        server: "Loop Detected"
    },
    "510": {
        client: "Not Extended",
        server: "Not Extended"
    },
    "511": {
        client: "Network Authentication Required",
        server: "Network Authentication Required"
    },
    "444": {
        client: "No Response",
        server: "No Response"
    },
    "494": {
        client: "Request header too large",
        server: "Request header too large"
    },
    "495": {
        client: "SSL Certificate Error",
        server: "SSL Certificate Error"
    },
    "496": {
        client: "SSL Certificate Required",
        server: "SSL Certificate Required"
    },
    "497": {
        client: "HTTP Request Sent to HTTPS Port",
        server: "HTTP Request Sent to HTTPS Port"
    },
    "499": {
        client: "Client Closed Request",
        server: "Client Closed Request"
    }
}

function getErrorCode(error: any) {
    const errorCode1 = get(error, 'response.status', null);
    const errorCode2 = get(error, 'response.data.Code', null);
    const errorCode3 = get(error, 'data.Code', null);
    return errorCode1 || errorCode2 || errorCode3 || 400
}

function getErrorMsg(error: any) {
    let outPut = HTTP_ERROR_CODE.error_400;
    const errorMsg1 = get(error, 'response.data.message', null);
    const errorMsg2 = get(error, 'response.data.Error', null);
    const errorMsg3 = get(error, 'data.Error', null);
    outPut = errorMsg1 || errorMsg2 || errorMsg3;
    const errorMsg4 = get(error, 'response.data', null);
    if (!outPut && errorMsg4) {
        outPut = errorMsg4;
    }
    if (!outPut) {
        outPut = get(error, 'message', null) || HTTP_ERROR_CODE.error_400;
    }
    return outPut
}

function convertResponseMessageFromApi(error: any) {
    let outPut: any = {error: 400, code: 400, messageViewClient: HTTP_ERROR_CODE.error_400, messageFromServer: null}
    if (error && typeof error === "object") {
        const errorCode = getErrorCode(error);
        const errorMessage = getErrorMsg(error);
        outPut.code = errorCode;
        outPut.error = errorCode;
        outPut.messageViewClient = HTTP_ERROR_CODE[errorCode].client;
        outPut.messageFromServer = errorMessage;
    }
    return outPut;
}
export default convertResponseMessageFromApi;
export {convertResponseMessageFromApi};

