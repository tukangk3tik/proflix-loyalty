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
  deleted_at TIMESTAMP WITH TIME ZONE 
);

COMMENT ON COLUMN members.referral_code IS 'Referral code membership_number of the member who referred this member';
COMMENT ON COLUMN members.tier IS 'Membership tier: 1=UNO, 2=DUO, 3=TRE';
COMMENT ON COLUMN members.status IS 'Membership status: 1=ACTIVE, 2=INACTIVE, 3=CANCELLED';