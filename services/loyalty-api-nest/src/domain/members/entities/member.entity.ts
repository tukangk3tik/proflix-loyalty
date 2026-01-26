import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { MemberStatus } from '../enum/member-status.enum';
import { RegistryDates } from '../../../common/embedded/registry-dates.embedded';
import { SoftDelete } from '../../../common/embedded/soft-delete.embedded';
import { Exclude } from 'class-transformer';
import { MemberTier } from '../enum/member-tier.enum';

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  membership_number: string;

  @Column({ type: 'timestamp' })
  join_date: Date;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 100 })
  fullname: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  referral_code: string;

  @Column({ type: 'int', default: MemberTier.BRONZE })
  tier: number;

  @Column({
    type: 'smallint',
    default: MemberStatus.PENDING,
  })
  status: MemberStatus;

  @Column({ type: 'timestamp', nullable: true })
  removal_requested_at: Date;

  @Column({ type: 'smallint', nullable: true })
  removal_requested_source: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  removal_reason: string;

  @Column({ type: 'timestamp', nullable: true })
  removal_approved_at: Date;

  @Column({ type: 'uuid', nullable: true })
  removal_approved_by: string;

  @Column(() => RegistryDates, { prefix: false })
  registryDates: RegistryDates;

  @Exclude()
  @Column(() => SoftDelete, { prefix: false })
  softDelete: SoftDelete;
}
