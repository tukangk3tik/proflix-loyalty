CREATE TABLE IF NOT EXISTS members(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  membership_number VARCHAR (20) UNIQUE NOT NULL,
  join_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  phone VARCHAR (255),
  email VARCHAR (100) UNIQUE NOT NULL,
  password VARCHAR (255) NOT NULL,
  fullname VARCHAR (255) NOT NULL,
  referral_code VARCHAR (20) NOT NULL,
  tier SMALLINT NOT NULL,
  status SMALLINT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_at TIMESTAMP WITH TIME ZONE,
  removal_requested_at TIMESTAMP WITH TIME ZONE,
  removal_requested_source SMALLINT,
  removal_reason VARCHAR (255),
  removal_approved_at TIMESTAMP WITH TIME ZONE,
  removal_approved_by UUID
);
  
ALTER TABLE members
ADD CONSTRAINT fk_removal_approved_by_user_id FOREIGN KEY (removal_approved_by)
  REFERENCES users (id)
  ON UPDATE NO ACTION;

COMMENT ON COLUMN members.referral_code IS 'Referral code membership_number of the member who referred this member';
COMMENT ON COLUMN members.tier IS 'Membership tier: 1=UNO, 2=DUO, 3=TRE';
COMMENT ON COLUMN members.status IS 'Membership status: 0=PENDING_VERIFICATION, 1=ACTIVE, 2=INACTIVE, 3=PENDING_REMOVAL, 4=REMOVED';
COMMENT ON COLUMN members.removal_requested_source IS 'Source of removal request: 1=MEMBER, 2=ADMIN, 3=SYSTEM';