const DashboardCard = ({ label, value, tone = 'slate' }) => {
  const tones = {
    slate: 'border-slate-200 bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-white',
    teal: 'border-teal-200 bg-teal-50 text-teal-950 dark:border-teal-900 dark:bg-teal-950 dark:text-teal-100',
    coral: 'border-red-200 bg-red-50 text-red-950 dark:border-red-900 dark:bg-red-950 dark:text-red-100',
    amber: 'border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100'
  };

  return (
    <div className={`rounded-md border p-5 shadow-soft ${tones[tone]}`}>
      <p className="text-sm font-medium opacity-70">{label}</p>
      <p className="mt-3 text-3xl font-bold">{value}</p>
    </div>
  );
};

export default DashboardCard;
