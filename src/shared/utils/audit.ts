import { createClient } from '@/lib/supabase/server'

/**
 * logAdminAction
 * Records administrative changes to the audit table.
 * Silent failure ensured so that logging issues don't block core admin tasks.
 */
export async function logAdminAction(params: {
  admin_id: string
  action: string
  entity: string
  entity_id ? : string
  metadata ? : Record < string,
  unknown >
}) {
  try {
    const supabase = await createClient()
    
    await supabase.from('admin_audit_logs').insert({
      admin_id: params.admin_id,
      action: params.action,
      entity: params.entity,
      entity_id: params.entity_id,
      metadata: params.metadata ?? {},
    })
  } catch (err) {
    // We log to console but don't throw to avoid interrupting the main action
    console.error('[Audit Log Failure]:', err)
  }
}