import { Component } from "react";

class Restorent extends Component {
    constructor(props) {
        super(props);
      this.zero=0;
      this.one=0;
      this.two=0;
      this.three=0;
      this.four=0;
      this.six=0;
      this.total=0;

      

        this.state = {
            zero: 0,
            one: 0,
            two: 0,
            three: 0,
            four: 0,
            six: 0,
            over:0,
            total:0

        }

    }
    Addrun = (run) =>{
       this.setState((prevState) =>({
        this:prevState.total + run,
        [this.getRunkey(run)]: prevState[this.getRunkey(run)] + 1
       })); 
    };
    getRunkey =  (run) =>{
        switch(run){
            case 0 : return "zero";
            case 1 : return "one";
            case 2 : return "Two";
            case 3 : return "Three";
            case 4 : return "Four";
            case 6 : return "six";
            default : return"";
        }
    }
    render() {
        return (<>
            <div className="container py-3 my-3" align="center">
                <div className="row">
                    <div className="col-12 h2">Cricket Score</div>
                    <div className="col-2 ">
                        <button className="btn">-</button>
                        <span>0</span>
                        <button onClick={this.Addrun(0)}  className="btn">+</button>
                    </div>
                    <div className="col-2">
                        <button className="btn" onClick={this.Addrun(1)}>+</button>
                        <span>1</span>
                        <button className="btn">-</button>
                    </div>
                    <div className="col-2">
                        <button className="btn" onClick={this.Addrun(2)}>+</button>
                        <span>2</span>
                        <button className="btn">-</button>
                    </div>
                    <div className="col-2">
                        <button className="btn" onClick={this.Addrun(3)}>+</button>
                        <span>3</span>
                        <button className="btn">-</button>
                    </div>
                    <div className="col-2">
                        <button className="btn" onClick={this.Addrun(4)}>+</button>
                        <span>4</span>
                        <button className="btn">-</button>
                    </div>
                    <div className="col-2">
                        <button className="btn" onClick={this.Addrun(6)}>+</button>
                        <span>6</span>
                        <button className="btn">-</button>
                    </div>
                    <div className="col-6  my-5 ms-5">
                        <h6>Over</h6>
                        <p>0.0</p>
                    </div>
                    <div className="col-3 my-5">
                        <h6>Total Runs</h6>
                        <p>{this.state.total}</p>
                    </div>
                </div>
            </div>

        </>);

    }
}
// Complete in night;
export default Restorent;