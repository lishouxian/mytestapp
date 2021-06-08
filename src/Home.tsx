import React from 'react';
import styled from 'styled-components';
import { Upload, Icon, message, Alert } from 'antd';
import {base64ToBlob, downloadFile} from "./utils";
import 'antd/dist/antd.css'
interface IHomeProps {}


const StyledContainer = styled.div`
    .upload-wrap {
        padding-top: 20px;
    }

`;

export const Home: React.FC<IHomeProps> = () => {
    const props: React.ComponentProps<typeof Upload.Dragger> = {
        name: 'file',
        multiple: false,
        withCredentials: false,
        action: 'http://47.103.199.145:8008/translate',
        onChange (info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
                console.log(info.file.response);
                const file = info.file;
                if (file.response) {
                    if (file.response.errorCode === 0) {
                        const fileName = file.name.replace('.xlsx', '-完成处理.xlsx');
                        const blob = base64ToBlob(file.response.payload, fileName);
                        downloadFile(blob, fileName);
                    } else {
                        return message.error(`${info.file.name} 处理失败. ${file.response.errorMessage || ''}`);
                    }
                }
            }
            if (status === 'done') {
                message.success('处理成功，请检查下载的表格文件');
            } else if (status === 'error') {
                message.error(`${info.file.name} 上传失败，请检查xlsx文件.`);
            }
            return true;
        }
    };

    return <StyledContainer>
        <Alert
            message={
                <div>
                    医学384pcr板数据处理工具，有问题请联系@无羡
                </div>
            }
            type="info"
        />

        <div className="upload-wrap">
            <Upload.Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">将要处理的表格，拖到本区域，当前仅支持xlsx后缀</p>
                <p className="ant-upload-hint">处理完成会自动下载，请耐心等待。</p>
            </Upload.Dragger>
        </div>
    </StyledContainer>;
};

export default Home;
