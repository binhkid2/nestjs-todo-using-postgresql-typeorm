import { Entity, PrimaryColumn, Column } from 'typeorm';
import crypto from 'crypto';

@Entity('users')
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ name: 'password_hash', length: 255 })
  passwordHash: string;

  @Column({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  constructor() {
    if (!this.id) this.id = crypto.randomUUID();
    if (!this.createdAt) this.createdAt = new Date();
  }
}
