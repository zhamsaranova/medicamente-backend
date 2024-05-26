import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/profile")
  @Auth()
  async getUser(@CurrentUser('id') id: number) {
    return this.userService.getUserById(id);
  }
}
