import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, TrendingUp, Utensils } from "lucide-react";

export default function Dashboard() {
  const mockedMeals = [
    {
      name: "Ovo",
      time: "10:23",
      protein: 100,
    },
    {
      name: "Patinho",
      time: "12:30",
      protein: 100,
    },
    {
      name: "Salada",
      time: "14:40",
      protein: 100,
    },
  ];

  const mockedWeekProgress = [
    {
      day: "Dom",
      progress: 50,
    },
    {
      day: "Seg",
      progress: 20,
    },
    {
      day: "Ter",
      progress: 0,
    },
    {
      day: "Qua",
      progress: 33,
    },
    {
      day: "Qui",
      progress: 44,
    },
    {
      day: "Sex",
      progress: 90,
    },
    {
      day: "Sáb",
      progress: 80,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Calendar size={16} />
        <h1 className="text-sm">Sábado, 2 de agosto de 2025.</h1>
      </div>
      <div className="flex flex-col gap-4 p-6 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-bold">Proteínas consumidas</h3>
          <Utensils className="text-green-400" />
        </div>
        <div className="flex flex-col">
          <strong>45g</strong>
          <small>de 170g meta diária</small>
        </div>
        <div className="flex flex-col gap-2">
          <Progress value={45} />
          <small className="text-sm text-gray-500">
            38% do objetivo diário
          </small>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center gap-2">
          <Utensils size={16} className="text-green-400" />
          <h3 className="text-sm font-bold">Refeições de hoje</h3>
        </div>

        {mockedMeals.map((meal) => (
          <div
            key={meal.name}
            className="flex py-3 px-4 justify-between items-center rounded-lg bg-gray-100"
          >
            <div className="flex flex-col">
              <h3 className="text-sm font-bold">{meal.name}</h3>
              <small>às {meal.time}</small>
            </div>
            <div className="flex flex-col items-end text-xs">
              <p className="font-bold">{meal.protein}g</p>
              <p>proteína</p>
            </div>
          </div>
        ))}

        <Button>Nova refeição</Button>
      </div>
      <div className="flex flex-col gap-4 p-6 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center gap-2">
          <TrendingUp size={16} className="text-green-400" />
          <h3 className="text-sm font-bold">Progresso da semana</h3>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {mockedWeekProgress.map((item) => (
            <div key={item.day} className="flex flex-col items-center gap-1">
              <span className="text-[10px] text-gray-500">{item.day}</span>
              <div className="bg-gray-200 rounded-lg h-20 w-full relative p-[3px]">
                <div
                  className="bg-green-400 rounded-lg absolute bottom-[3px] left-[3px] right-[3px]"
                  style={{ height: `${item.progress}%` }}
                />
              </div>
              <span className="text-[10px] text-gray-500">
                {item.progress}g
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
