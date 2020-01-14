import React, {Component} from 'react';

class DeliveryDetails extends Component{
	constructor(props){
		super(props);
		this.state={
			deliveryOption:'Primary',
			time:0,
			
		}
		this.handleChange=this.handleChange.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
		this.decrementCartTimer=this.decrementCartTimer.bind(this);
	}

	componentWillMount(){
		this.setState({time:this.props.time})
		this.interval=setInterval(this.decrementCartTimer,1000)
		this.props.updateCartTimeout(this.state.time)

	}	

	componentWillUnmount(){
		clearInterval(this.interval)
		this.props.updateCartTimeout(this.state.time)
	}

	decrementCartTimer(){
       if (this.state.time == 0) {
         alert("I'm sorry,time's up");
         return; 
	}
       this.setState({time: this.state.time - 1});
     }

	handleChange(event){
		this.setState({deliveryOption: event.target.value});
	}
	handleSubmit(event){
		event.preventDefault();
		this.props.updateFormData(this.state,this.props.nextStep + 1);
		this.props.updateCartTimeout(this.state.time)

	}

	render(){
		var minutes=Math.floor(this.state.time/60);
		var seconds= this.state.time - minutes * 60;
		return(
			<div>
			<h3>Choose your delivery option</h3>
			<div>
			<form onSubmit={this.handleSubmit}>
				<div className="radio">
					<label>	
						<input type="radio" value="Primary" checked={this.state.deliveryOption=="Primary"} onChange={this.handleChange}/>
							Primary --Next Day Delivery
				</label>
					</div>
			
				<div className="radio">
					<label>
						<input type="radio" value="Normal" checked={this.state.deliveryOption=="Normal"} onChange={this.handleChange}/>
							Normal --Normal Delivery 3-4 days
					</label>
				</div>
			
				<button className="btn btn-success">
  						Submit
  				</button>
			</form>
			</div>
			<div className='well'>
            <span className="glyphicon glyphicon-time" aria-hidden="true"></span> You have {minutes} Minutes, {seconds} Seconds,before confirming order
			</div>
			</div>
		);
	}


}


export default DeliveryDetails;