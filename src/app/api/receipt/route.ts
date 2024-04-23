import JsonToString from "@/lib/helper/json-to-string";
import ReceiptData from "@/lib/helper/receipt-data";
import puppeteer, { PDFOptions } from "puppeteer";

export async function POST(request: Request) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const originalUrl = new URL(request.url).origin;

    // const data = await request.json()
    const data = JsonToString(await request.json())
    // const data = ReceiptData(await request.json())

    const pdfOptions = {
        path: "test.pdf",
        format: 'A4',
    } as PDFOptions;

    await page.goto(`${originalUrl.replace("https://", "http://")}/receipt${data}`, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf(pdfOptions);
    await browser.close();

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