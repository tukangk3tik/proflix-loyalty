CREATE TABLE IF NOT EXISTS user_roles(
  id serial PRIMARY KEY,
  role_code VARCHAR (20) UNIQUE NOT NULL,
  role_name VARCHAR (100) UNIQUE NOT NULL,
  description VARCHAR (300) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert User Roles 
INSERT INTO user_roles (role_code, role_name, description) VALUES
('OWNER', 'Super Admin', 'Has full access to all system features and settings'),
('ADMIN', 'Admin', 'Manages regional administrative tasks'),
('OPS', 'IT Ops', 'Handles IT operations and infrastructure management'),
('FINANCE', 'Finance', 'Responsible for financial management and budgeting');