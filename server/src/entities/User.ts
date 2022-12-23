import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'

import { Recipe } from './Recipe'

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ name: 'first_name' })
  firstName: string

  @Column({ name: 'last_name' })
  lastName: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ name: 'access_token', nullable: true })
  accessToken?: string

  @OneToMany(() => Recipe, (recipe) => recipe.user)
  recipes?: Recipe[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
