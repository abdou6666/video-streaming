import { NextResponse } from "next/server";
import { createReadStream, createWriteStream, fstatSync, openSync } from 'node:fs';
import path from 'node:path';

// export const config = {
//     runtime: "edge",
// };


export function GET(req: Request) {
    const range = req.headers.get('range')

    if (!range) {
        return NextResponse.json('Range is missing', { status: 400 })
    }

    const videoPath = path.join(__dirname, '..', '..', '..', '..', '..', 'public', 'video.mp4')

    const file_fd = openSync(videoPath, 'r');

    const videoSize = fstatSync(file_fd,).size;

    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));

    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;

    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength.toString(),
        "Content-Type": "video/mp4",
    } as { [key: string]: string };

    const videoStream = createReadStream(videoPath, {
        start,
        end
    })


    return new Response(videoStream as any, { status: 206, headers })
}

// export async function uploadVideoSteram(req: Request) {
// const bb = busboy({ headers: req.headers });

// bb.on("file", (_, file, info) => {
//     // auth-api.mp4
//     const fileName = info.filename;
//     const filePath = `./videos/${fileName}`;

// const stream = createWriteStream(filePath)

//     file.pipe(stream);
// });

// bb.on("close", () => {
//     res.writeHead(200, { Connection: "close" });
//     res.end(`That's the end`);
// });

// req.pipe(bb);
// return;
// }


// export { getVideoStream as GET };
// export { getVideoStream as GET, uploadVideoSteram as POST };

// import { Readable } from 'node:stream';
// export default async function GET(req: Request, res: Response) {
//     const url = await req.json();
//     fetch(url).then(r => {
//         Readable.fromWeb(r.body).pipe(res);
//     })
// }
