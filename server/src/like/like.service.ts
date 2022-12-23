import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Injectable, HttpStatus } from '@nestjs/common'

import { Like } from 'src/entities/Like'
import { CreateLikeInput } from './dto/like.input'
import { DeleteLikeOutput } from './dto/like.output'

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
  ) {}

  async createLike(payload: CreateLikeInput): Promise<Like> {
    const likeInstance = this.likeRepository.create(payload)
    return await this.likeRepository.save(likeInstance)
  }

  async deleteLike(id: number): Promise<DeleteLikeOutput> {
    const deletedLike = await this.likeRepository.delete(id)

    if (deletedLike.affected) {
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
