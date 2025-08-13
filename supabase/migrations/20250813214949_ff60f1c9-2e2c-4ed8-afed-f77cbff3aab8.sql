-- Fix critical security vulnerability: Restrict access to personal quiz responses
-- Currently the policy "Users can view quiz responses by session" uses USING (true)
-- This allows ANYONE to read ALL quiz responses from ALL users

-- Drop the existing overly permissive SELECT policy
DROP POLICY IF EXISTS "Users can view quiz responses by session" ON public.quiz_responses;

-- Add restrictive SELECT policy to protect personal quiz data
-- Since there's no user authentication, we completely restrict access
CREATE POLICY "Quiz responses are private - no public access" 
ON public.quiz_responses 
FOR SELECT 
USING (false);

-- Add UPDATE policy to prevent unauthorized modifications
CREATE POLICY "Quiz responses cannot be updated" 
ON public.quiz_responses 
FOR UPDATE 
USING (false);

-- Add DELETE policy to prevent unauthorized deletions  
CREATE POLICY "Quiz responses cannot be deleted"
ON public.quiz_responses 
FOR DELETE 
USING (false);

-- The existing INSERT policy remains to allow quiz submission