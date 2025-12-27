CREATE TABLE IF NOT EXISTS campaigns(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_name VARCHAR (100) NOT NULL,
  description VARCHAR (255) NOT NULL,
  campaign_type SMALLINT NOT NULL,
  campaign_status SMALLINT NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  max_redeem_per_user INTEGER NOT NULL,
  redeem_cooldown_seconds INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_by UUID,
  deleted_at TIMESTAMP WITH TIME ZONE 
);

COMMENT ON COLUMN campaigns.campaign_type IS 'Campaign type: 1 = VOUCHER_REDEMPTION, 2 = POINT_BONUS, 3 = CASHBACK, 4 = MANUAL_ADJUSTMENT; defines how the program behaves';
COMMENT ON COLUMN campaigns.campaign_status IS 'Campaign status: 0 = DRAFT, 1 = ACTIVE, 2 = INACTIVE, 3 = COMPLETED; indicates the current state of the campaign';
COMMENT ON COLUMN campaigns.max_redeem_per_user IS 'Set to -1 if unlimited redemptions are allowed per user';

ALTER TABLE campaigns
ADD CONSTRAINT fk_deleted_by FOREIGN KEY (deleted_by)
  REFERENCES users (id)
  ON UPDATE NO ACTION;