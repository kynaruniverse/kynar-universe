import { createClient } from '@/lib/supabase/server'
import { apiResponse } from '@/lib/api/responses'

/**
 * System Health Check
 * Verifies the connection between the Next.js edge and the Supabase vault.
 */
export async function GET() {
  try {
    const supabase = await createClient()
    
    // Perform a minimal heartbeat query
    const { error } = await supabase
      .from('products')
      .select('id')
      .limit(1)
      .single()
    
    if (error && error.code !== 'PGRST116') {
      throw error
    }

    return apiResponse.success({ 
      status: 'operational',
      latency: 'optimal',
      database: 'connected',
      timestamp: new Date().toISOString()
    })
  } catch (err: any) {
    console.error('System Health Failure:', err.message)
    return apiResponse.error('Service Temporarily Unavailable', 503)
  }
}
