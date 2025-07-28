import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/Typography";

export default function Home() {
  return (
    <div className=" flex flex-col p-4 gap-2  justify-center w-full h-screen">
      <Typography size="h1">
        Antes de começar, vamos definir o seu objetivo diário
      </Typography>

      <Input type="number" placeholder="Insira seu objetivo diário" />
      <Button>Salvar</Button>
    </div>
  );
}
