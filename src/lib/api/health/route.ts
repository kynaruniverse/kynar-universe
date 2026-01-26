import { serverClient } from '@/lib/supabase/server';
import { apiResponse } from '@/lib/api/responses';

export async function GET() {
  try {
    const supabase = await serverClient();
    
    // Perform a tiny query to check DB connectivity
    const { error } = await supabase.from('products').select('id').limit(1);
    
    if (error) throw error;

    return apiResponse.success({ 
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected'
    });
  } catch (err: any) {
    return apiResponse.error(`Unhealthy: ${err.message}`, 503);
  }
}
