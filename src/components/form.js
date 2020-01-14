import React,{Component} from 'react';
import BookList from './bookList';
import ShippingDetails from './shippingDetails';
import DeliveryDetails from './deliveryDetails';
import Confirmation from './Confirmation';
import Success from './Success';

class Form extends Component{
		constructor(props){
		super(props);
		this.state={
			name:'',
			currentStep:1,
			formValues:{},
			cartTimeout:60*15
		};
		this.updateFormData=this.updateFormData.bind(this);	
		this.updateCartTimeout=this.updateCartTimeout.bind(this);
	}

	updateCartTimeout(timeout){
		this.setState({cartTimeout:timeout});
	}

	updateFormData(formData,nextStep) {
	   var formValues = Object.assign({}, this.state.formValues, formData);
       this.setState({currentStep: nextStep, formValues: formValues});
       console.log(formValues);
	}


	render(){
		switch (this.state.currentStep) {
 			case 1:
 				return <BookList updateFormData={this.updateFormData} nextStep={this.state.currentStep}  time={this.state.cartTimeout} updateCartTimeout={this.updateCartTimeout} />;
		     case 2:
 				 return <ShippingDetails updateFormData={this.updateFormData} nextStep={this.state.currentStep} time={this.state.cartTimeout} updateCartTimeout={this.updateCartTimeout}/>;
 			case 3:
 				return <DeliveryDetails updateFormData={this.updateFormData} nextStep={this.state.currentStep} time={this.state.cartTimeout} updateCartTimeout={this.updateCartTimeout}/>;
 			case 4:
 				return <Confirmation data={this.state.formValues} nextStep={this.state.currentStep} updateFormData={this.updateFormData}/> ;
 			case 5:
 				return <Success data={this.state.formValues} nextStep={this.state.currentStep} updateFormData={this.updateFormData} /> ;	
 			default:
 				return <BookList updateFormData={this.updateFormData} nextStep={this.state.currentStep}  time={this.state.cartTimeout} updateCartTimeout={this.updateCartTimeout} />;
 				
 }
	}
}

export default Form;
