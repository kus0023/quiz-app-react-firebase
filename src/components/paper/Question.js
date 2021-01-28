import React from "react";

function Question({ data, n, onChange }) {
  return (
    <>
      <li className="collection-header">
        <h5
          dangerouslySetInnerHTML={{ __html: `${n + 1}. ${data.question}` }}
        ></h5>
      </li>

      <div onChange={({ target }) => onChange(target.value, n)}>
        {data.answers.map((ans, i) => {
          return (
            <li key={i} className="collection-item">
              <label>
                <input name={`group${n}`} type="radio" value={ans} />
                <span dangerouslySetInnerHTML={{ __html: ans }}></span>
              </label>
            </li>
          );
        })}
      </div>
    </>
  );
}

export default Question;
