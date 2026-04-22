-- ==============================================================================
-- Adiciona permissão de deletar para a tabela translation_reports
-- Execute no SQL Editor do Supabase Dashboard.
-- ==============================================================================

CREATE POLICY "Admins apagam reports"
ON public.translation_reports
FOR DELETE
USING ( public.is_admin() );
