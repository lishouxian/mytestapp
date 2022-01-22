import React from 'react';
import styled from 'styled-components';
import {Alert, Upload} from 'antd';
import {FileImageTwoTone} from '@ant-design/icons';
import 'antd/dist/antd.css'

interface IHomeProps {
}

let imgUrl = 'https://gitee.com/lishouxian/blog-img/raw/master/2022-01/061.jpg';


const StyledContainer = styled.div`
    .upload-wrap {
        padding-top: 20px;
    },
    .img-wrap {
        padding-top: 20px;
        margin: auto;
        width: 100%;

    }
    .img-wrap img {
        display: block;
        max-height: 500px;
        max-width: 100%;
        margin: auto;
    }
`;

export const Home: React.FC<IHomeProps> = () => {
    const props: React.ComponentProps<typeof Upload.Dragger> = {
        name: 'file',
        multiple: false,
        withCredentials: false,
        action: 'http://10.11.111.42:8000/hello',
        onChange(info) {
            console.log(info.file.response);
            const {status} = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            console.log(info.file.response);
            const file = info.file;
            if (file.response) {
                // @ts-ignore
                document.getElementById('img-wrap').innerHTML = `<img src=${file.response.payload} className='img-class' alt={'sadsa'}/>`;
                // @ts-ignore
                // document.getElementById('img-wrap').getElementsByClassName('img-class').src = file.response.payload;
                imgUrl = file.response.payload;
            }
            return true;
        }
    };

    return <StyledContainer>
        <Alert
            message={
                <div>
                    机械工程学院机械设计研究所轮毂识别工具 @李寿贤
                </div>
            }
            type="info"
        />

        <div className="upload-wrap">
            <Upload.Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <FileImageTwoTone />
                </p>
                <p className="ant-upload-text">请输入要处理的轮毂图片</p>
                {/*<p className="ant-upload-hint">处理完成会自动下载，请耐心等待。</p>*/}
            </Upload.Dragger>
        </div>

        {/*<Image id="img" className='img-class' src = ""/>*/}
        <div className="img-wrap" id="img-wrap">
            <img src={imgUrl} className='img-class' alt={'sadsa'}/>
        </div>
    </StyledContainer>;
};

export default Home;
