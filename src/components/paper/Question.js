import React from "react";

function Question({ data, n, onChange }) {
  return (
    <div className="container row col-12 left">
      <div>
        <h5
          dangerouslySetInnerHTML={{ __html: `${n + 1}. ${data.question}` }}
        ></h5>
      </div>

      <div onChange={({ target }) => onChange(target.value, n)}>
        {data.answers.map((ans, i) => {
          return (
            <p key={i}>
              <label>
                <input name={`group${n}`} type="radio" value={ans} />
                <span dangerouslySetInnerHTML={{ __html: ans }}></span>
              </label>
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default Question;
