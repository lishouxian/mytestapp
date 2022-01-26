import React from 'react';
import styled from 'styled-components';
import {Alert, Upload} from 'antd';
import {FileImageTwoTone} from '@ant-design/icons';
import 'antd/dist/antd.css'

interface IHomeProps {
}

let imgUrl = 'https://lishouxianmail.oss-cn-hangzhou.aliyuncs.com/061.jpg';


const StyledContainer = styled.div`
    .upload-wrap {
        padding-top: 20px;
    },
    .img-wrap {
        padding-top: 20px;
        margin: auto;
        width: 100%;
        padding-bottom: 20px;
    },
    .img-wrap img {
        display: block;
        max-height: 500px;
        max-width: 100%;
        margin: auto;
    },
    .seg-wrap img {
        display: block;
        max-height: 500px;
        max-width: 100%;
        margin: auto;
    },
     .text-wrap {
        text-align: center;
        max-height: 500px;

        max-width: 100%;
        margin: auto;
    },
    .text-wrap p{
        text-align: center;
        font-size: 20px;
    }
`;

export const Home: React.FC<IHomeProps> = () => {
    const props: React.ComponentProps<typeof Upload.Dragger> = {
        name: 'file',
        multiple: false,
        withCredentials: false,
        action: 'http://10.11.111.42:5000/resolve_img',
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
                document.getElementById('img-wrap').innerHTML = `<img src=${file.response.img} className='img-class' alt={'识别结果'}/>`;
                // @ts-ignore
                document.getElementById('text-wrap').innerHTML = `<p>识别成功种类为${file.response.cl}</p>`;
                // @ts-ignore
                document.getElementById('seg-wrap').innerHTML = `<img src=${file.response.seg} className='img-class' alt={'分割结果'}/>`;
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
            <Upload.Dragger {...props}  maxCount={1}>
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

        <div className="text-wrap" id="text-wrap">
            <p>上述为轮毂示例</p>
        </div>

        <div className="seg-wrap" id="seg-wrap">
        </div>

    </StyledContainer>;
};

export default Home;
