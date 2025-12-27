CREATE TABLE IF NOT EXISTS rewards(
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	campaign_id UUID NOT NULL,
	reward_type SMALLINT NOT NULL,
	reward_subtype SMALLINT NOT NULL,
	stock_mode SMALLINT NOT NULL,
	total_stock INTEGER NOT NULL CHECK (total_stock >= 0),
	reward_metadata JSONB,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	is_deleted BOOLEAN DEFAULT FALSE,
	deleted_at TIMESTAMP WITH TIME ZONE 
);

COMMENT ON COLUMN rewards.reward_type IS 'Reward type: 1 = VOUCHER, 2 = COUPON; defines what user gets';
COMMENT ON COLUMN rewards.reward_subtype IS 'Reward subtype: 11 = DISCOUNT, 12 = FREE_SHIPPING, 21 = LOTTERY';
COMMENT ON COLUMN rewards.stock_mode IS 'Stock mode: 1 = INVENTORY, 2 = ON_DEMAND';

ALTER TABLE rewards
ADD CONSTRAINT fk_rewards_campaign_id FOREIGN KEY (campaign_id)
	REFERENCES campaigns (id)
	ON UPDATE NO ACTION;
