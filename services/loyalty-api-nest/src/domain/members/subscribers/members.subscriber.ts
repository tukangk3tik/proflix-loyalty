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

@EventSubscriber()
export class MembersSubscriber implements EntitySubscriberInterface<Member> {
  constructor(private readonly dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Member;
  }

  beforeInsert(event: InsertEvent<Member>) {
    const { entity } = event;

    entity.membership_number = `M-${Date.now()}`;
    entity.status = MemberStatus.PENDING;
    entity.tier = MemberTier.BRONZE;
    entity.join_date = new Date();
    if (!entity.referral_code) {
      entity.referral_code = SYSTEM_DEFAULT_REFERRAL;
    }
  }
}
