type TProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Readonly<TProps>) {
  return (
    <div>
      <div className="h-16 w-full p-2 shadow-lg">
        <p>Top</p>
      </div>
      <div className="m-4 flex gap-4">
        <div className="h-[calc(100vh-8rem)] min-w-[300px] rounded-lg p-4 shadow-md">
          layout
        </div>
        <div className="w-full p-4 pt-2">{children}</div>
      </div>
    </div>
  );
}
