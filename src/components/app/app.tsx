import MainScreen from '../pages/main-screen/main-screen';

type AppScreenProps = {
  cardsNumber: number;
};

function App({cardsNumber}: AppScreenProps) {
  return (
    <MainScreen cardsNumber = {cardsNumber}/>
  );
}

export default App;
