const initState = {
  quizes: [
    {
      id: 1,
      category: "General Knowledge",
      type: "multiple",
      amount: 10,
      difficulty: "hard",
      score: {
        max: 20,
        obtain: 10,
      },
    },
    {
      id: 2,
      category: "History",
      type: "multiple",
      amount: 10,
      difficulty: "easy",
      score: 16,
      maxscore: 20,
    },
    {
      id: 3,
      category: "Art",
      type: "multiple",
      amount: 20,
      difficulty: "hard",
      score: 36,
      maxscore: 40,
    },
    {
      id: 4,
      category: "General Knowledge",
      type: "multiple",
      amount: 10,
      difficulty: "hard",
      score: 18,
      maxscore: 20,
    },
  ],
};

const quizResultReducer = (state = initState, action) => {
  return state;
};

export default quizResultReducer;
