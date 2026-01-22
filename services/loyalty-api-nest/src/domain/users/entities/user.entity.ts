import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { RegistryDates } from '../../../common/embedded/registry-dates.embedded';
import { SoftDelete } from '../../../common/embedded/soft-delete.embedded';
import { UserStatus } from '../enum/user-status.enum';
import { UserRole } from './user-role.entity';

@Entity('users')
export class User {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255, name: 'password_hash' })
  passwordHash: string;

  @Column({ type: 'varchar', length: 100 })
  fullname: string;

  @Column({ type: 'integer', name: 'role_id' })
  roleId: number;

  @ManyToOne(() => UserRole, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: UserRole;

  @Column({ type: 'smallint', default: UserStatus.ACTIVE })
  status: UserStatus;

  @Column({ type: 'timestamptz', name: 'last_login_at', nullable: true })
  lastLoginAt: Date | null;

  @Column(() => RegistryDates, { prefix: false })
  registryDates: RegistryDates;

  @Exclude()
  @Column(() => SoftDelete, { prefix: false })
  softDelete: SoftDelete;
}
