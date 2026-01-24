import {
  Entity,
  PrimaryColumn,
  Column,
} from 'typeorm';
import crypto from 'crypto';

@Entity('tasks')
export class Todo {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ default: false })
  completed: boolean;

  @Column({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = crypto.randomUUID();
    }
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
  }
}
