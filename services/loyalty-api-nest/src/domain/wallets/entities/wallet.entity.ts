import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RegistryDates } from '../../../common';
import { Member } from '../../members/entities/member.entity';

export enum WalletStatus {
  ACTIVE = 1,
  SUSPENDED = 2,
  CLOSED = 3,
}

@Entity('wallets')
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'member_id' })
  memberId: string;

  @ManyToOne(() => Member, { eager: true })
  @JoinColumn({ name: 'member_id' })
  member: Member;

  @Column({ type: 'bigint', default: 0, name: 'available_balance' })
  availableBalance: number;

  @Column({ type: 'bigint', default: 0, name: 'pending_balance' })
  pendingBalance: number;

  @Column({ type: 'bigint', default: 0, name: 'expired_balance' })
  expiredBalance: number;

  @Column({ type: 'bigint', nullable: true, name: 'last_transaction_id' })
  lastTransactionId: number | null;

  @Column({ type: 'uuid', nullable: true, name: 'last_event_id' })
  lastEventId: string | null;

  @Column({ type: 'smallint', default: WalletStatus.ACTIVE })
  status: WalletStatus;

  @Column(() => RegistryDates, { prefix: false })
  registryDates: RegistryDates;
}
