FROM nginx

# 설정 파일 복사
COPY ./nginx/default /etc/nginx/nginx.conf

# 기존 설정파일 삭제, 현재 설정 파일 링크
RUN mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.disable

## 올바르게 설정 되었는지 test
#CMD nginx -t -c /etc/nginx/sites-enabled/default

EXPOSE 80
