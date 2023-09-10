import React, { useState, useEffect, useRef } from "react";

const Leaderboard = ({ players, matches, characters, preferences={} }) => {
  const [scores, setScores] = useState(
    [Object.fromEntries(players.map((d) => [d, 0]))]
  );
  const [matchResults, setMatchResults] = useState([]);
  const [currentMatch, setCurrentMatch] = useState(0);
  const formRef = useRef(null);

  const parseScore = (v) => (
    parseInt(v === "" ? 0 : v, 10)
  )

  const submitMatch = (e) => {
    e.preventDefault();
    setScores((prevScores) => (prevScores.concat([{
      ...prevScores.slice(-1)[0],
      ...Object.fromEntries(
        matches[currentMatch].map((p, i) => [
          p,
          prevScores.slice(-1)[0][p] + parseScore(document.getElementById(`score_${i}`).value)
        ])
      )
    }])));
    setMatchResults((prevResults)=>prevResults.concat([
      Object.fromEntries(matches[currentMatch].map((p,i)=>[p,
        characters ? 
        {character: document.getElementById(`character_${i}`).value, score: parseScore(document.getElementById(`score_${i}`).value)} :
        {score: parseScore(document.getElementById(`score_${i}`).value)}
      ]))
    ]));
    setCurrentMatch((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    if (currentMatch < matches.length) {
      formRef.current.reset();
    }
    console.log(matchResults);
  });

  return (
    <>
      <h1>Ginyu Squad Leaderboard</h1>
      {currentMatch < matches.length && 
        <span className={"descriptive__header"}>
          Current Match:
        </span>
      }
      <h2>{currentMatch < matches.length ? matches[currentMatch].join(", ") : 'FINAL RESULTS'}</h2>
      <table className={'leader__table'}>
        <thead>
          <tr>
            <th></th>
            <th>Points</th>
            <th>Avg Score</th>
            <th>Matches Remaining</th>
          </tr>
        </thead>
        <tbody>
          {players
            .toSorted((a, b) => scores.slice(-1)[0][b] - scores.slice(-1)[0][a])
            .map((p) => (
              <tr key={`${p}_score`}>
                <td>{p}</td>
                <td>
                  <input 
                    placeholder={scores.slice(-1)[0][p]}
                    className={'editable__cell'}
                    onKeyUp={(e)=>{if (e.key === 'Enter') { setScores((prevScores)=>(prevScores.concat([{...prevScores.slice(-1)[0], [p]: parseScore(e.target.value)}])));} }}
                    onChange={(e)=>e.target.value.length > 2 ? e.target.value = e.target.value.slice(1) : null}
                    onBlur={(e)=>e.target.value = ''}
                  />
                </td>
                <td>
                  {(
                    scores.slice(-1)[0][p] /
                    Math.max(
                      matches.filter((d, i) => i < currentMatch && d.includes(p))
                        .length,
                      1
                    )
                  ).toFixed(2)}
                </td>
                <td>
                  {
                    matches.filter((d, i) => i >= currentMatch && d.includes(p))
                      .length
                  }
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      {currentMatch < matches.length && (
        <form ref={formRef} onSubmit={(e) => submitMatch(e)} style={{margin: 'auto'}}>
          <table>
            <thead>
              <tr>
                <th style={{width: '35%'}}></th>
                <th style={{width: '15%', paddingLeft: '10px'}}>Sc</th>
                {characters && <th style={{width: '50%', paddingLeft: '30px'}}>Character</th>}
              </tr>
            </thead>
            <tbody>
              {matches[currentMatch].map((p, i) => (
                <tr key={`${p}_inputs`}>
                  <td>{p}</td>
                  <td><input id={`score_${i}`} type='number' tabIndex={i+1} min={0} max={3} /></td>
                  {characters && 
                    <td><input id={`character_${i}`} list={`characters_${i}`} tabIndex={i+5} style={{width: '100%'}}/>
                    <datalist id={`characters_${i}`}>
                      {preferences[p]?.concat(characters.filter((c)=>!preferences[p].includes(c))).map((c)=>(
                        <option key={`${c}_${i}`} value={c}/>
                      ))}
                    </datalist>
                    </td>
                  }
                </tr>
              ))}
            </tbody>
          </table>
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
};

export default Leaderboard;
