import {
  Injectable,
} from "@nestjs/common";
import {
  InjectRepository,
} from "@nestjs/typeorm";
import {
  User,
} from "src/entities";
import {
  Repository,
} from "typeorm";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User, "writable")
    private readonly userRepository: Repository<User>,
  ) { }

  public async getUserInfo(userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    return user;
  }

  public async updateProfile(userId: number, nickname: string, bio: string, profileImage?: string, headerImage?: string) {
    const result = await this.userRepository.update(
      {
        id: userId,
      },
      {
        nickname,
        bio,
        ...(profileImage != null && { profileImage }),
        ...(headerImage != null && { headerImage }),
      },
    );
    return result.affected === 1;
  }

  /**
   * 누구나 볼 수 있는 프로파일 보안주의
   * @param userId 
   */
  public async getUserProfile(userId: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    delete user.kakao;
    delete user.google;
    delete user.naver;
    return user;
  }
}
