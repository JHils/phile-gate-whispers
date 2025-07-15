
-- Extend user_tracking table with new fields for Phase ∞ features
ALTER TABLE user_tracking ADD COLUMN IF NOT EXISTS jonah_awakeness_level INTEGER DEFAULT 1;
ALTER TABLE user_tracking ADD COLUMN IF NOT EXISTS chaos_events_triggered INTEGER DEFAULT 0;
ALTER TABLE user_tracking ADD COLUMN IF NOT EXISTS diary_entries_viewed INTEGER DEFAULT 0;
ALTER TABLE user_tracking ADD COLUMN IF NOT EXISTS current_mask TEXT DEFAULT 'default';
ALTER TABLE user_tracking ADD COLUMN IF NOT EXISTS mirror_mode_unlocked BOOLEAN DEFAULT FALSE;
ALTER TABLE user_tracking ADD COLUMN IF NOT EXISTS whisper_count INTEGER DEFAULT 0;
ALTER TABLE user_tracking ADD COLUMN IF NOT EXISTS last_4_44_interaction TIMESTAMP WITH TIME ZONE;

-- Create jonah_diary_entries table
CREATE TABLE IF NOT EXISTS jonah_diary_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_hash TEXT NOT NULL,
  entry_content TEXT NOT NULL,
  entry_type TEXT NOT NULL DEFAULT 'memory_fragment',
  emotional_context TEXT,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  is_ephemeral BOOLEAN DEFAULT TRUE,
  importance_score INTEGER DEFAULT 50,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user_masks table
CREATE TABLE IF NOT EXISTS user_masks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_hash TEXT NOT NULL,
  mask_id TEXT NOT NULL,
  mask_name TEXT NOT NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  unlock_trigger TEXT,
  visual_properties JSONB,
  dialogue_modifiers JSONB,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_hash, mask_id)
);

-- Create chaos_events table
CREATE TABLE IF NOT EXISTS chaos_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_hash TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_data JSONB,
  triggered_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  trigger_chance DECIMAL(5,4) DEFAULT 0.001,
  narrative_impact TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create live_cult_stats table for real-time tracking
CREATE TABLE IF NOT EXISTS live_cult_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stat_type TEXT NOT NULL,
  stat_value INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  metadata JSONB,
  UNIQUE(stat_type)
);

-- Create mirror_pages table
CREATE TABLE IF NOT EXISTS mirror_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  original_path TEXT NOT NULL,
  mirror_content JSONB NOT NULL,
  trigger_conditions JSONB,
  visual_modifications JSONB,
  emotional_tone TEXT DEFAULT 'inverted',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(original_path)
);

-- Create whisper_archive table
CREATE TABLE IF NOT EXISTS whisper_archive (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_hash TEXT NOT NULL,
  whisper_content TEXT NOT NULL,
  whisper_type TEXT DEFAULT 'console',
  response_content TEXT,
  emotional_context TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
  llm_processed BOOLEAN DEFAULT FALSE,
  memory_importance INTEGER DEFAULT 50
);

-- Create jonah_memory_bank table for persistent LLM memory
CREATE TABLE IF NOT EXISTS jonah_memory_bank (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_hash TEXT NOT NULL,
  memory_type TEXT NOT NULL,
  memory_content TEXT NOT NULL,
  emotional_weight INTEGER DEFAULT 50,
  interaction_count INTEGER DEFAULT 1,
  last_referenced TIMESTAMP WITH TIME ZONE DEFAULT now(),
  decay_rate DECIMAL(3,2) DEFAULT 0.95,
  importance_score INTEGER DEFAULT 50,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create qr_artifacts table for physical-digital bridge
CREATE TABLE IF NOT EXISTS qr_artifacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  qr_code TEXT UNIQUE NOT NULL,
  artifact_type TEXT NOT NULL,
  location_hint TEXT,
  unlock_content JSONB,
  found_by_user_hash TEXT,
  found_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE jonah_diary_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_masks ENABLE ROW LEVEL SECURITY;
ALTER TABLE chaos_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_cult_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE mirror_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE whisper_archive ENABLE ROW LEVEL SECURITY;
ALTER TABLE jonah_memory_bank ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_artifacts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for diary entries
CREATE POLICY "Users can view their own diary entries" ON jonah_diary_entries
  FOR SELECT USING (user_hash = current_setting('app.user_hash', true));

CREATE POLICY "System can insert diary entries" ON jonah_diary_entries
  FOR INSERT WITH CHECK (true);

-- Create RLS policies for user masks
CREATE POLICY "Users can view their own masks" ON user_masks
  FOR SELECT USING (user_hash = current_setting('app.user_hash', true));

CREATE POLICY "Users can manage their own masks" ON user_masks
  FOR ALL USING (user_hash = current_setting('app.user_hash', true));

-- Create RLS policies for chaos events
CREATE POLICY "Users can view their own chaos events" ON chaos_events
  FOR SELECT USING (user_hash = current_setting('app.user_hash', true));

CREATE POLICY "System can create chaos events" ON chaos_events
  FOR INSERT WITH CHECK (true);

-- Create RLS policies for whisper archive
CREATE POLICY "Users can view their own whispers" ON whisper_archive
  FOR SELECT USING (user_hash = current_setting('app.user_hash', true));

CREATE POLICY "Users can create whispers" ON whisper_archive
  FOR INSERT WITH CHECK (user_hash = current_setting('app.user_hash', true));

-- Create RLS policies for memory bank
CREATE POLICY "Users can view their own memories" ON jonah_memory_bank
  FOR SELECT USING (user_hash = current_setting('app.user_hash', true));

CREATE POLICY "System can manage memories" ON jonah_memory_bank
  FOR ALL WITH CHECK (true);

-- Create RLS policies for QR artifacts
CREATE POLICY "Anyone can view active artifacts" ON qr_artifacts
  FOR SELECT USING (is_active = true);

CREATE POLICY "System can manage artifacts" ON qr_artifacts
  FOR ALL WITH CHECK (true);

-- Create policies for live cult stats (public read)
CREATE POLICY "Anyone can view cult stats" ON live_cult_stats
  FOR SELECT USING (true);

CREATE POLICY "System can update cult stats" ON live_cult_stats
  FOR ALL WITH CHECK (true);

-- Create policies for mirror pages (public read)
CREATE POLICY "Anyone can view mirror pages" ON mirror_pages
  FOR SELECT USING (is_active = true);

-- Initialize cult stats
INSERT INTO live_cult_stats (stat_type, stat_value) VALUES 
  ('online_users', 0),
  ('total_confessions', 0),
  ('ascended_users', 0),
  ('roles_unlocked_today', 0),
  ('chaos_events_triggered', 0)
ON CONFLICT (stat_type) DO NOTHING;

-- Create function to update cult stats
CREATE OR REPLACE FUNCTION update_cult_stat(stat_name TEXT, new_value INTEGER)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO live_cult_stats (stat_type, stat_value, updated_at)
  VALUES (stat_name, new_value, now())
  ON CONFLICT (stat_type) 
  DO UPDATE SET 
    stat_value = new_value,
    updated_at = now();
END;
$$;

-- Create function to trigger chaos events
CREATE OR REPLACE FUNCTION trigger_chaos_event(p_user_hash TEXT, p_event_type TEXT, p_event_data JSONB DEFAULT '{}')
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  event_id UUID;
BEGIN
  INSERT INTO chaos_events (user_hash, event_type, event_data, narrative_impact)
  VALUES (
    p_user_hash, 
    p_event_type, 
    p_event_data,
    'Reality fracture detected. User witnessed something beyond the veil.'
  )
  RETURNING id INTO event_id;
  
  -- Update user chaos count
  UPDATE user_tracking 
  SET chaos_events_triggered = chaos_events_triggered + 1
  WHERE user_hash = p_user_hash;
  
  -- Update global chaos stat
  PERFORM update_cult_stat('chaos_events_triggered', 
    (SELECT SUM(chaos_events_triggered) FROM user_tracking));
  
  RETURN event_id;
END;
$$;

-- Create function for diary entry management
CREATE OR REPLACE FUNCTION create_diary_entry(
  p_user_hash TEXT,
  p_content TEXT,
  p_type TEXT DEFAULT 'memory_fragment',
  p_emotional_context TEXT DEFAULT 'neutral',
  p_is_ephemeral BOOLEAN DEFAULT TRUE
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  entry_id UUID;
  expire_time TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Set expiration time for ephemeral entries (24 hours)
  IF p_is_ephemeral THEN
    expire_time := now() + INTERVAL '24 hours';
  ELSE
    expire_time := NULL;
  END IF;
  
  INSERT INTO jonah_diary_entries (
    user_hash, 
    entry_content, 
    entry_type, 
    emotional_context,
    is_ephemeral,
    expires_at
  )
  VALUES (
    p_user_hash, 
    p_content, 
    p_type, 
    p_emotional_context,
    p_is_ephemeral,
    expire_time
  )
  RETURNING id INTO entry_id;
  
  -- Update user diary count
  UPDATE user_tracking 
  SET diary_entries_viewed = diary_entries_viewed + 1
  WHERE user_hash = p_user_hash;
  
  RETURN entry_id;
END;
$$;
