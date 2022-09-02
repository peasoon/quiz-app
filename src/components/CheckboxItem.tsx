import * as React from "react";

interface ICheckboxItemProps {
  title: string;
	updateCategories: React.Dispatch<React.SetStateAction<string[]>>
}

const CheckboxItem: React.FunctionComponent<ICheckboxItemProps> = ({
  title,updateCategories
}) => {
  const [checked, setChecked] = React.useState(false);
	React.useEffect(()=>{
		if(checked) {
			const proccessedTitle = title.replaceAll("&", "and").replaceAll(" ", "_").toLowerCase()
			updateCategories((prev:string[])=>[...prev, proccessedTitle])
		}
	},[checked])
  return (
    <label>
      <input
        type="checkbox" checked={checked}
        onChange={() => {
          setChecked(prev => !prev);
        }}
      />
      <span>
        {title}
      </span>
    </label>
  );
};

export default CheckboxItem;
