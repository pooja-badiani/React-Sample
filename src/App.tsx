import React, { useState } from 'react';

const API_URL = 'https://media.carecontrolsystems.co.uk/Travel/JourneyPlan.aspx?Route=';
// https://media.carecontrolsystems.co.uk/Travel/JourneyPlan.aspx?Route=PL19%209AG,EX4%209BJ

const App: React.FC = () => {
  const [codeInput1, setCodeInput1] = useState('');
  const [codeInput2, setCodeInput2] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleButtonClick = async () => {
    if (!codeInput1 || !codeInput2) {
      setError('Please enter both the postcodes.');
      setResponse('');
      return;
    }
    setError('');

    try {
      const response = await fetch(API_URL + codeInput1 + "," + codeInput2);
      const data = await response.text();
      if(data === ""){
        setResponse('Something went bad, please try with another postal code.')
        return
      }
      // console.log(data.split(","));
      const sepreatedDtat = data.split(",")
      const time = sepreatedDtat[0]
      const miles = sepreatedDtat[1]
      setResponse(`${time} minustes of travel time, ${miles} miles of trave.`);
    } catch (error) {
      console.error(error);
      setResponse('Error fetching data.');
    }
  };

  return (
    <div className="app">
      <PostcodeInput
        codeInput1={codeInput1}
        codeInput2={codeInput2}
        setCodeInput1={setCodeInput1}
        setCodeInput2={setCodeInput2}
        handleButtonClick={handleButtonClick}
        error={error}
      />
      <div className="response-container">
        {response && <p>{response}</p>}
      </div>
    </div>
  );
};

const PostcodeInput: React.FC<{
  codeInput1: string;
  setCodeInput1: React.Dispatch<React.SetStateAction<string>>;
  codeInput2: string;
  setCodeInput2: React.Dispatch<React.SetStateAction<string>>;
  handleButtonClick: () => void;
  error: string;
}> = ({ codeInput1, setCodeInput1, codeInput2, setCodeInput2, handleButtonClick, error }) => {
  return (
    <div className="input-container">
      <input
        type="text"
        placeholder="Enter Postcode 1"
        value={codeInput1}
        onChange={(e) => setCodeInput1(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Postcode 2"
        value={codeInput2}
        onChange={(e) => setCodeInput2(e.target.value)}
      />
      <button onClick={handleButtonClick}>Submit</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default App;
