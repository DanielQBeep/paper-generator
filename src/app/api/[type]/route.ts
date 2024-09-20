import JsonToString from "@/lib/helper/json-to-string";
import DataTranscode from "@/lib/helper/data-transcode";
import pdfRender from "@/lib/pdf-render";

export async function POST(request: Request, { params }: { params: { type: string } }) {
    try {
        const validTypes = ['receipt', 'invoice', 'invoice-ebook', 'purchase-order'];
        const data = await request?.json()

        if (!validTypes.includes(params.type)) {
            return Response.json({ error: 'Invalid Request: params.type must be "receipt", "invoice", "invoice-ebook" or "purchase-order"' }, { status: 400 });
        }

        console.log("data", "data")
        const dataJson = await DataTranscode(data)
        console.log("dataJson", "dataJson")
        const dataParse = ((typeof await dataJson).toString() == 'object') ? JsonToString(dataJson) : {}
        console.log("dataParse", "dataParse")
        const pdfBuffer = await pdfRender(params.type, dataParse)
        console.log("pdfBuffer", "pdfBuffer")
        const pdf = new Blob([pdfBuffer]);
        console.log("pdf", "pdf")

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
    } catch (error: any) {
        return new Response("Error processing data", { status: 500 })
    }
}