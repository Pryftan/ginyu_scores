import "./styles.css";
import LeaderBoard from "./Leaderboard";

export default function App() {
  const characterList = ['Banjo & Kazooie', 'Bayonetta', 'Bowser', 'Bowser Jr.', 'Byleth', 'Captain Falcon', 'Chrom', 'Cloud', 'Corrin', 'Daisy', 'Dark Pit', 'Dark Samus', 'Diddy Kong', 'Donkey Kong', 'Dr. Mario', 'Duck Hunt', 'Falco', 'Fox', 'Ganondorf', 'Greninja', 'Hero', 'Ice Climbers', 'Ike', 'Incineroar', 'Inkling', 'Isabelle', 'Jigglypuff', 'Joker', 'Kazuya', 'Ken', 'King Dedede', 'King K. Rool', 'Kirby', 'Link', 'Little Mac', 'Lucario', 'Lucas', 'Lucina', 'Luigi', 'Mario', 'Marth', 'Mega Man', 'Meta Knight', 'Mewtwo', 'Mii Brawler', 'Mii Gunner', 'Mii Swordfighter', 'Min Min', 'Mr. Game & Watch', 'Ness', 'Olimar', 'Pac-Man', 'Palutena', 'Peach', 'Pichu', 'Pikachu', 'Piranha Plant', 'Pit', 'Pokemon Trainer', 'Pyra & Mythra', 'Richter', 'Ridley', 'R.O.B.', 'Robin', 'Rosalina & Luma', 'Roy', 'Ryu', 'Samus', 'Sephiroth', 'Sheik', 'Shulk', 'Simon', 'Snake', 'Sonic', 'Sora', 'Steve', 'Terry', 'Toon Link', 'Villager', 'Wario', 'Wii Fit Trainer', 'Wolf', 'Yoshi', 'Young Link', 'Zelda', 'Zero Suit Samus']
  const characterPrefs = {'Aamer': ['Donkey Kong', 'Little Mac', 'Luigi', 'Sonic', 'Yoshi'], 'Billy': ['Marth', 'Min Min', 'Piranha Plant', 'Pyra & Mythra', 'R.O.B.', 'Robin', 'Steve', 'Zelda'], 'Chris': ['Captain Falcon', 'Dark Samus', 'Ganondorf', 'Isabelle', 'Lucas', 'Samus'], 'Coleman': ['Sephiroth'], 'Javier': ['Palutena', 'Zelda'], 'Kirk': ['King K. Rool'], 'Sasha': []}
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
      <LeaderBoard 
        players={players} 
        matches={inputMatches} 
        characters={characterList} 
        preferences={Object.fromEntries(Object.entries(characterPrefs).filter(([k,v])=>players.includes(k)))}
      />
    </div>
  );
}
