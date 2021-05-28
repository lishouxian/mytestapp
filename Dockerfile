# 指定Node版本
FROM node:14.16.1

# 容器中应用程序的路径。将Web目录作为工作目录
WORKDIR /web

# 将package.json 复制到 Docker 环境
COPY ./package.json /web/package.json


# 安装依赖
RUN yarn

# 将代码复制到Docker容器中的Web目录
COPY . /web/

# 暴露容器内部访问端口，根据项目变动
EXPOSE 3000

## 如果是Vue CLi，则换成 yarn serve
CMD ["npm", "start"]