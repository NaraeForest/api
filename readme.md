# narae api server
narae 프로젝트에서 사용하는 API 서버입니다.

## 요구 사항
- NodeJS >= 20
- npm
- postgresql >= 16

## 환경변수

name                    | description
------------------------|----------------
DATABASE_HOST           | 데이터베이스 주소
DATABASE_PORT           | 데이터베이스 포트 번호
DATABASE_USERNAME       | 데이터베이스 유저
DATABASE_PASSWORD       | 데이터베이스 비밀번호
COOKIE_SECRET           | 쿠키 시크릿
CSRF_SECRET             | CRSF 시크릿
AUTH_SECRET             | 유저 비밀번호 시크릿
NAVER_CLIENT_ID         | 네이버 소셜로그인 클라이언트 ID
NAVER_CLIENT_SECRET     | 네이버 소셜로그인 시크릿
KAKAO_CLIENT_ID         | 카카오 소셜로그인 클라이언트 ID
KAKAO_CLIENT_SECRET     | 카카오 소셜로그인 시크릿
KAKAO_REDIRECT_URL      | 카카오 소셜로그인 리다이렉트 주소
GOOGLE_CLIENT_ID        | 구글 소셜로그인 클라이언트 ID
GOOGLE_CLIENT_SECRET    | 구글 소셜로그인 시크릿
GOOGLE_REDIRECT_URL     | 구글 소셜로그인 리다이렉트 주소
ACCESS_TOKEN_SECRET     | jwt access-token 시크릿
REFRESH_TOKEN_SECRET    | jwt refresh-token 시크릿
LOGIN_REDIRECT_URL      | 소셜로그인 완료시 돌아길 주소
AWS_S3_MEDIA_BUCKET     | S3 버킷 명
AWS_CDN_URL             | cdn 주소
AWS_ACCESS_KEY_ID       | S3 access key
AWS_SECRET_ACCESS_KEY   | S3 secret key

## 시작하기
0. 위 환경변수를 참고하여 ```.env``` 파일 생성

1. 필요 패키지 설치
```sh
$ npm install
```

2. 개발 서버 실행
```sh
$ npm run start:dev
```

## 배포 방법
* github 레포지토리에서 v로 시작하도록 버전을 명시하고 릴리즈를 생성(```v0.0.1```)하면 github action을 통한 ghcr에 컨테이너 이미지가 자동으로 배포됩니다.
