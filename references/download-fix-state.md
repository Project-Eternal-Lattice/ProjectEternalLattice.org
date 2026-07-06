# Download Fix State — July 6, 2026

## Problem
Download endpoint in `server/_core/index.ts` (line 362-413) serves v17.1 files from S3.
All four format URLs and filenames reference v17.1.

## New S3 URL for v17.4 txt
- CDN URL: https://files.manuscdn.com/user_upload_by_module/session_file/310519663251741040/XRyPqvMrrNrsaAWm.txt
- Webdev private path: /manus-storage/toe-full_b3df41c9.txt

## Current endpoint structure (line 362-413 of server/_core/index.ts)
```
formats = {
  pdf: { url: 'https://files.manuscdn.com/.../kpBAUujgozCVIClz.pdf', filename: '...v17.1.pdf' },
  epub: { url: 'https://files.manuscdn.com/.../AoSxbMXHQMQtjbch.epub', filename: '...v17.1.epub' },
  docx: { url: 'https://files.manuscdn.com/.../EGDCXdcuCbarYNWL.docx', filename: '...v17.1.docx' },
  html: { url: 'https://files.manuscdn.com/.../VYPXYirmZBMpDiXa.html', filename: '...v17.1.html' }
}
```

## Fix needed
1. Update HTML url to new S3 txt URL (content type text/plain or text/html)
2. Update ALL filenames from v17.1 to v17.4
3. For PDF — need to generate from toe-full.txt and upload
4. EPUB and DOCX can stay at old URLs temporarily (or remove those options)

## Eidan's final message
v17.4 CLOSED. All three audit flags resolved as report shorthand. Chapter 0.14 stands.
Next lap when Ken calls it.
