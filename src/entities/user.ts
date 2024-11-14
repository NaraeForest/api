import {
  Column,
  Entity,
  OneToOne,
} from "typeorm";
import {
  DefaultEntity,
} from "./default-entity";
import {
  SocialKakao,
} from "./social-kakao";
import {
  SocialNaver,
} from "./social-naver";
import {
  SocialGoogle,
} from "./social-google";

@Entity({
  name: "user"
})
export class User extends DefaultEntity {

  @Column({
    type: "varchar",
    name: "nickname",
    nullable: false,
    length: 255,
  })
  nickname: string;

  @Column({
    type: "text",
    name: "profile_image",
    nullable: false,
  })
  profileImage: string;

  @Column({
    type: "text",
    name: "header_image",
    nullable: false,
    default: "",
  })
  headerImage: string;

  @Column({
    type: "varchar",
    name: "bio",
    nullable: false,
    length: 160,
    default: "",
  })
  bio: string;

  @OneToOne(() => SocialKakao, (kakao) => kakao.user, { cascade: ["insert"] })
  kakao: SocialKakao;

  @OneToOne(() => SocialNaver, (naver) => naver.user, { cascade: ["insert"] })
  naver: SocialNaver;

  @OneToOne(() => SocialGoogle, (google) => google.user, { cascade: ["insert"] })
  google: SocialGoogle;
}
