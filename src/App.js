import "./styles.css";
import LeaderBoard from "./Leaderboard";

export default function App() {
  const inputMatches6 = [
    ["Billy", "Chris", "Kirk", "Sasha"],
    ["Aamer", "Billy", "Kirk", "Sasha"],
    ["Aamer", "Billy", "Javier", "Sasha"],
    ["Aamer", "Chris", "Javier", "Sasha"],
    ["Billy", "Javier", "Kirk", "Sasha"],
    ["Aamer", "Javier", "Kirk", "Sasha"],
    ["Aamer", "Chris", "Kirk", "Sasha"],
    ["Aamer", "Chris", "Javier", "Kirk"],
    ["Billy", "Chris", "Javier", "Sasha"],
    ["Aamer", "Billy", "Chris", "Kirk"],
    ["Aamer", "Billy", "Chris", "Sasha"],
    ["Billy", "Chris", "Javier", "Kirk"],
    ["Aamer", "Billy", "Chris", "Javier"],
    ["Chris", "Javier", "Kirk", "Sasha"],
    ["Aamer", "Billy", "Javier", "Kirk"]
  ];
  const inputMatches7 = [
    ["Billy", "Chris", "Sasha", "Coleman"],
    ["Aamer", "Chris", "Javier", "Kirk"],
    ["Aamer", "Billy", "Kirk", "Sasha"],
    ["Aamer", "Billy", "Javier", "Sasha"],
    ["Billy", "Chris", "Javier", "Coleman"],
    ["Billy", "Chris", "Javier", "Kirk"],
    ["Chris", "Kirk", "Sasha", "Coleman"],
    ["Aamer", "Billy", "Javier", "Coleman"],
    ["Aamer", "Chris", "Sasha", "Coleman"],
    ["Aamer", "Chris", "Javier", "Sasha"],
    ["Javier", "Kirk", "Sasha", "Coleman"],
    ["Aamer", "Chris", "Kirk", "Coleman"],
    ["Aamer", "Billy", "Javier", "Kirk"],
    ["Billy", "Kirk", "Sasha", "Coleman"]
  ];
  const inputMatches = inputMatches7;
  const players = [
    ...new Set(inputMatches.reduce((acc, cur) => [...acc, ...cur]))
  ].toSorted();
  const rndDisplayOrder = (matches) => {
    matches.forEach(
      (l, i) => (matches[i] = l.toSorted(() => 0.5 - Math.random()))
    );
  };
  rndDisplayOrder(inputMatches);

  return (
    <div className="App">
      <LeaderBoard players={players} matches={inputMatches} />
    </div>
  );
}
