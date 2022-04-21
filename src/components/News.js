import React from 'react'
import { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

 const News = () => {
    const [articles, setArticles] = useState(null);
    const [searchWord, setSearchWord] = useState();
    const handleChange = e => {
      setSearchWord(e.target.value);
    };
useEffect(() => {
    fetch(`https://hn.algolia.com/api/v1/search?query=${searchWord}`)
    .then((response) => response.json())
    .then((data) => {
   console.log(data.hits);
    setArticles(data.hits);
})
    .catch((error) => alert('Error'));
}, [searchWord]);



  return (
    <>
    <div>
    <div id="searchbar">
    <input id="inputtext"
          type="text"
          placeholder="Suche nach Artikeln"
          value={searchWord}
          onChange={handleChange}
        />
    </div>
  
    
         <h1>Artikel</h1>

         <Row xs={1} md={2} className="g-4">    
         
         <Col>
  
      {articles
        ? articles.map((article) => (
          
<Card id="border-design"  style={{ width: '18rem', padding: '20px', margin: '1rem' }}>            
              <div key={article.objectID}>
              <Card.Title><h2 id="h2-titel">{article.title}</h2></Card.Title>
              <Card.Text id="autor" class="text-muted"> <p>{article.author}</p></Card.Text>
              <Card.Link id="link-style"><Button size="sm" variant="secondary" href={article.url}>LINK</Button></Card.Link>
              
            
            </div>
            </Card>
           
          ))
        : <Spinner animation="border" variant='light' role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>}
      </Col>
            </Row>
    </div>
    </>
  );
}
export default News