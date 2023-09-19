import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
  ) {}

  /**
   * 创建帖子
   */
  async create(post: Post): Promise<void> {
    await this.postRepo.save(post);
  }

  /**
   * 删除帖子
   */
  async remove(id: number): Promise<void> {
    const existing = await this.findOneById(id);
    if (!existing) {
      throw new HttpException(`删除失败: 帖子不存在`, 404);
    }
    await this.postRepo.remove(existing);
  }

  /**
   * 更新帖子
   */
  async update(id: number, updatePost: Post): Promise<void> {
    const existing = await this.findOneById(id);
    if (!existing) {
      throw new HttpException(`更新失败: 帖子不存在`, 404);
    }
    await this.postRepo.update(id, updatePost);
  }

  /**
   * 查询帖子
   */
  async findOneById(id: number): Promise<Post> {
    return await this.postRepo.findOneBy({ id });
  }

  /**
   * 查询用户的所有帖子
   */
  async findAll(userId: number): Promise<Post[]> {
    return await this.postRepo.find({ where: { user: { id: userId } } });
  }
}
