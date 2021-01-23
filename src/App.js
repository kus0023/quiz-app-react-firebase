import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import QuizResultDetails from "./components/quiz-result/QuizResultDetails";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import CreateQuiz from "./components/paper/CreateQuiz";
import Paper from "./components/paper/Paper";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/" component={Dashboard} exact></Route>
          <Route path="/paper/:id" component={QuizResultDetails}></Route>
          <Route path="/signin" component={SignIn}></Route>
          <Route path="/signup" component={SignUp}></Route>
          <Route path="/create" component={CreateQuiz}></Route>
          <Route path="/paper" component={Paper}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
