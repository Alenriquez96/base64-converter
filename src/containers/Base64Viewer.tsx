"use client";
import { Input, Label, useToast, Textarea } from "@/components/ui";
import { SyntheticEvent, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Base64Viewer = () => {
  const [base64, setBase64] = useState<string | null>(null);
  const [imgLoading, setImgLoading] = useState(false);
  const { toast } = useToast();

  const handleBase64 = (e: any) => {
    try {
      if (!e.target.value) {
        setBase64(null);
        return;
      }

      if (!e.target.value.startsWith("data:image")) {
        throw new Error("Invalid Base64");
      }

      setBase64(e.target.value);
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
    setBase64(null);
  };

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
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Base64Viewer;
