import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { hash, verify } from 'argon2';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: AuthDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (existingUser) throw new BadRequestException('User already exists');

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: await hash(dto.password),
      },
    });

    const tokens = await this.issueTokens(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);
    const tokens = await this.issueTokens(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken);

    console.log(result);

    if (!result) throw new UnauthorizedException('Invalid refresh token');

    const user = await this.prisma.user.findUnique({
      where: {
        id: result.id,
      },
    });

    const tokens = await this.issueTokens(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  private async issueTokens(userId: number) {
    const data = { id: userId };

    const accessToken = this.jwt.sign(data, {
      expiresIn: '15m',
    });
    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  private returnUserFields(user: User) {
    return {
      id: user.id,
      email: user.email,
    };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    const passwordIsValid = await verify(user.password, dto.password);

    if (!passwordIsValid) throw new UnauthorizedException('Invalid password');

    return user;
  }
}
