-- Create RLS policies for quiz_responses to allow reading responses
CREATE POLICY "Users can view quiz responses by session" 
ON public.quiz_responses 
FOR SELECT 
USING (true);

-- Create a function to save complete quiz session with all answers as JSON
CREATE OR REPLACE FUNCTION save_quiz_session(
  p_session_id UUID,
  p_answers JSONB,
  p_contact_data JSONB DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
  session_record_id UUID;
BEGIN
  -- Insert or update the complete session
  INSERT INTO quiz_responses (session_id, question_id, answer)
  VALUES (p_session_id, 'complete_session'::UUID, jsonb_build_object(
    'answers', p_answers,
    'contact_data', p_contact_data,
    'completed_at', now()
  ))
  ON CONFLICT (session_id, question_id) 
  DO UPDATE SET 
    answer = jsonb_build_object(
      'answers', p_answers,
      'contact_data', p_contact_data,
      'completed_at', now()
    ),
    created_at = now()
  RETURNING id INTO session_record_id;
  
  RETURN session_record_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;