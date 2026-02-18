interface MobileScreenProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

export function MobileScreen({ children, backgroundColor = 'bg-white' }: MobileScreenProps) {
  return (
    <div className={`${backgroundColor} h-full min-h-[667px] flex flex-col p-6`}>
      {children}
    </div>
  );
}
