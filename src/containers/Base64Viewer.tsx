"use client";
import {
  useToast,
  Textarea,
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { SyntheticEvent, useState } from "react";
import Image from "next/image";

const Base64Viewer = () => {
  const [base64, setBase64] = useState<string | null>(null);
  const [imgLoading, setImgLoading] = useState(false);
  const { toast } = useToast();
  const [base64Download, setBase64Download] = useState<string>();
  const [error, setError] = useState(false);

  const handleBase64 = (e: any) => {
    setError(false);
    try {
      if (!e.target.value) {
        setBase64(null);
        return;
      }

      if (!e.target.value.startsWith("data:image")) {
        throw new Error("Invalid Base64");
      }

      setBase64(e.target.value);

      const fileFormat = e.target.value.split(";")[0].split("/")[1];
      fetchBase64(fileFormat);
    } catch (error: any) {
      console.log(error);
      setBase64(null);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
        duration: 3000,
      });
    }
  };

  const handleBase64Error = (e: SyntheticEvent) => {
    console.log(e);

    setBase64(null);
    setError(true);
  };

  async function fetchBase64(fileFormat: string) {
    try {
      if (!base64) return;
      if (error) return;
      const res = await fetch(base64);
      const blob = await res.blob();
      const file = new File([blob], "File name", {
        type: "image/" + fileFormat,
      });
      setBase64Download(URL.createObjectURL(file));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card className="m-8 *:my-4 ">
      <CardHeader>
        <CardTitle>Base64 Viewer</CardTitle>
        <CardDescription>Only images supported</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center ">
        <Textarea
          onChange={handleBase64}
          name="base64"
          className="w-full"
          placeholder="Enter Base64"
        />

        {base64 && (
          <>
            {imgLoading ? (
              <p>Loading...</p>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href={base64Download} download={true}>
                      <Image
                        src={base64}
                        width={500}
                        height={500}
                        alt="Base64 Image"
                        className="my-4"
                        onError={handleBase64Error}
                        onLoadStart={() => setImgLoading(true)}
                        onLoad={() => setImgLoading(false)}
                      />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent sticky="always" side="right">
                    <p>Click to download</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Base64Viewer;
