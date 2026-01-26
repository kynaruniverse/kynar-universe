import { NextResponse } from 'next/server';

export const apiResponse = {
  success: (data: any, status = 200) => 
    NextResponse.json({ success: true, data }, { status }),
    
  error: (message: string, status = 400) => 
    NextResponse.json({ success: false, error: message }, { status }),
    
  unauthorized: () => 
    NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 }),
    
  notFound: (item = 'Resource') => 
    NextResponse.json({ success: false, error: `${item} not found` }, { status: 404 }),
};
