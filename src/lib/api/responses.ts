import { NextResponse } from 'next/server'

/**
 * Standardized API Response Engine
 * Provides consistent JSON structures for the Kynar Universe ecosystem.
 */
export const apiResponse = {
  success: <T>(data: T, status = 200) => 
    NextResponse.json({ 
      success: true, 
      data,
      timestamp: new Date().toISOString()
    }, { status }),
    
  error: (message: string, status = 400) => 
    NextResponse.json({ 
      success: false, 
      error: message 
    }, { status }),
    
  unauthorized: (message = 'Identity verification required') => 
    NextResponse.json({ 
      success: false, 
      error: message 
    }, { status: 401 }),
    
  forbidden: (message = 'Insufficient clearance levels') =>
    NextResponse.json({
      success: false,
      error: message
    }, { status: 403 }),
    
  notFound: (item = 'Artifact') => 
    NextResponse.json({ 
      success: false, 
      error: `${item} not found in the vault` 
    }, { status: 404 }),
}
