import React,{Component} from 'react';



class BookList extends Component{
	
	constructor(props){
		super(props);
		this.state={
			 books: 
			 [
			 {id:1, name: 'Zero to One', author: 'Peter Thiel' },
 			 {id:2, name: 'Monk who sold his Ferrari', author: 'Robin Sharma' },
 			 {id:3, name: 'Wings of Fire', author: 'A.P.J. Abdul Kalam' }
 			],
 			selectedBooks: [],
           	error: false,
           	time:15
		}
		this.renderError=this.renderError.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
		this.handleSelectedBooks=this.handleSelectedBooks.bind(this);
		this.decrementCartTimer=this.decrementCartTimer.bind(this);
		//this.updateTimer=this.updateTimer.bind(this);
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
        //this.props.updateCartTimeout(this.state.time+15)
        this.props.updateFormData({ selectedBooks: {} },1);
        return;

	}
       this.setState({time: this.state.time - 1});
     }

	renderError() {
       if (this.state.error) {
         return (
           <div className="alert alert-danger">
             {this.state.error}
           </div>
	); 
	}
	}
	
	 handleSelectedBooks(event) {
       var selectedBooks = this.state.selectedBooks;
       var index = selectedBooks.indexOf(event.target.value);
       if (event.target.checked) {
         if (index === -1)
           selectedBooks.push(event.target.value);
       } else {
         selectedBooks.splice(index, 1);
       }
       this.setState({selectedBooks: selectedBooks });
   }



	handleSubmit(event) {
       event.preventDefault();
       
       if(this.state.selectedBooks.length === 0) {
         this.setState({error: 'Please choose at least one book to continue'});
       } 
       else {
         this.setState({error: false});
         this.props.updateFormData({ selectedBooks: this.state.selectedBooks },this.props.nextStep+1);
         this.props.updateCartTimeout(this.state.time)

	} 
	}

	render(){
		var errormessage=this.renderError();
		var minutes=Math.floor(this.state.time/60);
		var seconds= this.state.time - minutes * 60;
		const renderBook=(book)=>{
			return (
        <div className="checkbox" key={book.id}>
           	<label>
            <input type="checkbox" value={book.name} onChange={this.handleSelectedBooks}/>
             {book.name} -- {book.author}
           </label>
		</div> 
		);
		}
		
		return(
			
			<div>
			
 			<h3> Choose from wide variety of books available in our store
			</h3>
 			<form onSubmit={this.handleSubmit}>
 			{errormessage}
 			{this.state.books.map((book) => renderBook(book) )}
 			
 			<input type="submit" className="btn btn-success" />
 			</form >
 			<div className='well'>
            <span className="glyphicon glyphicon-time" aria-hidden="true"></span> You have {minutes} Minutes, {seconds} Seconds,before confirming order
 			</div>
 			</div>
 		);
	}
}

export default BookList;