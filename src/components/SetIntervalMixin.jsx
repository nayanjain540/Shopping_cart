export var SetIntervalMixin ={
	componentWillMount(){
		this.intervals=[]
	},
	setInterval(){
		this.intervals.push(setInterval.apply(null, arguments));
	},
	componentWillUnmount: function() {
       this.intervals.map(clearInterval);
	}
}
