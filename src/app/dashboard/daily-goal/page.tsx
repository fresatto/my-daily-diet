import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DailyGoal() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-center text-2xl font-bold">128g / 170g</h3>
      <p className="text-center text-sm">
        Você consumiu <strong>128g</strong> de proteínas hoje, você está à{" "}
        <strong>20g</strong> do seu objetivo.
      </p>
      <Button className="self-center" asChild>
        <Link href="/">Alterar objetivo</Link>
      </Button>
    </div>
  );
}
