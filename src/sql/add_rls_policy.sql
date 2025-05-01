
-- Add missing RLS policy for user_tracking table
CREATE POLICY "Enable insert for all users" 
  ON public.user_tracking 
  FOR INSERT 
  TO public 
  WITH CHECK (true);

-- Enable select access to all users for leaderboard functionality
CREATE POLICY "Enable select for all users" 
  ON public.user_tracking 
  FOR SELECT 
  TO public 
  USING (true);

-- Enable update for users to update their own records
CREATE POLICY "Enable update for users with matching hash" 
  ON public.user_tracking 
  FOR UPDATE 
  TO public 
  USING (auth.uid()::text = user_hash OR user_hash = (SELECT user_hash FROM public.user_tracking WHERE user_hash = user_hash));
