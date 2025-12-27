CREATE TABLE IF NOT EXISTS vouchers(
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	reward_id UUID NOT NULL,
	campaign_id UUID NOT NULL,
	voucher_code VARCHAR(50) UNIQUE NOT NULL,
	voucher_status SMALLINT NOT NULL DEFAULT 0,
	redeemed_by UUID,
	redeemed_at TIMESTAMP WITH TIME ZONE,
	is_used BOOLEAN DEFAULT FALSE,
	used_at TIMESTAMP WITH TIME ZONE,
	expired_at TIMESTAMP WITH TIME ZONE,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	is_deleted BOOLEAN DEFAULT FALSE,
	deleted_at TIMESTAMP WITH TIME ZONE 
);

COMMENT ON COLUMN vouchers.voucher_status IS 'Voucher status: 0 = AVAILABLE, 1 = REDEEMED, 2 = EXPIRED; lifecycle';

ALTER TABLE vouchers
ADD CONSTRAINT fk_vouchers_reward_id FOREIGN KEY (reward_id)
	REFERENCES rewards (id)
	ON UPDATE NO ACTION;

ALTER TABLE vouchers
ADD CONSTRAINT fk_vouchers_campaign_id FOREIGN KEY (campaign_id)
	REFERENCES campaigns (id)
	ON UPDATE NO ACTION;

ALTER TABLE vouchers
ADD CONSTRAINT fk_vouchers_redeemed_by FOREIGN KEY (redeemed_by)
	REFERENCES members (id)
	ON UPDATE NO ACTION;
