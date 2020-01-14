import React,{Component} from 'react';

class ShippingDetails extends Component{
		constructor(props){
		super(props);
		this.state={
			 fullName:"",
			 contactNumber:"",
			 shippingAddress:"",
			 error:false,
			 time:0,
			 
		}
		this.renderError=this.renderError.bind(this);
		this.validateInput=this.validateInput.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
		this.handleChange=this.handleChange.bind(this);
		this.decrementCartTimer=this.decrementCartTimer.bind(this);
	}

	renderError(){
		 if (this.state.error) {
         return (
           <div className="alert alert-danger">
             {this.state.error}
           </div>
		); 
     }
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
         alert("Sorry,timeout");
		return; 
	}
       this.setState({time: this.state.time - 1});
     }

	validateInput(){
		if(this.state.fullName===""){
			this.setState({error:"Please enter a name"});
		}
		else if(this.state.contactNumber===""){
			this.setState({error:"Please enter a contactnumber"});
		}
		else if (this.state.shippingAddress ==="") {
         this.setState({error:"Please enter a Address"});
       } else {
         this.setState({error:false});
         return true;
       }
		
	}

	handleSubmit(event){
		event.preventDefault();
		var formData= {
			fullName:this.state.fullName,
			contactNumber:this.state.contactNumber,
			shippingAddress:this.state.shippingAddress
		}
		if(this.validateInput()){
			this.props.updateFormData(formData,this.props.nextStep + 1);
			this.props.updateCartTimeout(this.state.time)
		}

		
	}

	handleChange(event,attribute){
		var newstate=this.state;
		newstate[attribute]=event.target.value;
		this.setState(newstate);
		
	}

	render(){
		var errormessage = this.renderError();
		var minutes=Math.floor(this.state.time/60);
		var seconds= this.state.time - minutes * 60;
		return(
			
			<div>
			<h3> Enter your shipping information</h3>
			<div>
			{errormessage}
 			<form onSubmit={this.handleSubmit}>	

 			<div className="form-group">
 			<input className="form-control" type="text" 
 			 placeholder="Full Name" 
 			 value={this.state.fullName}
 			 onChange={(event)=>this.handleChange(event,'fullName')}/>
 			</div>
 			

 			<div className="form-group">
 			<input className="form-control" type="text" placeholder="Contact Number" value={this.state.contactNumber} onChange={(event)=>this.handleChange(event,'contactNumber')}/>
 			</div>
 			

 			<div className="form-group">
 			<input className="form-control" type="text" placeholder="Shipping Address" value={this.state.shippingAddress} onChange={(event)=>this.handleChange(event,'shippingAddress')}/>
 			</div>
 			<div className="form-group">
                 <button type="Submit" ref="submit" className="btn btn-success">
                   Submit
                 </button>
               </div>
 			</form>
 			</div>
 			<div className='well'>
            <span className="glyphicon glyphicon-time" aria-hidden="true"></span> You have {minutes} Minutes, {seconds} Seconds,before confirming order
 			</div>
 			</div>
 );
			
	}
}

export default ShippingDetails;