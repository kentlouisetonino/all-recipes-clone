import { likeStub, deleteLikeStub } from '../test/stubs/like.stub'

export const LikeService = jest.fn().mockReturnValue({
  createLike: jest.fn().mockResolvedValue(likeStub()),
  deleteLike: jest.fn().mockResolvedValue(deleteLikeStub()),
})
