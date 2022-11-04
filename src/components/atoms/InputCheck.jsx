export const InputCheck = ({ name, onChange }) => {
  const checked = 'checked:after:border-slate-900';

  const after =
    'after:h-4 after:w-2 after:absolute after:rotate-45 after:border-b-4 after:border-r-4 after:transition-all after:left-[6px]';

  return (
    <input
      type="checkbox"
      name={name}
      id={name}
      className={` relative m-1 h-6 w-6 cursor-pointer appearance-none overflow-hidden rounded-md border-2 border-slate-900 ${checked} ${after} `}
      onChange={onChange}
    />
  );
};
