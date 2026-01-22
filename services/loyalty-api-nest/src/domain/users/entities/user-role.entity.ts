import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('user_roles')
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true, name: 'role_code' })
  roleCode: string;

  @Column({ type: 'varchar', length: 100, unique: true, name: 'role_name' })
  roleName: string;

  @Column({ type: 'varchar', length: 300 })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
