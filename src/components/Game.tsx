import * as React from "react";
import ReactPaginate from "react-paginate";
import Question from "./Question";

interface IGameProps {
  questions?: any[];
}

const Game: React.FunctionComponent<IGameProps> = ({ questions }) => {
  const [questionsLength, setQuestionsLength] = React.useState<number>(0);
  const [displayedQuestion, setDisplayedQuestion] = React.useState<number>(0);
  const [showScore, setShowScore] = React.useState<boolean>(false);
  const onClickPage = (event: any) => {
    setDisplayedQuestion(event.selected);
    console.log(event.selected);
  };

  React.useEffect(() => {
    if (questions) {
      console.log(questions);
      setQuestionsLength(questions.length);
      setDisplayedQuestion(0);
    }
  }, [questions]);

  type QuestionsStateType = {
    answers: any[];
  };
  type QuestionsActionsType = {
    type: string;
    payload: {
      position: number;
      correct: boolean;
      id: string;
    };
  };

  const questionsState = {
    answers: [],
  };

  const reducer = (state: QuestionsStateType, action: QuestionsActionsType) => {
    switch (action.type) {
      case "ADD":
        const filteredAnswers = state.answers.filter(
          (answer) => answer.id !== action.payload.id
        );
        return { answers: [...filteredAnswers, action.payload] };
      default:
        return state;
    }
  };

  const [state, dispatch] = React.useReducer(reducer, questionsState);
  React.useEffect(() => {
    console.log("state--->", state);
  }, [state]);
  return (
    <div className="game">
      <div className="title">Answer the following questions</div>
      <div className="answered">
        {state.answers.length} from {questions?.length} (
        {state.answers.map((answer) => {
          return (
            <span key={answer.id}>
              {answer.pos + 1} {state.answers.length === 10 ? "" : " ,"}
            </span>
          );
        })}
        )
      </div>
      {questionsLength !== 0 && displayedQuestion !== -1 && questions && (
        <Question
          question={questions[displayedQuestion]}
          key={questions[displayedQuestion].id}
          position={displayedQuestion}
          dispatch={dispatch}
          state={state}
        />
      )}
      {showScore && (
        <div className="score">
          Your score is{" "}
          {state.answers.filter((answer) => answer.correct === true).length}{" "}
          from {state.answers.length}
        </div>
      )}
      <button disabled={state.answers.length !== 10} onClick={() => {
				setShowScore(true);
			}}>
        Finish
      </button>
      {questionsLength !== 0 && (
        <ReactPaginate
          pageCount={questionsLength}
          containerClassName="pages"
          previousLabel="<<"
          nextLabel=">>"
          pageRangeDisplayed={4}
          marginPagesDisplayed={4}
          onPageChange={onClickPage}
        />
      )}
    </div>
  );
};

export default Game;
