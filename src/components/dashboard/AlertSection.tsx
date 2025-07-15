import React from 'react';
import { AlertCircle } from 'lucide-react';

interface Alert {
  id: number;
  message: string;
}

interface AlertSectionProps {
  alerts: Alert[];
}

const AlertSection: React.FC<AlertSectionProps> = ({ alerts }) => {
  if (alerts.length === 0) {
    return null;
  }

  return (
    <div
      className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md"
      role="alert"
    >
      <div className="flex">
        <div className="py-1">
          <AlertCircle className="h-5 w-5 text-yellow-500 mr-3" />
        </div>
        <div>
          <p className="font-bold">주의 알림</p>
          <ul className="list-disc list-inside">
            {alerts.map((alert) => (
              <li key={alert.id}>{alert.message}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AlertSection;
