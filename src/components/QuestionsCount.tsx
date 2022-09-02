import * as React from "react";
import Select, { InputActionMeta, SingleValue, ActionMeta } from "react-select";

interface IQuestionsCountProps {
  options: number[];
  setQuestionsCount: React.Dispatch<React.SetStateAction<number>>;
}

const QuestionsCount: React.FunctionComponent<IQuestionsCountProps> = ({
  options,
  setQuestionsCount,
}) => {
  const mappedOptions = options.map((item: number) => {
    return { value: item, label: String(item) };
  });
  return (
    <div className="questions-count">
      <div className="title">Questions count</div>
      <Select
        options={mappedOptions}
        onChange={(
          newValue: SingleValue<{ value: number; label: string }>,
          actionMeta: ActionMeta<{ value: number; label: string }>
        ) => {
					newValue && setQuestionsCount(newValue.value)
				}}
      />
    </div>
  );
};

export default QuestionsCount;
