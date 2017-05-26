class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {shorty: ''};
        this.createShortUrl = this.createShortUrl.bind(this);
    }

    // Create new short URL
    createShortUrl(shortUrl) {
        fetch('http://localhost:8080/api/shortUrls',
            {   method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(shortUrl)
            })
            .then(
                res => {
                    let location = res.headers.get('Location');
                    console.log(location);
                    this.setState({
                        shorty: location.replace("api/shortUrls/", ""),
                    });
                }
            )
            .catch( err => cosole.error(err))
    }

    render() {
        return (
            <div class="content">
                <ShortUrlForm createShortUrl={this.createShortUrl}/>
                <div className="col-md-6">
                    {this.state.shorty}
                </div>
            </div>
        );
    }
}

class ShortUrlForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {url: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        console.log("NAME: " + event.target.name + " VALUE: " + event.target.value)
        this.setState(
            {[event.target.name]: event.target.value}
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        let shortUrl = {url: this.state.url};
        this.props.createShortUrl(shortUrl);
    }

    render() {
        let divStyle = {
            width: "50%",
            margin: "auto"
        };
        let inputStyle = {
            width: "100%"
        }
        return (
            <div className="panel panel-default">
                <div className="panel-heading">Short your URL</div>
                <div className="panel-body" style={divStyle}>
                    <form className="form-inline" >
                        <div className="col-md-6">
                            <input type="text" placeholder="paste your URL here" className="form-control"
                                   style={inputStyle} name="url" onChange={this.handleChange}/>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-success" onClick={this.handleSubmit}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('react'));