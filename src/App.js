import React, { Component } from "react";
import { PanelGroup, Panel } from "react-bootstrap";
//import "./App.css";

const parseString = require("xml2js").parseString;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      inputValue: "",
      activeKey: "1",
      bookDetails: ""
    };
    this.searchBooks = this.searchBooks.bind(this);
    this.handlechange = this.handlechange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handlechange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleSelect = activeKey => {
    this.getBookDetails(activeKey);
    this.setState({
      ...this.state,
      activeKey: activeKey
    });
  };

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <br />
        <header className="App-header">
          <div
            className="input-group"
            style={{ width: "50%", alignSelf: "center" }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Enter Title or ISBN or Author"
              name="search"
              onChange={this.handlechange}
            />
            <div className="input-group-btn">
              <button
                className="btn btn-default"
                type="submit"
                onClick={this.searchBooks}
              >
                <i className="glyphicon glyphicon-search" />
              </button>
            </div>
          </div>
          <br />

          {this.state.books &&
            this.state.books.map(book => {
              let bookDetails = book.best_book[0];
              let bookContent = this.state.bookDetails
                ? this.state.bookDetails
                : "";
              return (
                <PanelGroup
                  accordion
                  id="accordion-example"
                  activeKey={this.state.activeKey}
                  onSelect={this.handleSelect}
                >
                  <Panel
                    eventKey={bookDetails.id[0]["_"]}
                    key={bookDetails.id[0]["_"]}
                  >
                    <Panel.Heading>
                      <Panel.Title toggle>
                        <h3>
                          <i>{bookDetails.title.join()}</i>
                        </h3>
                      </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                      <div style={{ textAlign: "left" }} className="container">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th />
                              <th />
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td rowSpan="5">
                                <img
                                  src={bookDetails.image_url[0]}
                                  style={{ width: "300px", height: "450px" }}
                                  alt=""
                                />
                              </td>
                              <td colSpan="3">
                                <h1>{bookDetails.title.join()}</h1>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan="3">
                                By{" "}
                                <i>
                                  <b>{bookDetails.author[0].name.join()}</b>
                                </i>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h4>{bookContent.average_rating}</h4> Stars
                                rating
                              </td>
                              <td>
                                <h4>{bookContent.ratings_count}</h4> ratings{" "}
                              </td>
                              <td>
                                <h4>{bookContent.text_reviews_count}</h4>{" "}
                                reviews
                              </td>
                            </tr>
                            <tr>
                              <td colSpan="3">
                                {bookContent ? (
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: bookContent.description.join()
                                    }}
                                  />
                                ) : (
                                  ""
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </Panel.Body>
                  </Panel>
                </PanelGroup>
              );
            })}
        </header>
      </div>
    );
  }

  searchBooks = () => {
    const searchBook = this.state.inputValue;
    const tokenKey = "l68ue8I3hm1QYNJP7kA";
    let jsonData;
    if (searchBook !== "") {
      fetch(
        `https://www.goodreads.com/search/index.xml?key=${tokenKey}&q=${searchBook}`
      )
        .then(results => results.text())
        .then(res => {
          parseString(res, function(err, result) {
            jsonData = result;
          });

          this.setState({
            ...this.state,
            books: jsonData.GoodreadsResponse.search[0].results[0].work
          });
        });
    } else {
      alert("Please enter some value to search");
    }
  };

  getBookDetails = id => {
    const tKey = "l68ue8I3hm1QYNJP7kA";
    let jsonData;
    fetch(`https://www.goodreads.com/book/show/${id}.xml?key=${tKey}`)
      .then(results => results.text())
      .then(res => {
        parseString(res, function(err, result) {
          jsonData = result;
        });

        this.setState({
          bookDetails: jsonData.GoodreadsResponse.book[0]
        });
      });
  };
}

export default App;
