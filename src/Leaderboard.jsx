import React, { useState, useEffect, useRef } from "react";

const Leaderboard = ({ players, matches }) => {
  const [scores, setScores] = useState(
    Object.fromEntries(players.map((d) => [d, 0]))
  );
  const [currentMatch, setCurrentMatch] = useState(0);
  const formRef = useRef(null);

  const updateStatus = (e) => {
    e.preventDefault();
    setScores((prevScores) => ({
      ...prevScores,
      ...Object.fromEntries(
        matches[currentMatch].map((p, i) => [
          p,
          prevScores[p] +
            parseInt(e.target[i].value === "" ? 0 : e.target[i].value, 10)
        ])
      )
    }));
    setCurrentMatch((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    if (currentMatch < matches.length) {
      formRef.current.reset();
    }
  });

  return (
    <>
      <h1>Ginyu Squad Leaderboard</h1>
      <span style={{ display: "block", marginBottom: "-1rm" }}>
        Current Match:
      </span>
      <h2>{matches[currentMatch].join(", ")}</h2>
      <table
        style={{
          tableLayout: "fixed",
          width: "80%",
          textAlign: "center",
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        <tr>
          <th></th>
          <th>Points</th>
          <th>Avg Score</th>
          <th>Matches Remaining</th>
        </tr>
        {players
          .toSorted((a, b) => scores[b] - scores[a])
          .map((p) => (
            <tr key={`${p}_score`}>
              <td>{p}</td>
              <td>{scores[p]}</td>
              <td>
                {(
                  scores[p] /
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
          ))}
      </table>
      {currentMatch < matches.length && (
        <form ref={formRef} onSubmit={(e) => updateStatus(e)}>
          {matches[currentMatch].map((p, i) => (
            <div key={`match_${i}`}>
              <label>{p}: </label>
              <input />
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
};

export default Leaderboard;
