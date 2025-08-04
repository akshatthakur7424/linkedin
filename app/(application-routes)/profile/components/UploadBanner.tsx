"use client"

// next imports 
import { useState } from "react"
import { useRouter } from "next/navigation";

// lucid react icons
import { Pencil, PlusCircle, Image } from "lucide-react"

// third party packages imports
import axios from "axios";
import toast from "react-hot-toast"

// custom imports
import FileUpload from "@/components/FileUpload";

export default function UploadBanner(
    { imageUrl }: { imageUrl: string | null }
) {
    const assetUrl = imageUrl;
    const [isEditing, setIsEditing] = useState(false);
    const [image, setImage] = useState(assetUrl);

    const router = useRouter();

    const handleToggle = () => {
        setIsEditing((current) => !current);
    }

    const onSubmit = async ({ url, name }: { url: string, name: string }) => {
        toast.success("Updating Image, please wait!");
        try {
            const data = { banner: url };
            const response = await axios.put(`/api/user/update`, data);
            console.log("Image Updated: ", response.data, "Image Name: ", name);
            setImage(url);
            handleToggle();
            window.location.reload();
        } catch (error) {
            console.log("Cannot update the title. Error: ", error);
            toast.error("Something went wrong");
        }
    }

    return (
        <>
            <div className="w-full h-auto flex flex-col item-center justify-between p-4 rounded-md bg-slate-100 " >

                <div className="flex items-center justify-between px-2" >
                    {/* Heading */}
                    <div>
                        <p className="font-medium" >Banner Image</p>
                    </div>

                    {/* Image upadate control */}
                    <div className="flex items-center gap-2 cursor-pointer " onClick={handleToggle} >

                        {
                            imageUrl ? (
                                <div className="flex items-center gap-2" >
                                    <Pencil className={`${isEditing ? "hidden" : "block h-4 w-4 "}`} />
                                    <p className="text-sm" >{isEditing ? "Cancel" : "Edit image"}</p>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2" >
                                    <PlusCircle className={`${isEditing ? "hidden" : "block h-4 w-4 "}`} />
                                    <p className="text-sm" >{isEditing ? "Cancel" : "Add Image"}</p>
                                </div>
                            )

                        }
                    </div>
                </div>


                {/* Uplaod Dropzone OR Image*/}
                <div className="w-full h-auto flex items-center justify-center " >
                    {
                        isEditing ? (
                            <div className="w-full p-2" >
                                <FileUpload endpoint="profileImage" onSubmit={onSubmit} />
                                <p className="mt-2" >16:9 image size recommended</p>
                            </div>
                        ) : (
                            <div className={isEditing ? "hidden" : "w-full h-full p-2 text-sm block"} >
                                <div className="w-full h-auto flex items-center justify-center bg-slate-200 rounded-sm" >
                                    {
                                        imageUrl ? (
                                            <img src={imageUrl} alt="course image" className="text-slate-600 object-cover" />
                                        ) : (
                                            <div className="w-full h-64 flex items-center justify-center" >
                                                <Image className="text-muted-foreground h-12 w-12" />
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>


            </div>
        </>
    )
}

