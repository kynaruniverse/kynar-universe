import { createClient } from '@/lib/supabase/server';

export async function logAdminAction(params: {
  admin_id: string;
  action: string;
  entity: string;
  entity_id?: string;
  metadata?: Record<string, unknown>;
}) {
  const supabase = await createClient();

  await supabase.from('admin_audit_logs').insert({
    admin_id: params.admin_id,
    action: params.action,
    entity: params.entity,
    entity_id: params.entity_id,
    metadata: params.metadata ?? {},
  });
}