import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Index,
} from 'typeorm'

import { User } from './User'
import { Like } from './Like'

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Index({ fulltext: true })
  @Column()
  title: string

  @Column({ type: 'longtext' })
  description: string

  @Column()
  author: string

  @Column({ type: 'longtext' })
  ingredients: string

  @Column({ type: 'longtext' })
  steps: string

  @Column({ name: 'user_id' })
  userId: number

  @ManyToOne(() => User, (user) => user.recipes)
  @JoinColumn({ name: 'user_id' })
  user: User

  @OneToMany(() => Like, (like) => like.recipe)
  likes?: Like[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
