-- Add unique constraint to quiz_responses table to support ON CONFLICT in save_quiz_session function
-- This constraint allows multiple NULL question_id values (for complete sessions)
-- but ensures uniqueness for actual question responses

ALTER TABLE quiz_responses 
ADD CONSTRAINT quiz_responses_session_question_unique 
UNIQUE (session_id, question_id);

-- The unique constraint will handle NULL values properly:
-- - Multiple rows can have (session_id, NULL) - this is allowed in PostgreSQL
-- - Only one row per (session_id, actual_question_id) combination