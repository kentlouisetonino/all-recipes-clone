import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import {
  Injectable,
  ConflictException,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common'

import { CreateUserInput, UpdateUserInput } from './dto/user.input'
import { DeleteUserOutput } from './dto/user.output'
import { User } from 'src/entities/User'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find()
  }

  async getUserById(id: number): Promise<User> {
    const userDb = await this.userRepository.findOne(id)

    if (!userDb) {
      throw new NotFoundException('User Id does not exist.')
    }

    return userDb
  }

  async getUserByEmail(email: string): Promise<User> {
    const userDb = await this.userRepository.findOne({
      email: email,
    })

    if (!userDb) {
      throw new NotFoundException('User email does not exist.')
    }

    return userDb
  }

  async createUser(payload: CreateUserInput): Promise<User> {
    const userDb = await this.userRepository.findOne({
      email: payload.email,
    })

    if (userDb) {
      throw new ConflictException(
        'Email already exist. Please use a different email.',
      )
    }

    const { password, ...rest } = payload

    const encryptedPassword = this.jwtService.sign(password, {
      secret: `${this.configService.get('AUTH0_PASSWORD_SECRET')}`,
    })

    const userInstance = this.userRepository.create({
      ...rest,
      password: encryptedPassword,
    })

    return await this.userRepository.save(userInstance)
  }

  async updateUser(payload: UpdateUserInput): Promise<User> {
    const userDb = await this.userRepository.findOne(payload?.id)

    if (!userDb) {
      throw new NotFoundException('User Id does not exist. Use a different Id.')
    }

    const userInstance = this.userRepository.create({
      ...payload,
    })

    return await this.userRepository.save(userInstance)
  }

  async deleteUser(id: number): Promise<DeleteUserOutput> {
    const deletedUser = await this.userRepository.delete(id)

    if (deletedUser.affected) {
      return {
        status: HttpStatus.OK,
        message: 'User successfully deleted.',
      }
    } else {
      return {
        status: HttpStatus.OK,
        message: 'User already deleted.',
      }
    }
  }
}
