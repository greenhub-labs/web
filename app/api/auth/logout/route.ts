import { NextRequest, NextResponse } from 'next/server';

export async function POST() {
  // Aquí podrías llamar a tu backend real para invalidar el token si es necesario
  return NextResponse.json({ success: true });
}
