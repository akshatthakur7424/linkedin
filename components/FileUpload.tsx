"use client"

import { OurFileRouter } from "@/app/api/uploadthing/core"
import { UploadButton, UploadDropzone } from "@/lib/uploadthings"


interface FileUploadProps {
    endpoint: string
    onSubmit: ({ url, name }: { url: string, name: string }) => void
}

const FileUpload = (
    { endpoint, onSubmit }: FileUploadProps
) => {
    return (
        <>
            <div className="w-full h-auto flex items-center justify-center" >
                <UploadButton<OurFileRouter, "imageUploader">
                    className="text-black bg-blue-500 rounded-md w-32 h-17 py-4"
                    endpoint={endpoint}
                    onClientUploadComplete={(res: any) => {
                        console.log("Files: ", res);
                        if (res && res.length > 0) {
                            onSubmit({ url: res[0].url, name: res[0].name })
                        }
                    }}
                    onUploadError={(error: Error) => {
                        alert(`ERROR! ${error.message}`);
                    }}
                />
            </div>
            {/* <UploadDropzone<OurFileRouter, "imageUploader">
                endpoint={endpoint}
                onClientUploadComplete={(res: any) => {
                    console.log("Files: ", res);
                    if (res && res.length > 0) {
                        onSubmit({ url: res[0].url, name: res[0].name })
                    }
                }}
                onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                }}
            /> */}
        </>
    )
}

export default FileUpload
