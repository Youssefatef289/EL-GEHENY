-- Supabase Storage for project cover images
-- Run once in SQL Editor (after schema.sql)

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'project-images',
  'project-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "public read project images" ON storage.objects;
DROP POLICY IF EXISTS "admin upload project images" ON storage.objects;
DROP POLICY IF EXISTS "admin update project images" ON storage.objects;
DROP POLICY IF EXISTS "admin delete project images" ON storage.objects;

CREATE POLICY "public read project images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'project-images');

CREATE POLICY "admin upload project images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "admin update project images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'project-images')
  WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "admin delete project images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'project-images');
