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
}
