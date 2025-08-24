import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface TipBoxProps {
  children: ReactNode;
}

export const TipBox = ({ children }: TipBoxProps) => {
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <span className="text-2xl">💡</span>
          <p className="text-sm text-blue-800 font-medium">
            {children}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};