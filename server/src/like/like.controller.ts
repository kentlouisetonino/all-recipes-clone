import { Controller, Post, Req, Delete, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { Like } from 'src/entities/Like'

import { AuthGuard } from '../auth/guards/auth.guard'
import { LikeService } from './like.service'
import { DeleteLikeOutput } from './dto/like.output'

@Controller('like')
@UseGuards(AuthGuard)
export class LikeController {
  constructor(private likeService: LikeService) {}

  @Post('create')
  createLike(@Req() req: Request): Promise<Like> {
    return this.likeService.createLike(req.body)
  }

  @Delete('delete')
  deleteLike(@Req() req: Request): Promise<DeleteLikeOutput> {
    return this.likeService.deleteLike(Number(req.query.id))
  }
}
