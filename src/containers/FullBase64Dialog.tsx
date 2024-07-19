import { Button, Textarea } from "@/components/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconArrowsMaximize } from "@tabler/icons-react";

const FullBase64Dialog = ({ base64 }: { base64: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="*:mx-2">
          Show full text
          <IconArrowsMaximize size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Base64</DialogTitle>
          <DialogDescription>Full Base64 of the file</DialogDescription>
        </DialogHeader>
        <div className="w-full h-full flex items-center justify-center">
          <Textarea
            className="w-full min-h-[600px]"
            value={base64}
            readOnly
          ></Textarea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FullBase64Dialog;
