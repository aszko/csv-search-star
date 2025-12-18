-- Create table for contacts data
CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  last_name TEXT,
  first_name TEXT,
  email TEXT,
  address TEXT,
  zipcode TEXT,
  city TEXT,
  birth_date TEXT,
  birth_department TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Allow public read access (no auth needed for search)
CREATE POLICY "Allow public read access" 
ON public.contacts 
FOR SELECT 
USING (true);

-- Allow public insert for CSV import
CREATE POLICY "Allow public insert" 
ON public.contacts 
FOR INSERT 
WITH CHECK (true);

-- Create index for faster searches
CREATE INDEX idx_contacts_last_name ON public.contacts(last_name);
CREATE INDEX idx_contacts_first_name ON public.contacts(first_name);
CREATE INDEX idx_contacts_city ON public.contacts(city);
CREATE INDEX idx_contacts_zipcode ON public.contacts(zipcode);