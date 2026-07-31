import React from 'react';

const MasteryLegend = () => {
  const legendItems = [
    { range: '0-33%', color: 'bg-red-500', label: 'Weak', description: 'Needs significant practice' },
    { range: '34-66%', color: 'bg-yellow-500', label: 'Moderate', description: 'Requires improvement' },
    { range: '67-100%', color: 'bg-emerald-500', label: 'Strong', description: 'Good understanding' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-4">
        Mastery Level Legend
      </h3>
      <div className="space-y-3">
        {legendItems?.map((item) => (
          <div key={item?.range} className="flex items-center gap-3">
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded ${item?.color} flex-shrink-0`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-caption font-medium text-foreground text-sm md:text-base">
                  {item?.label}
                </span>
                <span className="font-mono text-xs md:text-sm text-muted-foreground">
                  ({item?.range})
                </span>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                {item?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasteryLegend;