import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function LoginButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>登录</Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>登录</DialogTitle>
        </DialogHeader>
        <div>div</div>
      </DialogContent>
    </Dialog>
  );
}
