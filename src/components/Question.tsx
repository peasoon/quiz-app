import * as React from "react";
import { useWhyDidYouUpdate } from 'ahooks';

interface IQuestionProps {
  question: Record<string, any>;
	position: number;
	dispatch: any;
	state: any
}

const getShuffledArr = (arr: any[]) => {
  const newArr = arr.slice();
  for (let i = newArr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr;
};

const Question: React.FunctionComponent<IQuestionProps> = ({ question, position, state, dispatch }) => {
	useWhyDidYouUpdate('whyQuestionRerender',{ question, position,  dispatch })
  const answers = [question.correctAnswer, ...question.incorrectAnswers];
  const shuffledAnswers = React.useMemo(()=>{
		return getShuffledArr(answers)
	},[question])
	const isCorrect = React.useRef<boolean>()

  return (
    <div className="question">
      <div className="question-title">{question.question}</div>
      <div className="question-variants">
        {shuffledAnswers.map((answer: string, i:number) => {
          return (
          <label key={answer}>
						<input type="radio" name='question'/>
						<span onClick={()=>{
							if (answer === question.correctAnswer) {
								isCorrect.current = true
							} else {
								isCorrect.current = false
							}
							console.log(isCorrect.current)
							dispatch({type: 'ADD', payload:{pos: position, correct:isCorrect.current, id: question.id}})
							//console.log('state--->', state)
						}}>{answer}</span>
					</label>
					)
        })}
      </div>
    </div>
  );
};

export default React.memo(Question);
