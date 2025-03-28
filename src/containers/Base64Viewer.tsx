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
import { SyntheticEvent, useEffect, useState } from "react";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

const Base64Viewer = () => {
  const [base64, setBase64] = useState<string | null>(null);
  const [imgLoading, setImgLoading] = useState(false);
  const { toast } = useToast();
  const [base64Download, setBase64Download] = useState<string>();
  const [error, setError] = useState(false);

  const handleBase64 = (e: any) => {
    try {
      setError(false);
      if (!e.target.value.trim()) {
        setBase64(null);
        return;
      }

      if (!e.target.value.trim().startsWith("data:image")) {
        throw new Error("Invalid Base64");
      }

      setBase64(e.target.value);
    } catch (error: any) {
      console.error(error);
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

  useEffect(() => {
    if (!base64) return;
    const fileFormat = base64.split(";")[0].split("/")[1];
    fetchBase64(fileFormat);
  }, [base64]);

  return (
    <Card className="my-8 *:my-4 ">
      <CardHeader>
        <CardTitle>Base64 Viewer</CardTitle>
        <CardDescription>Only images supported</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center ">
        <Textarea
          onBlur={handleBase64}
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
                  <CardContainer>
                    <CardBody>
                      <CardItem translateZ={50} as="div">
                        <a href={base64Download} download={true}>
                          <TooltipTrigger asChild>
                            <Image
                              src={base64}
                              width={500}
                              height={500}
                              alt="Base64 Image"
                              className="my-4 object-cover block"
                              onError={handleBase64Error}
                              onLoadStart={() => setImgLoading(true)}
                              onLoad={() => setImgLoading(false)}
                            />
                          </TooltipTrigger>
                        </a>
                      </CardItem>
                    </CardBody>
                  </CardContainer>
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
