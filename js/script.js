class App extends React.Component {
    constructor() {
        super();
        this.state = {
            searchText: '',
            users:[],
            totalCunt: '',
            errorR: '' 
        };
    }

    onChangeHandle(event) {
        this.setState({searchText: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        const {searchText} = this.state;
        const url = `https://api.github.com/search/users?q=${searchText}`;
        fetch(url)
            .then(response => response.json())
            .then(responseJson => this.setState({
                users: responseJson.items,
                totalCunt: responseJson.total_count
            }))
            .catch(error => {  
                console.log("Ooops:", error)              
                this.setState({ errorR: './404.png' })
            })
            
    }

    render() {       
        
        return (
            <div className="react-container">
                <div className="form-container">
                    <h3>GitHub Users Search App</h3>
                    <form onSubmit={event => this.onSubmit(event)}>
                        <label htmlFor="searchText">Search by User Name</label>
                        <br></br>
                        <input
                            className="input-search"
                            type="text"
                            id="searchText"
                            onChange={event => this.onChangeHandle(event)}
                            value={this.state.searchText}/>
                                            
                    </form>
                </div>                
                <h4 className="count">Found users: {this.state.totalCunt}</h4>
                <div className="error">
                    <img src={this.state.errorR} className="error"/>
                </div>              

                <UsersList users={this.state.users}/>                
            </div>
        )        
    }
}

class UsersList extends React.Component {
       
    get users() {        
            return this.props.users.map(user => <User key={user.id} user={user}/>);        
    }    

    render() {
        return (
            <div className="users">                          
                {this.users}
            </div>
        );
    }
}

class User extends React.Component {
    render() {
        return (
            <div className="user">
                <img src={this.props.user.avatar_url} style={{maxWidth: '100px'}}/>                
                <a href={this.props.user.html_url} target="_blank">{this.props.user.login}</a>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
