CREATE TABLE IF NOT EXISTS users(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR (50) UNIQUE NOT NULL,
  email VARCHAR (100) UNIQUE NOT NULL,
  password_hash VARCHAR (255) NOT NULL,
  fullname VARCHAR (100) NOT NULL,
  role_code VARCHAR (20) NOT NULL,
  status SMALLINT NOT NULL,
  last_login_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_at TIMESTAMP WITH TIME ZONE 
);

ALTER TABLE users
ADD CONSTRAINT fk_role_code FOREIGN KEY (role_code)
  REFERENCES user_roles (role_code)
  ON UPDATE NO ACTION;

COMMENT ON COLUMN users.status IS 'User status: 1=ACTIVE, 2=SUSPENDED, 3=DISABLED';

-- Insert Default Users
INSERT INTO users (username, email, password_hash, fullname, role_code, status, created_at) VALUES
('owner_user', 'owner@example', '$2b$10$ICMTagumfia4.2V2yIDz6uz10ipQRoejEIvRrJ8d2WRGeU24qAvxO', 'Owner User', 'OWNER', 1, NOW()),
('admin_user', 'admin@example', '$2b$10$ICMTagumfia4.2V2yIDz6uz10ipQRoejEIvRrJ8d2WRGeU24qAvxO', 'Admin User', 'ADMIN', 1, NOW()),
('ops_user', 'ops@example', '$2b$10$ICMTagumfia4.2V2yIDz6uz10ipQRoejEIvRrJ8d2WRGeU24qAvxO', 'Ops User', 'OPS', 1, NOW()),
('finance_user', 'finance@example', '$2b$10$ICMTagumfia4.2V2yIDz6uz10ipQRoejEIvRrJ8d2WRGeU24qAvxO', 'Finance User', 'FINANCE', 1, NOW());