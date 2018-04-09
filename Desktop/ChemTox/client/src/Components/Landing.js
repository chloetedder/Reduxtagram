import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import swal from 'sweetalert2';
import axios from 'axios';

class Landing extends React.Component{
    constructor(){
        super();
        this.state = {
            citations: [],
            currentInput: "",
            currentIdInput: ""
        }
    }

    componentDidMount(){
        axios.get("/api/citations").then(response=>{
            let array = [];
            for(let i = 0; i<response.data.length;i++){
                if(i==50)
                    break;
                array.push(response.data[i])
            }
            this.setState({
                citations: array,
                originalCitations: array
            })
        })
    }

    handleClick(e){
        e.preventDefault();
        swal({
            type:"success",
            title:"yay",
            text:"chloe"
        })
    }

    handleInput(e){
        this.setState({
            currentInput: e.target.value
        })
        
        
    }

    handleIdInput(e){
        this.setState({
            currentIdInput: e.target.value
        })
      
    }

    handleSubmit(e){
        e.preventDefault()
        let filterArray = this.state.citations.filter(current=>{
            return current.pmid.toString().includes(this.state.currentInput);
        })
        filterArray = filterArray.filter(current=>{
            return current.id.toString().includes(this.state.currentIdInput);
        })
        this.setState({
            citations: filterArray
        })
    }

    render(){
        console.log(this.state.citations);
        const citations = this.state.citations.map((current,index)=>{
            return <li key={index}>{current.id} , {current.aeid} , {current.citation_id} , {current.pmid}</li>
        })
        return(
            <div>
                <RaisedButton onClick={(e)=>this.handleClick(e)} icon={<ExpandMore />}/>
                <h1>Citations</h1>
                <h4>Search by pmid</h4>
                <input type="text" onChange={e=>this.handleInput(e)}/>
                <button onClick={()=>this.setState({citations:this.state.originalCitations})}>Refresh</button>
                <br></br>
                <h4>Search by id</h4>
                <input type="text" onChange={e=>this.handleIdInput(e)}/>
                <br></br>
                <button onClick={e=>this.handleSubmit(e)}>Submit</button>
                <ul>
                    {citations}
                    </ul>
            
            
            
            </div>
        )
    }
}

export default Landing;