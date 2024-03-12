interface HeaderProps {
  title: string;
  subtitle?: string;
}
export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <>
      <h2 className="text-balance text-3xl font-bold">{title}</h2>
      {subtitle && (
        <p className="text-pretty pt-4 text-foreground/70">{subtitle}</p>
      )}
    </>
  );
}
