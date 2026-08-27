INSERT INTO categories(name,description) VALUES
('Academic','Academic and examination issues'),('Hostel','Hostel issues'),('Infrastructure','Campus infrastructure'),('IT Services','Internet and technical issues'),('Library','Library issues'),('Other','Other complaints')
ON CONFLICT(name) DO NOTHING;
-- Generate your own bcrypt hashes for real accounts. Demo users can be created through /api/auth/register.
