
-- Enhance database function security by adding explicit search_path
-- This prevents potential security issues from search_path manipulation
CREATE OR REPLACE FUNCTION public.save_quiz_session(p_session_id uuid, p_answers jsonb, p_contact_data jsonb DEFAULT NULL::jsonb)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
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
$function$
