-- Supabase Storage for project cover images (optional — uploads also work via inline fallback)
-- Run in SQL Editor: https://supabase.com/dashboard/project/ifablqbfbylctzaugsmm/sql/new

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'project-images',
  'project-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[];

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public read project images" ON storage.objects;
DROP POLICY IF EXISTS "anon read project images" ON storage.objects;
DROP POLICY IF EXISTS "anon upload project images" ON storage.objects;
DROP POLICY IF EXISTS "anon update project images" ON storage.objects;
DROP POLICY IF EXISTS "anon delete project images" ON storage.objects;

CREATE POLICY "public read project images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'project-images');

CREATE POLICY "anon upload project images"
  ON storage.objects FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "anon update project images"
  ON storage.objects FOR UPDATE
  TO public
  USING (bucket_id = 'project-images')
  WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "anon delete project images"
  ON storage.objects FOR DELETE
  TO public
  USING (bucket_id = 'project-images');
