import * as React from "react";
import CheckboxItem from "./CheckboxItem";

interface ICategoriesProps {
  data: string[];
	setGameCategories: React.Dispatch<React.SetStateAction<string[]>>
}

const Categories: React.FunctionComponent<ICategoriesProps> = ({ data,setGameCategories }) => {
	const [categories, setCategories] = React.useState<string[]>([])
	React.useEffect(()=>{
		if(categories) {
			setGameCategories(categories)
		}
	},[categories])
  return (
    <div className="categories">
			<div className="title">Categories</div>
      {data?.map((item: string) => (
				<CheckboxItem title={item} updateCategories={setCategories} key={item} />
      ))}
    </div>
  );
};

export default Categories;
