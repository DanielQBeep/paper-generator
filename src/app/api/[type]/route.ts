import JsonToString from "@/lib/helper/json-to-string";
import ReceiptData from "@/lib/helper/receipt-data";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import pdfRender from "@/lib/pdf-render";

export async function POST(request: Request, { params }: { params: { type: string } }) {
    const validTypes = ['receipt', 'invoice', 'purchase-order'];
    const data = await request?.json()

    if (!validTypes.includes(params.type)) {
        return Response.json({ error: 'Invalid Request: params.type must be "receipt", "invoice", or "purchase-order"' }, { status: 400 });
    }

    const dataParse = ((typeof await data).toString() == 'object') ? JsonToString(data) : {}

    const pdfBuffer = await pdfRender(params.type, dataParse)
    const pdf = new Blob([pdfBuffer]);

    // PDF BLOB
    // return Response.json({ pdf: pdfBuffer });

    // PDF VIEWER
    // return new Response(pdfBuffer, {
    //     headers: {
    //         'Content-Type': 'application/pdf',
    //     }, status: 200
    // });

    // PDF DOWNLOAD
    return new Response(pdf, {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=ebook.pdf'
        }, status: 200
    });
}