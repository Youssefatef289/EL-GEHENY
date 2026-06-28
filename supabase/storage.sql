-- Supabase Storage for project cover images
-- Run in SQL Editor (do NOT run ALTER TABLE on storage.objects — RLS is already enabled)
-- Alternative: Dashboard → Storage → New bucket → name: project-images → Public: ON

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
DROP POLICY IF EXISTS "anon read project images" ON storage.objects;
DROP POLICY IF EXISTS "anon upload project images" ON storage.objects;
DROP POLICY IF EXISTS "anon update project images" ON storage.objects;
DROP POLICY IF EXISTS "anon delete project images" ON storage.objects;
DROP POLICY IF EXISTS "project images public access" ON storage.objects;

CREATE POLICY "project images public access"
  ON storage.objects
  FOR ALL
  TO public
  USING (bucket_id = 'project-images')
  WITH CHECK (bucket_id = 'project-images');
