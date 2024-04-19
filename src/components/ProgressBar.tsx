import React from 'react';

interface ProgressBarProps {
  totalRepayment: string | number;
  completedRepayment: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ totalRepayment, completedRepayment }) => {
  const progress = +totalRepayment > 0 ? (completedRepayment / +totalRepayment) * 100 : 0;

  return (
    <div className="w-full bg-[#C3C3C4] rounded-full h-2">
      <div className="bg-[#110077] rounded-full h-full" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
