import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

import { Recipe } from './Recipe'

@Entity()
export class Like {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ name: 'user_id' })
  userId: number

  @Column({ name: 'recipe_id' })
  recipeId: number

  @ManyToOne(() => Recipe, (recipe) => recipe.likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipe

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
