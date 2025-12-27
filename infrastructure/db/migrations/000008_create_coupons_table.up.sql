CREATE TABLE IF NOT EXISTS coupons(
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	reward_id UUID NOT NULL,
	campaign_id UUID NOT NULL,
	coupon_code VARCHAR(50) NOT NULL,
	owned_by UUID,
	coupon_status SMALLINT NOT NULL DEFAULT 0,
	expired_at TIMESTAMP WITH TIME ZONE,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	is_deleted BOOLEAN DEFAULT FALSE,
	deleted_at TIMESTAMP WITH TIME ZONE 
);

COMMENT ON COLUMN coupons.coupon_status IS 'Coupon status: 0 = ISSUED, 1 = WINNER, 2 = LOST, 3 = EXPIRED';

ALTER TABLE coupons
ADD CONSTRAINT fk_coupons_reward_id FOREIGN KEY (reward_id)
	REFERENCES rewards (id)
	ON UPDATE NO ACTION;

ALTER TABLE coupons
ADD CONSTRAINT fk_coupons_campaign_id FOREIGN KEY (campaign_id)
	REFERENCES campaigns (id)
	ON UPDATE NO ACTION;

ALTER TABLE coupons
ADD CONSTRAINT fk_coupons_owned_by FOREIGN KEY (owned_by)
	REFERENCES members (id)
	ON UPDATE NO ACTION;
