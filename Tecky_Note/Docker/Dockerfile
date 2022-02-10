FROM node:14-stretch
# from // 執行背景OS

WORKDIR /backend
# workdir // 工作檔案位置，包括所有執行的程式

RUN npm init --yes
# RUN npm install --save ...
RUN npm install --save aws-sdk@^2.1048.0 bcryptjs@^2.4.3 date-fns@^2.28.0 dotenv@^10.0.0 express@^4.17.1 express-session@^1.17.2 grant@^5.4.18 jwt-simple@^0.5.6 knex@^0.95.14 mongodb@^4.2.2 multer@^1.4.4 multer-s3@^2.10.0 node-fetch@2.x nodemailer@^6.7.2 permit@^0.2.4 pg@^8.7.1 quick-erd@^1.0.6 socket.io@^4.4.0 uuid@^8.3.2 winston@^3.3.3 xlsx@^0.17.4
RUN npm install --save-dev @types/jest@^27.0.3 @types/node@^16.11.12 gen-dockerfile-install@^1.1.0 jest@^27.4.4 ts-jest@^27.1.1 ts-node@^10.4.0 ts-node-dev@^1.1.8 @types/bcryptjs@^2.4.2 @types/cors@^2.8.12 @types/express@^4.17.13 @types/express-session@^1.17.4 @types/jwt-simple@^0.5.33 @types/multer@^1.4.7 @types/multer-s3@^2.7.11 @types/node-fetch@2.x @types/nodemailer@^6.4.4 @types/permit@^0.2.2 @types/pg@^8.6.1 @types/uuid@^8.3.3 typescript@^4.5.3
RUN npm install --save cors@^2.8.5
COPY package.json .
RUN npm install

COPY . .
# copy // 復製所需檔案位置

# RUN yarn
# run // 執行 modules 安裝

RUN npm test

EXPOSE 8080
# expose // 進入網頁接口 post 

CMD npm start
# cmd // 完成以上時，執行 cmd