
export function base64ToBlob (base64String: string, fileName = '远程设备.log', contentType = 'text/plain', sliceSize = 512) {
    // 使用 atob() 方法将数据解码
    let byteCharacters = atob(base64String);
    let byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);
        let byteNumbers = [];
        for (let i = 0; i < slice.length; i++) {
            byteNumbers.push(slice.charCodeAt(i));
        }
        // 8 位无符号整数值的类型化数组。内容将初始化为 0。
        // 如果无法分配请求数目的字节，则将引发异常。
        byteArrays.push(new Uint8Array(byteNumbers));
    }
    let result = new Blob(byteArrays, {
        type: contentType
    });
    result = Object.assign(result, {
        preview: URL.createObjectURL(result),
        name: fileName
    });
    return result;
}

export function downloadFile (blob: Blob, fileName = '远程设备.log') {
    const a = document.createElement('a');
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
}
