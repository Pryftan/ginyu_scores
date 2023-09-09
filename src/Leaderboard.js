import React, { useState, useEffect, useRef } from "react";

const Leaderboard = ({ players, matches }) => {
  const [scores, setScores] = useState(
    [Object.fromEntries(players.map((d) => [d, 0]))]
  );
  const [currentMatch, setCurrentMatch] = useState(0);
  const formRef = useRef(null);

  const readScore = (v) => (
    parseInt(v === "" ? 0 : v, 10)
  )

  const updateStatus = (e) => {
    e.preventDefault();
    setScores((prevScores) => (prevScores.concat([{
      ...prevScores.slice(-1)[0],
      ...Object.fromEntries(
        matches[currentMatch].map((p, i) => [
          p,
          prevScores.slice(-1)[0][p] + readScore(e.target[i].value)
        ])
      )
    }])));
    setCurrentMatch((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    if (currentMatch < matches.length) {
      formRef.current.reset();
    }
    console.log(scores);
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
                    onKeyUp={(e)=>{if (e.key === 'Enter') { setScores((prevScores)=>(prevScores.concat([{...prevScores.slice(-1)[0], [p]: readScore(e.target.value)}])));} }}
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
        <form ref={formRef} onSubmit={(e) => updateStatus(e)} style={{margin: 'auto'}}>
          {matches[currentMatch].map((p, i) => (
            <div key={`match_${i}`}>
              <label>{p}: <input type='number' min={0} max={3}/></label>
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
};

export default Leaderboard;
