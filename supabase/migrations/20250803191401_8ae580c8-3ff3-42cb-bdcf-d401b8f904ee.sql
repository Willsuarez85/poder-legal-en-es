-- Fix the save_quiz_session function to use NULL for question_id instead of invalid UUID
CREATE OR REPLACE FUNCTION save_quiz_session(
  p_session_id UUID,
  p_answers JSONB,
  p_contact_data JSONB DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
  session_record_id UUID;
BEGIN
  -- Insert or update the complete session using NULL as question_id
  INSERT INTO quiz_responses (session_id, question_id, answer)
  VALUES (p_session_id, NULL, jsonb_build_object(
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