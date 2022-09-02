import Title from "./components/Title";
import "./App.scss";
import { useQuery } from "react-query";
import axios from "axios";
import Categories from "./components/Caegories";
import QuestionsCount from "./components/QuestionsCount";
import * as React from "react";
import Game from "./components/Game";

function App() {
  const [gameCategories, setGameCategories] = React.useState<string[]>([]);
  const [questionsCount, setQuestionsCount] = React.useState<number>(0);
	const [questions, setQuestions] = React.useState([])
	const startButtonRef = React.useRef<any>(null)

  const fetchData = () => {
    return axios.get("https://the-trivia-api.com/api/categories");
  };
  const fetchQuestions = async(
    categories: string[],
    questionsCount: number
  ) => {
    const categoriesString = categories.join(",");
    const data = await(await axios.get(
      `https://the-trivia-api.com/api/questions?categories=${categoriesString}&limit=${questionsCount}`
    )).data;
		return data
  };

  const { isLoading, isError, data, error } = useQuery(
    "categories-query",
    fetchData,
    { staleTime: 1000 * 60 * 10 }
  );

  let isPlayable = false;

  React.useEffect(() => {
    if (gameCategories && questionsCount) {
      isPlayable = true;
    } else {
      isPlayable = false;
    }
  }, [gameCategories, questionsCount]);

  return (
    <div className="App">
      <div className="container">
        <Title title="Very smart quiz app" />
        <div className="content">
          {data && (
            <Categories
              data={Object.keys(data?.data)}
              setGameCategories={setGameCategories}
            />
          )}
          <Game questions={questions}/>
          <QuestionsCount
            options={[5, 10, 15]}
            setQuestionsCount={setQuestionsCount}
          />
          <div className="buttons">
            <button ref={startButtonRef}
              onClick={async() => {
                isPlayable
                  ? console.log("Game starts immidiately")
                  : console.log("set initial values");
								const data = await fetchQuestions(gameCategories, questionsCount)
								setQuestions(data)
								isPlayable &&(startButtonRef.current.disabled='true')
              }}
            >
              Start game
            </button>
						<button onClick={()=>{
							window.location.reload();
						}}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
