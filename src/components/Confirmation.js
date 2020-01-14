import React,{Component} from 'react';

class Confirmation extends Component{
	constructor(props){
		super(props);
		this.handleSubmit=this.handleSubmit.bind(this);
	}

	handleSubmit(event){
		event.preventDefault();
		this.props.updateFormData(this.props.data,this.props.nextStep+1);
	}
	render(){
		return(
			<div>
				<h1>Are you sure you want to submit the data?</h1>
           		<div>
           			<form onSubmit={this.handleSubmit}>
             		
             		<div>
               			<strong>Full Name</strong> : { this.props.data.fullName }
             		</div>
             		<br/>
             		
             		<div>
               			<strong>Contact Number</strong> : { this.props.data.contactNumber }
 					</div>
 					<br/>

 					<div>
               			<strong>Shipping Address</strong> : { this.props.data.shippingAddress }
             		</div>
             		<br/>
             
             		<div>
             			<strong>Selected books</strong> : { this.props.data.selectedBooks.join(", ") }
             		</div>
             		<br/>

             		 <button className="btn btn-success">
      		         Place order
             		</button>
           			</form>
				</div>	
			</div>
			);
	}
}

export default Confirmation;
