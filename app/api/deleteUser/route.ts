
import { NextRequest, NextResponse } from "next/server";
import adminAuthClient from "../../utils/supabaseAdmin";


interface Message {
    user_id: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const message: Message = await request.json();
        const { data, error } = await adminAuthClient.deleteUser(message.user_id);

        if (error) {
            console.log(error);
            return NextResponse.json({ message: error.message }, { status: error.status });
        } else {
            return NextResponse.json({ message: 'Successfully deleted user' }, { status: 200 });
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
    }
}
