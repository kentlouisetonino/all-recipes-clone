import { Test } from '@nestjs/testing'
import { Request } from 'express'

import { LikeController } from '../like.controller'
import { LikeService } from '../like.service'
import { deleteLikeStub, likeStub } from './stubs/like.stub'
import { AuthGuard } from '../../auth/guards/auth.guard'
import { Like } from 'src/entities/Like'
import { CreateLikeInput } from '../dto/like.input'
import { DeleteLikeOutput } from '../dto/like.output'

jest.mock('../like.service')

describe('LikeController', () => {
  let likeController: LikeController
  let likeService: LikeService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [LikeController],
      providers: [
        LikeService,
        {
          provide: AuthGuard,
          useValue: jest.fn().mockImplementation(() => true),
        },
      ],
    }).compile()

    likeController = moduleRef.get<LikeController>(LikeController)
    likeService = moduleRef.get<LikeService>(LikeService)
    jest.clearAllMocks()
  })

  describe('A. createLike', () => {
    let like: Like
    let createLikeInput: CreateLikeInput

    beforeEach(async () => {
      createLikeInput = {
        userId: likeStub().userId,
        recipeId: likeStub().recipeId,
      }

      const request: Request | any = {
        body: createLikeInput,
      }

      like = await likeController.createLike(request)
    })

    test('#1: If createLike is called.', () => {
      expect(likeService.createLike).toHaveBeenCalledWith(createLikeInput)
    })

    test('#2: If createLike return a like object.', () => {
      expect(like).toEqual(likeStub())
    })
  })

  describe('B. deleteLike', () => {
    let deleteLikeOutput: DeleteLikeOutput

    const request: Request | any = {
      query: {
        id: likeStub().id,
      },
    }

    beforeEach(async () => {
      deleteLikeOutput = await likeController.deleteLike(request)
    })

    test('#1: If deleteLike is called', () => {
      expect(likeService.deleteLike).toHaveBeenCalledWith(likeStub().id)
    })

    test('#2: If deleteLike returns an output.', () => {
      expect(deleteLikeOutput).toStrictEqual(deleteLikeStub())
    })
  })
})
