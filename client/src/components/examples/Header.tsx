import Header from '../Header';

export default function HeaderExample() {
  return (
    <Header 
      isLoggedIn={true} 
      username="DrSmith" 
      onAskQuestion={() => console.log('Ask question clicked')}
    />
  );
}
