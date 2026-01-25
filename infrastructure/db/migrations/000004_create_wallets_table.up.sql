CREATE TABLE IF NOT EXISTS wallets(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL,
  available_balance BIGINT DEFAULT 0,
  pending_balance BIGINT DEFAULT 0,
  expired_balance BIGINT DEFAULT 0,
  last_transaction_id BIGINT,
  last_event_id UUID,
  status SMALLINT NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE wallets
ADD CONSTRAINT fk_member_id FOREIGN KEY (member_id)
  REFERENCES members (id)
  ON UPDATE NO ACTION;