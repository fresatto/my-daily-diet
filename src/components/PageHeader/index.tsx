import { Typography } from "../Typography";

interface PageHeaderProps {
  title: string;
  action?: React.ReactNode;
}

export function PageHeader({ title, action }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <Typography size="h2">{title}</Typography>
      {action}
    </div>
  );
}
