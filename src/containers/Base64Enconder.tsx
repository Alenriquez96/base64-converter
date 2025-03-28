"use client";
import { Input, Label, Button, useToast } from "@/components/ui";
import { useEffect, useState } from "react";
import { IconClipboard } from "@tabler/icons-react";
import FullBase64Dialog from "@/containers/FullBase64Dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Base64EnconderProps {
  setChartData: (data: { item: string; size: number }[]) => void;
}

const Base64Enconder = ({ setChartData }: Base64EnconderProps) => {
  const [base64, setBase64] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [fileSize, setFileSize] = useState<number>(0);
  const [convertedFileSize, setConvertedFileSize] = useState<number>();
  const { toast } = useToast();

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e.target.files;

      if (files) {
        setFileSize(files[0].size);
        base64Converter(files[0]);
      }
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
        duration: 3000,
      });
    }
  };

  const base64Converter = (img: File | Blob) => {
    if (img) {
      new Promise<void>((resolve, reject) => {
        setLoading(true);
        let reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = function () {
          setBase64(reader.result);
          resolve();
          setLoading(false);
        };
        reader.onerror = function (error) {
          console.log("Error: ", error);
          reject();
          setLoading(false);
        };
      });
    }
  };

  useEffect(() => {
    if (!base64) return;

    let base64str = base64.split(",")[1];
    setConvertedFileSize(base64str.length);
  }, [base64]);

  useEffect(() => {
    if (!fileSize || !convertedFileSize) return;

    const chartData = [
      {
        item: "Original",
        size: fileSize,
      },
      {
        item: "Converted",
        size: convertedFileSize,
      },
    ];

    setChartData(chartData);
  }, [fileSize, convertedFileSize]);

  const onCopyToCliboard = () => {
    navigator.clipboard.writeText(base64);
    toast({
      variant: "default",
      title: "Success",
      description: "Copied to clipboard",
      duration: 3000,
    });
  };

  return (
    <Card className="m-8 *:my-4 max-w-[90rem]">
      <CardHeader>
        <CardTitle>Upload File to convert to Base64</CardTitle>
      </CardHeader>
      <CardContent>
        <Input type="file" className="cursor-pointer" onChange={handleImage} />
        {!loading ? (
          <>
            {base64 && (
              <div className="flex flex-col ">
                <div className="*:mr-4 my-4 flex flex-wrap">
                  <Button onClick={onCopyToCliboard} className="*:mx-2">
                    Copy to Clipboard
                    <IconClipboard size={20} />
                  </Button>
                  <FullBase64Dialog base64={base64} />
                </div>
                <p className="text-gray-500 text-[10px] break-words whitespace-nowrap truncate overflow-hidden text-ellipsis ">
                  {base64}
                </p>
              </div>
            )}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </CardContent>
    </Card>
  );
};

export default Base64Enconder;
