import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Member } from '../entities/member.entity';
import { SYSTEM_DEFAULT_REFERRAL } from '../utils/member.constant';
import { MemberStatus } from '../enum/member-status.enum';
import { MemberTier } from '../enum/member-tier.enum';
import { HashingService } from '../../../auth';

@EventSubscriber()
export class MembersSubscriber implements EntitySubscriberInterface<Member> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly hashingService: HashingService,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Member;
  }

  async beforeInsert(event: InsertEvent<Member>) {
    const { entity } = event;

    entity.membership_number = `M-${Date.now()}`;

    // TODO: Send verification email here and set status to PENDING
    entity.status = MemberStatus.ACTIVE;
    entity.tier = MemberTier.BRONZE;
    entity.join_date = new Date();

    // Hash password before saving
    if (entity.password && !this.isHashed(entity.password)) {
      entity.password = await this.hashingService.hash(entity.password);
    }

    if (!entity.referral_code) {
      entity.referral_code = SYSTEM_DEFAULT_REFERRAL;
    }
  }

  /**
   * Check if password is already hashed (64 char hex string)
   */
  private isHashed(password: string): boolean {
    return /^[a-f0-9]{64}$/i.test(password);
  }
}
