CREATE TABLE IF NOT EXISTS transactions(
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	event_id UUID NOT NULL,
	member_id UUID NOT NULL,
	wallet_id UUID NOT NULL,
	campaign_id UUID,
	delta INTEGER NOT NULL,
	transaction_type SMALLINT NOT NULL,
	reason_code SMALLINT NOT NULL,
	reference_id VARCHAR(100),
	status SMALLINT NOT NULL DEFAULT 0,
	source SMALLINT NOT NULL,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	UNIQUE (event_id, transaction_type)
);

COMMENT ON COLUMN transactions.event_id IS 'generated random / uuid when first time new transaction come. Represent one logical business event';
COMMENT ON COLUMN transactions.transaction_type IS 'Transaction type: 1 = EARN, 2 = REDEEM, 3 = ADJUSTMENT, 4 = EXPIRATION, 5 = REVERSAL';
COMMENT ON COLUMN transactions.reason_code IS 'Reason code: 1 = ORDER_COMPLETED, 2 = PROMO_CAMPAIGN, 3 = POINTS_EXPIRED, 4 = MANUAL_ADJUSTMENT';
COMMENT ON COLUMN transactions.status IS 'Transaction status: 0 = PENDING, 1 = CONFIRMED, 2 = REVERSED';
COMMENT ON COLUMN transactions.source IS 'Source system: 1 = ORDER_SERVICE, 2 = CAMPAIGN_ENGINE, 3 = REFERRAL_SYSTEM, 4 = ADMIN, 5 = MIGRATION';

ALTER TABLE transactions
ADD CONSTRAINT fk_transactions_member_id FOREIGN KEY (member_id)
	REFERENCES members (id)
	ON UPDATE NO ACTION;

ALTER TABLE transactions
ADD CONSTRAINT fk_transactions_wallet_id FOREIGN KEY (wallet_id)
	REFERENCES wallets (id)
	ON UPDATE NO ACTION;

ALTER TABLE transactions
ADD CONSTRAINT fk_transactions_campaign_id FOREIGN KEY (campaign_id)
	REFERENCES campaigns (id)
	ON UPDATE NO ACTION;
