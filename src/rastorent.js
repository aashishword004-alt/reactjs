import { Component } from "react";

class Restorent extends Component {
    constructor(props)
    {
        super(props);
        this.state ={
            zero:0,
            one:0,
            two:0,
            three:0,
            four:0,
            six:0


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
                        <button className="btn">+</button>
                    </div>
                    <div className="col-2">
                        <button className="btn">+</button>
                        <span>1</span>
                        <button className="btn">-</button>
                    </div>
                    <div className="col-2">
                        <button className="btn">+</button>
                        <span>2</span>
                        <button className="btn">-</button>
                    </div>
                    <div className="col-2">
                        <button className="btn">+</button>
                        <span>3</span>
                        <button className="btn">-</button>
                    </div>
                    <div className="col-2">
                        <button className="btn">+</button>
                        <span>4</span>
                        <button className="btn">-</button>
                    </div>
                    <div className="col-2">
                        <button className="btn">+</button>
                        <span>6</span>
                        <button className="btn">-</button>
                    </div>
                    <div className="col-6  my-5 ms-5">
                        <h6>Over</h6>
                        <p>0.0</p>
                    </div>
                    <div className="col-3 my-5">
                        <h6>Total Runs</h6>
                        <p>0</p>
                    </div>
                </div>
            </div>

        </>);

    }
}
export default Restorent;