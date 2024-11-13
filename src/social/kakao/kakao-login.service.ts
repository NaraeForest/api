import {
  Injectable,
} from "@nestjs/common";
import {
  ConfigService,
} from "@nestjs/config";

@Injectable()
export class KakaoLoginService {

  constructor(
    private readonly configService: ConfigService,
  ) { }

  public async requestAccessToken(code: string) {
    const clientId = this.configService.getOrThrow("kakao.clientId");
    const clientSecret = this.configService.getOrThrow("kakao.clientSecret");
    const redirectURL = this.configService.getOrThrow("kakao.redirectURL");
    const requestBody = new URLSearchParams();
    requestBody.set("grant_type", "authorization_code");
    requestBody.set("client_id", clientId);
    requestBody.set("redirect_uri", redirectURL);
    requestBody.set("code", code);
    requestBody.set("client_secret", clientSecret);
    const init: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: requestBody,
    };
    const res = await fetch(`https://kauth.kakao.com/oauth/token`, init);
    const data = await res.json();
    if (data.error != null) {
      // TODO: 에러처리
    }
    return {
      accessToken: data.access_token,
      tokenType: data.token_type,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in,
      scope: data.scope,
      refreshTokenExporesIn: data.refresh_token_expires_in,
    }
  }

  public async requestProfile(accessToken: string) {
    const init: RequestInit = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    };
    const res = await fetch("https://kapi.kakao.com/v2/user/me", init);
    const data = await res.json();
    console.log(data);
  }
}
