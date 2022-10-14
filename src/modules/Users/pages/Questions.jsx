import SingleQuestion from "./SIngleQuestion";

const Questions = () => {
  return (
    <div className="wrapper bg-image">
      <div className="row nav-bar">
        <div className="col-xs-1 col-xs-offset-4">
          <div className="totalt">40MINS</div>
        </div>
        <div className="col-xs-1">
          <div className="totalq">40</div>
        </div>
        <div className="col-xs-4"></div>
        <div className="col-xs-1 volume">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="check1"
              name="option1"
              value="something"
              checked
            />
            <label className="form-check-label" for="check1"></label>
          </div>
        </div>
        <div className="col-xs-1 exit">
          <button></button>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="timer">28:00</div>
          <SingleQuestion/>
        </div>
      </div>
    </div>
  );
};

export default Questions;
