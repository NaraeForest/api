import {
  Injectable,
} from "@nestjs/common";
import {
  ConfigService,
} from "@nestjs/config";

@Injectable()
export class GoogleLoginService {

  constructor(
    private readonly configService: ConfigService,
  ) { }

  public async requestAccessToken(code: string) {
    const clientId = this.configService.getOrThrow("google.clientId");
    const clientSecret = this.configService.getOrThrow("google.clientSecret");
    const redirectURL = this.configService.getOrThrow("google.redirectURL");
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
    const res = await fetch(`https://oauth2.googleapis.com/token`, init);
    const data = await res.json();
    if (data.error != null) {
      //{ error: 'invalid_grant', error_description: 'Bad Request' }
      // TODO: 에러처리
    }
    return {
      accessToken: data.access_token,
      expiresIn: data.expires_in,
      scope: data.scope,
      tokenType: data.token_type,
      idToken: data.id_token,
    };
  }

  public async requestProfile(accessToken: string) {
    const init: RequestInit = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const res = await fetch("https://www.googleapis.com/userinfo/v2/me", init);
    const data = await res.json();
    return {
      id: data.id,
      email: data.email,
      verifyEmail: data.verify_email,
      name: data.name,
      givenName: data.given_name,
      picture: data.picture,
    };
  }
}
