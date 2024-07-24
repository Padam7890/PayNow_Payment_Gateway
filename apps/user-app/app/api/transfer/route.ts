import { NextRequest, NextResponse } from 'next/server';
import { p2pTransfer } from '../../lib/actions/payTransfer';

export async function POST(req: NextRequest) {
    try {
        const { phone, amountToSend, note } = await req.json();

        if (!phone || !amountToSend || !note) {
            return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
        }

        const result = await p2pTransfer(phone, amountToSend, note);

        if (result.success) {
            return NextResponse.json({ ...result, toUserId: result?.data?.toUser });
        } else {
            return NextResponse.json(result, { status: 400 });
        }
    } catch (error: any) {
        console.error("Error during p2p transfer:", error);
        return NextResponse.json({ success: false, message: error.message || 'An error occurred' }, { status: 500 });
    }
}
